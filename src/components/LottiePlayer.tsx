import { DotLottieReact, type DotLottieReactProps, setWasmUrl } from '@lottiefiles/dotlottie-react'
import wasmUrl from '@lottiefiles/dotlottie-web/dotlottie-player.wasm?url'

setWasmUrl(wasmUrl)

export default function LottiePlayer(props: DotLottieReactProps) {
  return <DotLottieReact loop autoplay aria-hidden {...props} />
}
