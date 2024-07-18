import { Element } from '@/types/element'

import textParser from './Typography'
import flexParser from './Flex'
import containerParser from './Container'

export type NodeParser = (node: SceneNode) => Promise<Element> | Element

export async function getParser(node: SceneNode) {
  console.log('Node type:', node.type)
  console.log('Container parser', containerParser)
  switch (node.type) {
    case 'TEXT': return textParser
    case 'FRAME': {
      if (node.layoutMode !== 'NONE') {
        return flexParser
      }
    }
  }
  return containerParser
}
