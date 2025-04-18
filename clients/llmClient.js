import { ChatOpenAI } from '@langchain/openai';

/**
 * Factory function to create an LLM client
 * @returns {ChatOpenAI} The configured LLM client
 */
export async function createLLMClient() {
  try {
    // Ahora que las variables de entorno funcionan, podemos usar ChatOpenAI
    // Establecer explícitamente OPENAI_API_KEY
    process.env.OPENAI_API_KEY = process.env.OPENROUTER_API_KEY;
    
    const llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.7,
    });
    
    return llm;
  } catch (error) {
    console.error("Error creating LLM client:", error);
    throw error;
  }
} 