export type NodeTypeMap = {
  'TEXT': TextNode
  'FRAME': FrameNode
  'GROUP': GroupNode
  'VECTOR': VectorNode
}

export type SupportNodeType = TextNode | FrameNode | GroupNode | VectorNode

export type CornerRadiusNode = FrameNode | ComponentSetNode | ComponentNode | InstanceNode | RectangleNode

export type StrokeNode = FrameNode | ComponentSetNode | ComponentNode | InstanceNode | RectangleNode
