export interface Team {
  id: string
  name: string
}

export interface SortingMethod<T> {
  sort: (values: T[]) => T[]
}
