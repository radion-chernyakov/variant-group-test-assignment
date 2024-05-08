import z from "zod"
import makeStore from "~/utils/makeStore";
const applicationSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  skills: z.string(),
  details: z.string(),
  letter: z.string(),
})

export type Application = z.infer<typeof applicationSchema>

const {
  useStoreWithResult: useApplications,
  setData: setApplications,
  useStoreWithSelector,
} = makeStore<Application[]>(z.array(applicationSchema), 'applications', [], 1000)

export function useApplication(id: string) {
  return useStoreWithSelector((applications) => applications.find(application => application.id === id))
}

export function useApplicationsCount() {
  return useStoreWithSelector((applications) => applications.length)
}

export { useApplications }

export type ApplicationData = Omit<Application, "id">

export const addApplication = (application: ApplicationData) => {
  const id = crypto.randomUUID()
  const newApplication = {
    id,
    ...application
  }
  setApplications((applications) => {
    return [...applications, newApplication]
  })
  return newApplication
}

export const addApplications = (newApplicationsData: Array<ApplicationData>) => {
  const newApplications = newApplicationsData.map(application => ({
    id: crypto.randomUUID(),
    ...application
  }))
  setApplications((applications) => [
    ...applications,
    ...newApplications
  ])
  return newApplications
}

export const removeApplicationsById = (id: string) => {
  setApplications((applications) => applications.filter(application => application.id !== id))
}

export const updateApplication = ({ id, ...applicationData }: Application): Application => {
  const updatedApplication = {
    id,
    ...applicationData
  }
  setApplications((applications) => {
    const applicationIndex = applications.findIndex(({ id: applicationId }) => applicationId === id)
    return applications.map((application, index) => {
      if (index === applicationIndex) return updatedApplication

      return application
    })
  })
  return updatedApplication
}

export const clearApplications = () => {
  setApplications([])
}
