import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

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

  const handleSubmit = () => {
    onUpdate(editedBacktest);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>编辑回测数据</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          name="token_name"
          label="代币名称"
          value={editedBacktest.token_name || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="call_price"
          label="呼叫价格"
          value={editedBacktest.call_price || ''}
          onChange={handleChange}
        />
        {/* 根据需要添加更多字段 */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={handleSubmit} color="primary">保存</Button>
      </DialogActions>
    </Dialog>
  );
}