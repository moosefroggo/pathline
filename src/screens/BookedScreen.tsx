import { motion } from 'framer-motion'
import { IconCalendarCheck, IconCircleCheck, IconRotate } from '@tabler/icons-react'
import { Avatar } from '../components/bits'
import type { Candidate } from '../data'
import { revealTransition } from '../lib/motion'

export function BookedScreen({ c, onRestart }: { c: Candidate; onRestart: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center px-5 pt-8 pb-6 text-center">
      <div className="flex flex-1 flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.86, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...revealTransition, delay: 0.18 }}
          className="relative"
        >
          <Avatar initials={c.initials} hue={c.hue} size="lg" />
          <span className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-live text-live-900">
            <IconCircleCheck size={16} stroke={1.8} />
          </span>
        </motion.div>

        <div className="mt-4 text-headline font-medium text-ink">Connected with {c.name}</div>
        <div className="pl-glass-pill mt-2 flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-body text-ink">
          <IconCalendarCheck size={16} stroke={1.8} className="text-live-700" /> Booked · {c.bookSlot}
        </div>

        <div className="pl-glass mt-6 w-full rounded-2xl p-4">
          <div className="text-micro font-semibold uppercase tracking-wider text-ink-3 text-center">
            Your connection performance
          </div>

          {/* Proper vertical column chart */}
          <div className="relative mt-5 flex h-24 items-end justify-around px-8 pb-1" aria-hidden="true">
            {/* Grid lines in the background */}
            <div className="absolute inset-x-0 top-0 border-t border-dashed border-hairline/25" />
            <div className="absolute inset-x-0 top-[33%] border-t border-dashed border-hairline/25" />
            <div className="absolute inset-x-0 top-[66%] border-t border-dashed border-hairline/25" />

            {/* You Column */}
            <div className="z-10 flex flex-col items-center gap-1.5 w-12">
              <span className="text-caption font-bold text-live-700">4m</span>
              <div className="h-4 w-6 rounded-t-md bg-live shadow-[0_0_12px_rgba(118,185,168,0.4)]" />
            </div>

            {/* Average Column */}
            <div className="z-10 flex flex-col items-center gap-1.5 w-12">
              <span className="text-caption font-semibold text-ink-4">20m</span>
              <div className="h-20 w-6 rounded-t-md bg-ink-4/30" />
            </div>
          </div>

          {/* Chart Baseline */}
          <div className="border-t border-hairline mx-4" />

          {/* Chart Labels */}
          <div className="mt-2 flex justify-around px-4 text-center text-micro text-ink-3">
            <div className="w-20 font-medium text-ink-2">You (Dana)</div>
            <div className="w-20">Avg Recruiter</div>
          </div>

          <div className="mt-5 border-t border-hairline pt-3.5 text-center text-caption leading-normal text-ink-3">
            You connected <strong className="font-semibold text-live-700">80% faster</strong> than the average recruiter on Pathline today.
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="pl-glass flex w-full items-center justify-center gap-1.5 rounded-[14px] py-3 text-body font-medium text-ink transition active:scale-[0.98]"
      >
        <IconRotate size={16} stroke={1.8} /> Replay demo
      </button>
    </div>
  )
}
