import { NodeParser } from '..'

const parser: NodeParser<TextNode> = async node => {
  const style = figma.getStyleById(node.textStyleId.toString())
  if (style) {
    
  }

  return ''
}

export default parser