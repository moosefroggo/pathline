import {
  IconBolt,
  IconBriefcase,
  IconCircleCheck,
  IconClock,
  IconLeaf,
  IconLock,
  IconMessageCircle,
  IconUser,
} from '@tabler/icons-react'
import { Avatar, LiveDot } from '../components/bits'
import { useCountdown } from '../lib/hooks'
import { atsBacklog, candidates, openMomentsCount, recruiter, type Candidate } from '../data'

function Card({ c, onSelect }: { c: Candidate; onSelect: () => void }) {
  const { label, expired } = useCountdown(c.windowSecs)

  if (expired) {
    return (
      <div className="pl-glass w-full rounded-2xl p-3 text-left opacity-60">
        <div className="flex items-center gap-2.5">
          <Avatar locked size="sm" />
          <div className="leading-tight">
            <div className="text-body font-medium text-ink-3">{c.anonRole}</div>
            <div className="text-caption text-ink-4">{c.anonContext}</div>
          </div>
          <span className="ml-auto text-micro text-ink-4">window closed</span>
        </div>
        <div className="mt-2.5 flex items-center gap-1 text-caption text-ink-4">
          <IconClock size={12} stroke={1.8} /> this moment just passed, be quicker next time
        </div>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className="pl-glass w-full rounded-2xl p-3 text-left transition active:scale-[0.98]"
    >
      <div className="flex items-center gap-2.5">
        <Avatar locked size="sm" />
        <div className="leading-tight">
          <div className="flex items-center gap-1.5 text-body font-medium text-ink">
            {c.anonRole}
            <span className="flex items-center gap-0.5 text-micro font-normal text-ink-3">
              <IconLock size={10} stroke={1.8} /> name locked
            </span>
          </div>
          <div className="text-caption text-ink-2">{c.anonContext}</div>
        </div>
        <span className="ml-auto flex items-center gap-1 text-micro font-medium text-live-700">
          <LiveDot /> active
        </span>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <span className="pl-glass-pill flex items-center gap-1 rounded-md px-2 py-[3px] text-micro text-amber-700">
          <IconBolt size={11} stroke={1.9} /> {c.trigger}
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-2.5 text-caption text-ink-2">
        <span className="flex items-center gap-1 tabular-nums">
          <IconClock size={12} stroke={1.8} /> closes in {label}
        </span>
        <span>· replies {c.repliesIn}</span>
        <span className="ml-auto flex items-center gap-1 text-ink-3">
          <IconCircleCheck size={12} stroke={1.9} /> opted in
        </span>
      </div>
    </button>
  )
}

export function BoardScreen({ onSelect }: { onSelect: (c: Candidate) => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2">
          <span className="pl-glass-soft flex h-[22px] w-[22px] items-center justify-center rounded-[7px] text-live-700">
            <IconLeaf size={14} stroke={2} />
          </span>
          <span className="text-headline font-medium text-ink">Moments</span>
          <span className="ml-auto">
            <Avatar initials={recruiter.initial} hue="coral" size="xs" />
          </span>
        </div>
        <div className="mt-2 text-label text-ink-2">
          {recruiter.role} · {recruiter.company}
        </div>
        <div className="mt-2.5 flex items-baseline gap-1.5">
          <span className="font-serif text-[19px] font-medium text-live-700">
            {openMomentsCount} open moments
          </span>
          <span className="text-caption text-ink-3">right now · vs {atsBacklog} in your ATS</span>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2.5 px-4 pb-4">
        {candidates.map((c) => (
          <Card key={c.id} c={c} onSelect={() => onSelect(c)} />
        ))}
      </div>

      <div className="pl-bottom-glass mt-auto flex items-center justify-around border-t border-hairline-strong px-2 pt-2.5 pb-3 text-ink-3">
        <IconBolt size={22} stroke={1.8} className="text-live-700" aria-label="Moments" />
        <IconBriefcase size={22} stroke={1.8} aria-label="Roles" />
        <IconMessageCircle size={22} stroke={1.8} aria-label="Messages" />
        <IconUser size={22} stroke={1.8} aria-label="You" />
      </div>
    </div>
  )
}
