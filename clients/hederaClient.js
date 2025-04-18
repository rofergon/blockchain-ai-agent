import { initializeHCS10Client } from '@hashgraphonline/standards-agent-kit';

/**
 * Factory function to create a Hedera client using Standards Agent Kit
 * @returns {Object} The HCS10 client and tools
 */
export async function createHederaClient() {
  const accountId = process.env.HEDERA_ACCOUNT_ID;
  const privateKey = process.env.HEDERA_PRIVATE_KEY;
  const network = process.env.HEDERA_NETWORK || 'testnet';
  
  const { hcs10Client, tools, stateManager } = await initializeHCS10Client({
    clientConfig: {
      operatorId: accountId,
      operatorKey: privateKey,
      network: network,
      useEncryption: false
    },
    createAllTools: true,
    monitoringClient: true
  });
  
  return { hcs10Client, tools, stateManager };
} 