// name size fill color

import { createElement } from '@/lib/generator/element'
import { NodeParser } from '..'
import { ComponentName } from '@/lib/node'
import { IconProps } from '@/types/props/Icon'
import { isExpectNode } from '@/lib/guards/node'
import { paintsToColor } from '@/lib/generator/color'

const parser: NodeParser = async node => {
  const iconProps: IconProps = {
    name: '',
    size: node.width,
  }

  if (isExpectNode<TextNode>(node, 'TEXT')) {
    iconProps.name = node.characters
    iconProps.color = await paintsToColor(node.fills)

    node.fontWeight
  } else if (isExpectNode<GroupNode>(node, 'GROUP')) {
    iconProps.name = node.name
    const vector = node.children.find(child => isExpectNode<VectorNode>(child, 'VECTOR'))
    iconProps.color = vector ? await paintsToColor(vector.fills) : '#000000'
  } else {
    throw new Error('Node is not a valid Icon')
  }

  return createElement(
    ComponentName.Icon,
    iconProps,
    []
  )
}

export default parser
