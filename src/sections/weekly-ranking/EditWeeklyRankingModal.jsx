import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function EditWeeklyRankingModal({ open, handleClose, ranking, onUpdate }) {
  const [editedRanking, setEditedRanking] = useState(null);

  useEffect(() => {
    if (ranking) {
      setEditedRanking(ranking);
    }
  }, [ranking]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedRanking((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field) => (newDate) => {
    const timestamp = field === 'start_timestamp' 
      ? newDate.startOf('day').unix() 
      : newDate.endOf('day').unix();
    setEditedRanking((prev) => ({ ...prev, [field]: timestamp }));
  };

  const handleSubmit = () => {
    if (editedRanking) {
      onUpdate(editedRanking);
    }
    handleClose();
  };

  if (!editedRanking) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>编辑周排名</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <DatePicker
                label="开始日期"
                value={dayjs.unix(editedRanking.start_timestamp)}
                onChange={handleDateChange('start_timestamp')}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="结束日期"
                value={dayjs.unix(editedRanking.end_timestamp)}
                onChange={handleDateChange('end_timestamp')}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Twitter链接"
                name="twitter_url"
                value={editedRanking.twitter_url}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit} variant="contained">保存</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}