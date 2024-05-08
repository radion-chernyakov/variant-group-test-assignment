export type Success<T> = {
  data: T
  loading?: undefined
  error?: undefined
}

export type Loading = {
  data?: undefined
  loading: true
  error?: undefined
}

export type Error<T> = {
  data?: T
  loading?: undefined
  error: string
}

export type Result<T> =
  | Success<T>
  | Loading
  | Error<T>

export function isError<T>(result: Result<T>): result is Error<T> {
  return result.error !== undefined
}

export function isSuccess<T>(result: Result<T>): result is Success<T> {
  return result.data !== undefined && result.error === undefined
}

export function isLoading<T>(result: Result<T>): result is Loading {
  return result.loading === true
}

export function mapResult<T, Error, Loading, Data>(result: Result<T>, {
  onError,
  onLoading,
  onData,
}: {
  onError: (error: string, data?: T) => Error,
  onLoading: () => Loading,
  onData: (data: T) => Data,
}) {
  if (isError(result)) {
    return onError(result.error, result.data)
  } else if (isLoading(result)) {
    return onLoading()
  } else {
    return onData(result.data)
  }
}