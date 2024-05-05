import OpenAI from 'openai';
import { env } from '~/env'

console.log(env)

const client = new OpenAI({
  organization: "org-F4Ro0jqZpc5TcIZrqqrzPgt0",
  apiKey: env.OPENAI_API_KEY,
});
export default client