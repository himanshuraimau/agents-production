import type { AIMessage } from '../types'
import { openai } from './ai'

export const runLLM = async ({
  model = 'gpt-4o-mini',
  messages,
  temperature = 0.1,
}: {
  messages: AIMessage[]
  temperature?: number
  model?: string
}) => {
  const response = await openai.chat.completions.create({
    model,
    messages: messages.map(message => ({
      ...message,
      content: typeof message.content === 'string' ? message.content : JSON.stringify(message.content)
    })),
    temperature
  })

  return response.choices[0]
}
