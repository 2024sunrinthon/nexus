import { render } from './lib/generator/render'
import { getParser } from './node'

async function parseNode(node: SceneNode): Promise<string> {
  const parser = await getParser(node)
  console.log('Parser:', parser)
  const element = await parser(node)
  console.log('Element:', element)
  return render(element)
}

figma.codegen.on('generate', async (e: CodegenEvent) => {
  const node = e.node
  const codeResult = await parseNode(node)

  if (!codeResult) {
    throw new Error('Unsupported node type')
  }

  return [
    {
      title: 'React Component',
      code: codeResult,
      language: 'TYPESCRIPT'
    }
  ]
})
