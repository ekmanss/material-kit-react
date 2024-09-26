import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  TextField,
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import config from '../../../config/config';

const API_URL = config.API_URL;

const Input = styled('input')({
  display: 'none',
});

const StyledImage = styled('img')({
  maxWidth: '300px',
  maxHeight: '300px',
  objectFit: 'contain',
  backgroundColor: 'white',
  padding: '10px',
  borderRadius: '4px',
});

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  '& .MuiTooltip-tooltip': {
    backgroundColor: 'white',
    padding: 0,
    maxWidth: 'none',
  },
});

export default function WeeklyRankingView() {
  const [file, setFile] = useState(null);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(7, 'day'));
  const [isUploading, setIsUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [weeklyRankings, setWeeklyRankings] = useState([]);
  const [twitterUrl, setTwitterUrl] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingRankingId, setDeletingRankingId] = useState(null);

  useEffect(() => {
    fetchWeeklyRankings();
  }, []);

  const fetchWeeklyRankings = async () => {
    try {
      const response = await axios.get(`${API_URL}/weekly_rankings`);
      setWeeklyRankings(response.data);
    } catch (error) {
      console.error('Error fetching weekly rankings:', error);
      setSnackbar({ open: true, message: 'Failed to fetch weekly rankings', severity: 'error' });
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate.startOf('day'));
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate.endOf('day'));
  };

  const handleTwitterUrlChange = (event) => {
    setTwitterUrl(event.target.value);
  };

  const handleUpload = async () => {
    if (!file || !startDate || !endDate || !twitterUrl) {
      setSnackbar({ open: true, message: '请选择图片,输入开始和结束日期,以及Twitter链接', severity: 'error' });
      return;
    }

    if (endDate.isBefore(startDate)) {
      setSnackbar({ open: true, message: '结束日期不能早于开始日期', severity: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('weeklyRankingImage', file);
    formData.append('startDate', startDate.startOf('day').unix());
    formData.append('endDate', endDate.endOf('day').unix());
    formData.append('twitterUrl', twitterUrl);

    setIsUploading(true);

    try {
      await axios.post(`${API_URL}/upload_weekly_ranking`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSnackbar({ open: true, message: '图片上传成功', severity: 'success' });
      fetchWeeklyRankings();
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

  const handleDeleteClick = (id) => {
    setDeletingRankingId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingRankingId) {
      try {
        await axios.delete(`${API_URL}/weekly_rankings/${deletingRankingId}`);
        setSnackbar({ open: true, message: '排名删除成功', severity: 'success' });
        fetchWeeklyRankings();
      } catch (error) {
        setSnackbar({ open: true, message: `删除失败: ${error.response?.data?.error || error.message}`, severity: 'error' });
      }
      setDeleteDialogOpen(false);
      setDeletingRankingId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeletingRankingId(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Weekly Rankings Management
        </Typography>

        <Paper sx={{ p: 3, mb: 5 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Upload New Ranking
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <Button variant="contained" component="span">
                    Choose Image
                  </Button>
                </label>
                {file && <Typography sx={{ mt: 2 }}>{file.name}</Typography>}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="开始日期"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="结束日期"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Twitter链接"
                value={twitterUrl}
                onChange={handleTwitterUrlChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={!file || !startDate || !endDate || !twitterUrl || isUploading}
              >
                {isUploading ? <CircularProgress size={24} /> : 'Upload'}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Weekly Rankings List
          </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="weekly rankings table">
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell>Month</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Twitter链接</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {weeklyRankings.map((ranking) => (
                  <TableRow key={ranking.id}>
                    <TableCell>{ranking.year}</TableCell>
                    <TableCell>{ranking.month}</TableCell>
                    <TableCell>{dayjs.unix(ranking.start_timestamp).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>{dayjs.unix(ranking.end_timestamp).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>
                      <StyledTooltip
                        title={<StyledImage src={ranking.image_url} alt="Weekly Ranking" />}
                        arrow
                      >
                        <Link href={ranking.image_url} target="_blank" rel="noopener noreferrer">
                          View Image
                        </Link>
                      </StyledTooltip>
                    </TableCell>
                    <TableCell>
                      <Link href={ranking.twitter_url} target="_blank" rel="noopener noreferrer">
                        Twitter链接
                      </Link>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteClick(ranking.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

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

        <Dialog
          open={deleteDialogOpen}
          onClose={handleCancelDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'确认删除'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              您确定要删除这个周排名吗？此操作无法撤销。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              取消
            </Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              删除
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </LocalizationProvider>
  );
}
