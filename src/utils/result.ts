export type Result<T> =
  | {
      data: T
      loading?: undefined
      error?: undefined
    }
  | {
      data?: undefined
      loading: true
      error?: undefined
    }
  | {
      data?: undefined
      loading?: undefined
      error: string
    }
