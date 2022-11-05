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
  const proposalId = event.address + '-' + event.params.id.toString()
  const proposal = new Proposal(proposalId)

  // Increment proposed count on Vault.
  const vault = Vault.load(event.address.toHex())
  if (vault) {
    vault.proposed = vault.proposed + BigInt.fromI32(1)
    vault.save()
  }
}

export function handleProposalExecuted(event: ProposalExecuted): void {
  // Find Proposal and mark as executed.
  const proposalId = event.address + '-' + event.params.id.toString()
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

// Note: If a handler doesn't require existing field values, it is faster
// _not_ to load the entity from the store. Instead, create it fresh with
// `new Entity(...)`, set the fields that should be updated and save the
// entity back to the store. Fields that were not set or unset remain
// unchanged, allowing for partial updates to be applied.

// It is also possible to access smart contracts from mappings. For
// example, the contract that has emitted the event can be connected to
// with:
//
// let contract = Contract.bind(event.address)
//
// The following functions can then be called on this contract to access
// state variables and other data:
//
// - contract.blocksAllowedForExecution(...)
// - contract.executed(...)
// - contract.maxBlocksInFuture(...)
// - contract.name(...)
// - contract.nft(...)
// - contract.proposalHash(...)
// - contract.proposals(...)
// - contract.verifier(...)
