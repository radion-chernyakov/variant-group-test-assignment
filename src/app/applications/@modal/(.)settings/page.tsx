import ApplicationSettings from "~/applications/ApplicationSettings"
import Modal from "~/ui/Modal"

export default function SettingsModal() {
  return (
    <Modal>
      <ApplicationSettings />
    </Modal>
  )
}
