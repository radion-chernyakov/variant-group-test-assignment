import { useSyncExternalStore } from 'react'
import z from 'zod'
const localStorageKey = "clientSettings"
import reportError from "~/utils/reportError";
const clientSettingsSchema = z.object({
  deferredApplicationsRendering: z.boolean(),
  virtualizedApplicationsRendering: z.boolean(),
})

export type ClientSettings = z.infer<typeof clientSettingsSchema>

const defaultSettings = {
  deferredApplicationsRendering: true,
  virtualizedApplicationsRendering: false,
}

let settings = (() => {
  try {
    return clientSettingsSchema.parse(JSON.parse(localStorage.getItem(localStorageKey) ?? ''))
  } catch (e) {
    reportError(e)
    return {
      deferredApplicationsRendering: true,
      virtualizedApplicationsRendering: false,
    }
  }
})()

type Listener = () => void
const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener)

  return () => listeners.delete(listener)
}

function emitChange() {
  listeners.forEach(listener => listener())
  localStorage.setItem(localStorageKey, JSON.stringify(settings))
}

export function setSettings(newSettings: ClientSettings) {
  if (JSON.stringify(settings) === JSON.stringify(newSettings)) return
  settings = {
    ...settings,
    ...newSettings,
  }
  emitChange()
}

export const useClientSettings = () => {
  return useSyncExternalStore(subscribe, () => settings, () => defaultSettings)
}