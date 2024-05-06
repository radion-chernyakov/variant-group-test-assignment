import z from "zod"

export const strToBool = (str: string) => str === "on"

export const settingsSchema = z.object({
  simulateDelay: z.union([z.literal("on"), z.literal("off")]).transform(strToBool),
  simulateServerError: z.union([z.literal("on"), z.literal("off")]).transform(strToBool),
  useGPT: z.union([z.literal("on"), z.literal("off")]).transform(strToBool),
})

export type Settings = z.infer<typeof settingsSchema>
