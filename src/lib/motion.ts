export const smoothEase = [0.32, 0.72, 0, 1] as const

export const screenTransition = {
  duration: 0.42,
  ease: smoothEase,
}

/**
 * iOS UINavigationController push/pop.
 * The foreground screen owns the full-width slide and stays fully opaque; the
 * screen behind it parallaxes a short distance and dims, so the stack reads as
 * one decisive navigation — never two screens cross-fading through each other.
 * zIndex is derived from `direction` so it stays constant for the lifetime of
 * each screen (never animated), keeping the layering correct on both push & pop.
 */
export const screenStackVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-26%',
    opacity: direction > 0 ? 1 : 0.5,
    zIndex: direction > 0 ? 2 : 1,
  }),
  center: (direction: number) => ({
    x: '0%',
    opacity: 1,
    zIndex: direction > 0 ? 2 : 1,
  }),
  exit: (direction: number) => ({
    x: direction > 0 ? '-26%' : '100%',
    opacity: direction > 0 ? 0.5 : 1,
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
