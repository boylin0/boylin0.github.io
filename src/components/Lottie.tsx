import type { DotLottieReactProps } from '@lottiefiles/dotlottie-react'
import { lazy, Suspense } from 'react'

const LottiePlayer = lazy(() => import('./LottiePlayer'))

/** Plays a Lottie animation. The player and its WASM runtime load on first use. */
export function Lottie(props: DotLottieReactProps) {
  return (
    <Suspense fallback={<div className={props.className} />}>
      <LottiePlayer {...props} />
    </Suspense>
  )
}
