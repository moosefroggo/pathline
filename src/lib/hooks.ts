import { useEffect, useRef, useState } from 'react'

// Live ticking countdown for the "open window". Returns a coarse label like "2h 14m".
export function useCountdown(initialSecs: number) {
  const [secs, setSecs] = useState(initialSecs)
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const label = h > 0 ? `${h}h ${m}m` : `${m}m ${secs % 60}s`
  return { secs, label }
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
  saved.current = cb
  useEffect(() => {
    if (ms === null) return
    const id = setTimeout(() => saved.current(), ms)
    return () => clearTimeout(id)
  }, [ms])
}
