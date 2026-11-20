import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { screenStackVariants, smoothEase } from '../lib/motion'
import { type WalkthroughScreen, walkthrough } from '../lib/workbench-walkthrough'

const easing = `cubic-bezier(${smoothEase.join(',')})`

function layerKeyframe(pose: ReturnType<typeof screenStackVariants.enter> | ReturnType<typeof screenStackVariants.center> | ReturnType<typeof screenStackVariants.exit>) {
  const { x = 0, y = 0, scale = 1, opacity = 1, filter = 'blur(0px)' } = pose as {
    x?: number | string; y?: number; scale?: number; opacity?: number; filter?: string
  }
  return { transform: `translate(${typeof x === 'number' ? x + 'px' : x}, ${y}px) scale(${scale})`, opacity, filter }
}

function TransitionLayer({ from, to, progress, interactive, children }: {
  from: Keyframe
  to: Keyframe
  progress: number
  interactive: boolean
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const animation = useRef<Animation | undefined>(undefined)
  useLayoutEffect(() => {
    const track = ref.current?.animate([{ ...from, easing }, to], { duration: 1000, fill: 'both' })
    track?.pause()
    animation.current = track
    return () => track?.cancel()
  }, [from, to])
  useLayoutEffect(() => {
    if (animation.current) animation.current.currentTime = progress * 1000
  }, [from, to, progress])
  return <div ref={ref} inert={!interactive} className="absolute inset-0 flex min-h-0 flex-col">{children}</div>
}

const rest = layerKeyframe(screenStackVariants.center())
const poses = walkthrough.map(({ motion }) => {
  const direction = { direction: 1, motion }
  return {
    enter: layerKeyframe(screenStackVariants.enter(direction)),
    exit: layerKeyframe(screenStackVariants.exit(direction)),
  }
})

export function WorkbenchWalkthrough({ progress, reduced, render }: {
  progress: number
  reduced: boolean
  render: (screen: WalkthroughScreen, progress: number) => ReactNode
}) {
  const index = Math.max(0, walkthrough.findLastIndex((step) => progress >= step.start))
  const step = walkthrough[index]
  const previous = walkthrough[index - 1]
  const next = walkthrough[index + 1]
  const transition = previous && !reduced ? Math.min(1, (progress - step.start) / step.transition) : 1
  const beat = Math.max(0, Math.min(1, (progress - step.start - step.transition) / ((next?.start ?? 1) - step.start - step.transition)))
  return (
    <div className="absolute inset-0 overflow-hidden" data-workbench-screen={step.screen}>
      {previous && transition < 1 && (
        <TransitionLayer key={previous.screen} from={rest} to={poses[index].exit} progress={transition} interactive={false}>
          {render(previous.screen, 1)}
        </TransitionLayer>
      )}
      <TransitionLayer key={step.screen} from={poses[index].enter} to={rest} progress={transition} interactive={transition >= .65}>
        {render(step.screen, beat)}
      </TransitionLayer>
    </div>
  )
}
