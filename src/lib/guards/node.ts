import { NodeTypeMap, SupportNodeType } from '@/types/node'
import { nodeTypes } from '../node'

export function isSupportNode(node: SceneNode): node is SupportNodeType {
  return node.type in nodeTypes
}
