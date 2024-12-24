import type { AIMessage } from '../types'
import { openai } from './ai'
import { zodFunction } from 'openai/helpers/zod'

export const runLLM = async ({
  model = 'gpt-4o-mini',
  messages,
  temperature = 0.1,
  tools
}: {
  messages: AIMessage[]
  temperature?: number
  model?: string
  tools?: any[]
}) => {
  const formattedTools = tools?.map(zodFunction)
  const response = await openai.chat.completions.create({
    model,
    messages: messages.map(message => ({
      ...message,
      content: typeof message.content === 'string' ? message.content : JSON.stringify(message.content)
    })),
    temperature,
    tools: formattedTools,
    tool_choice:'auto',
    parallel_tool_calls: false
  })

  return response.choices[0].message.content;
}
