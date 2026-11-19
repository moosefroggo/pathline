import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { PathlineMark } from '../components/PathlineMark'
import { smoothEase } from '../lib/motion'

const easing = `cubic-bezier(${smoothEase.join(',')})`
const easeFrom = (opacity: number, transform: string) => ({ opacity, transform, easing })

function seek(animation: Animation, progress: number, from: number, to: number) {
  animation.currentTime = 1000 * Math.min(1, Math.max(0, (progress - from) / (to - from)))
}

export function WorkbenchIntro({
  progress,
  reduced,
  children,
}: {
  progress: number
  reduced: boolean
  children: ReactNode
}) {
  const splash = useRef<HTMLElement>(null)
  const brand = useRef<HTMLDivElement>(null)
  const tagline = useRef<HTMLParagraphElement>(null)
  const lockScreen = useRef<HTMLDivElement>(null)
  const animations = useRef<Animation[]>([])
  const ready = progress === 1
  const showSplash = reduced ? progress < .78 : progress < .94

  useLayoutEffect(() => {
    if (!brand.current || !tagline.current || !splash.current || !lockScreen.current) return
    const options = { duration: 1000, fill: 'both' } as const
    const atRest = { opacity: 1, transform: 'none' }
    const tracks = [
      brand.current.animate([easeFrom(0, 'translateY(14px) scale(.96)'), atRest], options),
      tagline.current.animate([easeFrom(0, 'translateY(10px)'), atRest], options),
      splash.current.animate([easeFrom(1, 'none'), { opacity: 0, transform: 'translateY(-18px) scale(1.015)' }], options),
      lockScreen.current.animate([easeFrom(0, 'translateY(26px) scale(.96)'), atRest], options),
    ]
    tracks.forEach((track) => track.pause())
    animations.current = tracks
    return () => tracks.forEach((track) => track.cancel())
  }, [])

  useLayoutEffect(() => {
    const [mark, copy, exit, reveal] = animations.current
    if (!mark || !copy || !exit || !reveal) return
    if (reduced) {
      mark.currentTime = copy.currentTime = 1000
      exit.currentTime = reveal.currentTime = showSplash ? 0 : 1000
      return
    }
    seek(mark, progress, 0, .23)
    seek(copy, progress, .16, .36)
    seek(exit, progress, .64, .94)
    seek(reveal, progress, .70, .99)
  }, [progress, reduced, showSplash])

  return (
    <>
      <div ref={lockScreen} className="absolute inset-0" inert={!ready}>{children}</div>
      <section
        ref={splash}
        aria-label="About Pathline"
        hidden={!showSplash}
        className="pl-phone-surface pointer-events-none absolute inset-0 z-10 grid place-items-center px-7 text-center"
      >
        <div className="-mt-5 flex flex-col items-center gap-4">
          <div ref={brand} className="flex flex-col items-center gap-4">
            <PathlineMark size="splash" />
            <h1 className="font-serif text-[46px] leading-none font-medium tracking-[-.045em] text-ink">Pathline</h1>
          </div>
          <p ref={tagline} className="max-w-[24ch] text-subhead leading-relaxed text-ink-2 text-balance">
            Find the top 0.1% talent that doesn&apos;t apply
          </p>
        </div>
      </section>
    </>
  )
}
