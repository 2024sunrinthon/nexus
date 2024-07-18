export type Prop = string | number | boolean | unknown[] | Record<string, unknown> | null | undefined

export interface Element {
  tag: string
  props: Record<string, Prop>
  children?: Element[]
}
