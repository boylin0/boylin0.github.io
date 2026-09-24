import { useRouter } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import notFoundAnimation from '@/assets/lottie/404.json?url'
import { Lottie } from '@/components/Lottie'
import { Button } from '@/components/ui/button'

export function NotFoundScreen() {
  const router = useRouter()

  return (
    <main className="flex min-h-[80dvh] flex-col items-center justify-center gap-6 p-6 text-center">
      <title>Page Not Found</title>
      <Lottie src={notFoundAnimation} className="aspect-[591/420] w-full max-w-100" />
      <h1 className="font-light text-4xl">找不到此頁面</h1>
      <Button
        variant="outline"
        size="lg"
        className="min-w-40"
        onClick={() => router.history.back()}
      >
        <ArrowLeft />
        返回上一頁
      </Button>
    </main>
  )
}
