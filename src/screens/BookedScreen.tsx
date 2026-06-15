import { motion } from 'framer-motion'
import { IconCalendarCheck, IconCircleCheck, IconRotate } from '@tabler/icons-react'
import { Avatar } from '../components/bits'
import type { Candidate } from '../data'
import { revealTransition } from '../lib/motion'

export function BookedScreen({ c, onRestart }: { c: Candidate; onRestart: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center px-5 pb-6 text-center">
      <div className="flex flex-1 flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.86, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...revealTransition, delay: 0.18 }}
          className="relative"
        >
          <Avatar initials={c.initials} hue={c.hue} size="lg" />
          <span className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-live text-live-900">
            <IconCircleCheck size={18} stroke={2} />
          </span>
        </motion.div>

        <div className="mt-4 text-[18px] font-medium text-ink">Connected with {c.name}</div>
        <div className="pl-glass-pill mt-2 flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] text-ink">
          <IconCalendarCheck size={16} stroke={1.8} className="text-live-700" /> Booked · {c.bookSlot}
        </div>

        <div className="pl-glass mt-6 w-full rounded-2xl px-4 py-3.5">
          <div className="text-[13px] leading-relaxed text-ink">
            Connection made in ~4 min.
          </div>
          <div className="mt-1 text-[12px] text-ink-4">
            Industry average: 75% of applicants never hear back.
          </div>
        </div>
        <div className="mt-3 text-[12px] text-ink-3">No cold outreach · no resume skim</div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="pl-glass flex w-full items-center justify-center gap-1.5 rounded-[14px] py-3 text-[13px] font-medium text-ink transition active:scale-[0.98]"
      >
        <IconRotate size={15} stroke={1.8} /> Replay demo
      </button>
    </div>
  )
}
