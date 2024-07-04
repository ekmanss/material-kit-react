import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const Input = styled('input')({
  display: 'none',
});

export default function UploadExcelModal({ open, handleClose, onSuccess, onError }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      onError('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', file);

    setIsUploading(true);

    try {
      const response = await axios.post('http://localhost:6060/upload_backtest_results', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSuccess('File uploaded successfully.');
    } catch (error) {
      onError(`Error uploading file: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsUploading(false);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload Excel</DialogTitle>
      <DialogContent>
        <label htmlFor="upload-excel-file">
          <Input
            accept=".xlsx, .xls"
            id="upload-excel-file"
            type="file"
            onChange={handleFileChange}
          />
          <Button variant="contained" component="span">
            Select File
          </Button>
        </label>
        {file && <TextField value={file.name} fullWidth margin="normal" disabled />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpload} color="primary" disabled={!file || isUploading}>
          {isUploading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}