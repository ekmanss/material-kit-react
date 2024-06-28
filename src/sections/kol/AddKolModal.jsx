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

const predefinedKeywords = ["AI", "All", "Alpha", "BTC", "Defi", "GameFi", "NFT", "memeCoin", "链上数据分析", "二级市场", "撸毛"];

export default function AddKolModal({ open, handleClose, onAdd }) {
  const [newKol, setNewKol] = useState({
    twitter: '',
    name: '',
    description: '',
    star: '',
    recommend: '',
    score: '',
    photo: '',
    language: '',
    key_words: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewKol(prev => ({ ...prev, [name]: value }));
  };

  const handleAddKeyword = (keyword) => {
    if (!newKol.key_words.includes(keyword)) {
      setNewKol(prev => ({
        ...prev,
        key_words: [...prev.key_words, keyword],
      }));
    }
  };

  const handleDeleteKeyword = (keywordToDelete) => {
    setNewKol(prev => ({
      ...prev,
      key_words: prev.key_words.filter(keyword => keyword !== keywordToDelete),
    }));
  };

  const handleSubmit = () => {
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
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="keyword-select-label">Add Keyword</InputLabel>
          <Select
            labelId="keyword-select-label"
            value=""
            onChange={(e) => handleAddKeyword(e.target.value)}
            label="Add Keyword"
          >
            {predefinedKeywords.map((keyword) => (
              <MenuItem key={keyword} value={keyword}>{keyword}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {newKol.key_words.map((keyword, index) => (
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
}