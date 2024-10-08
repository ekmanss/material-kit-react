// src/config.js

export const networkOptions = [
  { id: "eth", name: "Ethereum" },
  { id: "bsc", name: "BNB Chain" },
  { id: "polygon_pos", name: "Polygon POS" },
  { id: "avax", name: "Avalanche" },
  { id: "movr", name: "Moonriver" },
  { id: "cro", name: "Cronos" },
  { id: "one", name: "Harmony" },
  { id: "boba", name: "Boba Network" },
  { id: "ftm", name: "Fantom" },
  { id: "bch", name: "SmartBCH" },
  { id: "aurora", name: "Aurora" },
  { id: "metis", name: "Metis" },
  { id: "arbitrum", name: "Arbitrum" },
  { id: "fuse", name: "Fuse" },
  { id: "okexchain", name: "OKExChain" },
  { id: "kcc", name: "Kucoin Community Chain" },
  { id: "iotx", name: "IOTEX" },
  { id: "celo", name: "CELO" },
  { id: "xdai", name: "Gnosis XDAI" },
  { id: "glmr", name: "Moonbeam" },
  { id: "optimism", name: "Optimism" },
  { id: "nrg", name: "Energi" },
  { id: "wan", name: "Wanchain" },
  { id: "ronin", name: "Ronin" },
  { id: "kai", name: "Kardiachain" },
  { id: "mtr", name: "Meter" },
  { id: "velas", name: "Velas" },
  { id: "sdn", name: "Shiden" },
  { id: "tlos", name: "Telos" },
  { id: "sys", name: "Syscoin" },
  { id: "oasis", name: "Oasis Emerald" },
  { id: "astr", name: "Astar" },
  { id: "ela", name: "Elastos" },
  { id: "milkada", name: "Milkomeda Cardano" },
  { id: "dfk", name: "DFK Chain" },
  { id: "evmos", name: "Evmos" },
  { id: "solana", name: "Solana" },
  { id: "cfx", name: "Conflux" },
  { id: "bttc", name: "BitTorrent" },
  { id: "sxn", name: "SX Network" },
  { id: "xdc", name: "XDC" },
  { id: "klaytn", name: "Klaytn" },
  { id: "kava", name: "Kava" },
  { id: "bitgert", name: "Bitgert" },
  { id: "tombchain", name: "Tombchain" },
  { id: "dogechain", name: "Dogechain" },
  { id: "findora", name: "Findora" },
  { id: "thundercore", name: "ThunderCore" },
  { id: "arbitrum_nova", name: "Arbitrum Nova" },
  { id: "canto", name: "Canto" },
  { id: "ethereum_classic", name: "Ethereum Classic" },
  { id: "step-network", name: "Step Network" },
  { id: "ethw", name: "EthereumPOW" },
  { id: "godwoken", name: "Godwoken" },
  { id: "songbird", name: "Songbird" },
  { id: "redlight_chain", name: "Redlight Chain" },
  { id: "tomochain", name: "Viction" },
  { id: "fx", name: "Function X" },
  { id: "platon_network", name: "PlatON Network" },
  { id: "exosama", name: "Exosama" },
  { id: "oasys", name: "Oasys" },
  { id: "bitkub_chain", name: "Bitkub Chain" },
  { id: "wemix", name: "WEMIX" },
  { id: "flare", name: "Flare" },
  { id: "onus", name: "ONUS" },
  { id: "aptos", name: "Aptos" },
  { id: "core", name: "Core" },
  { id: "filecoin", name: "Filecoin" },
  { id: "lung-chain", name: "Lung Chain" },
  { id: "zksync", name: "ZkSync" },
  { id: "loop-network", name: "Loop Network" },
  { id: "multivac", name: "MultiVAC" },
  { id: "polygon-zkevm", name: "Polygon zkEVM" },
  { id: "eos-evm", name: "EOS EVM" },
  { id: "callisto", name: "Callisto" },
  { id: "ultron", name: "Ultron" },
  { id: "sui-network", name: "Sui Network" },
  { id: "pulsechain", name: "Pulsechain" },
  { id: "enuls", name: "ENULS" },
  { id: "tenet", name: "Tenet" },
  { id: "rollux", name: "Rollux" },
  { id: "starknet-alpha", name: "Starknet" },
  { id: "mantle", name: "Mantle" },
  { id: "neon-evm", name: "Neon EVM" },
  { id: "linea", name: "Linea" },
  { id: "base", name: "Base" },
  { id: "bitrock", name: "Bitrock" },
  { id: "opbnb", name: "opBNB" },
  { id: "maxxchain", name: "MaxxChain" },
  { id: "sei-network", name: "Sei Network" },
  { id: "shibarium", name: "Shibarium" },
  { id: "manta-pacific", name: "Manta Pacific" },
  { id: "sepolia-testnet", name: "Sepolia Testnet" },
  { id: "hedera-hashgraph", name: "Hedera Hashgraph" },
  { id: "shimmerevm", name: "ShimmerEVM" },
  { id: "beam", name: "Beam" },
  { id: "scroll", name: "Scroll" },
  { id: "lightlink-phoenix", name: "LightLink Phoenix" },
  { id: "elysium", name: "Elysium" },
  { id: "ton", name: "TON" },
];

export const predefinedKeywords = [
  "AI", "All", "Alpha", "BTC", "Defi", "GameFi", "NFT", "memeCoin", "链上数据分析", "二级市场", "撸毛"
];

const config = {
  development: {
    API_URL: 'http://localhost:6868',
  },
  test: {
    API_URL: 'https://kolapi.xfinder.fun',
  },
  production: {
    API_URL: 'http://api.example.com',
  },
};

const env = import.meta.env.VITE_APP_ENV || 'test';

export default {
  ...config[env],
  predefinedKeywords,
  networkOptions,
};