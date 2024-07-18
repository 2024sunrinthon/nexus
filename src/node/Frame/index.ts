import { NodeParser } from '..'

const parser: NodeParser<FrameNode> = async node => {
  node.type // must be 'FRAME'
  return ''
}

export default parser
