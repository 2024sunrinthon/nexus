import { ComponentName } from '@/lib/node'
import { NodeParser } from '..'
import { createElement } from '@/lib/generator/element'
import { ContainerProps } from '@/types/props/Container'

const parser: NodeParser = async node => {
  return createElement(
    ComponentName.Container,
    {} satisfies ContainerProps,
    'children' in node ?
      await Promise.all(node.children.map(child => parser(child))):
      []
  )
}

export default parser
