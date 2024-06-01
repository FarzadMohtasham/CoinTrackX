import {AxiosResponse} from 'axios'

export type getAssetsResponse = {
    data: AxiosResponse | null;
}

export type getAssetResponse = {
    data: AxiosResponse | null;
    error: any;
}

export type getAssetHistoryResponse = {
    data: AxiosResponse | null;
}

export type Asset = {
    "id": string;
    "rank": string;
    "symbol": string;
    "name": string;
    "supply": string;
    "maxSupply": string;
    "marketCapUsd": string;
    "volumeUsd24Hr": string;
    "priceUsd": string;
    "changePercent24Hr": string;
    "vwap24Hr": string;
    "explorer": string;
}

export type AssetName =
    'bitcoin'
    | 'ethereum'
    | 'tether'
    | 'binance-coin'
    | 'solana'
    | 'usd-coin'
    | 'dogecoin'
    | 'xrp'
    | 'cardano'
    | 'shiba-inu'
    | 'avalanche'
    | 'wrapped-bitcoin'
    | 'polkadot'
    | 'chainlink'
    | 'tron'
    | 'bitcoin-cash'
    | 'near-protocol'
    | 'polygon'
    | 'uniswap'
    | 'litecoin'
    | 'internet-computer'
    | 'unus-sed-leo'
    | 'multi-collateral-dai'
    | 'ethereum-classic'
    | 'render-token'
    | 'filecoin'
    | 'stellar'
    | 'crypto-com-coin'
    | 'the-graph'
    | 'okb'
    | 'stacks'
    | 'maker'
    | 'monero'
    | 'arweave'
    | 'vechain'
    | 'lido-dao'
    | 'theta'
    | 'fantom'
    | 'thorchain'
    | 'cosmos'
    | 'fetch'
    | 'injective-protocol'
    | 'aave'
    | 'hedera-hashgraph'
    | 'algorand'
    | 'flow'
    | 'gala'
    | 'bitcoin-sv'
    | 'akash-network'
    | 'singularitynet'
    | 'chiliz'
    | 'axie-infinity'
    | 'quant'
    | 'neo'
    | 'pendle'
    | 'the-sandbox'
    | 'kucoin-token'
    | 'gnosis-gno'
    | 'ecash'
    | 'tezos'
    | 'elrond-egld'
    | 'eos'
    | 'mina'
    | 'aioz-network'
    | 'conflux-network'
    | 'decentraland'
    | 'nexo'
    | 'pancakeswap'
    | 'iota'
    | 'livepeer'
    | 'kava'
    | 'gatetoken'
    | 'nervos-network'
    | 'dexe'
    | 'theta-fuel'
    | 'synthetix-network-token'
    | 'klaytn'
    | 'helium'
    | 'wootrade'
    | 'curve-dao-token'
    | 'oasis-network'
    | 'nxm'
    | 'ocean-protocol'
    | 'ftx-token'
    | 'golem-network-tokens'
    | 'compound'
    | 'wemix'
    | 'trueusd'
    | 'xinfin-network'
    | 'enjin-coin'
    | '1inch'
    | 'iotex'
    | 'superfarm'
    | 'skale-network'
    | 'celo'
    | 'rocket-pool'
    | '0x'
    | 'raydium'
    | 'trust-wallet-token'
    | 'ankr';

export type AssetHistoryInterval = 'm1' | 'm5' | 'm15' | 'm30' | 'h1' | 'h2' | 'h6' | 'h12' | 'd1';