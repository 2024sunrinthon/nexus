export function paintsToHex(paints: readonly Paint[] | typeof figma.mixed) {
  paints = Array.isArray(paints) ? paints : [paints]
  const targetPaint = paints[0]
  if (!targetPaint) {
    return undefined
  }

  switch (targetPaint.type) {
    case "SOLID": {
      const { r, g, b } = targetPaint.color
      const a = targetPaint.opacity ?? 1
      return `#${colorToHex(r)}${colorToHex(g)}${colorToHex(b)}${colorToHex(a)}`
    }
    default: return '#00000000'
  }
}

function colorToHex(color: number): string {
  return Math.round(color * 255).toString(16).padStart(2, '0')
}
