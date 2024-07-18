import { createElement } from '@/lib/generator/element'
import { NodeParser } from '..'
import { isExpectNode } from '@/lib/guards/node'

const parser: NodeParser = async node => {
  if (!isExpectNode<TextNode>(node, 'TEXT')) {
    throw new Error('Node is not a Text')
  }

  const style = figma.getStyleById(node.textStyleId.toString())
  if (style) {
    
  }

  return createElement('T', {}, [node.characters])
}

export default parser