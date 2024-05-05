"use server"
import { cookies } from 'next/headers'

import { type ApplicationFormData } from "~/components/ApplicationForm";
import client from "~/utils/openAI";
import wait from "~/utils/wait";

async function templateBasedLetter(application: ApplicationFormData) {
  await wait(1000)
  return `
  Dear ${application.company} Team,
  
  I am writing to express my interest in the ${application.position} position.
  
  My experience in the realm combined with my skills in ${application.skills} make me a strong candidate for this role.
  
  ${application.details}
  
  I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.
  
  Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.
    `.trim()
}

async function gptBasedLetter(application: ApplicationFormData) {
  try {
    const response = await client.chat.completions.create({
      messages: [
        { "role": "system", "content": "You are a professional HR assistant helping people get a job based on person willing position and company person applying at." },
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

export async function generateLetter(application: ApplicationFormData) {
  const useGPT = true
  // const useGPT = cookies().get("useGPT")?.value === "true"

  if (useGPT) return gptBasedLetter(application)
  return templateBasedLetter(application)
}