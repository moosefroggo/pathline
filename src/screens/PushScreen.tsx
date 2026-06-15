import { IconChevronUp, IconLeaf } from '@tabler/icons-react'
import { candidates, recruiter } from '../data'

export function PushScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-1 flex-col px-3 pb-6">
      <div className="pt-16 text-center">
        <div className="text-body text-ink-2">Friday, June 12</div>
        <div className="text-[64px] leading-none font-medium text-ink">9:41</div>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="pl-glass-panel mt-10 w-full rounded-[20px] p-3.5 text-left transition active:scale-[0.98]"
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="pl-glass-soft flex h-5 w-5 items-center justify-center rounded-md text-live-700">
            <IconLeaf size={14} stroke={1.8} />
          </span>
          <span className="text-caption tracking-wide text-ink-2">pathline</span>
          <span className="ml-auto text-caption text-ink-3">now</span>
        </div>
        <div className="text-subhead font-medium text-ink">{candidates[0].anonRole} available now</div>
        <div className="mt-1 text-caption leading-snug text-ink-2">
          Active on your {recruiter.role} search
        </div>
      </button>

      <div className="mt-auto flex flex-col items-center gap-1 pt-8 text-ink-3">
        <IconChevronUp size={16} stroke={1.8} />
        <span className="text-caption">tap to open</span>
      </div>
    </div>
  )
}
