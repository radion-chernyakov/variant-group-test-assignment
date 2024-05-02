import { createContext, useContext } from "react"

export const noFormSymbol = Symbol("no-form")

const formContext = createContext(noFormSymbol)

export function useFormContext() {
  return useContext(formContext)
}
