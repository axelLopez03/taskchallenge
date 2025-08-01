import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Paper, Box } from '@mui/material';

export function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onAddTask({
      title,
      description,
      completed
    });
    setTitle('');
    setDescription('');
    setCompleted(false);
  };

  return (
    <Paper sx={{ p: 3, mb: 3, boxShadow: 3 }}>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          InputProps={{ style: { fontWeight: 600 } }}
        />
        <TextField
          label="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={e => setCompleted(e.target.checked)}
              sx={{ color: 'var(--main-yellow)' }}
            />
          }
          label="Completada"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 2 }}>
          CREAR TAREA
        </Button>
      </Box>
    </Paper>
  );
}