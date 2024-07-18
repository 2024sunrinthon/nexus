import { Element } from '@/types/element'
import { SupportNodeType } from '@/types/node'

import frameParser from './Frame'
import textParser from './Text'

export type NodeParser = (node: SupportNodeType) => Promise<Element> | Element

export async function getParser(node: SupportNodeType) {
  switch (node.type) {
    case 'FRAME': return frameParser
    case 'TEXT':  return textParser
  }
}
