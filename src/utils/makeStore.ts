import { useSyncExternalStore } from "react";
import { type ZodType } from "zod";
import reportError from "~/utils/reportError";

// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

export default function makeStore<T>(schema: ZodType<T>, localStorageKey: string, defaultValue: T) {
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
    saveToLocalStorageTimeout = setTimeout(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(data))
      saveToLocalStorageTimeout = null
    }, 300)

  }

  const useStore = () => {
    return useSyncExternalStore(subscribe, () => data, () => defaultValue)
  }
  const useStoreWithSelector = <P>(selector: (data: T) => P) => {
    return useSyncExternalStore(subscribe, () => selector(data), () => selector(defaultValue))
  }

  return {
    useStore,
    useStoreWithSelector,
    setData
  }
}