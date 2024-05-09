"use server"
import { type ApplicationFormData } from "~/applications/ApplicationForm";
import client from "~/utils/openAI";
import wait from "~/utils/wait";
import { getSettings } from './settings.server';
import { type Settings, settingsSchema } from "./settingsSchema";
import { cookies } from 'next/headers'
import { templateBasedLetter } from "./letter";
import reportError from "~/utils/reportError";

async function gptBasedLetter(application: ApplicationFormData) {
  try {
    const response = await client.chat.completions.create({
      messages: [
        { "role": "system", "content": "You are a professional HR assistant helping people get a job based on person willing position and company person applying at. Include only cover letter context excluding everything else including subject" },
        {
          "role": "user", "content": `
Hey! I'm applying for the ${application.position} position at ${application.company}. Can you help me write a cover letter?
Here are my key skills: ${application.skills}
And here are some details about me: ${application.details}
      ` },
      ],
      model: "gpt-3.5-turbo",
    })
    const content = response.choices[0]?.message.content
    if (!content) {
      reportError("Failed to generate gtp-based letter")
      return templateBasedLetter(application)
    }

    return content
  } catch (error) {
    reportError(error)
    return templateBasedLetter(application)
  }
}

async function simulateDelay() {
  await wait(300 + Math.random() * 1400)
}

export async function generateLetter(application: ApplicationFormData) {
  const settings = await getSettings()

  if (settings.simulateServerError) {
    await simulateDelay()
    throw new Error("Server error")
  }

  const useGPT = settings.useGPT

  if (useGPT) return gptBasedLetter(application)
  if (settings.simulateDelay) await simulateDelay()
  return templateBasedLetter(application)
}

export const setSettings = async (settings: Settings) => {
  Object.keys(settingsSchema.shape).forEach((_key) => {
    const key = _key as keyof Settings
    cookies().set(key, settings[key] ? "on" : "off")
  })
}