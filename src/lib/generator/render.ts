import { Renderable } from '@/types/common'
import { Prop } from '@/types/element'
import { addSpace } from '../string'

const INDENT_SIZE = 2 as const

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

export function render(element: Renderable, depth = 0): string {
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
    element.children.map(c => render(c, depth + 1)).join('') :
    ''

  return (
    children ?
      `${addSpace(depth * INDENT_SIZE)}<${element.tag}${props}>\n${children}${addSpace(depth * INDENT_SIZE)}</${element.tag}>\n` :
      `${addSpace(depth * INDENT_SIZE)}<${element.tag}${props} />\n`
  )
}
