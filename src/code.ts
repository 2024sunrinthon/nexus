import { render } from './lib/generator/render'
import { getParser } from './node'
import { Element } from './types/element'

export async function parseNode(node: SceneNode): Promise<Element> {
  const parser = await getParser(node)
  const element = await parser(node)
  return element
}

figma.codegen.on('generate', async (e: CodegenEvent) => {
  const node = e.node
  const codeResult = render(await parseNode(node))

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
