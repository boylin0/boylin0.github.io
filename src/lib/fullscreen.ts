/** Enters fullscreen on `element`, or leaves it if the document is already fullscreen. */
export async function toggleFullscreen(element: Element): Promise<void> {
  if (document.fullscreenElement) {
    await document.exitFullscreen()
  } else {
    await element.requestFullscreen()
  }
}
