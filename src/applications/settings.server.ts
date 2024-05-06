import { cookies } from 'next/headers'

import { settingsSchema } from './settingsSchema'

export const getSettings = () => {
  const data = {
    simulateDelay: cookies().get("simulateDelay")?.value,
    simulateServerError: cookies().get("simulateServerError")?.value,
    useGPT: cookies().get("useGPT")?.value,
  }

  return settingsSchema.parseAsync(data)
}
