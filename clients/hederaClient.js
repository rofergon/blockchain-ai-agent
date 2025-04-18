import { initializeHCS10Client } from '@hashgraphonline/standards-agent-kit';

/**
 * Factory function to create a Hedera client using Standards Agent Kit
 * @returns {Object} The HCS10 client and tools
 */
export async function createHederaClient() {
  try {
    // Asegurar que tenemos las credenciales
    if (!process.env.HEDERA_ACCOUNT_ID || !process.env.HEDERA_PRIVATE_KEY) {
      throw new Error("Hedera credentials are missing in environment variables");
    }
    
    const accountId = process.env.HEDERA_ACCOUNT_ID;
    const privateKey = process.env.HEDERA_PRIVATE_KEY;
    const network = process.env.HEDERA_NETWORK || 'testnet';
    
    console.log(`Initializing Hedera client with account ID: ${accountId} on network: ${network}`);
    
    // También configurar las variables que podría estar buscando la biblioteca
    process.env.OPERATOR_ID = accountId;
    process.env.OPERATOR_KEY = privateKey;
    
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
  } catch (error) {
    console.error("Error initializing Hedera client:", error);
    throw error;
  }
} 