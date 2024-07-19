import { CornerRadiusNode, StrokeNode } from '@/types/node'

export function hasCornerRadius(node: SceneNode): node is CornerRadiusNode {
  const cornerRadiusKeys = ['cornerRadius', 'topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']

  if (cornerRadiusKeys.every(key => key in node)) {
    return true
  }
  return false
}

export function hasStroke(node: SceneNode): node is StrokeNode {
  const strokeKeys = ['strokeAlign', 'strokeBottomWeight', 'strokeCap', 'strokeGeometry', 'strokeJoin', 'strokeLeftWeight', 'strokeMiterLimit', 'strokeRightWeight', 'strokeStyleId', 'strokeTopWeight', 'strokeWeight', 'strokes']

  if (strokeKeys.every(key => key in node)) {
    return true
  }
  return false
}
