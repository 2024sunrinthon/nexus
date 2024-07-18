import { Element, Prop } from '@/types/element'

export function createElement(tag: string, props: Record<string, Prop>, children: Element[]): Element {
  return {
    tag,
    props,
    children
  }
}
