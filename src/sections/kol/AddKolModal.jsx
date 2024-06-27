// src/sections/kol/AddKolModal.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

export default function AddKolModal({ open, handleClose, onAdd }) {
  const [newKol, setNewKol] = useState({
    twitter: '',
    name: '',
    description: '',
    star: '',  // 改为字符串
    recommend: '',  // 改为字符串
    score: '',  // 改为字符串
    photo: '',
    language: '',
    key_words: [],
  });
  const [newKeyword, setNewKeyword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewKol(prev => ({ ...prev, [name]: value }));
  };

  const handleAddKeyword = () => {
    if (newKeyword && !newKol.key_words.includes(newKeyword)) {
      setNewKol(prev => ({
        ...prev,
        key_words: [...prev.key_words, newKeyword],
      }));
      setNewKeyword('');
    }
  };

  const handleDeleteKeyword = (keywordToDelete) => {
    setNewKol(prev => ({
      ...prev,
      key_words: prev.key_words.filter(keyword => keyword !== keywordToDelete),
    }));
  };

  const handleSubmit = () => {
    // 不需要转换为数字，直接传递字符串
    onAdd({
      ...newKol,
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New KOL</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          name="twitter"
          label="Twitter"
          value={newKol.twitter}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Name"
          value={newKol.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={newKol.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="star"
          label="Star"
          value={newKol.star}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="recommend"
          label="Recommend"
          value={newKol.recommend}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="score"
          label="Score"
          value={newKol.score}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="photo"
          label="Photo URL"
          value={newKol.photo}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            name="language"
            value={newKol.language}
            onChange={handleChange}
            label="Language"
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="zh">Chinese</MenuItem>
            {/* Add more language options as needed */}
          </Select>
        </FormControl>
        <Box mt={2}>
          <TextField
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            label="Add Keyword"
          />
          <Button onClick={handleAddKeyword}>Add</Button>
        </Box>
        <Box mt={2}>
          {newKol.key_words.map((keyword, index) => (
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
}