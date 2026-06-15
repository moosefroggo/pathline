export const smoothEase = [0.32, 0.72, 0, 1] as const

export const screenTransition = {
  duration: 0.42,
  ease: smoothEase,
}

/**
 * iOS UINavigationController push/pop.
 * Panels are opaque (see App.tsx) so they never composite through each other.
 * The foreground owns the full-width slide; the screen behind it parallaxes a
 * short distance. zIndex is foreground=2 / background=1 and is applied instantly
 * (see the transition override in App.tsx) so layering can't flicker mid-slide.
 * No opacity is animated — position alone carries the motion.
 */
export const screenStackVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-22%',
    zIndex: direction > 0 ? 2 : 1,
  }),
  center: (direction: number) => ({
    x: '0%',
    zIndex: direction > 0 ? 2 : 1,
  }),
  exit: (direction: number) => ({
    x: direction > 0 ? '-22%' : '100%',
    zIndex: direction > 0 ? 1 : 2,
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
