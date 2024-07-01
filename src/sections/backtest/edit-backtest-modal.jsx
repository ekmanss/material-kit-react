import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function EditBacktestModal({ open, handleClose, backtest, onUpdate }) {
  const [editedBacktest, setEditedBacktest] = useState(backtest || {});
  const [isStageTimeEnabled, setIsStageTimeEnabled] = useState(backtest?.stage_time !== 0);

  useEffect(() => {
    if (backtest) {
      setEditedBacktest(backtest);
      setIsStageTimeEnabled(backtest.stage_time !== 0);
    }
  }, [backtest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBacktest(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name) => (date) => {
    setEditedBacktest(prev => ({ ...prev, [name]: date.unix() }));
  };

  const handleStageTimeToggle = (e) => {
    setIsStageTimeEnabled(e.target.checked);
    setEditedBacktest(prev => ({ ...prev, stage_time: e.target.checked ? dayjs().unix() : 0 }));
  };

  const handleSubmit = () => {
    onUpdate(editedBacktest);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Backtest Data</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Basic Information</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="kol_id"
                label="KOL ID"
                value={editedBacktest.kol_id || ''}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="token_name"
                label="Token Name"
                value={editedBacktest.token_name || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="token_address"
                label="Token Address"
                value={editedBacktest.token_address || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="token_logo"
                label="Token Logo URL"
                value={editedBacktest.token_logo || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Time Information</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Backtest Time"
                value={dayjs.unix(editedBacktest.time_stamp)}
                onChange={handleDateChange('time_stamp')}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Call Time"
                value={dayjs.unix(editedBacktest.call_time)}
                onChange={handleDateChange('call_time')}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Highest Price Time"
                value={dayjs.unix(editedBacktest.high_time)}
                onChange={handleDateChange('high_time')}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Lowest Price Time"
                value={dayjs.unix(editedBacktest.low_time)}
                onChange={handleDateChange('low_time')}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isStageTimeEnabled}
                    onChange={handleStageTimeToggle}
                    name="stageTimeEnabled"
                  />
                }
                label="Set Stage Time"
              />
              {isStageTimeEnabled ? (
                <DateTimePicker
                  label="Stage Time"
                  value={dayjs.unix(editedBacktest.stage_time)}
                  onChange={handleDateChange('stage_time')}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
              ) : (
                <TextField
                  fullWidth
                  margin="normal"
                  name="stage_time"
                  label="Stage Time"
                  value="0"
                  disabled
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Price Information</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="call_price"
                label="Call Price ($)"
                value={editedBacktest.call_price || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="high_price"
                label="Highest Price ($)"
                value={editedBacktest.high_price || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="low_price"
                label="Lowest Price ($)"
                value={editedBacktest.low_price || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="current_price"
                label="Current Price ($)"
                value={editedBacktest.current_price || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="current_marketcap"
                label="Current Market Cap ($)"
                value={editedBacktest.current_marketcap || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Change Information</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="more_change"
                label="Increase (0~1)"
                value={editedBacktest.more_change || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="less_change"
                label="Decrease (0~1)"
                value={editedBacktest.less_change || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="btc_more_change"
                label="BTC Increase (0~1)"
                value={editedBacktest.btc_more_change || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Other Information</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="harvest_duration"
                label="Harvest Duration"
                value={editedBacktest.harvest_duration || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="score"
                label="Score"
                value={editedBacktest.score || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="type"
                label="Type"
                value={editedBacktest.type || ''}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}