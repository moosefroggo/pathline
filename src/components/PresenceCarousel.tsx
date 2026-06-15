import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { IconArrowRight, IconBolt, IconClock, IconMessageCircle } from '@tabler/icons-react'
import { Avatar } from './bits'
import type { Candidate } from '../data'

gsap.registerPlugin(Draggable, InertiaPlugin)

// Drag pixels per card step, and on-screen spacing between card centers.
const STEP = 150
const STEP_X = 124

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
  const displayTags = c.declared
    .filter((d) => {
      const loc = c.anonLocation.toLowerCase()
      const tag = d.toLowerCase()
      return !tag.includes(loc) && !(loc === 'remote' && tag === 'remote')
    })
    .map((d) => {
      if (d.includes('Series') || d.includes('Seed')) {
        return `Seeking ${d}`
      }
      return d
    })

  return (
    <div className="pl-glass flex w-full h-[272px] flex-col rounded-[22px] px-5 py-6">
      <div className="flex items-start gap-3">
        <Avatar locked size="sm" />
        <div className="min-w-0 leading-tight">
          <div className="truncate text-headline font-medium text-ink">{c.anonRole}</div>
          <div className="mt-1 whitespace-nowrap text-caption text-ink-3">{c.anonContext} · {c.anonLocation}</div>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-1.5 text-caption text-amber-700">
        <IconBolt size={14} stroke={1.8} className="mt-px shrink-0" />
        <span>{c.trigger}</span>
      </div>

      <div className="mt-5 border-t border-hairline" />

      <div className="mt-4 flex flex-wrap gap-1.5">
        {displayTags.map((d) => (
          <span key={d} className="pl-glass-soft rounded-md px-2.5 py-1 text-micro text-ink-3">
            {d}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4 flex items-center text-micro tabular-nums text-ink-3">
        <IconClock size={12} stroke={1.8} className="mr-1 shrink-0" />
        <span>{c.openedAgo}</span>
        <IconMessageCircle size={12} stroke={1.8} className="ml-auto mr-1 shrink-0" />
        <span>{c.repliesIn}</span>
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
  const ctaRef = useRef<HTMLDivElement>(null)
  const proxyRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<Draggable | null>(null)
  const posRef = useRef(0)
  const movedRef = useRef(false)
  const [active, setActive] = useState(0)
  const n = candidates.length

  // Wrap offset to [-n/2, n/2] so cards loop cyclically around center.
  const wrapOffset = (offset: number) =>
    ((offset % n) + n + n / 2) % n - n / 2

  const render = (pos: number) => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      applyTransform(el, wrapOffset(i - pos))
    })
  }

  const normalizeIndex = (raw: number) => ((Math.round(raw) % n) + n) % n

  const hasAnimated = useRef(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    render(0)

    // One-shot entrance on first mount: center card rises first, side cards fan out.
    if (!hasAnimated.current) {
      hasAnimated.current = true

      cardRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 28 })
      })
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, y: 10 })

      const tl = gsap.timeline({ delay: 0.12 })

      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const raw = ((i % n) + n + n / 2) % n - n / 2
        const dist = Math.abs(raw)
        const naturalOpacity = 1 - Math.min(dist * 0.42, 0.82)
        tl.to(el, { opacity: naturalOpacity, y: 0, duration: 0.72, ease: 'power3.out' }, dist * 0.09)
      })

      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.26)
    }

    const proxy = document.createElement('div')
    proxyRef.current = proxy

    const drag = Draggable.create(proxy, {
      type: 'x',
      trigger: stage,
      inertia: true,
      dragResistance: 0.18,
      maxDuration: 0.7,
      // No bounds — cyclic
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
        const idx = normalizeIndex(-this.x / STEP)
        // Re-anchor proxy so drift doesn't accumulate
        gsap.set(proxy, { x: -(posRef.current % n) * STEP })
        dragRef.current?.update()
        setActive(idx)
      },
      onDragEnd() {
        if (!this.tween || !this.tween.isActive()) {
          setActive(normalizeIndex(-this.x / STEP))
        }
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
    // Find shortest cyclic path from current position to target index.
    const cur = posRef.current
    const curMod = ((cur % n) + n) % n
    let delta = i - curMod
    if (delta > n / 2) delta -= n
    if (delta < -n / 2) delta += n
    const target = cur + delta

    const tweener = { p: cur }
    gsap.to(tweener, {
      p: target,
      duration: 0.55,
      ease: 'power3.out',
      onUpdate() {
        posRef.current = tweener.p
        render(tweener.p)
      },
      onComplete() {
        const normalized = ((target % n) + n) % n
        posRef.current = normalized
        const proxy = proxyRef.current
        if (proxy) {
          gsap.set(proxy, { x: -normalized * STEP })
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
    <div className="flex min-h-0 flex-1 flex-col justify-center gap-2">
      <div ref={stageRef} className="pl-carousel-stage relative h-[390px] touch-none select-none">
        {candidates.map((c, i) => (
          <div
            key={c.id}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="pl-carousel-card absolute top-[44%] left-1/2 w-[308px]"
            onClick={() => handleCard(i)}
          >
            <CardFace c={c} />
          </div>
        ))}
      </div>

      <div ref={ctaRef} className="flex flex-col items-center gap-2.5 px-4">
        <button
          type="button"
          onClick={() => onSelect(candidates[active])}
          className="pl-primary-action flex w-full items-center justify-center gap-1.5 rounded-[14px] py-3 text-subhead font-medium transition active:scale-[0.98]"
        >
          View profile <IconArrowRight size={16} stroke={1.8} />
        </button>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {candidates.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-4 bg-live' : 'w-1.5 bg-ink-4/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
