import { createElement } from '@/lib/generator/element'
import { NodeParser } from '..'
import { isExpectNode } from '@/lib/guards/node'
import { ComponentName } from '@/lib/node'
import { TypographyProps } from '@/types/props/Typography'
import { toLowerCase } from '@/lib/string'
import { paintsToHex } from '@/lib/generator/color'

const parser: NodeParser = async node => {
  if (!isExpectNode<TextNode>(node, 'TEXT')) {
    throw new Error('Node is not a Text')
  }

  const textStyles = await figma.getLocalTextStylesAsync()
  const targetTextStyle = textStyles.find(style => style.id === node.textStyleId.toString())
  
  return createElement(
    `${ComponentName.Typegraphy}.${targetTextStyle?.name || 'Body'}`,
    {
      color: paintsToHex(node.fills) ?? '#00000000',
      underline: node.textDecoration === 'UNDERLINE',
      strike: node.textDecoration === 'STRIKETHROUGH',
      textAlign: toLowerCase<'LEFT' | 'CENTER' | 'RIGHT'>(node.textAlignHorizontal)
    } satisfies TypographyProps,
    [node.characters]
  )
}

export default parser