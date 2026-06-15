import { useState } from 'react'
import {
  IconBolt,
  IconChevronLeft,
  IconLock,
  IconMessageCircle,
  IconMicrophone,
  IconUser,
  IconVideo,
} from '@tabler/icons-react'
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
    <div className="flex flex-1 flex-col px-5 pb-6">
      <div className="pt-2.5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-0.5 text-body text-ink-2 transition active:scale-95"
        >
          <IconChevronLeft size={16} stroke={1.8} /> Back
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center pt-5 text-center">
        <div className="mb-5 flex items-center gap-1.5 text-caption text-live-700">
          <LiveDot pulse={false} /> You&rsquo;re both here
        </div>

        <div className="relative">
          <span className="pl-glass-soft flex h-24 w-24 items-center justify-center rounded-full text-ink-3">
            <IconUser size={40} stroke={1.8} />
          </span>
          <span className="absolute right-1.5 bottom-1.5 h-3.5 w-3.5 rounded-full border-[3px] border-night bg-live" />
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-headline font-medium text-ink">
          {c.anonRole} <IconLock size={16} stroke={1.8} className="text-ink-3" />
        </div>
        <div className="mt-1 text-caption text-ink-2">Ready for a short intro</div>

        <div className="pl-glass mt-5 grid w-[188px] grid-cols-2 gap-1.5 rounded-[10px] p-1">
          <button
            type="button"
            onClick={() => setMode('audio')}
            className={`flex h-9 items-center justify-center gap-1.5 rounded-[7px] border border-transparent px-2 text-caption transition ${
              mode === 'audio' ? 'pl-glass-soft text-live-700' : 'text-ink-3'
            }`}
          >
            <IconMicrophone size={14} stroke={1.8} className="shrink-0" /> Audio
          </button>
          <button
            type="button"
            onClick={() => setMode('video')}
            className={`flex h-9 items-center justify-center gap-1.5 rounded-[7px] border border-transparent px-2 text-caption transition ${
              mode === 'video' ? 'pl-glass-soft text-live-700' : 'text-ink-3'
            }`}
          >
            <IconVideo size={14} stroke={1.8} className="shrink-0" /> Video
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="pl-primary-action flex w-full items-center justify-center gap-1.5 rounded-[14px] py-3.5 text-subhead font-medium transition active:scale-[0.98]"
      >
        <IconBolt size={16} stroke={2} /> Start 2-min intro
      </button>
      <button
        type="button"
        onClick={onBack}
        className="pl-glass mt-3 flex w-full items-center justify-center gap-1.5 rounded-[14px] py-3 text-body font-medium text-ink transition active:scale-[0.98]"
      >
        <IconMessageCircle size={16} stroke={1.8} /> Message Instead
      </button>
    </div>
  )
}
