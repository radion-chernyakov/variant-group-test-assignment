import ApplicationSettingsForm from "./ApplicationSettingsForm"
import { setSettings } from "./actions.server"
import { getSettings } from "./settings.server"

export default async function ApplicationSettings() {
  const settings = await getSettings()

  return (
    <ApplicationSettingsForm
      initialValues={settings}
      setSettings={setSettings}
    />
  )
}
