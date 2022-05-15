import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { PoolV3 } from "../generated/vaUSDC_prod_RL4/PoolV3";
import { Controller } from "../generated/vaUSDC_prod_RL4/Controller";
import { StrategyV3 } from "../generated/vaUSDC_prod_RL4/StrategyV3";
import { PriceRouter } from "../generated/vaUSDC_prod_RL4/PriceRouter";
import { Erc20Token } from "../generated/vaUSDC_prod_RL4/Erc20Token";
import {
  ROUTER_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  CONTROLLER_ADDRESS_HEX,
} from "./constant";

export function getDecimalDivisor(decimals: i32): BigDecimal {
  return BigDecimal.fromString("1".concat("0".repeat(decimals)));
}

function getUsdPriceRate(decimals: i32, address: Address): BigDecimal | null {
  let priceRouter = PriceRouter.bind(ROUTER_ADDRESS);
  // Interpolation with ``not supported by AssemblyScript
  let oneUnit = BigInt.fromString("1".concat("0".repeat(decimals)));
  // the second parameter returns the rate
  let paths: Address[] = [address];
  if (address != WETH_ADDRESS) {
    paths.push(WETH_ADDRESS);
  }
  paths.push(USDC_ADDRESS);
  log.info("Trying to retrieve USDC rate for address {} with decimals={}.", [
    address.toHexString(),
    decimals.toString(),
  ]);
  let ratesCall = priceRouter.try_getAmountsOut(oneUnit, paths);
  if (ratesCall.reverted) {
    log.error("failed to retrieve usdc rate for address={}, decimals={}", [
      address.toHexString(),
      decimals.toString(),
    ]);
    return null;
  }
  // divide by one unit of USDC
  return ratesCall.value
    .pop()
    .toBigDecimal()
    .div(getDecimalDivisor(6));
}

export function toUsd(
  amountIn: BigDecimal,
  decimals: i32,
  tokenAddress: Address
): BigDecimal {
  // if we are converting from Usdc, it's the same destiniy token, so we return the same value

  if (tokenAddress == USDC_ADDRESS) {
    return amountIn;
  }
  // if the amount to convert is 0, then
  if (amountIn === BigDecimal.fromString("0")) {
    return amountIn;
  }
  const usdRate = getUsdPriceRate(decimals, tokenAddress);
  if (!usdRate) {
    log.info("Cannot convert {} from address={} to USDC as rate was null", [
      amountIn.toString(),
      tokenAddress.toHexString(),
    ]);
    return BigDecimal.fromString("0");
  }
  log.info("USDC rate for address={} is {}", [
    tokenAddress.toHexString(),
    usdRate.toString(),
  ]);
  // explicit cast required
  return amountIn.times(usdRate as BigDecimal).div(getDecimalDivisor(decimals));
}

export function getStrategyAddress(poolAddress: Address): Address {
  let controller = Controller.bind(Address.fromString(CONTROLLER_ADDRESS_HEX));
  return controller.strategy(poolAddress);
}

export function getStrategy(poolAddress: Address): StrategyV3 {
  let strategyAddress = getStrategyAddress(poolAddress);
  return StrategyV3.bind(strategyAddress);
}

// using this implementation because .includes() fails in comparison
// and closures are not supported in AssemblyScript (so we can't use .some())
export function hasStrategy(addresses: Address[], toFound: Address): bool {
  for (let i = 0, k = addresses.length; i < k; ++i) {
    let found = addresses[i] == toFound;
    if (found) {
      log.info("Address {} found in the list of strategies", [
        toFound.toHexString(),
      ]);
      return true;
    }
  }
  log.info("Address {} not found in the list of strategies", [
    toFound.toHexString(),
  ]);
  return false;
}

export function getShareToTokenRateV3(pool: PoolV3): BigDecimal {
  return pool
    .pricePerShare()
    .toBigDecimal()
    .div(getDecimalDivisor(pool.decimals()));
}

export class Revenue {
  protocolRevenue: BigDecimal;
  protocolRevenueUsd: BigDecimal;
  supplySideRevenue: BigDecimal;
  supplySideRevenueUsd: BigDecimal;
  constructor(
    _protocolRevenue: BigDecimal,
    _supplySideRevenue: BigDecimal,
    shareToTokenRate: BigDecimal,
    tokenAddress: Address
  ) {
    let tokenDecimals = Erc20Token.bind(tokenAddress).decimals();
    let protocolRevenue = _protocolRevenue.times(shareToTokenRate);
    this.protocolRevenue = protocolRevenue;
    this.protocolRevenueUsd = toUsd(
      protocolRevenue,
      tokenDecimals,
      tokenAddress
    );
    let supplySideRevenue = _supplySideRevenue.times(shareToTokenRate);
    this.supplySideRevenue = supplySideRevenue;
    this.supplySideRevenueUsd = toUsd(
      supplySideRevenue,
      tokenDecimals,
      tokenAddress
    );
  }
}

export function calculateRevenue(
  interest: BigDecimal,
  shareToTokenRate: BigDecimal,
  tokenAddress: Address
): Revenue {
  // 95% of the fees go to the protocol revenue
  let protocolRevenue = interest.times(BigDecimal.fromString("0.95"));
  // 5% of the fees go to the supply-side revenue
  let supplySideRevenue = interest.times(BigDecimal.fromString("0.05"));
  return new Revenue(
    protocolRevenue,
    supplySideRevenue,
    shareToTokenRate,
    tokenAddress
  );
}
