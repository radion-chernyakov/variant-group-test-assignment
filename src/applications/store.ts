import { useSyncExternalStore } from "react"

export type Application = {
  id: string
  company: string
  position: string
  skills: string
  details: string
  letter: string
}

type ApplicationData = Omit<Application, 'id'>

const applications = new Map<string, ApplicationData>()

export const addApplication = (application: ApplicationData) => {
  const newId = crypto.randomUUID()
  applications.set(newId, application)
  return {
    id: newId,
    ...application
  }
}

export const removeApplicationsById = (id: string) => {
  applications.delete(id)
}

export const updateApplication = ({ id, ...applicationData }: Application) => {
  applications.set(id, applicationData)
}

type Listener = () => void
const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener)

  return () => listeners.delete(listener)
}

function getSnapshot(): Array<Application> {
  return [...applications.entries()].map(([id, applicationData]) => ({
    id,
    ...applicationData,
  }))
}

function useApplications() {
  return useSyncExternalStore(subscribe, getSnapshot)
}
