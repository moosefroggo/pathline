import { IconLeaf } from '@tabler/icons-react'

const scale = {
  notification: { badge: 'h-5 w-5 rounded-md', icon: 14 },
  header: { badge: 'h-6 w-6 rounded-[7px]', icon: 16 },
  splash: { badge: 'h-14 w-14 rounded-[18px]', icon: 32 },
}

export function PathlineMark({ size }: { size: keyof typeof scale }) {
  const { badge, icon } = scale[size]
  return (
    <span aria-hidden="true" className={`pl-glass-soft flex shrink-0 items-center justify-center text-live-700 ${badge}`}>
      <IconLeaf size={icon} stroke={1.8} />
    </span>
  )
}
