export function paintsToHex(paints: readonly Paint[] | typeof figma.mixed): string {
  paints = Array.isArray(paints) ? paints : [paints]
  const targetPaint = paints[0]
  if (!targetPaint) {
    return '#00000000'
  }

  switch (targetPaint.type) {
    case "SOLID": {
      const { r, g, b } = targetPaint.color
      const a = targetPaint.opacity ?? 1
      return `#${Math.round(r * 255).toString(16)}${Math.round(g * 255).toString(16)}${Math.round(b * 255).toString(16)}${Math.round(a * 255).toString(16)}`
    }
    default: return '#00000000'
  }
}
