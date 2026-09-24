import {
  Application,
  Container,
  type FederatedPointerEvent,
  Sprite,
  Text,
  type Texture,
  type Ticker,
} from 'pixi.js'
import { randomInt } from '@/lib/random'
import { type GameTextures, loadTextures } from './assets'
import { Bird } from './Bird'
import { BUTTON_WIDTH, createButton } from './Button'
import { createPipeTexture, Pipe } from './Pipe'

const BACKGROUND = 0x9acefe
/** Ticks, at 60 per second, between two pairs of pipes. */
const PIPE_INTERVAL = 100
/** Horizontal gap between buttons, in pixels. */
const BUTTON_GAP = 10
/** Ticks needed to earn one point. */
const TICKS_PER_POINT = 10

export type GameOptions = {
  /** Element the canvas is appended to; it is also the one shown in fullscreen. */
  container: HTMLElement
  onExit: () => void
  onShare: () => void
  onToggleFullscreen: () => void
}

type PipePair = { top: Pipe; bottom: Pipe }

/** A Flappy Bird clone. Call `start()` once, and `destroy()` when the page unmounts. */
export class FlappyBirdGame {
  private readonly app = new Application()
  private initialized = false
  private destroyed = false

  private textures!: GameTextures
  private bird!: Bird
  private title!: Sprite
  private gameover!: Sprite
  private scoreText!: Text
  private buttons: Sprite[] = []
  private readonly gameLayer = new Container()
  private readonly uiLayer = new Container()

  private pipes: PipePair[] = []
  private pipeTexture: Texture | undefined
  /** Pipe textures from earlier screen sizes, still used by pipes on screen. */
  private retiredPipeTextures: Texture[] = []
  private ticksSincePipe = 0
  private ticks = 0
  private isOver = true

  constructor(private readonly options: GameOptions) {}

  async start() {
    await this.app.init({
      resizeTo: window,
      background: BACKGROUND,
      preference: 'webgl',
      resolution: window.devicePixelRatio,
      autoDensity: true,
    })
    this.initialized = true
    if (this.destroyed) {
      this.teardown()
      return
    }
    this.options.container.append(this.app.canvas)

    this.textures = await loadTextures()
    if (this.destroyed) return

    this.buildScene()
    this.layout()
    this.app.renderer.on('resize', this.handleResize)
    this.app.ticker.add(this.tick)
    window.addEventListener('keydown', this.handleKeyDown)
  }

  destroy() {
    this.destroyed = true
    if (this.initialized) this.teardown()
  }

  private teardown() {
    window.removeEventListener('keydown', this.handleKeyDown)
    this.clearPipes()
    this.pipeTexture?.destroy(true)
    this.app.destroy({ removeView: true }, { children: true })
  }

  private buildScene() {
    const { app, textures, options } = this
    const screen = app.screen

    this.bird = new Bird(textures.bird, screen)
    this.bird.sprite.visible = false
    this.gameLayer.addChild(this.bird.sprite)

    this.scoreText = new Text({
      text: 'Score: 0',
      position: { x: 10, y: 10 },
      style: {
        fontFamily: 'Arial Black, sans-serif',
        fontSize: 28,
        fill: '#fff',
        align: 'center',
        stroke: { color: '#000', width: 5 },
      },
    })

    this.title = new Sprite({ texture: textures.title, anchor: { x: 0.5, y: 0.8 } })
    this.gameover = new Sprite({
      texture: textures.gameover,
      anchor: { x: 0.5, y: 0.8 },
      visible: false,
    })

    this.buttons = [
      createButton(textures.buttonRestart, () => this.restart()),
      createButton(textures.buttonFullscreen, options.onToggleFullscreen),
      createButton(textures.buttonExit, options.onExit),
      createButton(textures.buttonShare, options.onShare),
    ]

    this.uiLayer.addChild(this.scoreText, this.gameover, this.title, ...this.buttons)
    app.stage.addChild(this.gameLayer, this.uiLayer)

    app.stage.eventMode = 'static'
    app.stage.hitArea = screen
    app.stage.on('pointerdown', this.handlePointerDown)
  }

  /** Positions and scales everything for the current screen size. */
  private layout() {
    const { width, height } = this.app.screen
    this.bird.resize()

    for (const [sprite, baseScale] of [
      [this.title, 0.8],
      [this.gameover, 1],
    ] as const) {
      sprite.position.set(width / 2, height / 2)
      sprite.scale.set(baseScale * Math.min(width / (sprite.texture.width * baseScale), 1))
    }

    const rowWidth = this.buttons.length * (BUTTON_WIDTH + BUTTON_GAP)
    const titleBottom = this.title.y + this.title.height * (1 - this.title.anchor.y)
    const y = titleBottom + 120
    this.buttons.forEach((button, index) => {
      button.position.set(width / 2 - rowWidth / 2 + 40 + index * (BUTTON_WIDTH + BUTTON_GAP), y)
    })

    if (this.pipeTexture) this.retiredPipeTextures.push(this.pipeTexture)
    this.pipeTexture = undefined
  }

  private restart() {
    const { width, height } = this.app.screen
    this.title.visible = false
    this.gameover.visible = false
    for (const button of this.buttons) button.visible = false
    this.clearPipes()
    this.bird.reset(Math.min(width / 8, 200), height / 3)
    this.ticks = 0
    this.ticksSincePipe = 0
    this.isOver = false
  }

  private endGame() {
    this.isOver = true
    if (!this.title.visible) this.gameover.visible = true
    for (const button of this.buttons) button.visible = true
  }

  private jump() {
    if (!this.isOver && !this.bird.isDead) this.bird.jump()
  }

  private readonly tick = (ticker: Ticker) => {
    if (this.isOver) return
    const delta = ticker.deltaTime

    this.ticks += delta
    this.scoreText.text = `Score: ${Math.floor(this.ticks / TICKS_PER_POINT)}`

    this.ticksSincePipe += delta
    if (this.ticksSincePipe > PIPE_INTERVAL) {
      this.spawnPipes()
      this.ticksSincePipe = 0
    }

    this.bird.update(delta)
    for (const pair of this.pipes) {
      pair.top.update(delta)
      pair.bottom.update(delta)
    }

    this.pipes = this.pipes.filter((pair) => {
      if (!pair.top.isOffScreen) return true
      pair.top.destroy()
      pair.bottom.destroy()
      return false
    })

    const crashed = this.pipes.some(
      ({ top, bottom }) => this.bird.hits(top.sprite) || this.bird.hits(bottom.sprite),
    )
    if (crashed || this.bird.isDead) this.endGame()
  }

  private spawnPipes() {
    const { app, textures } = this
    const { width, height } = app.screen
    this.pipeTexture ??= createPipeTexture(
      app.renderer,
      textures.pipeHead,
      textures.pipeBody,
      app.screen,
    )

    const gap = height / 4
    const gapTop = randomInt(20, height - gap - 20)
    const x = width + 75
    const bobbing = Math.random() < 0.5
    const top = new Pipe(this.pipeTexture, x, gapTop, true, bobbing, app.screen)
    const bottom = new Pipe(this.pipeTexture, x, gapTop + gap, false, bobbing, app.screen)
    this.gameLayer.addChild(top.sprite, bottom.sprite)
    this.pipes.push({ top, bottom })
  }

  private clearPipes() {
    for (const { top, bottom } of this.pipes) {
      top.destroy()
      bottom.destroy()
    }
    this.pipes = []
    for (const texture of this.retiredPipeTextures) texture.destroy(true)
    this.retiredPipeTextures = []
  }

  private readonly handleResize = () => this.layout()

  private readonly handlePointerDown = (_event: FederatedPointerEvent) => this.jump()

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space' && !event.repeat) {
      event.preventDefault()
      this.jump()
    }
  }
}
