export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function toLowerCase<T extends string>(str: string): Lowercase<T> {
  return str.toLowerCase() as Lowercase<T>
}

export function addSpace(count: number): string {
  return ' '.repeat(count)
}
