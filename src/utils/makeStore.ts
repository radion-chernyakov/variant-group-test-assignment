import { useMemo, useSyncExternalStore } from "react";
import { type ZodType } from "zod";
import reportError from "~/utils/reportError";
import type { Result } from "./result";

// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

export default function makeStore<T>(schema: ZodType<T>, localStorageKey: string, defaultValue: T, setStorageThrottle?: number) {
  const getDataOutOfLocalStorage = () => {
    if (typeof localStorage === 'undefined') {
      return defaultValue
    }

    try {
      return schema.parse(JSON.parse(localStorage.getItem(localStorageKey) ?? ''))
    } catch (e) {
      reportError(e, `Failed to parse ${localStorageKey} from local storage`)
      localStorage.setItem(localStorageKey, JSON.stringify(defaultValue))
      return defaultValue
    }
  }
  let data = getDataOutOfLocalStorage()

  type Listener = () => void
  const listeners = new Set<Listener>();
  function subscribe(listener: Listener) {
    listeners.add(listener)

    return () => listeners.delete(listener)
  }

  let saveToLocalStorageTimeout: NodeJS.Timeout | null = null
  type SetData = T | ((currentValue: T) => T)
  const setData = (setData: SetData) => {
    if (isFunction(setData)) {
      data = setData(data)
    } else {
      data = setData
    }

    listeners.forEach(listener => listener())
    if (saveToLocalStorageTimeout) clearTimeout(saveToLocalStorageTimeout)

    const setToClientStorage = () => {
      localStorage.setItem(localStorageKey, JSON.stringify(data))
    }

    if (setStorageThrottle) {
      saveToLocalStorageTimeout = setTimeout(() => {
        setToClientStorage()
        saveToLocalStorageTimeout = null
      }, 300)
    }
    else {
      setToClientStorage()
    }
  }

  const loadingResult = { loading: true }

  const useStoreWithResult = () => {
    const memoizedResult = useMemo(() => ({ data } as Result<T>), [data])
    return useSyncExternalStore(subscribe, () => memoizedResult, () => loadingResult as Result<T>)
  }

  const useStore = () => {
    return useSyncExternalStore(subscribe, () => data, () => defaultValue)
  }

  const selectErrorResult = { error: 'Selector returned undefined' }

  const useStoreWithSelector = <P>(selector: (data: T) => P | undefined): Result<P> => {
    const memoizedResult = useMemo(() => {
      const selectedData = selector(data)
      if (selectedData === undefined) {
        return selectErrorResult as Result<P>
      }
      return { data: selectedData } as Result<P>
    }, [data])
    return useSyncExternalStore(
      subscribe,
      () => memoizedResult,
      () => loadingResult as Result<P>)
  }

  return {
    useStore,
    useStoreWithResult,
    useStoreWithSelector,
    setData
  }
}