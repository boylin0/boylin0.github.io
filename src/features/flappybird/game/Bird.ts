import { type Rectangle, Sprite, type Texture } from 'pixi.js'
import { mapRange } from '@/lib/random'
import { circleIntersectsRect } from './collision'

/** Pixels trimmed from the hit circle so grazing a pipe is forgiven. */
const HIT_MARGIN = 5

export class Bird {
  readonly sprite: Sprite
  private velocityY = 0

  constructor(
    texture: Texture,
    private readonly screen: Rectangle,
  ) {
    this.sprite = new Sprite({ texture, anchor: 0.5 })
    this.resize()
  }

  /** Scales the bird to a twentieth of the screen height. */
  resize() {
    this.sprite.scale.set(1)
    this.sprite.scale.set(this.screen.height / 20 / this.sprite.width)
  }

  reset(x: number, y: number) {
    this.sprite.position.set(x, y)
    this.velocityY = -5
    this.sprite.visible = true
  }

  jump() {
    this.velocityY = -this.screen.height / 60
  }

  get isDead() {
    return this.sprite.y >= this.screen.height
  }

  update(delta: number) {
    const { height } = this.screen
    const maxTilt = height / 25
    const tilt = Math.max(Math.min(this.velocityY, maxTilt), -maxTilt)
    this.sprite.rotation = mapRange(tilt, maxTilt, -maxTilt, Math.PI / 2, -Math.PI / 2)

    if (this.sprite.y + this.velocityY < 0) {
      this.velocityY = 0
      this.sprite.y = 0
    } else {
      this.sprite.y += this.velocityY * delta
    }

    this.velocityY = this.sprite.y < height ? this.velocityY + (height / 1500) * delta : 0
  }

  hits(target: Sprite): boolean {
    const radius = this.sprite.width / 2 - HIT_MARGIN
    return circleIntersectsRect(this.sprite.getBounds(), radius, target.getBounds())
  }
}
