import { Address, BigDecimal } from '@graphprotocol/graph-ts';
import { Factory } from '../../../../../generated/Factory/Factory';
import { FeeSwitch, MINIMUM_LIQUIDITY_ONE_HUNDRED_THOUSAND, Network, PROTOCOL_SCHEMA_VERSION, RewardIntervalType } from '../../../../../src/common/constants';
import { Configurations } from '../../../../../configurations/configurations/interface';
import { PROTOCOL_SUBGRAPH_VERSION, PROTOCOL_METHODOLOGY_VERSION, PROTOCOL_NAME, PROTOCOL_SLUG } from '../../../src/common/constants';
import { toLowerCase, toLowerCaseList } from '../../../../../src/common/utils/utils';

export class SolarbeamMoonriverConfigurations implements Configurations {
  getNetwork(): string {
    return Network.MOONRIVER;
  }
  getSchemaVersion(): string {
    return PROTOCOL_SCHEMA_VERSION;
  }
  getSubgraphVersion(): string {
    return PROTOCOL_SUBGRAPH_VERSION;
  }
  getMethodologyVersion(): string {
    return PROTOCOL_METHODOLOGY_VERSION;
  }
  getProtocolName(): string {
    return PROTOCOL_NAME;
  }
  getProtocolSlug(): string {
    return PROTOCOL_SLUG;
  }
  getFactoryAddress(): string {
    return toLowerCase("0x049581aEB6Fe262727f290165C29BDAB065a1B68");
  }
  getFactoryContract(): Factory { 
    return Factory.bind(Address.fromString(toLowerCase("0x049581aEB6Fe262727f290165C29BDAB065a1B68")));
  }
  getTradeFee(): BigDecimal {
    return BigDecimal.fromString("2.5");
  }
  getProtocolFeeToOn(): BigDecimal {
    return BigDecimal.fromString("0.5");
  }
  getLPFeeToOn(): BigDecimal {
    return BigDecimal.fromString("2.0");
  }
  getProtocolFeeToOff(): BigDecimal {
    return BigDecimal.fromString("0");
  }
  getLPFeeToOff(): BigDecimal {
    return BigDecimal.fromString("2.5");
  }
  getFeeOnOff(): string {
    return FeeSwitch.ON;
  }
  getRewardIntervalType(): string {
    return RewardIntervalType.BLOCK;
  }
  getReferenceToken(): string {
    return toLowerCase("0x98878b06940ae243284ca214f92bb71a2b032b8a"); // wMOVR
  }
  getRewardToken(): string {
    return toLowerCase("0x6bd193ee6d2104f14f94e2ca6efefae561a4334b");
  }
  getWhitelistTokens(): string[] {
    return toLowerCaseList([
      "0x98878b06940ae243284ca214f92bb71a2b032b8a", // wMOVR
      "0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d", // USDC
      "0xb44a9b6905af7c801311e8f4e76932ee959c663c", // USDT
    ]);
  }
  getStableCoins(): string[] {
    return toLowerCaseList([
      "0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d", // USDC
      "0xb44a9b6905af7c801311e8f4e76932ee959c663c", // USDT
    ]);
  }
  getStableOraclePools(): string[] {
    return toLowerCaseList([
      "0xe537f70a8b62204832b8ba91940b77d3f79aeb81" // USDC/wMOVR
    ]);
  }
  getUntrackedPairs(): string[] {
    return toLowerCaseList([]);
  }
  getUntrackedTokens(): string[] {
    return [];
  }
  getMinimumLiquidityThreshold(): BigDecimal {
    return MINIMUM_LIQUIDITY_ONE_HUNDRED_THOUSAND;
  }
}
