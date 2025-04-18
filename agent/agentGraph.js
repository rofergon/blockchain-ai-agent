import { RunnableSequence } from "langchain/schema/runnable";
import { StateGraph, END } from "@langchain/langgraph";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { createHederaTools } from "./tools/hederaTools.js";
import { createWeatherTools } from "./tools/weatherTools.js";

/**
 * Creates an agent graph using LangGraph and LangChain
 * @param {ChatOpenAI} llm - The LLM client
 * @param {Object} hederaClient - The Hedera client object from Standards Agent Kit
 * @returns {StateGraph} The configured agent graph
 */
export async function createAgentGraph(llm, hederaClient) {
  // Create tools
  const hederaTools = createHederaTools(hederaClient);
  const weatherTools = createWeatherTools();
  
  const tools = [...hederaTools, ...weatherTools];
  
  // Create a ToolNode that encapsulates all tools
  const toolsNode = new ToolNode(tools);
  
  // Create the system prompt
  const systemPrompt = `You are a helpful assistant that can perform actions using tools and answer questions.
For blockchain operations, you can interact with the Hedera network for various operations like:
- Registering AI agents
- Initiating connections between agents
- Sending messages to other agents
- Finding agent registrations
- Managing agent connections

For weather information, you can get the current weather for a location.

When asked to perform operations, follow these steps:
1. Understand what the user wants
2. Choose the right tool for the job
3. Use the tool correctly
4. Provide a helpful response`;

  // Create agent prompt
  const agentPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    ["human", "{input}"],
  ]);

  // Define the agent state
  const agentState = {
    input: {
      value: "",
    }
  };

  // Create the graph
  const workflow = new StateGraph({
    channels: agentState,
  });

  // Define the main agent node
  const agentNode = RunnableSequence.from([
    agentPrompt,
    llm,
  ]);

  // Add nodes to the graph
  workflow.addNode("agent", agentNode);
  workflow.addNode("tools", toolsNode);

  // Set the entry point
  workflow.setEntryPoint("agent");

  // Define the edges
  workflow.addEdge("agent", "tools");
  workflow.addEdge("tools", END);

  // Compile the graph
  return workflow.compile();
} 