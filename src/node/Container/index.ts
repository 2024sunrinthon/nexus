import { ComponentName } from '@/lib/node'
import { NodeParser } from '..'
import { createElement } from '@/lib/generator/element'
import { ContainerProps } from '@/types/props/Container'
import { paintsToColor } from '@/lib/generator/color'
import { parseNode } from '@/code'
import { hasCornerRadius, hasStroke } from '@/lib/guards/property'

const parser: NodeParser = async node => {
  const containerProps: ContainerProps = {}

  if ('fills' in node) {
    containerProps.backgroundColor = await paintsToColor(node.fills)
  }

  if (hasCornerRadius(node)) {
    let cornerRadius: number
    if (node.cornerRadius === figma.mixed) {
      cornerRadius = node.topLeftRadius
    } else {
      cornerRadius = node.cornerRadius
    }

    containerProps.borderRadius = cornerRadius > 0 ? cornerRadius : undefined
  }

  if ('paddingLeft' in node) {
    const { paddingLeft, paddingRight, paddingTop, paddingBottom } = node
    const paddingVertical = paddingTop === paddingBottom ? paddingTop : null
    const paddingHorizontal = paddingLeft === paddingRight ? paddingLeft : null
    const globalPadding = [paddingTop, paddingBottom, paddingLeft, paddingRight].every(padding => padding === paddingTop) ? paddingTop : null
    if (globalPadding && globalPadding > 0) {
      containerProps.padding = globalPadding
    } else if (paddingVertical || paddingHorizontal) {
      if (paddingVertical && paddingVertical > 0) containerProps.paddingVertical = paddingVertical
      if (paddingHorizontal && paddingHorizontal > 0) containerProps.paddingHorizontal = paddingHorizontal
    }

    if (!containerProps.paddingVertical) {
      if (paddingTop && paddingTop > 0) containerProps.paddingTop = paddingTop
      if (paddingBottom && paddingBottom > 0) containerProps.paddingBottom = paddingBottom
    }
    if (!containerProps.paddingHorizontal) {
      if (paddingLeft && paddingLeft > 0) containerProps.paddingLeft = paddingLeft
      if (paddingRight && paddingRight > 0) containerProps.paddingRight = paddingRight
    }
  }

  if (hasStroke(node) && node.strokes.length > 0) {
    containerProps.borderColor = await paintsToColor(node.strokes)
    if (node.strokeWeight === figma.mixed) {
      containerProps.borderWidth = node.topLeftRadius
    } else {
      containerProps.borderWidth = node.strokeWeight
    }
  }

  if ('layoutSizingHorizontal' in node) {
    containerProps.fullWidth = node.layoutSizingHorizontal === 'FILL'
  }
  if (!containerProps.fullWidth) {
    containerProps.width = node.width
  }
  
  containerProps.height = node.height

  return createElement(
    ComponentName.Container,
    containerProps,
    'children' in node ?
      await Promise.all(node.children.map(child => parseNode(child))):
      []
  )
}

export default parser
