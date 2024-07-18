import { ContainerProps } from './Container'

export type FlexProps = ContainerProps & {
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
  alignItems?: 'flex-start' | 'center' | 'flex-end'
  flexWrap?: 'wrap' | 'nowrap'
  flex?: number
  gap?: number
}
