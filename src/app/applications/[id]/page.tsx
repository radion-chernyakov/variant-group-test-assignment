import UpdateApplication from "~/applications/UpdateApplication"
import { generateLetter } from "~/applications/actions.server"

export default function Application({ params }: { params: { id: string } }) {
  return (
    <UpdateApplication
      generateLetter={generateLetter}
      applicationId={params.id}
    />
  )
}
