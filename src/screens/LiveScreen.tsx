import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  IconCalendar,
  IconCircleCheck,
  IconLockOpen,
  IconMicrophone,
  IconPhone,
  IconUser,
  IconVideo,
} from '@tabler/icons-react'
import { Avatar } from '../components/bits'
import { useTimeout } from '../lib/hooks'
import { recruiter, type Candidate } from '../data'
import { revealTransition, riseTransition, smoothEase } from '../lib/motion'
import { easeRange } from '../lib/workbench-walkthrough'

const WAVE = [10, 18, 26, 14, 22, 30, 16, 24, 12, 20, 9]
const scrub = { duration: 0 }

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
  progress,
  reduced = false,
}: {
  c: Candidate
  onBook: () => void
  onEnd: () => void
  progress?: number
  reduced?: boolean
}) {
  const guided = progress !== undefined
  const [callPhase, setCallPhase] = useState<'ringing' | 'live'>('ringing')
  const [elapsed, setElapsed] = useState(0)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const connect = guided ? easeRange(progress, .1, .38, reduced) : Number(callPhase === 'live')
  const identity = guided ? easeRange(progress, .23, .48, reduced) : 1
  const time = guided ? Math.max(0, (progress - .18) / .7) * 8000 : elapsed
  const showCaption = time >= 3400
  const showBook = time >= 7600
  const caption = guided ? easeRange(time, 2950, 4250, reduced) : Number(showCaption)
  const booking = guided ? easeRange(time, 6150, 7700, reduced) : Number(showBook)
  const signalTimes = [4400, 5600, Infinity, 6800]

  useTimeout(() => setCallPhase('live'), !guided && callPhase === 'ringing' ? 3200 : null)

  useEffect(() => {
    if (guided || callPhase !== 'live' || !navigator.mediaDevices?.getUserMedia) return

    let activeStream: MediaStream | null = null

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((mediaStream) => {
        activeStream = mediaStream
        setCameraStream(mediaStream)
      })
      .catch((err) => {
        console.warn('Camera preview access denied or unavailable:', err)
      })

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [guided, callPhase])

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream
    }
  }, [cameraStream])

  useEffect(() => {
    if (guided || callPhase !== 'live') return
    const timers = [3400, 4400, 5600, 6800, 7600].map((threshold) =>
      setTimeout(() => setElapsed(threshold), threshold)
    )
    return () => timers.forEach(clearTimeout)
  }, [guided, callPhase])

  return (
    <div className="flex flex-1 flex-col px-4 pb-5 text-white">
      <div className="grid justify-items-center pt-[46px] text-center">
        {(guided || callPhase === 'live') && (
          <motion.span
            initial={false}
            animate={{ opacity: connect }}
            transition={scrub}
            aria-hidden={connect < .5}
            className="pl-glass-pill col-start-1 row-start-1 inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-caption text-live-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-live" /> Live
          </motion.span>
        )}
        {(guided || callPhase === 'ringing') && (
          <motion.span
            initial={false}
            animate={{ opacity: 1 - connect }}
            transition={scrub}
            aria-hidden={connect >= .5}
            className="col-start-1 row-start-1 self-center text-label text-ink-4"
          >
            Connecting&hellip;
          </motion.span>
        )}
      </div>

      {/* self-view, tucked into the corner so it never collides with the reveal */}
      {connect > 0 && (
        <motion.div
          initial={false}
          animate={{ opacity: connect, y: guided && !reduced ? -6 * (1 - connect) : 0 }}
          transition={scrub}
          aria-hidden={connect < .5}
          className="absolute top-11 right-3 z-10 h-[108px] w-[80px] overflow-hidden rounded-2xl border border-hairline-strong shadow-[0_6px_20px_rgba(0,0,0,0.4)] bg-night"
        >
          {cameraStream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover scale-x-[-1]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-night-2/60 backdrop-blur-md">
              <Avatar initials={recruiter.initial} hue="coral" size="sm" />
            </div>
          )}
          <span className="absolute inset-x-0 bottom-0 bg-night/55 text-center text-micro leading-[13px] font-medium text-ink-2">
            You
          </span>
        </motion.div>
      )}

      <div className="flex flex-1 flex-col items-center pt-8 text-center">
        <div className="grid justify-items-center">
          <AnimatePresence mode={guided ? 'sync' : 'wait'}>
            {(guided || callPhase === 'ringing') && (
              <motion.div
                key="ring"
                initial={false}
                animate={{ opacity: 1 - connect }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={guided ? scrub : { duration: 0.5, ease: smoothEase }}
                aria-hidden={connect >= .5}
                className="relative col-start-1 row-start-1 flex h-[104px] items-center justify-center"
              >
                <span className="pl-ring absolute h-[104px] w-[104px] rounded-full bg-live-200" />
                <span className="pl-glass-soft flex h-[104px] w-[104px] items-center justify-center rounded-full text-ink-4">
                  <IconUser size={40} stroke={1.8} />
                </span>
              </motion.div>
            )}
            {(guided || callPhase === 'live') && (
              <motion.div
                key="live"
                initial={guided ? false : { opacity: 0, scale: 0.94, y: 8 }}
                animate={{ opacity: connect, scale: .94 + .06 * connect, y: 0 }}
                transition={guided ? scrub : revealTransition}
                aria-hidden={connect < .5}
                className="col-start-1 row-start-1 flex flex-col items-center"
              >
                <div className="relative flex items-center justify-center">
                  <motion.span
                    aria-hidden="true"
                    initial={guided ? false : { opacity: 0, scale: 0.74 }}
                    animate={{ opacity: identity, scale: .74 + .26 * identity }}
                    transition={guided ? scrub : { duration: 1.1, ease: smoothEase }}
                    className="pl-glow pointer-events-none absolute h-[210px] w-[210px] rounded-full"
                  />
                  <Avatar initials={c.initials} hue={c.hue} size="xl" />
                </div>
                <motion.span
                  initial={guided ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: identity, y: 6 * (1 - identity) }}
                  transition={guided ? scrub : { ...riseTransition, delay: 0.22 }}
                  className="pl-glass-pill mt-4 inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-micro text-ink"
                >
                  <IconLockOpen size={14} stroke={1.8} /> Revealed
                </motion.span>
                <motion.div
                  initial={guided ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: identity, y: 8 * (1 - identity) }}
                  transition={guided ? scrub : { ...riseTransition, delay: 0.34 }}
                  className="mt-2.5 font-serif text-[26px] font-medium text-white"
                >
                  {c.name}
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{ opacity: identity }}
                  transition={scrub}
                  className="mt-1 text-caption text-ink-3"
                >
                  {c.realRole}
                </motion.div>
                <motion.div initial={false} animate={{ opacity: identity }} transition={scrub} className="mt-5">
                  <Waveform />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {(guided || showCaption) && (
            <motion.div
              key="caption"
              exit={{ opacity: 0 }}
              initial={guided ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: caption, y: 8 * (1 - caption) }}
              transition={guided ? scrub : riseTransition}
              aria-hidden={caption < .5}
              className="mt-6 flex flex-col gap-2 w-full max-w-[260px]"
            >
              <div className="pl-glass rounded-2xl px-3.5 py-2.5 text-body leading-snug text-ink text-left">
                {c.liveLine}
              </div>
              <div className="pl-glass-soft flex flex-col gap-1.5 rounded-xl p-2.5 text-left border border-live/10">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-live-700">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live"></span>
                  </span>
                  <span>Live Signals</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {c.declared.map((intent, index) => {
                    const threshold = signalTimes[index] ?? Infinity
                    const signal = guided && Number.isFinite(threshold)
                      ? easeRange(time, threshold - 450, threshold + 450, reduced)
                      : Number(time >= threshold)
                    return (
                      <motion.span
                        key={intent}
                        initial={false}
                        animate={{
                          opacity: 0.28 + 0.72 * signal,
                          borderColor: `rgba(185, 228, 215, ${.06 + .24 * signal})`,
                          backgroundColor: `rgba(185, 228, 215, ${.1 * signal})`,
                        }}
                        transition={guided ? scrub : { duration: 0.35, ease: 'easeOut' }}
                        className="inline-flex items-center gap-1 rounded-[5px] border px-1.5 py-0.5 text-micro font-medium text-ink"
                      >
                        <IconCircleCheck
                          size={10}
                          stroke={2}
                          className="text-live-700"
                        />
                        {intent}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={guided ? false : { height: 0, opacity: 0, marginBottom: 0 }}
        animate={{
          height: guided || showBook ? 'auto' : 0,
          opacity: booking,
          y: guided ? 12 * (1 - booking) : 0,
          marginBottom: guided || showBook ? 16 : 0,
        }}
        transition={guided ? scrub : riseTransition}
        inert={booking < .5}
        className="w-full shrink-0 overflow-hidden"
      >
        <button
          type="button"
          onClick={onBook}
          className="pl-glass flex w-full items-center gap-2 rounded-xl px-3 py-2.5 transition active:scale-[0.98]"
        >
          <IconCalendar size={16} stroke={1.8} className="text-live-700" />
          <span className="text-body text-ink">Book 15 min · {c.bookSlot}</span>
          <span className="ml-auto text-caption font-medium text-live-700">Book</span>
        </button>
      </motion.div>

      <div className="flex items-center justify-center gap-[18px]">
        <span className="pl-glass-soft flex h-11 w-11 items-center justify-center rounded-full text-ink">
          <IconMicrophone size={20} stroke={1.8} />
        </span>
        <span className="pl-glass-soft flex h-11 w-11 items-center justify-center rounded-full text-ink">
          <IconVideo size={20} stroke={1.8} />
        </span>
        <button
          type="button"
          onClick={onEnd}
          aria-label="End the moment"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white shadow-[0_8px_20px_rgba(239,68,68,0.4)] transition active:scale-95"
        >
          <IconPhone size={20} stroke={1.8} className="rotate-[135deg]" />
        </button>
      </div>
    </div>
  )
}
