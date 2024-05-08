import z from 'zod'
import makeStore from "~/utils/makeStore";

const localStorageKey = "clientSettings"
const clientSettingsSchema = z.object({
  deferredApplicationsRendering: z.boolean(),
  virtualizedApplicationsRendering: z.boolean(),
})
export type ClientSettings = z.infer<typeof clientSettingsSchema>

const defaultSettings = {
  deferredApplicationsRendering: true,
  virtualizedApplicationsRendering: false,
}

const { useStore: useClientSettings, setData: setSettings } = makeStore<ClientSettings>(clientSettingsSchema, localStorageKey, defaultSettings)

export { useClientSettings, setSettings }
