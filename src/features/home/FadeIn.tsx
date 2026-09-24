import { type HTMLMotionProps, motion } from 'motion/react'

type FadeInProps = HTMLMotionProps<'div'> & {
  /** Seconds to wait after the element enters the viewport. */
  delay?: number
  /** Seconds the fade lasts. */
  duration?: number
}

/** Fades its children in once, the first time they scroll into view. */
export function FadeIn({ delay = 0, duration = 1, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay }}
      {...props}
    />
  )
}
