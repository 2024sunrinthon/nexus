export type Prop = string | number | boolean | null | undefined
export type Children = Element | string | number | null | undefined

export interface Element {
  tag: string
  props: Record<string, Prop>
  children?: Children[]
}
