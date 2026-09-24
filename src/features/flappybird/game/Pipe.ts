import { Container, type Rectangle, type Renderer, Sprite, type Texture } from 'pixi.js'

/** Builds a pipe texture sized to the current screen: a head on top of a long body. */
export function createPipeTexture(
  renderer: Renderer,
  head: Texture,
  body: Texture,
  screen: Rectangle,
): Texture {
  const headSprite = new Sprite(head)
  const bodySprite = new Sprite(body)
  const scale = screen.height / 25 / headSprite.height
  headSprite.scale.set(scale)
  bodySprite.width *= scale
  bodySprite.height = screen.height * 2
  bodySprite.position.set((headSprite.width - bodySprite.width) / 2, headSprite.height)

  const container = new Container({ children: [headSprite, bodySprite] })
  const texture = renderer.generateTexture(container)
  container.destroy({ children: true })
  return texture
}

export class Pipe {
  readonly sprite: Sprite

  /**
   * @param facingDown Top pipes hang from the ceiling, so they are rotated upside down.
   * @param bobbing Bobbing pipes drift up and down while they scroll.
   */
  constructor(
    texture: Texture,
    x: number,
    y: number,
    facingDown: boolean,
    private readonly bobbing: boolean,
    private readonly screen: Rectangle,
  ) {
    this.sprite = new Sprite({
      texture,
      anchor: { x: 0.5, y: 0 },
      rotation: facingDown ? Math.PI : 0,
      position: { x, y },
    })
  }

  update(delta: number) {
    this.sprite.x -= (this.screen.height / 120) * delta
    if (this.bobbing) this.sprite.y += Math.sin(performance.now() / 1000) / 2
  }

  get isOffScreen() {
    const bounds = this.sprite.getBounds()
    return bounds.x < -bounds.width
  }

  destroy() {
    this.sprite.destroy()
  }
}
