import z from "zod"

export const strToBool = (str: string) => str === "on"

export const settingsSchema = z.object({
  simulateDelay: z.union([z.literal("on"), z.literal("off")]).transform(strToBool).default("off"),
  simulateServerError: z.union([z.literal("on"), z.literal("off")]).transform(strToBool).default("off"),
  useGPT: z.union([z.literal("on"), z.literal("off")]).transform(strToBool).default("off"),
})

export type Settings = z.infer<typeof settingsSchema>
