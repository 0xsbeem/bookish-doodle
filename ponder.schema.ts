import { createSchema } from '@ponder/core'

export default createSchema((p) => ({
  EventLog: p.createTable({
    id: p.string(), // User address.
    address: p.string(), // User address.
    account: p.string(), // Account address.
    type: p.string(), // Event type.
    amount: p.bigint(), // Amount of usdb the user has borrowed from the lending pool
    timestamp: p.bigint(), // Event timestamp.
    blockHeight: p.bigint(), // Block height
    txFrom: p.string(), // 'from' in the transaction (who sent it)
  }),
  Account: p.createTable({
    id: p.string(), // account ID
    owner: p.string(), // wallet address of the account creator
  }),
}))
