import NewApplication from "~/applications/NewApplication"
import { generateLetter } from "~/applications/actions.server"

export default function NewApplicationPage() {
  return <NewApplication generateLetter={generateLetter} />
}
