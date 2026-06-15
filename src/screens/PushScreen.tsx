import { motion } from 'framer-motion'
import { IconChevronUp, IconLeaf } from '@tabler/icons-react'
import { LiveDot } from '../components/bits'
import { recruiter } from '../data'
import { riseTransition } from '../lib/motion'

export function PushScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-1 flex-col px-3 pb-6">
      <div className="pt-9 text-center">
        <div className="text-[13px] text-ink-2">Friday, June 12</div>
        <div className="text-[64px] leading-none font-medium text-ink">9:41</div>
      </div>

      <motion.button
        type="button"
        onClick={onOpen}
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...riseTransition, delay: 0.18 }}
        className="pl-glass-panel mt-10 w-full rounded-[20px] p-3.5 text-left transition active:scale-[0.98]"
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="pl-glass-soft flex h-5 w-5 items-center justify-center rounded-md text-live-700">
            <IconLeaf size={13} stroke={2} />
          </span>
          <span className="text-[11px] tracking-wide text-ink-2">pathline</span>
          <span className="ml-auto text-[11px] text-ink-3">now</span>
        </div>
        <div className="text-[15px] font-medium text-ink">A Senior PM just opened a moment</div>
        <div className="mt-1 flex items-center gap-1.5 text-[12px] text-ink-2">
          <LiveDot />
          Active now · for your {recruiter.role} role
        </div>
      </motion.button>

      <div className="mt-auto flex flex-col items-center gap-1 pt-8 text-ink-3">
        <IconChevronUp size={16} stroke={2} />
        <span className="text-[11px]">tap to open</span>
      </div>
    </div>
  )
}
