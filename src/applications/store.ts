import { useSyncExternalStore } from "react"
import z from "zod"

const applicationSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  skills: z.string(),
  details: z.string(),
  letter: z.string(),
})

export type Application = z.infer<typeof applicationSchema>


const localStorageKey = 'applications'

export type ApplicationData = Omit<Application, "id">

let applications: Array<Application> = (() => {
  try {
    return z.array(applicationSchema).parse(JSON.parse(localStorage.getItem(localStorageKey) ?? ""))
  } catch {
    return []
  }
})()

export const addApplication = (application: ApplicationData) => {
  const id = crypto.randomUUID()
  const newApplication = {
    id,
    ...application
  }
  applications = [...applications, newApplication]
  emitChange()
  return newApplication
}

export const addApplications = (newApplicationsData: Array<ApplicationData>) => {
  const newApplications = newApplicationsData.map(application => ({
    id: crypto.randomUUID(),
    ...application
  }))
  applications = [...applications, ...newApplications]
  emitChange()
  return newApplications
}

export const removeApplicationsById = (id: string) => {
  applications = applications.filter(application => application.id !== id)
  emitChange()
}

export const updateApplication = ({ id, ...applicationData }: Application): Application => {
  const updatedApplication = {
    id,
    ...applicationData
  }

  const applicationIndex = applications.findIndex(({ id: applicationId }) => applicationId === id)
  if (applicationIndex) {
    applications = applications.map((application, index) => {
      if (index === applicationIndex) return updatedApplication

      return application
    })
    emitChange()
    return updatedApplication
  } else {
    // TODO: throw & report error
    return updatedApplication
  }
}

type Listener = () => void
const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener)

  return () => listeners.delete(listener)
}

export function useApplications() {
  return useSyncExternalStore(subscribe, () => applications, () => null)
}

export function useApplication(id: string) {
  return useSyncExternalStore(subscribe, () => applications.find(({ id: applicationId }) => applicationId === id) ?? null, () => undefined)
}

let saveToLocalStorageTimeout: NodeJS.Timeout | null = null

function emitChange() {
  listeners.forEach(listener => listener())
  if (saveToLocalStorageTimeout) clearTimeout(saveToLocalStorageTimeout)
  saveToLocalStorageTimeout = setTimeout(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(applications))
    saveToLocalStorageTimeout = null
  }, 300)
}

export const clearApplications = () => {
  applications = []
  emitChange()
}