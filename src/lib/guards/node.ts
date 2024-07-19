import { NodeTypeMap, SupportNodeType } from '@/types/node'
import { nodeTypes } from '../node'

export function isSupportNode(node: SceneNode): node is SupportNodeType {
  return nodeTypes.includes(node.type)
}

export function isExpectNode<T extends SupportNodeType>(node: SceneNode, type: keyof NodeTypeMap): node is T {
  return node.type === type
}
