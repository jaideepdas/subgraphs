import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

////////////////////////
///// Schema Enums /////
////////////////////////

// The network names corresponding to the Network enum in the schema.
// They also correspond to the ones in `dataSource.network()` after converting to lower case.
// See below for a complete list:
// https://thegraph.com/docs/en/hosted-service/what-is-hosted-service/#supported-networks-on-the-hosted-service
export namespace Network {
  export const ARBITRUM_ONE = "ARBITRUM_ONE";
  export const AVALANCHE = "AVALANCHE";
  export const AURORA = "AURORA";
  export const BSC = "BSC"; // aka BNB Chain
  export const CELO = "CELO";
  export const MAINNET = "MAINNET"; // Ethereum mainnet
  export const FANTOM = "FANTOM";
  export const FUSE = "FUSE";
  export const MOONBEAM = "MOONBEAM";
  export const MOONRIVER = "MOONRIVER";
  export const NEAR_MAINNET = "NEAR_MAINNET";
  export const OPTIMISM = "OPTIMISM";
  export const MATIC = "MATIC"; // aka Polygon
  export const XDAI = "XDAI"; // aka Gnosis Chain
}

export namespace ProtocolType {
  export const EXCHANGE = "EXCHANGE";
  export const LENDING = "LENDING";
  export const YIELD = "YIELD";
  export const BRIDGE = "BRIDGE";
  export const GENERIC = "GENERIC";
}

// The network names corresponding to the ones in `dataSource.network()`
// They should mainly be used for the ease of comparison.
// Note that they cannot be used as enums since they are lower case.
// See below for a complete list:
// https://thegraph.com/docs/en/hosted-service/what-is-hosted-service/#supported-networks-on-the-hosted-service
export namespace SubgraphNetwork {
  export const ARBITRUM = "arbitrum-one";
  export const AVALANCHE = "avalanche";
  export const AURORA = "aurora";
  export const BSC = "bnb";
  export const CELO = "celo";
  export const ETHEREUM = "mainnet";
  export const FANTOM = "fantom";
  export const FUSE = "fuse";
  export const MOONBEAM = "moonbeam";
  export const MOONRIVER = "moonriver";
  export const NEAR = "near-mainnet";
  export const OPTIMISM = "optimism";
  export const POLYGON = "matic";
  export const XDAI = "xdai";
}

export namespace RewardTokenType {
  export const DEPOSIT = "DEPOSIT";
  export const BORROW = "BORROW";
}

export namespace LendingType {
  export const CDP = "CDP";
  export const POOLED = "POOLED";
}

export namespace RiskType {
  export const GLOBAL = "GLOBAL";
  export const ISOLATED = "ISOLATED";
}

export namespace InterestRateType {
  export const STABLE = "STABLE";
  export const VARIABLE = "VARIABLE";
  export const FIXED_TERM = "FIXED_TERM";
}

export namespace InterestRateSide {
  export const LENDER = "LENDER";
  export const BORROWER = "BORROWER";
}

export namespace TransactionType {
  export const DEPOSIT = "DEPOSIT";
  export const WITHDRAW = "WITHDRAW";
  export const BORROW = "BORROW";
  export const REPAY = "REPAY";
  export const LIQUIDATE = "LIQUIDATE";
}

//////////////////////////////
///// Ethereum Addresses /////
//////////////////////////////

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const ETH_NAME = "Ether";
export const ETH_SYMBOL = "ETH";

export const COMPTROLLER_ADDRESS = "0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b";
export const PRICE_ORACLE1_ADDRESS = "0x02557a5E05DeFeFFD4cAe6D83eA3d173B272c904";
export const SAI_ADDRESS = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359";
export const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
export const CUSDC_ADDRESS = "0x39aa39c021dfbae8fac545936693ac917d5e7563";
export const CETH_ADDRESS = "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5";
export const COMP_ADDRESS = "0xc00e94cb662c3520282e6f5717214004a7f26888";
export const CCOMP_ADDRESS = "0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4";
export const CUSDT_ADDRESS = "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9";
export const CTUSD_ADDRESS = "0x12392f67bdf24fae0af363c24ac620a2f67dad86";

////////////////////////
///// Type Helpers /////
////////////////////////

export const DEFAULT_DECIMALS = 18;

export const USDC_DECIMALS = 6;
export const USDC_DENOMINATOR = BigDecimal.fromString("1000000");

export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGINT_ONE = BigInt.fromI32(1);
export const BIGINT_TWO = BigInt.fromI32(2);
export const BIGINT_TEN = BigInt.fromI32(10);
export const BIGINT_ONEHUNDRED = BigInt.fromI32(100);
export const BIGINT_THOUSAND = BigInt.fromI32(1000);
export const BIGINT_MAX = BigInt.fromString(
  "115792089237316195423570985008687907853269984665640564039457584007913129639935",
);

export const INT_ZERO = 0 as i32;
export const INT_NEGATIVE_ONE = -1 as i32;
export const INT_ONE = 1 as i32;
export const INT_TWO = 2 as i32;
export const INT_FOUR = 4 as i32;

export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);
export const BIGDECIMAL_ONE = new BigDecimal(BIGINT_ONE);
export const BIGDECIMAL_TWO = new BigDecimal(BIGINT_TWO);
export const BIGDECIMAL_ONEHUNDRED = new BigDecimal(BIGINT_ONEHUNDRED);

export const MAX_UINT = BigInt.fromI32(2).times(BigInt.fromI32(255));

/////////////////////
///// Date/Time /////
/////////////////////

export const SECONDS_PER_HOUR = 60 * 60; // 3600
export const SECONDS_PER_DAY = 60 * 60 * 24; // 86400
export const MS_PER_DAY = new BigDecimal(BigInt.fromI32(24 * 60 * 60 * 1000));
export const DAYS_PER_YEAR = BigInt.fromI32(365);
export const MS_PER_YEAR = DAYS_PER_YEAR.toBigDecimal().times(new BigDecimal(BigInt.fromI32(24 * 60 * 60 * 1000)));

/////////////////////////////
///// Protocol Specific /////
/////////////////////////////

export const NETWORK_ETHEREUM = Network.MAINNET;
export const PROTOCOL_TYPE = ProtocolType.LENDING;
export const LENDING_TYPE = LendingType.POOLED;
export const PROTOCOL_RISK_TYPE = RiskType.ISOLATED;
export const PROTOCOL_NAME = "Compound v2";
export const PROTOCOL_SLUG = "compound-v2";
export const SUBGRAPH_VERSION = "1.5.8";
export const SCHEMA_VERSION = "1.2.1";
export const METHODOLOGY_VERSION = "1.0.0";
export const COMPOUND_DECIMALS = 8;
export const INITIAL_EXCHANGE_RATE = BigDecimal.fromString(".02");
export const COLLATERAL_FACTOR_OFFSET = 16;
