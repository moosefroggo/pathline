import { useEffect, useRef } from 'react'

const vertexSource = `
  attribute vec2 aPosition;
  varying vec2 vUv;

  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`

const fragmentSource = `
  precision mediump float;

  uniform vec2 uResolution;
  uniform float uTime;
  varying vec2 vUv;

  float wave(vec2 p, float speed, float scale) {
    return sin((p.x * 2.2 + p.y * 1.6) * scale + uTime * speed);
  }

  void main() {
    vec2 uv = vUv;
    vec2 centered = uv - 0.5;
    centered.x *= uResolution.x / max(uResolution.y, 1.0);

    float radius = length(centered);
    float field = 0.0;
    field += wave(centered + vec2(0.08, -0.04), 0.34, 4.2) * 0.28;
    field += wave(centered.yx + vec2(-0.12, 0.1), -0.24, 5.6) * 0.18;

    float beam = smoothstep(0.74, 0.08, abs(centered.x + field * 0.09));
    float glow = smoothstep(0.74, 0.04, radius);
    float live = smoothstep(0.16, 0.0, distance(uv, vec2(0.72, 0.22)));
    float left = smoothstep(0.2, 0.0, distance(uv, vec2(0.22, 0.62)));

    vec3 sage = vec3(0.45, 0.72, 0.64);
    vec3 cream = vec3(0.98, 0.97, 0.9);
    vec3 carbon = vec3(0.04, 0.08, 0.07);
    vec3 color = carbon;
    color = mix(color, sage, beam * 0.24 + glow * 0.2);
    color = mix(color, cream, left * 0.11);
    color += sage * live * 0.34;

    float alpha = clamp(beam * 0.22 + glow * 0.28 + live * 0.28 + left * 0.12, 0.0, 0.64);
    gl_FragColor = vec4(color, alpha);
  }
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function PresenceShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    })
    if (!canvas || !gl) return

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    const positionLocation = gl.getAttribLocation(program, 'aPosition')
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution')
    const timeLocation = gl.getUniformLocation(program, 'uTime')
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )

    let frame = 0
    let start = performance.now()
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const scale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * scale))
      canvas.height = Math.max(1, Math.floor(rect.height * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const render = (now: number) => {
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      frame = requestAnimationFrame(render)
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    resize()
    start = performance.now()
    render(start)
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    if (media.matches) {
      cancelAnimationFrame(frame)
      render(start + 1200)
    }

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      if (buffer) gl.deleteBuffer(buffer)
    }
  }, [])

  return <canvas ref={canvasRef} className="pl-presence-shader" aria-hidden="true" />
}
