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
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function EditBacktestModal({ open, handleClose, backtest, onUpdate }) {
  const [editedBacktest, setEditedBacktest] = useState(backtest || {});

  useEffect(() => {
    if (backtest) {
      setEditedBacktest(backtest);
    }
  }, [backtest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBacktest(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name) => (date) => {
    setEditedBacktest(prev => ({ ...prev, [name]: date.unix() }));
  };

  const handleSubmit = () => {
    onUpdate(editedBacktest);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>编辑回测数据</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>基本信息</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="kol_id"
                label="KOL ID"
                value={editedBacktest.kol_id || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="token_name"
                label="代币名称"
                value={editedBacktest.token_name || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="token_address"
                label="代币地址"
                value={editedBacktest.token_address || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="token_logo"
                label="代币Logo URL"
                value={editedBacktest.token_logo || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>时间信息</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="回测时间"
                value={dayjs.unix(editedBacktest.time_stamp)}
                onChange={handleDateChange('time_stamp')}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="喊单时间"
                value={dayjs.unix(editedBacktest.call_time)}
                onChange={handleDateChange('call_time')}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="最高价时间"
                value={dayjs.unix(editedBacktest.high_time)}
                onChange={handleDateChange('high_time')}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="最低价时间"
                value={dayjs.unix(editedBacktest.low_time)}
                onChange={handleDateChange('low_time')}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>价格信息</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="call_price"
                label="喊单价格($)"
                value={editedBacktest.call_price || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="high_price"
                label="最高价格($)"
                value={editedBacktest.high_price || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="low_price"
                label="最低价格($)"
                value={editedBacktest.low_price || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="current_price"
                label="当前价格($)"
                value={editedBacktest.current_price || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="current_marketcap"
                label="当前市值($)"
                value={editedBacktest.current_marketcap || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>变化信息</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="more_change"
                label="涨幅(0~1)"
                value={editedBacktest.more_change || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="less_change"
                label="跌幅(0~1)"
                value={editedBacktest.less_change || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="btc_more_change"
                label="BTC涨幅(0~1)"
                value={editedBacktest.btc_more_change || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>其他信息</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="harvest_duration"
                label="收获时间"
                value={editedBacktest.harvest_duration || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="score"
                label="得分"
                value={editedBacktest.score || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                margin="normal"
                name="type"
                label="类型"
                value={editedBacktest.type || ''}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={handleSubmit} color="primary">保存</Button>
      </DialogActions>
    </Dialog>
  );
}