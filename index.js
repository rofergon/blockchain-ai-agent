// Main entry point for the Blockchain AI Agent
import dotenv from 'dotenv';
import readline from 'readline';
import { createLLMClient } from './clients/llmClient.js';
import { createHederaClient } from './clients/hederaClient.js';
import { createAgentGraph } from './agent/agentGraph.js';

// Initialize environment variables
dotenv.config();

// Create readline interface for CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialize clients and agent
let llmClient;
let hederaClient;
let agent;

async function initialize() {
  try {
    console.log('Initializing clients...');
    llmClient = await createLLMClient();
    hederaClient = await createHederaClient();
    
    console.log('Creating agent...');
    agent = await createAgentGraph(llmClient, hederaClient);
    
    console.log('\n✅ Blockchain AI Agent initialized successfully!\n');
    console.log('Available features:');
    console.log('  - Agent registration and management');
    console.log('  - Agent-to-agent connections');
    console.log('  - Message sending via HCS');
    console.log('  - Agent discovery');
    console.log('  - Weather information\n');
    console.log('Type "exit" to quit');
    console.log('-'.repeat(50));
    
    // Start the CLI loop
    promptUser();
  } catch (error) {
    console.error("Error initializing agent:", error);
    process.exit(1);
  }
}

function promptUser() {
  rl.question('> ', async (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }
    
    try {
      console.log('Processing...');
      const result = await agent.invoke({ input });
      console.log('\nAgent Response:');
      console.log(result.output);
      console.log('-'.repeat(50));
    } catch (error) {
      console.error("Error:", error.message);
    }
    
    // Continue the loop
    promptUser();
  });
}

// Start the application
initialize(); 