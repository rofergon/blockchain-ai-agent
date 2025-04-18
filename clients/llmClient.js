import { ChatOpenAI } from '@langchain/openai';

/**
 * Factory function to create an LLM client
 * @returns {ChatOpenAI} The configured LLM client
 */
export async function createLLMClient() {
  // Using OpenRouter as the host and selecting an OpenAI model
  // This approach allows for swapping models with minimal code changes
  const llm = new ChatOpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    modelName: "openai/gpt-4-turbo", // Can be easily changed to other models
  });
  
  return llm;
} 