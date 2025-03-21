import * as constants from "../common/constants";
import { Booster__poolInfoResult } from "../../generated/Booster/Booster";
import { Address, BigDecimal, BigInt, Wrapped } from "@graphprotocol/graph-ts";

export class PoolInfoType {
  private _lpToken: Wrapped<Address>;
  private _token: Wrapped<Address>;
  private _gauge: Wrapped<Address>;
  private _crvRewards: Wrapped<Address>;
  private _stash: Wrapped<Address>;
  private _shutdown: Wrapped<boolean>;

  constructor(result: Booster__poolInfoResult) {
    this._lpToken = new Wrapped(result.value0);
    this._token = new Wrapped(result.value1);
    this._gauge = new Wrapped(result.value2);
    this._crvRewards = new Wrapped(result.value3);
    this._stash = new Wrapped(result.value4);
    this._shutdown = new Wrapped(result.value5);
  }

  get lpToken(): Address {
    return changetype<Wrapped<Address>>(this._lpToken).inner;
  }

  get token(): Address {
    return changetype<Wrapped<Address>>(this._token).inner;
  }

  get gauge(): Address {
    return changetype<Wrapped<Address>>(this._gauge).inner;
  }

  get crvRewards(): Address {
    return changetype<Wrapped<Address>>(this._crvRewards).inner;
  }

  get stash(): Address {
    return changetype<Wrapped<Address>>(this._stash).inner;
  }

  get shutdown(): boolean {
    return changetype<Wrapped<boolean>>(this._shutdown).inner;
  }
}

export class CustomFeesType {
  private _lockIncentive: BigInt;
  private _callIncentive: BigInt;
  private _stakerIncentive: BigInt;
  private _platformFee: BigInt;

  constructor(
    lockIncentive: BigInt,
    callIncentive: BigInt,
    stakerIncentive: BigInt,
    platformFee: BigInt
  ) {
    this._lockIncentive = lockIncentive;
    this._callIncentive = callIncentive;
    this._stakerIncentive = stakerIncentive;
    this._platformFee = platformFee;
  }

  get lockIncentive(): BigDecimal {
    return this._lockIncentive.toBigDecimal().div(
      constants.DENOMINATOR
    );
  }
  get callIncentive(): BigDecimal {
    return this._callIncentive.toBigDecimal().div(
      constants.DENOMINATOR
    );
  }
  get stakerIncentive(): BigDecimal {
    return this._stakerIncentive.toBigDecimal().div(
      constants.DENOMINATOR
    );
  }
  get platformFee(): BigDecimal {
    return this._platformFee.toBigDecimal().div(
      constants.DENOMINATOR
    );
  }

  totalFees(): BigDecimal {
    return this.lockIncentive.plus(this.callIncentive).plus(this.stakerIncentive).plus(this.platformFee)
  }
}
