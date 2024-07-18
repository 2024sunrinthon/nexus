import { Children, Element, Prop } from '@/types/element'

export function createElement(tag: string, props: Record<string, Prop>, children: Children[]): Element {
  return {
    tag,
    props,
    children
  }
}
