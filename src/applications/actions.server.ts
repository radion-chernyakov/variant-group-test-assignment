"use server"

import { type ApplicationFormData } from "~/components/ApplicationForm";
import wait from "~/utils/wait";

export async function generateLetter(application: ApplicationFormData) {
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