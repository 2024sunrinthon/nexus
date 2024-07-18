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
      case 'string': {
        if (element.includes('\n')) {
          return `{'${element.replaceAll('\n', '\\n')}'}`
        } else {
          return element
        }
      }
      case 'number': return `{${element}}`
    }
  }

  const rawProps = propsToString(element.props)
  const props = rawProps ? ` ${rawProps}` : ''
  const children = element.children ?
    element.children.map(render).join('') :
    ''

  return (
    children ?
      `<${element.tag}${props}>${children}</${element.tag}>` :
      `<${element.tag}${props} />`
  )
}
