import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import config from '../../../config/config';

const API_URL = config.API_URL;

const Input = styled('input')({
  display: 'none',
});

export default function WeeklyRankingView() {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(dayjs());
  const [isUploading, setIsUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleUpload = async () => {
    if (!file || !date) {
      setSnackbar({ open: true, message: '请选择图片并输入日期', severity: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('weeklyRankingImage', file);
    formData.append('date', date.unix());

    setIsUploading(true);

    try {
      const response = await axios.post(`${API_URL}/upload_weekly_ranking`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSnackbar({ open: true, message: '图片上传成功', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: `上传失败: ${error.response?.data?.error || error.message}`, severity: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          上传每周排行榜图片
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={handleFileChange}
                />
                <Button variant="contained" component="span">
                  选择图片
                </Button>
              </label>
              {file && <Typography sx={{ mt: 2 }}>{file.name}</Typography>}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="日期"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!file || !date || isUploading}
              sx={{ mt: 3 }}
            >
              {isUploading ? <CircularProgress size={24} /> : '上传'}
            </Button>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
}