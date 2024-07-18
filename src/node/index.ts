import { capitalizeFirstLetter } from '@/lib/string'
import { SupportNodeType } from '@/types/node'

export type NodeParser<T extends SceneNode> = (node: T) => Promise<string> | string

export async function getParser(node: SupportNodeType): Promise<NodeParser<SupportNodeType>> {
  const validNodeType = capitalizeFirstLetter(node.type.toLowerCase())
  const { default: parser } = await import(`./${validNodeType}}/index.js`)
  if (!parser) {
    throw new Error(`Parser for node type "${node.type}" not found`)
  }

  return parser
}
