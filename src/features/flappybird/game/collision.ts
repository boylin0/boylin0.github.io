import type { Bounds } from 'pixi.js'

/** Whether a circle centred in `circle` with `radius` overlaps the rectangle `rect`. */
export function circleIntersectsRect(circle: Bounds, radius: number, rect: Bounds): boolean {
  const cx = circle.x + circle.width / 2
  const cy = circle.y + circle.height / 2
  const nearestX = Math.max(rect.x, Math.min(cx, rect.x + rect.width))
  const nearestY = Math.max(rect.y, Math.min(cy, rect.y + rect.height))
  return Math.hypot(cx - nearestX, cy - nearestY) <= radius
}
