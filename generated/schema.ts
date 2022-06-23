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

export class Governance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Governance entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Governance must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Governance", id.toString(), this);
    }
  }

  static load(id: string): Governance | null {
    return changetype<Governance | null>(store.get("Governance", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get proposals(): BigInt {
    let value = this.get("proposals");
    return value!.toBigInt();
  }

  set proposals(value: BigInt) {
    this.set("proposals", Value.fromBigInt(value));
  }

  get currentTokenHolders(): BigInt {
    let value = this.get("currentTokenHolders");
    return value!.toBigInt();
  }

  set currentTokenHolders(value: BigInt) {
    this.set("currentTokenHolders", Value.fromBigInt(value));
  }

  get totalTokenHolders(): BigInt {
    let value = this.get("totalTokenHolders");
    return value!.toBigInt();
  }

  set totalTokenHolders(value: BigInt) {
    this.set("totalTokenHolders", Value.fromBigInt(value));
  }

  get currentDelegates(): BigInt {
    let value = this.get("currentDelegates");
    return value!.toBigInt();
  }

  set currentDelegates(value: BigInt) {
    this.set("currentDelegates", Value.fromBigInt(value));
  }

  get totalDelegates(): BigInt {
    let value = this.get("totalDelegates");
    return value!.toBigInt();
  }

  set totalDelegates(value: BigInt) {
    this.set("totalDelegates", Value.fromBigInt(value));
  }

  get delegatedVotesRaw(): BigInt {
    let value = this.get("delegatedVotesRaw");
    return value!.toBigInt();
  }

  set delegatedVotesRaw(value: BigInt) {
    this.set("delegatedVotesRaw", Value.fromBigInt(value));
  }

  get delegatedVotes(): BigDecimal {
    let value = this.get("delegatedVotes");
    return value!.toBigDecimal();
  }

  set delegatedVotes(value: BigDecimal) {
    this.set("delegatedVotes", Value.fromBigDecimal(value));
  }

  get proposalsQueued(): BigInt {
    let value = this.get("proposalsQueued");
    return value!.toBigInt();
  }

  set proposalsQueued(value: BigInt) {
    this.set("proposalsQueued", Value.fromBigInt(value));
  }

  get proposalsExecuted(): BigInt {
    let value = this.get("proposalsExecuted");
    return value!.toBigInt();
  }

  set proposalsExecuted(value: BigInt) {
    this.set("proposalsExecuted", Value.fromBigInt(value));
  }

  get proposalsCanceled(): BigInt {
    let value = this.get("proposalsCanceled");
    return value!.toBigInt();
  }

  set proposalsCanceled(value: BigInt) {
    this.set("proposalsCanceled", Value.fromBigInt(value));
  }

  get quorumNumerator(): BigInt | null {
    let value = this.get("quorumNumerator");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set quorumNumerator(value: BigInt | null) {
    if (!value) {
      this.unset("quorumNumerator");
    } else {
      this.set("quorumNumerator", Value.fromBigInt(<BigInt>value));
    }
  }

  get quorumDenominator(): BigInt | null {
    let value = this.get("quorumDenominator");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set quorumDenominator(value: BigInt | null) {
    if (!value) {
      this.unset("quorumDenominator");
    } else {
      this.set("quorumDenominator", Value.fromBigInt(<BigInt>value));
    }
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

  get proposalId(): BigInt {
    let value = this.get("proposalId");
    return value!.toBigInt();
  }

  set proposalId(value: BigInt) {
    this.set("proposalId", Value.fromBigInt(value));
  }

  get description(): string | null {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set description(value: string | null) {
    if (!value) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(<string>value));
    }
  }

  get proposer(): string {
    let value = this.get("proposer");
    return value!.toString();
  }

  set proposer(value: string) {
    this.set("proposer", Value.fromString(value));
  }

  get state(): string {
    let value = this.get("state");
    return value!.toString();
  }

  set state(value: string) {
    this.set("state", Value.fromString(value));
  }

  get againstVotes(): BigInt {
    let value = this.get("againstVotes");
    return value!.toBigInt();
  }

  set againstVotes(value: BigInt) {
    this.set("againstVotes", Value.fromBigInt(value));
  }

  get forVotes(): BigInt {
    let value = this.get("forVotes");
    return value!.toBigInt();
  }

  set forVotes(value: BigInt) {
    this.set("forVotes", Value.fromBigInt(value));
  }

  get abstainVotes(): BigInt {
    let value = this.get("abstainVotes");
    return value!.toBigInt();
  }

  set abstainVotes(value: BigInt) {
    this.set("abstainVotes", Value.fromBigInt(value));
  }

  get votes(): Array<string> {
    let value = this.get("votes");
    return value!.toStringArray();
  }

  set votes(value: Array<string>) {
    this.set("votes", Value.fromStringArray(value));
  }

  get creationBlock(): BigInt {
    let value = this.get("creationBlock");
    return value!.toBigInt();
  }

  set creationBlock(value: BigInt) {
    this.set("creationBlock", Value.fromBigInt(value));
  }

  get creationTime(): BigInt {
    let value = this.get("creationTime");
    return value!.toBigInt();
  }

  set creationTime(value: BigInt) {
    this.set("creationTime", Value.fromBigInt(value));
  }

  get startBlock(): BigInt {
    let value = this.get("startBlock");
    return value!.toBigInt();
  }

  set startBlock(value: BigInt) {
    this.set("startBlock", Value.fromBigInt(value));
  }

  get endBlock(): BigInt {
    let value = this.get("endBlock");
    return value!.toBigInt();
  }

  set endBlock(value: BigInt) {
    this.set("endBlock", Value.fromBigInt(value));
  }

  get executionETA(): BigInt | null {
    let value = this.get("executionETA");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set executionETA(value: BigInt | null) {
    if (!value) {
      this.unset("executionETA");
    } else {
      this.set("executionETA", Value.fromBigInt(<BigInt>value));
    }
  }

  get executionBlock(): BigInt | null {
    let value = this.get("executionBlock");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set executionBlock(value: BigInt | null) {
    if (!value) {
      this.unset("executionBlock");
    } else {
      this.set("executionBlock", Value.fromBigInt(<BigInt>value));
    }
  }

  get executionTime(): BigInt | null {
    let value = this.get("executionTime");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set executionTime(value: BigInt | null) {
    if (!value) {
      this.unset("executionTime");
    } else {
      this.set("executionTime", Value.fromBigInt(<BigInt>value));
    }
  }

  get cancellationBlock(): BigInt | null {
    let value = this.get("cancellationBlock");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set cancellationBlock(value: BigInt | null) {
    if (!value) {
      this.unset("cancellationBlock");
    } else {
      this.set("cancellationBlock", Value.fromBigInt(<BigInt>value));
    }
  }

  get cancellationTime(): BigInt | null {
    let value = this.get("cancellationTime");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set cancellationTime(value: BigInt | null) {
    if (!value) {
      this.unset("cancellationTime");
    } else {
      this.set("cancellationTime", Value.fromBigInt(<BigInt>value));
    }
  }

  get targets(): Array<string> | null {
    let value = this.get("targets");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set targets(value: Array<string> | null) {
    if (!value) {
      this.unset("targets");
    } else {
      this.set("targets", Value.fromStringArray(<Array<string>>value));
    }
  }

  get values(): Array<BigInt> | null {
    let value = this.get("values");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigIntArray();
    }
  }

  set values(value: Array<BigInt> | null) {
    if (!value) {
      this.unset("values");
    } else {
      this.set("values", Value.fromBigIntArray(<Array<BigInt>>value));
    }
  }

  get signatures(): Array<string> | null {
    let value = this.get("signatures");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set signatures(value: Array<string> | null) {
    if (!value) {
      this.unset("signatures");
    } else {
      this.set("signatures", Value.fromStringArray(<Array<string>>value));
    }
  }

  get calldatas(): Array<Bytes> | null {
    let value = this.get("calldatas");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set calldatas(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("calldatas");
    } else {
      this.set("calldatas", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }
}

export class Vote extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Vote entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Vote must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Vote", id.toString(), this);
    }
  }

  static load(id: string): Vote | null {
    return changetype<Vote | null>(store.get("Vote", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get choice(): string {
    let value = this.get("choice");
    return value!.toString();
  }

  set choice(value: string) {
    this.set("choice", Value.fromString(value));
  }

  get weight(): BigInt {
    let value = this.get("weight");
    return value!.toBigInt();
  }

  set weight(value: BigInt) {
    this.set("weight", Value.fromBigInt(value));
  }

  get reason(): string | null {
    let value = this.get("reason");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set reason(value: string | null) {
    if (!value) {
      this.unset("reason");
    } else {
      this.set("reason", Value.fromString(<string>value));
    }
  }

  get voter(): string {
    let value = this.get("voter");
    return value!.toString();
  }

  set voter(value: string) {
    this.set("voter", Value.fromString(value));
  }

  get proposal(): string {
    let value = this.get("proposal");
    return value!.toString();
  }

  set proposal(value: string) {
    this.set("proposal", Value.fromString(value));
  }
}

export class TokenHolder extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenHolder entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenHolder must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TokenHolder", id.toString(), this);
    }
  }

  static load(id: string): TokenHolder | null {
    return changetype<TokenHolder | null>(store.get("TokenHolder", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegate(): string | null {
    let value = this.get("delegate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set delegate(value: string | null) {
    if (!value) {
      this.unset("delegate");
    } else {
      this.set("delegate", Value.fromString(<string>value));
    }
  }

  get tokenBalanceRaw(): BigInt {
    let value = this.get("tokenBalanceRaw");
    return value!.toBigInt();
  }

  set tokenBalanceRaw(value: BigInt) {
    this.set("tokenBalanceRaw", Value.fromBigInt(value));
  }

  get tokenBalance(): BigDecimal {
    let value = this.get("tokenBalance");
    return value!.toBigDecimal();
  }

  set tokenBalance(value: BigDecimal) {
    this.set("tokenBalance", Value.fromBigDecimal(value));
  }

  get totalTokensHeldRaw(): BigInt {
    let value = this.get("totalTokensHeldRaw");
    return value!.toBigInt();
  }

  set totalTokensHeldRaw(value: BigInt) {
    this.set("totalTokensHeldRaw", Value.fromBigInt(value));
  }

  get totalTokensHeld(): BigDecimal {
    let value = this.get("totalTokensHeld");
    return value!.toBigDecimal();
  }

  set totalTokensHeld(value: BigDecimal) {
    this.set("totalTokensHeld", Value.fromBigDecimal(value));
  }
}

export class Delegate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Delegate entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Delegate must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Delegate", id.toString(), this);
    }
  }

  static load(id: string): Delegate | null {
    return changetype<Delegate | null>(store.get("Delegate", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegatedVotesRaw(): BigInt {
    let value = this.get("delegatedVotesRaw");
    return value!.toBigInt();
  }

  set delegatedVotesRaw(value: BigInt) {
    this.set("delegatedVotesRaw", Value.fromBigInt(value));
  }

  get delegatedVotes(): BigDecimal {
    let value = this.get("delegatedVotes");
    return value!.toBigDecimal();
  }

  set delegatedVotes(value: BigDecimal) {
    this.set("delegatedVotes", Value.fromBigDecimal(value));
  }

  get tokenHoldersRepresentedAmount(): i32 {
    let value = this.get("tokenHoldersRepresentedAmount");
    return value!.toI32();
  }

  set tokenHoldersRepresentedAmount(value: i32) {
    this.set("tokenHoldersRepresentedAmount", Value.fromI32(value));
  }

  get tokenHoldersRepresented(): Array<string> {
    let value = this.get("tokenHoldersRepresented");
    return value!.toStringArray();
  }

  set tokenHoldersRepresented(value: Array<string>) {
    this.set("tokenHoldersRepresented", Value.fromStringArray(value));
  }

  get votes(): Array<string> {
    let value = this.get("votes");
    return value!.toStringArray();
  }

  set votes(value: Array<string>) {
    this.set("votes", Value.fromStringArray(value));
  }

  get numberVotes(): i32 {
    let value = this.get("numberVotes");
    return value!.toI32();
  }

  set numberVotes(value: i32) {
    this.set("numberVotes", Value.fromI32(value));
  }

  get proposals(): Array<string> {
    let value = this.get("proposals");
    return value!.toStringArray();
  }

  set proposals(value: Array<string>) {
    this.set("proposals", Value.fromStringArray(value));
  }
}