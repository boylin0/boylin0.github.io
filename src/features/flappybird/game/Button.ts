import { Sprite, type Texture } from 'pixi.js'

/** Width every button is scaled to, in pixels. */
const BUTTON_WIDTH = 70
const HOVER_SCALE = 1.1

/** A sprite that grows on hover and runs `onTap` when clicked or tapped. */
export function createButton(texture: Texture, onTap: () => void): Sprite {
  const sprite = new Sprite({ texture, anchor: 0.5, eventMode: 'static', cursor: 'pointer' })
  const baseScale = BUTTON_WIDTH / texture.width
  sprite.scale.set(baseScale)
  sprite.on('pointerover', () => sprite.scale.set(baseScale * HOVER_SCALE))
  sprite.on('pointerout', () => sprite.scale.set(baseScale))
  sprite.on('pointertap', (event) => {
    event.stopPropagation()
    onTap()
  })
  return sprite
}

export { BUTTON_WIDTH }
