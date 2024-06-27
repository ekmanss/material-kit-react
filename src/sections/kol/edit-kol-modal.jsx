import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip,
  Box,
  Avatar,
} from '@mui/material';

export default function EditKolModal({ open, handleClose, kol, onUpdate }) {
  const [editedKol, setEditedKol] = useState(kol || {});
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    if (kol) {
      setEditedKol(kol);
    }
  }, [kol]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedKol(prev => ({ ...prev, [name]: value }));
  };

  const handleAddKeyword = () => {
    if (newKeyword && !editedKol.key_words.includes(newKeyword)) {
      setEditedKol(prev => ({
        ...prev,
        key_words: [...prev.key_words, newKeyword],
      }));
      setNewKeyword('');
    }
  };

  const handleDeleteKeyword = (keywordToDelete) => {
    setEditedKol(prev => ({
      ...prev,
      key_words: prev.key_words.filter(keyword => keyword !== keywordToDelete),
    }));
  };

  const handleSubmit = () => {
    onUpdate(editedKol);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>编辑 KOL</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          name="twitter"
          label="Twitter"
          value={editedKol.twitter || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="名称"
          value={editedKol.name || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="description"
          label="描述"
          value={editedKol.description || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="star"
          label="星级"
          type="number"
          value={editedKol.star || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="recommend"
          label="推荐"
          type="number"
          value={editedKol.recommend || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="score"
          label="分数"
          type="number"
          value={editedKol.score || ''}
          onChange={handleChange}
        />
        <Box mt={2}>
          <Avatar src={editedKol.photo} alt={editedKol.name} />
          <TextField
            fullWidth
            margin="normal"
            name="photo"
            label="照片 URL"
            value={editedKol.photo || ''}
            onChange={handleChange}
          />
        </Box>
        <Box mt={2}>
          <TextField
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            label="添加关键词"
          />
          <Button onClick={handleAddKeyword}>添加</Button>
        </Box>
        <Box mt={2}>
          {editedKol.key_words?.map((keyword, index) => (
            <Chip
              key={index}
              label={keyword}
              onDelete={() => handleDeleteKeyword(keyword)}
              style={{ margin: '0 5px 5px 0' }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={handleSubmit} color="primary">保存</Button>
      </DialogActions>
    </Dialog>
  );
}