// Main entry point for the Blockchain AI Agent
import dotenv from 'dotenv';
import readline from 'readline';
import { createLLMClient } from './clients/llmClient.js';
import { createHederaClient } from './clients/hederaClient.js';
import { createAgentGraph } from './agent/agentGraph.js';

// Initialize environment variables
dotenv.config();

// Debug environment variables
console.log('Environment variables loaded:');
console.log('HEDERA_ACCOUNT_ID:', process.env.HEDERA_ACCOUNT_ID ? '✅' : '❌');
console.log('HEDERA_PRIVATE_KEY:', process.env.HEDERA_PRIVATE_KEY ? '✅' : '❌');
console.log('HEDERA_NETWORK:', process.env.HEDERA_NETWORK ? '✅' : '❌');
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? '✅' : '❌');

// Create readline interface for CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialize clients and agent
let llmClient;
let hederaClient;
let agent;

// Define menu options
const menuOptions = [
  { id: 1, name: "Agent Registration", prompt: "Register a new agent on Hedera" },
  { id: 2, name: "Initiate Connection", prompt: "Start a connection with another agent" },
  { id: 3, name: "Send Message", prompt: "Send a message to a connected agent" },
  { id: 4, name: "Find Registrations", prompt: "Search for registered agents" },
  { id: 5, name: "List Connections", prompt: "Show your active connections" },
  { id: 6, name: "Weather Information", prompt: "Get current weather for a location" },
  { id: 7, name: "Custom Query", prompt: "Ask the agent a custom question" },
  { id: 8, name: "Exit", prompt: "Exit the application" }
];

async function initialize() {
  try {
    console.log('Initializing clients...');
    llmClient = await createLLMClient();
    hederaClient = await createHederaClient();
    
    console.log('Creating agent...');
    agent = await createAgentGraph(llmClient, hederaClient);
    
    console.log('\n✅ Blockchain AI Agent initialized successfully!\n');
    
    // Start the menu loop
    showMainMenu();
  } catch (error) {
    console.error("Error initializing agent:", error);
    process.exit(1);
  }
}

function showMainMenu() {
  console.log('\n===== BLOCKCHAIN AI AGENT MENU =====');
  menuOptions.forEach(option => {
    console.log(`${option.id}. ${option.name}`);
  });
  console.log('===================================');
  
  rl.question('Select an option (1-8): ', handleMenuSelection);
}

async function handleMenuSelection(selection) {
  const option = parseInt(selection);
  
  if (isNaN(option) || option < 1 || option > menuOptions.length) {
    console.log('Invalid selection. Please try again.');
    return showMainMenu();
  }
  
  if (option === 8) {
    // Exit option
    console.log('Goodbye!');
    rl.close();
    return;
  }
  
  if (option === 7) {
    // Custom query option
    return rl.question('Enter your custom query: ', handleCustomQuery);
  }
  
  // Handle specific feature options (1-6)
  const selectedOption = menuOptions[option - 1];
  console.log(`\nYou selected: ${selectedOption.name}`);
  
  try {
    console.log('Processing...');
    // Pass a structured prompt based on the option
    const result = await agent.invoke({ 
      input: selectedOption.prompt 
    });
    
    console.log('\nAgent Response:');
    // Acceder correctamente a la respuesta del agente
    if (result && result.input && result.input.value) {
      console.log(result.input.value);
    } else {
      // Imprimir todo el resultado para depuración
      console.log('Raw result:');
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
  
  // Return to main menu
  showMainMenu();
}

async function handleCustomQuery(query) {
  if (!query.trim()) {
    console.log('Query cannot be empty.');
    return showMainMenu();
  }
  
  try {
    console.log('Processing...');
    const result = await agent.invoke({ input: query });
    
    console.log('\nAgent Response:');
    // Acceder correctamente a la respuesta del agente
    if (result && result.input && result.input.value) {
      console.log(result.input.value);
    } else {
      // Imprimir todo el resultado para depuración
      console.log('Raw result:');
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
  
  // Return to main menu
  showMainMenu();
}

// Start the application
initialize(); 