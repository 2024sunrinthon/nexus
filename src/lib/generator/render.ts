import { Renderable } from '@/types/common'
import { Prop } from '@/types/element'
import { addSpace } from '../string'

const INDENT_SIZE = 2 as const

export function propsToString(props: Record<string, Prop>): string {
  return Object.entries(props)
    .filter(([_, value]) => value !== null && value !== undefined && value !== false)
    .map(([key, value]) => {
      if (value === null || value === undefined || value === false) {
        return ''
      }

      switch (typeof value) {
        case 'string': return `${key}="${value}"`
        case 'number': {
          const fixedValue = value.toFixed(2)
          const floatPart = fixedValue.split('.')[1]
          if (floatPart === '00') {
            return `${key}={${value}}`
          } else if (floatPart.slice(-1) === '0') {
            return `${key}={${fixedValue.slice(0, -1)}}`
          }
          return `${key}={${fixedValue}}`
        }
        case 'boolean': return `${key}={${value}}`
        case 'object': {
          const variableName = value.name
            .replaceAll('-', '')
            .replaceAll('+', '')
            .replaceAll(' ', '')
          return `${key}={colors.${variableName}}`
        }
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
          return `${addSpace(depth * INDENT_SIZE)}{'${element.replaceAll('\n', '\\n')}'}\n`
        } else {
          return `${addSpace(depth * INDENT_SIZE)}{'${element}'}\n`
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
