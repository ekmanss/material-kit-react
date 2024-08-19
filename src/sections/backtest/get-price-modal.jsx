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

import {networkOptions} from '../../config/config';


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