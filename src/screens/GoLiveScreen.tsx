import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconBolt, IconLock, IconMicrophone, IconUser, IconVideo } from '@tabler/icons-react'
import { LiveDot } from '../components/bits'
import type { Candidate } from '../data'

export function GoLiveScreen({
  c,
  onStart,
  onBack,
}: {
  c: Candidate
  onStart: () => void
  onBack: () => void
}) {
  const [mode, setMode] = useState<'audio' | 'video'>('audio')
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-1 flex-col px-5 pb-6"
    >
      <div className="flex flex-1 flex-col items-center pt-9 text-center">
        <div className="mb-5 flex items-center gap-1.5 text-[12px] text-live-700">
          <LiveDot /> You&rsquo;re both here, right now
        </div>

        <div className="relative flex items-center justify-center">
          <span className="pl-ring absolute h-24 w-24 rounded-full bg-coral-200" />
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-hairline-strong text-ink-3">
            <IconUser size={40} stroke={1.5} />
          </span>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-[17px] font-medium text-ink">
          {c.anonRole} <IconLock size={13} stroke={1.8} className="text-ink-3" />
        </div>
        <div className="mt-1 text-[12px] text-ink-2">Active now · open for ~12 more min</div>

        <div className="mt-5 inline-flex gap-1.5 rounded-[10px] bg-surface p-1">
          <button
            type="button"
            onClick={() => setMode('audio')}
            className={`flex items-center gap-1.5 rounded-[7px] px-3 py-1.5 text-[12px] transition ${
              mode === 'audio' ? 'bg-coral-50 text-coral-900' : 'text-ink-3'
            }`}
          >
            <IconMicrophone size={13} stroke={1.8} /> Audio
          </button>
          <button
            type="button"
            onClick={() => setMode('video')}
            className={`flex items-center gap-1.5 rounded-[7px] px-3 py-1.5 text-[12px] transition ${
              mode === 'video' ? 'bg-coral-50 text-coral-900' : 'text-ink-3'
            }`}
          >
            <IconVideo size={13} stroke={1.8} /> Video
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="flex w-full items-center justify-center gap-1.5 rounded-[14px] bg-coral py-3.5 text-[15px] font-medium text-white transition active:scale-[0.98]"
      >
        <IconBolt size={16} stroke={2} /> Start live moment · 2 min
      </button>
      <button
        type="button"
        onClick={onBack}
        className="mt-3 text-center text-[12px] text-ink-2"
      >
        Send a message instead
      </button>
      <div className="mt-4 text-center text-[10px] leading-relaxed text-ink-3">
        Unscripted. No prep. You talk to the real person — that&rsquo;s the point.
      </div>
    </motion.div>
  )
}
