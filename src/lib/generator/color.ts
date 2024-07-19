import { Color } from '@/types/color'

export async function paintsToColor(paints: readonly Paint[] | typeof figma.mixed): Promise<Color | undefined> {
  paints = Array.isArray(paints) ? paints : [paints]
  const targetPaint = paints[0]
  if (!targetPaint) {
    return undefined
  }

  switch (targetPaint.type) {
    case 'SOLID': {
      if (targetPaint.boundVariables) {
        const variableAlias = targetPaint.boundVariables.color
        const variable = await figma.variables.getVariableByIdAsync(variableAlias?.id ?? '')
        if (variable) {
          return variable
        }
      }

      const { r, g, b } = targetPaint.color
      const a = targetPaint.opacity ?? 1
      return `#${colorToHex(r)}${colorToHex(g)}${colorToHex(b)}${colorToHex(a)}`
    }
  }
}

function colorToHex(color: number): string {
  return Math.round(color * 255).toString(16).padStart(2, '0')
}
