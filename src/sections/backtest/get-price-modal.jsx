import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useGetPrice } from '../../hooks/useGetPrice';

const networkOptions = [
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


export default function GetPriceModal({ open, handleClose }) {
  const [params, setParams] = useState({
    symbol: 'Mog',
    networkId: 'eth',
    fromTimestamp: dayjs(1722441600000),
    poolAddress: '', // 新增的 poolAddress 参数
  });
  const [result, setResult] = useState(null);
  const { getPrice, isLoading, error } = useGetPrice();

  console.log("isLoading::", isLoading)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newValue) => {
    setParams(prev => ({ ...prev, fromTimestamp: newValue }));
  };

  const handleSubmit = async () => {
    try {
      const submitParams = {
        ...params,
        fromTimestamp: params.fromTimestamp.unix().toString(),
      };
      const data = await getPrice(submitParams);
      console.log('Received data:', data);
      setResult(data);
      if (!data || data.length === 0) {
        console.warn('No data returned from API');
      }
    } catch (err) {
      console.error('Error fetching price:', err);
      setResult(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Get Price</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="symbol"
                label="Symbol"
                value={params.symbol}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="network-select-label">Network</InputLabel>
                <Select
                  labelId="network-select-label"
                  id="network-select"
                  value={params.networkId}
                  label="Network"
                  name="networkId"
                  onChange={handleChange}
                >
                  {networkOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                name="poolAddress"
                label="Pool Address"
                value={params.poolAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                label="From Timestamp"
                value={params.fromTimestamp}
                onChange={handleDateChange}
                renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
              />
            </Grid>
          </Grid>

          {isLoading && (
            <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
          )}

          {error && (
            <Typography color="error" style={{ marginTop: 20 }}>
              Error: {error.message}
            </Typography>
          )}

          {result !== null && (
            <Typography variant="body1" style={{ marginTop: 20 }}>
              {result ? (
                <>
                  Price: {result.priceData[0].c}
                </>
              ) : (
                'No data received from the API.'
              )}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Get Price'}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}