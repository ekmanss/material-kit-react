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
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useGetPrice } from '../../hooks/useGetPrice';

export default function GetPriceModal({ open, handleClose }) {
  const [params, setParams] = useState({
    tokenAddress: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
    chainName: 'eth',
    pairAddress: '0xcf6daab95c476106eca715d48de4b13287ffdeaa',
    interval: '1m',
    startTime: dayjs.unix(1717891200),
    endTime: dayjs.unix(9917899200),
    limit: '5',
  });
  const [result, setResult] = useState(null);
  const { getPrice, isLoading, error } = useGetPrice();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newValue) => {
    setParams(prev => ({ ...prev, startTime: newValue }));
  };

  const handleSubmit = async () => {
    try {
      const submitParams = {
        ...params,
        startTime: params.startTime.unix().toString(),
        endTime: params.startTime.add(60, 'minute').unix().toString(), // 设置结束时间为开始时间后5分钟
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
      alert(`Error fetching price: ${err.message}`);
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
                name="tokenAddress"
                label="Token Address"
                value={params.tokenAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="chainName"
                label="Chain Name"
                value={params.chainName}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="pairAddress"
                label="Pair Address"
                value={params.pairAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Time"
                value={params.startTime}
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
              {result && result.length > 0 ? (
                <>
                  Close Price: {result[0].close_price}
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
            Get Price
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}