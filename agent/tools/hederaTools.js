import { StructuredTool } from "@langchain/core/tools";

/**
 * Creates tools for interacting with the Hedera blockchain using Standards Agent Kit
 * @param {Object} hederaClient - The initialized hederaClient containing the tools
 * @returns {Array<StructuredTool>} Array of Hedera tools
 */
export function createHederaTools(hederaClient) {
  // Extract specific tools from the tools object provided by initializeHCS10Client
  const {
    registerAgentTool,
    initiateConnectionTool,
    sendMessageTool,
    findRegistrationsTool,
    listConnectionsTool,
    acceptConnectionRequestTool,
    listUnapprovedConnectionRequestsTool,
    connectionMonitorTool
  } = hederaClient.tools;
  
  // Return an array of LangChain tools
  const tools = [
    registerAgentTool,
    initiateConnectionTool,
    sendMessageTool,
    findRegistrationsTool,
    listConnectionsTool,
    acceptConnectionRequestTool,
    listUnapprovedConnectionRequestsTool,
    connectionMonitorTool
  ].filter(tool => tool !== undefined);
  
  return tools;
} 