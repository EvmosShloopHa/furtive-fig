import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes } from "@graphprotocol/graph-ts"
import {
  MeloVaultCreated,
  ProposalCreated,
  ProposalExecuted
} from "../generated/MeloVault/MeloVault"

export function createMeloVaultCreatedEvent(name: string): MeloVaultCreated {
  let meloVaultCreatedEvent = changetype<MeloVaultCreated>(newMockEvent())

  meloVaultCreatedEvent.parameters = new Array()

  meloVaultCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return meloVaultCreatedEvent
}

export function createProposalCreatedEvent(
  id: Bytes,
  snapshotBlockHash: Bytes,
  proposal: ethereum.Tuple
): ProposalCreated {
  let proposalCreatedEvent = changetype<ProposalCreated>(newMockEvent())

  proposalCreatedEvent.parameters = new Array()

  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "snapshotBlockHash",
      ethereum.Value.fromFixedBytes(snapshotBlockHash)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromTuple(proposal))
  )

  return proposalCreatedEvent
}

export function createProposalExecutedEvent(
  id: Bytes,
  proposal: ethereum.Tuple
): ProposalExecuted {
  let proposalExecutedEvent = changetype<ProposalExecuted>(newMockEvent())

  proposalExecutedEvent.parameters = new Array()

  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )
  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromTuple(proposal))
  )

  return proposalExecutedEvent
}
