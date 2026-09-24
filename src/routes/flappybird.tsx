import { createFileRoute } from '@tanstack/react-router'
import { FlappyBirdPage } from '@/features/flappybird/FlappyBirdPage'

export const Route = createFileRoute('/flappybird')({
  head: () => ({ meta: [{ title: 'FlappyDuck' }] }),
  component: FlappyBirdPage,
})
