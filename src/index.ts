import { ponder } from '@/generated'

const logEvent = async ({ event, context }) => {
  const { args, log, block, transaction } = event

  let addr
  let acc
  if (event.name === 'Deposit' || event.name === 'Withdraw') {
    addr = args.lender
    acc = ''
  } else if (event.name === 'Borrow' || event.name === 'Repay') {
    addr = ''
    acc = args.borrower
  } else {
    addr = args.owner
    acc = event.args.account
  }

  const record = {
    address: addr,
    account: acc,
    type: event.name,
    amount: args.amount,
    timestamp: block.timestamp,
    blockHeight: block.number,
    txFrom: transaction.from,
  }

  await context.db.EventLog.upsert({
    id: event.transaction.hash,
    create: record,
    update: record,
  })
}

const logAccountCreation = async ({ event, context }) => {
  const { args, log, block, transaction } = event

  const record = {
    id: args.account,
    owner: args.owner,
  }

  await context.db.Account.upsert({
    id: record.id,
    create: record,
    update: record,
  })
}

ponder.on('OldJuiceAccountManager:AccountBorrowed', logEvent)

ponder.on('OldJuiceAccountManager:AccountRepaid', logEvent)

ponder.on('OldJuiceAccountManager:CollateralDeposit', logEvent)

ponder.on('OldJuiceAccountManager:CollateralWithdrawal', logEvent)

ponder.on('OldJuiceAccountManager:AccountCreated', logAccountCreation)

ponder.on('JuiceAccountManager:AccountBorrowed', logEvent)

ponder.on('JuiceAccountManager:AccountRepaid', logEvent)

ponder.on('JuiceAccountManager:CollateralDeposit', logEvent)

ponder.on('JuiceAccountManager:CollateralWithdrawal', logEvent)

ponder.on('JuiceAccountManager:AccountCreated', logAccountCreation)

ponder.on('JuiceLendingPool:Deposit', logEvent)

ponder.on('JuiceLendingPool:Withdraw', logEvent)

ponder.on('JuiceLendingPool:Borrow', logEvent)

ponder.on('JuiceLendingPool:Repay', logEvent)
