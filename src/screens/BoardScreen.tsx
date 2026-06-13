import { motion } from 'framer-motion'
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

function Card({ c, onSelect, index }: { c: Candidate; onSelect: () => void; index: number }) {
  const { label } = useCountdown(c.windowSecs)
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.06 * index, type: 'spring', stiffness: 280, damping: 28 }}
      className="w-full rounded-2xl bg-surface p-3 text-left transition active:scale-[0.98]"
    >
      <div className="flex items-center gap-2.5">
        <Avatar locked size="sm" />
        <div className="leading-tight">
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
            {c.anonRole}
            <span className="flex items-center gap-0.5 text-[10px] font-normal text-ink-3">
              <IconLock size={10} stroke={1.8} /> name locked
            </span>
          </div>
          <div className="text-[11px] text-ink-2">{c.anonContext}</div>
        </div>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-live-700">
          <LiveDot /> active
        </span>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <span className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-[3px] text-[10px] text-amber-700">
          <IconCircleCheck size={11} stroke={1.9} /> {c.trigger}
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-2.5 text-[11px] text-ink-2">
        <span className="flex items-center gap-1">
          <IconClock size={12} stroke={1.8} /> {label} left
        </span>
        <span>· replies {c.repliesIn}</span>
        <span className="ml-auto flex items-center gap-1 text-live-700">
          <IconCircleCheck size={12} stroke={1.9} /> opted in
        </span>
      </div>
    </motion.button>
  )
}

export function BoardScreen({ onSelect }: { onSelect: (c: Candidate) => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2">
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[7px] bg-coral text-white">
            <IconLeaf size={14} stroke={2} />
          </span>
          <span className="text-[17px] font-medium text-ink">Moments</span>
          <span className="ml-auto">
            <Avatar initials={recruiter.initial} hue="coral" size="xs" />
          </span>
        </div>
        <div className="mt-2 text-[12px] text-ink-2">
          {recruiter.role} · {recruiter.company}
        </div>
        <div className="mt-2.5 flex items-baseline gap-1.5">
          <span className="text-[15px] font-medium text-live-700">
            {openMomentsCount} open moments
          </span>
          <span className="text-[11px] text-ink-3">
            right now · vs {atsBacklog} in your ATS
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2.5 px-4 pb-4">
        {candidates.map((c, i) => (
          <Card key={c.id} c={c} index={i} onSelect={() => onSelect(c)} />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-around border-t border-hairline-strong px-2 pt-2.5 pb-3 text-ink-3">
        <IconBolt size={22} stroke={1.8} className="text-coral" />
        <IconBriefcase size={22} stroke={1.8} />
        <IconMessageCircle size={22} stroke={1.8} />
        <IconUser size={22} stroke={1.8} />
      </div>
    </div>
  )
}
