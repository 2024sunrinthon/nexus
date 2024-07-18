import { render } from './lib/generator/render'
import { isSupportNode } from './lib/guards/node'
import { getParser } from './node'
// import { format } from 'prettier/standalone'

async function parseNode(node: SceneNode): Promise<string> {
  if (isSupportNode(node)) {
    const parser = await getParser(node)
    const element = await parser(node)
    return render(element)
  }
  return ''
}

figma.codegen.on('generate', async (e: CodegenEvent) => {
  const node = e.node
  const codeResult = await parseNode(node)
  // const formattedCode = await format(codeResult, {
  //   parser: 'babel',
  //   semi: false,
  //   singleQuote: true
  // })

  if (!codeResult) {
    throw new Error('Unsupported node type')
  }

  return [
    {
      title: 'Accent',
      code: codeResult,
      language: 'JAVASCRIPT'
    }
  ]
})
