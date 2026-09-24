/**
 * Generates the GitHub stats images shown in the GitHub section of the home page and writes
 * them to public/github-stats/. Runs in the deploy workflow and can be run locally.
 *
 * Environment, also read from .env and .env.local:
 *   STATS_TOKEN   Classic personal access token with the repo and read:user scopes. Required
 *                 for the lowlighter/metrics images and for counting private repositories.
 *   GITHUB_TOKEN  Fallback for every other image; covers public activity only.
 *
 * Docker is required for the snake and the lowlighter/metrics images.
 *
 * An image that fails to generate is skipped with a warning and never fails the run, because
 * the page hides missing images.
 */
import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

const USERNAME = process.env.GITHUB_REPOSITORY_OWNER || 'boylin0'
const ROOT = path.resolve(import.meta.dirname, '..')
const OUTPUT_DIR = path.join(ROOT, 'public/github-stats')
const CACHE_DIR = path.join(ROOT, 'node_modules/.cache/github-stats')

const CARD_THEME = { bg_color: '30,e96443,904e95', title_color: 'fff', text_color: 'fff' }
/** Both cards share this width so they line up side by side. */
const CARD_WIDTH = '467'

const METRICS_IMAGE = 'ghcr.io/lowlighter/metrics:v3.34'
const SNAKE_IMAGE =
  'platane/snk@sha256:3a66a51ca8eaecc1e841bc8baae39bd88079e57419850d1ed005eee2bbfce940'
/** yoshi389111/github-profile-3d-contrib v0.9.3; the bundle is verified before it runs. */
const CONTRIB_3D = {
  url: 'https://raw.githubusercontent.com/yoshi389111/github-profile-3d-contrib/7d95e7d4cdc028dd1e1cbd957d65f35efb12ae39/dist/index.js',
  sha256: '981a9fd309b504c6d93770d798a1adf3243644d37b343290d70227fe061cd882',
}
const PROCESS_TIMEOUT_MS = 5 * 60 * 1000

const statsToken = process.env.STATS_TOKEN ?? ''
const anyToken = statsToken || process.env.GITHUB_TOKEN || ''

/**
 * Card renderers take the card URL's query parameters. The package's JSDoc marks every
 * parameter as required, although the renderers fill in defaults for missing ones.
 */
type CardRenderer = (
  query: Record<string, string>,
) => Promise<{ status?: string; content?: string }>

function warn(message: string) {
  console.warn(process.env.GITHUB_ACTIONS ? `::warning::${message}` : `warning: ${message}`)
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}

/** Runs a command, forwarding its stderr, and rejects on a non-zero exit. */
function run(
  command: string,
  args: string[],
  options: { cwd?: string; env?: NodeJS.ProcessEnv } = {},
) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      ...options,
      stdio: ['ignore', 'ignore', 'inherit'],
      timeout: PROCESS_TIMEOUT_MS,
    })
    child.on('error', reject)
    child.on('close', (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)),
    )
  })
}

/**
 * Produces `files` by calling `produce` with a scratch directory, then copies them from that
 * directory into the output. Files that could not be produced are removed from the output.
 */
async function generate(
  files: Record<string, string>,
  requirement: string | undefined,
  produce: (scratch: string) => Promise<void>,
) {
  const names = Object.keys(files)
  const removeAll = () =>
    Promise.all(names.map((name) => rm(path.join(OUTPUT_DIR, name), { force: true })))

  if (requirement) {
    warn(`Skipped ${names.join(', ')}: ${requirement}`)
    return removeAll()
  }

  const scratch = await mkdtemp(path.join(os.tmpdir(), 'github-stats-'))
  try {
    await produce(scratch)
    for (const [name, source] of Object.entries(files)) {
      await copyFile(path.join(scratch, source), path.join(OUTPUT_DIR, name))
      console.log(`Wrote ${name}`)
    }
  } catch (error) {
    warn(`Skipped ${names.join(', ')}: ${errorMessage(error)}`)
    await removeAll()
  } finally {
    await rm(scratch, { recursive: true, force: true }).catch(() => {})
  }
}

/** Renders a github-readme-stats card. */
function readmeStatsCard(file: string, card: 'api' | 'topLangs', options: Record<string, string>) {
  return generate({ [file]: file }, anyToken ? undefined : 'set STATS_TOKEN.', async (scratch) => {
    // The core package reads its token from PAT_1.
    process.env.PAT_1 = anyToken
    const core = await import('@stats-organization/github-readme-stats-core')
    const render = core[card] as unknown as CardRenderer
    const result = await render({ username: USERNAME, ...CARD_THEME, ...options })
    if (String(result.status).startsWith('error') || !result.content) {
      throw new Error(String(result.status))
    }
    await writeFile(path.join(scratch, file), result.content)
  })
}

/** Renders one lowlighter/metrics image in Docker. */
function metrics(file: string, options: Record<string, string>) {
  const requirement = statsToken ? undefined : 'lowlighter/metrics needs STATS_TOKEN.'
  return generate({ [file]: file }, requirement, async (scratch) => {
    const inputs = {
      token: statsToken,
      user: USERNAME,
      filename: file,
      output_action: 'none',
      base: '',
      config_timezone: 'Asia/Taipei',
      retries: '2',
      retries_delay: '10',
      // Fail instead of drawing the plugin error into the image.
      plugins_errors_fatal: 'yes',
      ...options,
    }
    // metrics reads URI-encoded INPUT_* variables, the way the official action passes them.
    const envArgs = Object.entries(inputs).flatMap(([key, value]) => [
      '--env',
      `INPUT_${key.toUpperCase()}=${encodeURIComponent(value)}`,
    ])
    await run('docker', [
      'run',
      '--rm',
      '--init',
      ...envArgs,
      '-v',
      `${scratch}:/renders`,
      METRICS_IMAGE,
    ])
  })
}

/** Renders the snake eating the contribution calendar, from Platane/snk, in Docker. */
function snake(file: string, options: string) {
  return generate({ [file]: 'snake.svg' }, anyToken ? undefined : 'set STATS_TOKEN.', (scratch) =>
    run('docker', [
      'run',
      '--rm',
      '--env',
      `INPUT_GITHUB_USER_NAME=${USERNAME}`,
      '--env',
      `INPUT_GITHUB_TOKEN=${anyToken}`,
      '--env',
      `INPUT_OUTPUTS=snake.svg?${options}`,
      '-v',
      `${scratch}:/github/workspace`,
      '-w',
      '/github/workspace',
      SNAKE_IMAGE,
    ]),
  )
}

/** Downloads the pinned 3D contribution bundle once and checks its hash. */
async function contrib3dBundle(): Promise<string> {
  const file = path.join(CACHE_DIR, `github-profile-3d-contrib-${CONTRIB_3D.sha256}.js`)
  const cached = await readFile(file).catch(() => undefined)
  const bundle = cached ?? Buffer.from(await (await fetch(CONTRIB_3D.url)).arrayBuffer())
  const hash = createHash('sha256').update(bundle).digest('hex')
  if (hash !== CONTRIB_3D.sha256) throw new Error(`unexpected bundle hash ${hash}`)
  if (!cached) {
    await mkdir(CACHE_DIR, { recursive: true })
    await writeFile(file, bundle)
  }
  return file
}

/** Renders the 3D contribution calendar from yoshi389111/github-profile-3d-contrib. */
function contrib3d(files: Record<string, string>) {
  return generate(files, anyToken ? undefined : 'set STATS_TOKEN.', async (scratch) => {
    const bundle = await contrib3dBundle()
    await run(process.execPath, [bundle], {
      cwd: scratch,
      env: { PATH: process.env.PATH, GITHUB_TOKEN: anyToken, USERNAME: USERNAME },
    })
  }).then(() => undefined)
}

await mkdir(OUTPUT_DIR, { recursive: true })

/** Plugins of lowlighter/metrics v3.34 that still work with the current GitHub API. */
const metricsImages = [
  ['metrics-overview.svg', { base: 'header, activity, community, repositories, metadata' }],
  [
    'metrics-isocalendar.svg',
    { plugin_isocalendar: 'yes', plugin_isocalendar_duration: 'full-year' },
  ],
  ['metrics-calendar.svg', { plugin_calendar: 'yes', plugin_calendar_limit: '3' }],
] as const

await Promise.all([
  readmeStatsCard('stats.svg', 'api', {
    count_private: 'true',
    show_icons: 'true',
    icon_color: 'fff',
    card_width: CARD_WIDTH,
  }),
  readmeStatsCard('top-langs.svg', 'topLangs', {
    layout: 'compact',
    langs_count: '8',
    card_width: CARD_WIDTH,
  }),
  contrib3d({ 'contrib-3d.svg': 'profile-3d-contrib/profile-night-rainbow.svg' }),
  snake('snake.svg', 'palette=github-light'),
  // Sequential, so the metrics containers do not trip GitHub's secondary rate limits.
  (async () => {
    for (const [file, options] of metricsImages) await metrics(file, options)
  })(),
])
