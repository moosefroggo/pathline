export const smoothEase = [0.32, 0.72, 0, 1] as const

export const screenTransition = {
  duration: 0.54,
  ease: smoothEase,
}

export const screenStackVariants = {
  enter: (direction: number) => ({
    opacity: direction > 0 ? 0.96 : 0.92,
    x: direction > 0 ? 38 : -30,
    scale: direction > 0 ? 0.996 : 1,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: direction > 0 ? 0.84 : 0.9,
    x: direction > 0 ? -24 : 46,
    scale: direction > 0 ? 0.998 : 0.994,
  }),
}

export const riseTransition = {
  duration: 0.5,
  ease: smoothEase,
}

export const revealTransition = {
  duration: 0.78,
  ease: smoothEase,
}
