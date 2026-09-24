import loadingAnimation from '@/assets/loading.svg'

/** Must stay visually identical to the placeholder inside `#root` in `index.html`. */
export function LoadingScreen() {
  return (
    <div role="status" className="flex min-h-dvh flex-col items-center justify-center">
      <img src={loadingAnimation} alt="" className="size-60" />
      <p className="font-light text-4xl tracking-wide">LOADING</p>
    </div>
  )
}
