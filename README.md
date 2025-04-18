# Blockchain AI Agent with Hedera Agent Kit

This project demonstrates how to build an AI agent that interacts with the Hedera blockchain and Web2 APIs using LangChain, LangGraph, and the Hedera Agent Kit.

## Architecture

The agent follows the standard AI agent execution loop:
1. User sends a query to the agent
2. Agent processes the query through LangGraph
3. LangGraph invokes LangChain and available tools
4. Tools interact with external systems (Hedera blockchain, Weather API)
5. Response is returned to the user

## Features

### Hedera Blockchain Operations
Using the Hedera Agent Kit, the agent can perform various operations on the Hedera network:

- **Token Operations**:
  - Create fungible tokens (FT)
  - Create non-fungible tokens (NFT)
  - Mint additional tokens
  - Transfer tokens between accounts
  - Associate/dissociate tokens with accounts
  - Reject tokens from accounts

- **HBAR Transactions**:
  - Transfer HBAR between accounts

- **Airdrop Management**:
  - Airdrop tokens to multiple recipients
  - Claim pending airdrops

- **Token Balance Queries**:
  - Get HBAR balances
  - Get token balances for specific token IDs
  - Retrieve all token balances for an account
  - Get token holders for a specific token

- **Topic Management (HCS)**:
  - Create and delete topics
  - Submit messages to topics
  - Get topic information
  - Retrieve messages from topics

### Web2 API Integration
- **Weather Information**:
  - Get current weather conditions for a location

## Project Structure

```
blockchain-ai-agent/
├── index.js             # Main entry point with CLI interface
├── clients/
│   ├── hederaClient.js  # Hedera client using Hedera Agent Kit
│   └── llmClient.js     # LLM client (OpenRouter/OpenAI)
├── agent/
│   ├── agentGraph.js    # LangGraph agent implementation
│   └── tools/
│       ├── hederaTools.js  # Hedera Agent Kit tools wrapper
│       └── weatherTools.js # Tools for Web2 API interactions
└── .env                 # Environment variables
```

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your API keys and credentials:
   ```
   cp .env.example .env
   ```

## Running the Agent

```
npm start
```

Then follow the interactive CLI prompts to interact with the agent.

## Example Queries

- "Create a new fungible token called 'MyToken' with symbol 'MTK' and initial supply of 1000"
- "Transfer 50 HBAR to account 0.0.12345"
- "What's the balance of my Hedera account?"
- "What's the weather in New York City?"

## Dependencies

- LangChain & LangGraph - For agent workflows
- Hedera Agent Kit - For Hedera blockchain interactions
- OpenRouter - For LLM access (OpenAI models)
- Dotenv - For environment variables 