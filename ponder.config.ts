import { createConfig } from '@ponder/core'

import 'dotenv/config'

import { Address, defineChain, http } from 'viem'

import { juiceAccountManagerAbi, juiceLendingPoolAbi } from './abis/abis'

// const envSchema = z.object({
//   JUICE_LENDING_POOL: z.custom<Address>(),
//   JUICE_ACCOUNT_MANAGER: z.custom<Address>(),
//   PONDER_RPC_URL_BLAST: z.string(),
//   START_BLOCK: z.number(),
// })

// const env = envSchema.parse(process.env)

const env = {
  OLD_JUICE_ACCOUNT_MANAGER: process.env.OLD_JUICE_ACCOUNT_MANAGER,
  JUICE_LENDING_POOL: process.env.JUICE_LENDING_POOL,
  JUICE_ACCOUNT_MANAGER: process.env.JUICE_ACCOUNT_MANAGER,
  BLAST_RPC_URL: process.env.BLAST_RPC_URL,
  START_BLOCK: Number(process.env.START_BLOCK),
  END_BLOCK: process.env.END_BLOCK ? Number(process.env.END_BLOCK) : undefined,
}

export default createConfig({
  networks: {
    blastSepolia: {
      chainId: 168587773,
      transport: http(env.BLAST_RPC_URL),
    },
    blastMainnet: {
      chainId: 81457,
      transport: http(env.BLAST_RPC_URL),
      maxRequestsPerSecond: 150,
    },
  },
  contracts: {
    OldJuiceAccountManager: {
      network: 'blastMainnet',
      address: env.OLD_JUICE_ACCOUNT_MANAGER as Address,
      startBlock: env.START_BLOCK,
      endBlock: env.END_BLOCK,
      abi: juiceAccountManagerAbi,
    },
    JuiceAccountManager: {
      network: 'blastMainnet',
      address: env.JUICE_ACCOUNT_MANAGER as Address,
      startBlock: env.START_BLOCK,
      endBlock: env.END_BLOCK,
      abi: juiceAccountManagerAbi,
    },
    JuiceLendingPool: {
      network: 'blastMainnet',
      address: env.JUICE_LENDING_POOL as Address,
      startBlock: env.START_BLOCK,
      abi: juiceLendingPoolAbi,
    },
  },
})
