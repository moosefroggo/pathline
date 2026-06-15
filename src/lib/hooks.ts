import { useEffect, useRef, useState } from 'react'

// Live ticking countdown for the "open window". Returns a clock label
// (h:mm:ss / m:ss) that visibly ticks every second, so the window feels perishable.
export function useCountdown(initialSecs: number) {
  const [secs, setSecs] = useState(initialSecs)
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  const label = h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
  return { secs, label, expired: secs <= 0 }
}

// Counts up mm:ss — used for the live moment timer.
export function useStopwatch(running: boolean) {
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSecs((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [running])
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  return { secs, label: `${mm}:${ss}` }
}

// Run a callback once after `ms`, cleaned up on unmount / dep change.
export function useTimeout(cb: () => void, ms: number | null) {
  const saved = useRef(cb)
  useEffect(() => {
    saved.current = cb
  }, [cb])
  useEffect(() => {
    if (ms === null) return
    const id = setTimeout(() => saved.current(), ms)
    return () => clearTimeout(id)
  }, [ms])
}
