import ApplicationSettingsForm from "./ApplicationSettings"
import { setSettings } from "./actions.server"
import { getSettings } from "./settings.server"

export default async function ApplicationSettings() {
  const settings = await getSettings()

  return (
    <ApplicationSettingsForm
      runtimeSettings={settings}
      setSettings={setSettings}
    />
  )
}
