import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  IconCalendar,
  IconLockOpen,
  IconMicrophone,
  IconPhoneOff,
  IconUser,
  IconVideo,
} from '@tabler/icons-react'
import { Avatar } from '../components/bits'
import { useStopwatch, useTimeout } from '../lib/hooks'
import type { Candidate } from '../data'

const WAVE = [10, 18, 26, 14, 22, 30, 16, 24, 12, 20, 9]

function Waveform() {
  return (
    <div className="flex h-8 items-center justify-center gap-[3px]" aria-hidden="true">
      {WAVE.map((h, i) => (
        <span
          key={i}
          className={`pl-wave-bar w-[3px] rounded-full bg-live-400 ${
            h >= 26 ? 'h-8' : h >= 20 ? 'h-6' : h >= 14 ? 'h-4' : 'h-2.5'
          }`}
        />
      ))}
    </div>
  )
}

export function LiveScreen({
  c,
  onBook,
  onEnd,
}: {
  c: Candidate
  onBook: () => void
  onEnd: () => void
}) {
  const [phase, setPhase] = useState<'ringing' | 'live'>('ringing')
  const [showCaption, setShowCaption] = useState(false)
  const [showBook, setShowBook] = useState(false)
  const { label } = useStopwatch(phase === 'live')

  useTimeout(() => setPhase('live'), phase === 'ringing' ? 2000 : null)

  useEffect(() => {
    if (phase !== 'live') return
    const t1 = setTimeout(() => setShowCaption(true), 2200)
    const t2 = setTimeout(() => setShowBook(true), 4800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [phase])

  return (
    <div className="flex flex-1 flex-col px-4 pb-5 text-white">
      <div className="flex items-center justify-center pt-3.5 text-center">
        {phase === 'live' ? (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-live/20 px-3 py-1 text-caption text-live-200">
            <span className="h-1.5 w-1.5 rounded-full bg-live" /> Live · {label}
          </span>
        ) : (
          <span className="text-label text-ink-4">Connecting&hellip;</span>
        )}
      </div>

      {/* self-view, tucked into the corner so it never collides with the reveal */}
      {phase === 'live' && (
        <div className="absolute top-3 right-3 z-10 flex h-[58px] w-[44px] flex-col items-center justify-center gap-1 rounded-xl border border-white/15 bg-night-2 text-ink-4">
          <IconVideo size={14} stroke={1.6} />
          <span className="text-micro">You</span>
        </div>
      )}

      <div className="flex flex-1 flex-col items-center pt-8 text-center">
        <AnimatePresence mode="wait">
          {phase === 'ringing' ? (
            <motion.div
              key="ring"
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative flex items-center justify-center"
            >
              <span className="pl-ring absolute h-[104px] w-[104px] rounded-full bg-coral-200" />
              <span className="flex h-[104px] w-[104px] items-center justify-center rounded-full bg-night-2 text-ink-4">
                <IconUser size={44} stroke={1.4} />
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="live"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="flex flex-col items-center"
            >
              <div className="relative flex items-center justify-center">
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="pl-glow pointer-events-none absolute h-[210px] w-[210px] rounded-full"
                />
                <Avatar initials={c.initials} hue={c.hue} size="xl" />
              </div>
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-4 inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1 text-micro text-[#f1efe8]"
              >
                <IconLockOpen size={11} stroke={1.9} /> Identity unlocked
              </motion.span>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-2.5 font-serif text-[26px] font-medium text-white"
              >
                {c.name}
              </motion.div>
              <div className="mt-1 text-label text-[#cfcdc6]">{c.realRole}</div>
              <div className="mt-5">
                <Waveform />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCaption && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 max-w-[260px] rounded-2xl bg-white/95 px-3.5 py-2.5 text-body leading-snug text-ink"
            >
              &ldquo;{c.liveLine}&rdquo;
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showBook && (
          <motion.button
            type="button"
            onClick={onBook}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex w-full items-center gap-2 rounded-xl bg-white/95 px-3 py-2.5 transition active:scale-[0.98]"
          >
            <IconCalendar size={16} stroke={1.8} className="text-live-700" />
            <span className="text-body text-ink">Book 15 min · {c.bookSlot}</span>
            <span className="ml-auto text-caption font-medium text-live-700">Add</span>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center gap-[18px]">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-night-2 text-[#f1efe8]">
          <IconMicrophone size={18} stroke={1.8} />
        </span>
        <button
          type="button"
          onClick={onEnd}
          aria-label="End the moment"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e24b4a] text-white transition active:scale-95"
        >
          <IconPhoneOff size={18} stroke={1.8} />
        </button>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-night-2 text-[#f1efe8]">
          <IconVideo size={18} stroke={1.8} />
        </span>
      </div>
    </div>
  )
}
