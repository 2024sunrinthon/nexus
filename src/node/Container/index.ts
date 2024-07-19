import { ComponentName } from '@/lib/node'
import { NodeParser } from '..'
import { createElement } from '@/lib/generator/element'
import { ContainerProps } from '@/types/props/Container'
import { paintsToHex } from '@/lib/generator/color'
import { parseNode } from '@/code'
import { hasCornerRadius, hasStroke } from '@/lib/guards/property'

const parser: NodeParser = async node => {
  const containerProps: ContainerProps = {}

  if ('fills' in node) {
    containerProps.backgroundColor = paintsToHex(node.fills)
  }

  if (hasCornerRadius(node)) {
    if (node.cornerRadius === figma.mixed) {
      containerProps.borderRadius = node.topLeftRadius
    } else {
      containerProps.borderRadius = node.cornerRadius
    }
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
    } else {
      if (paddingLeft && paddingLeft > 0) containerProps.paddingLeft = paddingLeft
      if (paddingRight && paddingRight > 0) containerProps.paddingRight = paddingRight
      if (paddingTop && paddingTop > 0) containerProps.paddingTop = paddingTop
      if (paddingBottom && paddingBottom > 0) containerProps.paddingBottom = paddingBottom
    }
  }

  if (hasStroke(node) && node.strokes.length > 0) {
    containerProps.borderColor = paintsToHex(node.strokes)
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
