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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

import config, { predefinedKeywords } from 'src/config/config';

export default function EditKolModal({ open, handleClose, kol, onUpdate }) {
  const [editedKol, setEditedKol] = useState(kol || {});

  useEffect(() => {
    if (kol) {
      setEditedKol(kol);
    }
  }, [kol]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedKol(prev => ({ ...prev, [name]: value }));
  };

  const handleAddKeyword = (keyword) => {
    if (keyword && !editedKol.key_words.includes(keyword)) {
      setEditedKol(prev => ({
        ...prev,
        key_words: [...prev.key_words, keyword],
      }));
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
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
          multiline
          rows={4}
          value={editedKol.description || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="star"
          label="星级"
          value={editedKol.star || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="recommend"
          label="推荐"
          value={editedKol.recommend || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="score"
          label="分数"
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="language-label">语言</InputLabel>
          <Select
            labelId="language-label"
            name="language"
            value={editedKol.language || ''}
            onChange={handleChange}
            label="语言"
          >
            <MenuItem value="en">en</MenuItem>
            <MenuItem value="zh">zh</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="keyword-select-label">添加关键词</InputLabel>
          <Select
            labelId="keyword-select-label"
            value=""
            onChange={(e) => handleAddKeyword(e.target.value)}
            label="添加关键词"
          >
            {predefinedKeywords.map((keyword) => (
              <MenuItem key={keyword} value={keyword}>{keyword}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {editedKol.key_words?.map((keyword, index) => (
            <Chip
              key={index}
              label={keyword}
              onDelete={() => handleDeleteKeyword(keyword)}
              color="primary"
              variant="outlined"
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