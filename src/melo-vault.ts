import { BigInt } from "@graphprotocol/graph-ts"
import {
  MeloVaultCreated,
  ProposalCreated,
  ProposalExecuted
} from "../generated/MeloVault/MeloVault"
import { Vault, Proposal, Transaction } from "../generated/schema"

export function handleMeloVaultCreated(event: MeloVaultCreated): void {
  // Always creates a new vault.
  const vault = new Vault(event.address.toHex())
  vault.name = event.params.name.toString()
  vault.collection = event.params.token.toHex()
  vault.proposed = BigInt.fromI32(0)
  vault.executed = BigInt.fromI32(0)

  vault.save()
}

export function handleProposalCreated(event: ProposalCreated): void {
  // Create Proposal.
  const proposalId = event.address.toHex() + '-' + event.params.id.toString()
  const proposal = new Proposal(proposalId)
  proposal.title = event.params.proposal.title
  proposal.description = event.params.proposal.descriptionHash
  proposal.endBlock = event.params.proposal.endBlock
  proposal.vault = event.address.toHex()
  proposal.executed = false

  const transactions: string[] = []
  const length = event.params.proposal.transactions.length
  for (let idx = 0; idx < length; ++idx) {
    const tx = event.params.proposal.transactions[idx]
    const tId = proposal.vault + '-' + proposal.id + '-' + idx.toString()
    const transaction = new Transaction(tId)
    transaction.to = tx.to.toHex()
    transaction.value = tx.value
    transaction.data = tx.data.toHex()
    transaction.gas = tx.gas
    transaction.save()

    transactions.push(transaction.id)
  }

  proposal.transactions = transactions
  proposal.save()

  // Increment proposed count on Vault.
  const vault = Vault.load(event.address.toHex())
  if (vault) {
    vault.proposed = vault.proposed + BigInt.fromI32(1)
    vault.save()
  }
}

export function handleProposalExecuted(event: ProposalExecuted): void {
  // Find Proposal and mark as executed.
  const proposalId = event.address.toHex() + '-' + event.params.id.toString()
  const proposal = Proposal.load(proposalId)
  if (proposal) {
    proposal.executed = true
    proposal.executedAt = event.block.number
    proposal.executedTx = event.transaction.hash.toString()
    proposal.save()
  }

  // Increment executed count on Vault.
  const vault = Vault.load(event.address.toHex())
  if (vault) {
    vault.executed = vault.executed + BigInt.fromI32(1)
    vault.save()
  }
}
