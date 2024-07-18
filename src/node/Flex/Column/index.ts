import { createElement } from '@/lib/generator/element'
import { ComponentName } from '@/lib/node'
import { NodeParser } from '@/node'
import flexParser from '@/node/Flex'

const parser: NodeParser = async node => {
  const flex = await flexParser(node)
  
  return createElement(
    ComponentName.Column,
    flex.props,
    [...flex.children ?? []]
  )
}

export default parser
