import { Assets, type Texture } from 'pixi.js'
import buttonExitUrl from '../media/button-exit.png'
import buttonFullscreenUrl from '../media/button-fullscreen.png'
import buttonRestartUrl from '../media/button-restart.png'
import buttonShareUrl from '../media/button-share.png'
import duckUrl from '../media/duck.png'
import titleUrl from '../media/flappyduck-title.png'
import gameoverUrl from '../media/gameover.png'
import pipeBodyUrl from '../media/pipe-body.png'
import pipeHeadUrl from '../media/pipe-head.png'

const TEXTURE_URLS = {
  bird: duckUrl,
  pipeHead: pipeHeadUrl,
  pipeBody: pipeBodyUrl,
  gameover: gameoverUrl,
  title: titleUrl,
  buttonRestart: buttonRestartUrl,
  buttonFullscreen: buttonFullscreenUrl,
  buttonExit: buttonExitUrl,
  buttonShare: buttonShareUrl,
} as const

export type GameTextures = Record<keyof typeof TEXTURE_URLS, Texture>

/** Loads every texture the game uses. Textures stay in the Assets cache between visits. */
export async function loadTextures(): Promise<GameTextures> {
  const loaded = await Assets.load<Texture>(Object.values(TEXTURE_URLS))
  return Object.fromEntries(
    Object.entries(TEXTURE_URLS).map(([name, url]) => [name, loaded[url]]),
  ) as GameTextures
}
