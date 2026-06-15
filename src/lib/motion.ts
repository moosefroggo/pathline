export const smoothEase = [0.32, 0.72, 0, 1] as const

export const screenTransition = {
  duration: 0.42,
  ease: smoothEase,
}

export type ScreenMotion =
  | 'open'
  | 'drill'
  | 'return'
  | 'commit'
  | 'connect'
  | 'complete'
  | 'reset'

type ScreenMotionState = {
  direction: number
  motion: ScreenMotion
}

const motionBase = {
  zIndex: 2,
  filter: 'blur(0px)',
}

export const screenStackVariants = {
  enter: ({ direction, motion }: ScreenMotionState) => {
    if (motion === 'open') return { ...motionBase, opacity: 0, scale: 0.96, y: 26 }
    if (motion === 'drill') return { ...motionBase, opacity: 0, scale: 1.025, x: 18 }
    if (motion === 'return') return { ...motionBase, opacity: 0, scale: 0.985, x: direction > 0 ? 18 : -18 }
    if (motion === 'commit') return { ...motionBase, opacity: 0, scale: 0.96, y: 42 }
    if (motion === 'connect') return { ...motionBase, opacity: 0, scale: 1.04, filter: 'blur(12px)' }
    if (motion === 'complete') return { ...motionBase, opacity: 0, scale: 0.92, y: 34 }
    if (motion === 'reset') return { ...motionBase, opacity: 0, scale: 0.98, y: -24 }
    return { ...motionBase, opacity: 0, x: direction > 0 ? '100%' : '-22%' }
  },
  center: () => ({
    ...motionBase,
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  }),
  exit: ({ direction, motion }: ScreenMotionState) => {
    if (motion === 'open') return { zIndex: 1, opacity: 0, scale: 1.015, y: -18 }
    if (motion === 'drill') return { zIndex: 1, opacity: 0, scale: 0.965, x: -16 }
    if (motion === 'return') return { zIndex: 1, opacity: 0, scale: 1.015, x: direction > 0 ? -18 : 18 }
    if (motion === 'commit') return { zIndex: 1, opacity: 0, scale: 0.965, y: -22 }
    if (motion === 'connect') return { zIndex: 1, opacity: 0, scale: 0.9, filter: 'blur(10px)' }
    if (motion === 'complete') return { zIndex: 1, opacity: 0, scale: 1.03, y: -30 }
    if (motion === 'reset') return { zIndex: 1, opacity: 0, scale: 0.96, y: 30 }
    return { zIndex: direction > 0 ? 1 : 2, opacity: 1, x: direction > 0 ? '-22%' : '100%' }
  },
}

export const screenMotionTransitions: Record<ScreenMotion, typeof screenTransition> = {
  open: { duration: 0.56, ease: smoothEase },
  drill: { duration: 0.42, ease: smoothEase },
  return: { duration: 0.38, ease: smoothEase },
  commit: { duration: 0.52, ease: smoothEase },
  connect: { duration: 0.72, ease: smoothEase },
  complete: { duration: 0.62, ease: smoothEase },
  reset: { duration: 0.5, ease: smoothEase },
}

export const riseTransition = {
  duration: 0.5,
  ease: smoothEase,
}

export const revealTransition = {
  duration: 0.78,
  ease: smoothEase,
}
