import OpenAI from 'openai';
import { env } from '~/env'

const client = new OpenAI({
  organization: env.OPENAI_API_ORGANIZATION,
  apiKey: env.OPENAI_API_KEY,
});
export default client