import { Renderable } from '@/types/common'
import { Prop } from '@/types/element'

export function propsToString(props: Record<string, Prop>): string {
  return Object.entries(props)
    .map(([key, value]) => {
      switch (typeof value) {
        case 'string': return `${key}="${value}"`
        case 'number':
        case 'boolean': return `${key}={${value}}`
        default: return `${key}={${value}}`
      }
    })
    .join(' ')
}

export function render(element: Renderable): string {
  if (element === null || element === undefined) {
    return ''
  }
  if (typeof element === 'string' || typeof element === 'number') {
    switch (typeof element) {
      case 'string': return `{'${element.replaceAll('\n', '\\n')}'}`
      case 'number': return `{${element}}`
    }
  }

  const props = ` ${propsToString(element.props)}`
  const children = element.children ?
    element.children.map(render).join('') :
    ''

  return (
    children ?
      `<${element.tag}${props}>${children}</${element.tag}>` :
      `<${element.tag}${props} />`
  )
}
