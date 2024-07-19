import { createElement } from '@/lib/generator/element'
import { NodeParser } from '..'
import { isExpectNode } from '@/lib/guards/node'
import { ComponentName } from '@/lib/node'
import { TypographyProps } from '@/types/props/Typography'
import { toLowerCase } from '@/lib/string'
import { paintsToColor } from '@/lib/generator/color'
import iconParser from '@/node/Icon'

const DEFAULT_FONT_FAMILY = 'Wanted Sans' as const

const parser: NodeParser = async node => {
  if (!isExpectNode<TextNode>(node, 'TEXT')) {
    throw new Error('Node is not a Text')
  }

  if (typeof node.fontName !== 'symbol' && node.fontName.family !== DEFAULT_FONT_FAMILY) {
    return iconParser(node)
  }

  const textStyles = await figma.getLocalTextStylesAsync()
  const targetTextStyle = textStyles.find(style => style.id === node.textStyleId.toString())
  const styleName = targetTextStyle ?
    targetTextStyle.name.replaceAll('-', '').replaceAll(' ', '') :
    'Body'

  const typographyProps: TypographyProps = {
    color: await paintsToColor(node.fills),
    underline: node.textDecoration === 'UNDERLINE',
    strike: node.textDecoration === 'STRIKETHROUGH',
  }

  if (node.textAlignHorizontal !== 'LEFT') {
    typographyProps.textAlign = toLowerCase<'LEFT' | 'CENTER' | 'RIGHT'>(node.textAlignHorizontal)
  }
  
  return createElement(
    `${ComponentName.Typegraphy}.${styleName}`,
    typographyProps,
    [node.characters]
  )
}

export default parser
