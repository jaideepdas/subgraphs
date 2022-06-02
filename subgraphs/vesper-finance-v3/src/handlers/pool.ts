import { log, dataSource, BigDecimal } from "@graphprotocol/graph-ts";
import {
  PoolV3,
  DepositCall,
  WithdrawCall,
} from "../../generated/vaUSDC_prod_RL4/PoolV3";
import {
  isStrategy,
  calculateRevenue,
  getDecimalDivisor,
  withdrawRevenueCalc,
} from "../peer";

import {
  getOrCreateVault,
  getOrCreateWithdraw,
  getOrCreateDeposit,
  updateVaultRewardEmission,
} from "../entities";
import { updateAllSnapshots } from "../snapshots";
import { Erc20Token } from "../../generated/vaUSDC_prod_RL4/Erc20Token";

// See handleWithdrawFee for explanation.
export function handleWithdrawV3(call: WithdrawCall): void {
  getOrCreateVault(
    dataSource.address(),
    call.block.number,
    call.block.timestamp
  );
  let poolAddress = dataSource.address();

  if (isStrategy(poolAddress, call.to)) {
    return;
  }

  const revenue = withdrawRevenueCalc(
    dataSource.address(),
    call.to,
    call.inputs._shares
  );

  updateVaultRewardEmission(dataSource.address());
  getOrCreateWithdraw(call, dataSource.address());
  updateAllSnapshots(
    1,
    call,
    dataSource.address(),
    revenue.protocolUsd,
    revenue.supplyUsd
  );
}

export function handleDepositV3(call: DepositCall): void {
  let poolAddress = dataSource.address();
  let poolAddressHex = poolAddress.toHexString();
  log.info("Entered handleTransferV3 in tx={}, pool={}", [
    call.transaction.hash.toHex(),
    poolAddressHex,
  ]);
  let poolV3 = PoolV3.bind(poolAddress);

  if (isStrategy(poolAddress, call.from)) {
    return;
  }

  getOrCreateVault(
    dataSource.address(),
    call.block.number,
    call.block.timestamp
  );
  updateVaultRewardEmission(dataSource.address());
  getOrCreateDeposit(call, dataSource.address());

  const token = Erc20Token.bind(poolV3.token());
  const revenue = calculateRevenue(
    call.inputs._amount.toBigDecimal().div(getDecimalDivisor(token.decimals())),
    BigDecimal.fromString("1"),
    poolV3.token()
  );
  log.info(
    "Fees distribution for pool{}: ProtocolRevenue={}, supplySideRevenue={}",
    [
      poolAddressHex,
      revenue.protocolRevenueUsd.toString(),
      revenue.supplySideRevenueUsd.toString(),
    ]
  );

  updateAllSnapshots(2, call, dataSource.address());
}