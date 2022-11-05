// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Vault extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Vault entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Vault must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Vault", id.toString(), this);
    }
  }

  static load(id: string): Vault | null {
    return changetype<Vault | null>(store.get("Vault", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get collection(): string {
    let value = this.get("collection");
    return value!.toString();
  }

  set collection(value: string) {
    this.set("collection", Value.fromString(value));
  }

  get proposed(): BigInt {
    let value = this.get("proposed");
    return value!.toBigInt();
  }

  set proposed(value: BigInt) {
    this.set("proposed", Value.fromBigInt(value));
  }

  get executed(): BigInt {
    let value = this.get("executed");
    return value!.toBigInt();
  }

  set executed(value: BigInt) {
    this.set("executed", Value.fromBigInt(value));
  }
}

export class Proposal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Proposal entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Proposal must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Proposal", id.toString(), this);
    }
  }

  static load(id: string): Proposal | null {
    return changetype<Proposal | null>(store.get("Proposal", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get title(): string {
    let value = this.get("title");
    return value!.toString();
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get snapshotBlock(): string {
    let value = this.get("snapshotBlock");
    return value!.toString();
  }

  set snapshotBlock(value: string) {
    this.set("snapshotBlock", Value.fromString(value));
  }

  get endBlock(): BigInt {
    let value = this.get("endBlock");
    return value!.toBigInt();
  }

  set endBlock(value: BigInt) {
    this.set("endBlock", Value.fromBigInt(value));
  }

  get vaultId(): string {
    let value = this.get("vaultId");
    return value!.toString();
  }

  set vaultId(value: string) {
    this.set("vaultId", Value.fromString(value));
  }

  get executed(): boolean {
    let value = this.get("executed");
    return value!.toBoolean();
  }

  set executed(value: boolean) {
    this.set("executed", Value.fromBoolean(value));
  }

  get executedAt(): BigInt {
    let value = this.get("executedAt");
    return value!.toBigInt();
  }

  set executedAt(value: BigInt) {
    this.set("executedAt", Value.fromBigInt(value));
  }

  get executedTx(): string {
    let value = this.get("executedTx");
    return value!.toString();
  }

  set executedTx(value: string) {
    this.set("executedTx", Value.fromString(value));
  }

  get transactions(): Array<string> | null {
    let value = this.get("transactions");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set transactions(value: Array<string> | null) {
    if (!value) {
      this.unset("transactions");
    } else {
      this.set("transactions", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Transaction must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Transaction", id.toString(), this);
    }
  }

  static load(id: string): Transaction | null {
    return changetype<Transaction | null>(store.get("Transaction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value!.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get data(): string {
    let value = this.get("data");
    return value!.toString();
  }

  set data(value: string) {
    this.set("data", Value.fromString(value));
  }

  get gas(): BigInt {
    let value = this.get("gas");
    return value!.toBigInt();
  }

  set gas(value: BigInt) {
    this.set("gas", Value.fromBigInt(value));
  }
}
