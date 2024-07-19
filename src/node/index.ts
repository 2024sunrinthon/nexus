import { Element } from '@/types/element'

import textParser from './Typography'
import flexParser from './Flex'
import columnParser from './Flex/Column'
import rowParser from './Flex/Row'
import containerParser from './Container'

export type NodeParser = (node: SceneNode) => Promise<Element> | Element

export async function getParser(node: SceneNode) {
  switch (node.type) {
    case 'TEXT': return textParser
    case 'FRAME': {
      switch (node.layoutMode) {
        case 'HORIZONTAL': return rowParser
        case 'VERTICAL': return columnParser
        default: return flexParser
      }
    }
  }
  return containerParser
}
