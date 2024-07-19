import { isExpectNode } from '@/lib/guards/node'
import { NodeParser } from '..'
import containerParser from '../Container'
import { createElement } from '@/lib/generator/element'
import { parseNode } from '@/code'
import { FlexProps } from '@/types/props/Flex'
import { ComponentName } from '@/lib/node'

const parser: NodeParser = async node => {
  const container = await containerParser(node)
  if (!isExpectNode<FrameNode>(node, 'FRAME') || node.layoutMode === 'NONE') {
    return container
  }
  
  const flexProps: FlexProps = {
    ...container.props,
  }

  switch (node.primaryAxisAlignItems) {
    case 'MAX': flexProps.justifyContent = 'flex-end'; break
    case 'CENTER': flexProps.justifyContent = 'center'; break
    case 'SPACE_BETWEEN': flexProps.justifyContent = 'space-between'; break
  }

  switch (node.counterAxisAlignItems) {
    case 'MAX': flexProps.alignItems = 'flex-end'; break
    case 'CENTER': flexProps.alignItems = 'center'; break
  }

  if (node.layoutWrap === 'WRAP') {
    flexProps.flexWrap = 'wrap'
  }

  if (node.layoutGrow > 0) {
    flexProps.flex = node.layoutGrow
  }

  if (node.itemSpacing > 0) {
    flexProps.gap = node.itemSpacing
  }

  return createElement(
    ComponentName.Flex,
    flexProps,
    await Promise.all(node.children.map(child => parseNode(child)))
  )
}

export default parser
