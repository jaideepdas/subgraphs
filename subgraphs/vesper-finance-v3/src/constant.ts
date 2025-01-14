import { Address, BigInt, BigDecimal } from "@graphprotocol/graph-ts";

export const ROUTER_ADDRESS = Address.fromString(
  "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
);
export const USDC_ADDRESS = Address.fromString(
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
);
export const WETH_ADDRESS = Address.fromString(
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
);
export const CONTROLLER_ADDRESS_HEX =
  "0xa4F1671d3Aee73C05b552d57f2d16d3cfcBd0217";
export const VVSP_ADDRESS_HEX = "0xbA4cFE5741b357FA371b506e5db0774aBFeCf8Fc";
export const ZERO_ADDRESS_HEX = "0x0000000000000000000000000000000000000000";
export const VVSP_ADDRESS = Address.fromString(VVSP_ADDRESS_HEX);
export const ZERO_ADDRESS = Address.fromString(ZERO_ADDRESS_HEX);
export const USDC_DENOMINATOR = BigInt.fromString("1000000");
export const SECONDS_PER_DAY = 84600;
export const VESPER_TOKEN_HEX = "0x1b40183EFB4Dd766f11bDa7A7c3AD8982e998421";
export const VESPER_TOKEN = Address.fromString(VESPER_TOKEN_HEX);
export const SECONDS_PER_HOUR = 3600;

export const GROW_POOL_WITHDRAW_FEE = BigDecimal.fromString("0.6").div(BigDecimal.fromString("100"));
export const GROW_POOL_PLATFORM_FEE = BigDecimal.fromString("20").div(BigDecimal.fromString("100"));
export const EARN_POOL_WITHDRAW_FEE = BigDecimal.zero();
export const EARN_POOL_PLATFORM_FEE = BigDecimal.fromString("25").div(BigDecimal.fromString("100"));;
export const POOL_DEVELOPER_FEE = BigDecimal.fromString("5").div(BigDecimal.fromString("100"));;