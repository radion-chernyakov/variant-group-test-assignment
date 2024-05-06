import ApplicationSettings from "~/applications/ApplicationSettings.server"
import Modal from "~/ui/Modal"

export default function SettingsModal() {
  return (
    <Modal>
      <ApplicationSettings />
    </Modal>
  )
}
