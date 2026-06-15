import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { IconBolt, IconClock } from '@tabler/icons-react'
import { Avatar, LiveDot } from './bits'
import type { Candidate } from '../data'

gsap.registerPlugin(Draggable, InertiaPlugin)

// Drag pixels per card step, and on-screen spacing between card centers.
const STEP = 150
const STEP_X = 92

function applyTransform(el: HTMLElement, offset: number) {
  const dist = Math.abs(offset)
  gsap.set(el, {
    xPercent: -50,
    yPercent: -50,
    x: offset * STEP_X,
    rotateY: gsap.utils.clamp(-52, 52, offset * -34),
    z: -dist * 150,
    scale: 1 - Math.min(dist * 0.12, 0.36),
    opacity: 1 - Math.min(dist * 0.42, 0.82),
    filter: `blur(${Math.min(dist * 2.4, 6).toFixed(2)}px)`,
    zIndex: 200 - Math.round(dist * 10),
  })
}

function CardFace({ c }: { c: Candidate }) {
  return (
    <div className="pl-glass flex w-full flex-col rounded-[20px] p-3.5">
      <div className="flex items-center gap-2.5">
        <Avatar locked size="sm" />
        <div className="min-w-0 leading-tight">
          <div className="truncate text-body font-medium text-ink">{c.anonRole}</div>
          <div className="whitespace-nowrap text-caption text-ink-2">{c.anonContext}</div>
        </div>
        <span className="ml-auto flex shrink-0 items-center gap-1 text-micro font-medium text-live-700">
          <LiveDot pulse={false} /> now
        </span>
      </div>

      <div className="mt-3 flex items-start gap-1.5 text-caption text-amber-700">
        <IconBolt size={14} stroke={1.8} className="mt-px shrink-0" />
        <span>{c.trigger}</span>
      </div>

      <div className="mt-1.5 flex items-center gap-1.5 text-micro tabular-nums text-ink-3">
        <IconClock size={14} stroke={1.8} className="shrink-0" />
        {c.openedAgo}
      </div>
    </div>
  )
}

export function PresenceCarousel({
  candidates,
  onSelect,
}: {
  candidates: Candidate[]
  onSelect: (c: Candidate) => void
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const proxyRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<Draggable | null>(null)
  const posRef = useRef(0)
  const movedRef = useRef(false)
  const [active, setActive] = useState(0)
  const n = candidates.length

  const render = (pos: number) => {
    cardRefs.current.forEach((el, i) => el && applyTransform(el, i - pos))
  }

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    render(0)

    const proxy = document.createElement('div')
    proxyRef.current = proxy

    const drag = Draggable.create(proxy, {
      type: 'x',
      trigger: stage,
      inertia: true,
      dragResistance: 0.18,
      maxDuration: 0.7,
      bounds: { minX: -(n - 1) * STEP, maxX: 0 },
      snap: (value) => Math.round(value / STEP) * STEP,
      onPress() {
        movedRef.current = false
        gsap.killTweensOf(proxy)
      },
      onDrag() {
        movedRef.current = true
        posRef.current = -this.x / STEP
        render(posRef.current)
      },
      onThrowUpdate() {
        posRef.current = -this.x / STEP
        render(posRef.current)
      },
      onThrowComplete() {
        setActive(Math.round(-this.x / STEP))
      },
      onDragEnd() {
        if (!this.tween || !this.tween.isActive()) setActive(Math.round(-this.x / STEP))
      },
    })[0]
    dragRef.current = drag

    return () => {
      drag.kill()
      proxyRef.current = null
      dragRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n])

  function goTo(i: number) {
    const tweener = { p: posRef.current }
    gsap.to(tweener, {
      p: i,
      duration: 0.55,
      ease: 'power3.out',
      onUpdate() {
        posRef.current = tweener.p
        render(tweener.p)
      },
      onComplete() {
        const proxy = proxyRef.current
        if (proxy) {
          gsap.set(proxy, { x: -i * STEP })
          dragRef.current?.update()
        }
        setActive(i)
      },
    })
  }

  function handleCard(i: number) {
    if (movedRef.current) return
    if (i === active) onSelect(candidates[i])
    else goTo(i)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={stageRef} className="pl-carousel-stage relative flex-1 touch-none select-none">
        {candidates.map((c, i) => (
          <div
            key={c.id}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="pl-carousel-card absolute top-[46%] left-1/2 w-[256px]"
            onClick={() => handleCard(i)}
          >
            <CardFace c={c} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5" aria-hidden="true">
        {candidates.map((c, i) => (
          <span
            key={c.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-4 bg-live' : 'w-1.5 bg-ink-4/50'
            }`}
          />
        ))}
      </div>
      <div className="pb-3 pt-2 text-center text-micro text-ink-4">Swipe to browse · tap to open</div>
    </div>
  )
}
