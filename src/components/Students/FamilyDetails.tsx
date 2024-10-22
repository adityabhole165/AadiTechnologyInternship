import React from 'react';
import { TextField, Box } from '@mui/material';

interface FamilyDetailsProps {
  label1: string;
  label2: string;
  label3: string;
  value1: string;
  value2: string;
  value3: string;
  onChange: (index: number, value: string) => void;
  error: boolean;
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({ label1, label2, label3, value1, value2, value3, onChange, error }) => {
  return (
    <Box>
      <TextField
        fullWidth
        label={label1}
        value={value1}
        onChange={(e) => onChange(0, e.target.value)}
        required
        error={error}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label={label2}
        value={value2}
        onChange={(e) => onChange(1, e.target.value)}
        required
        error={error}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label={label3}
        value={value3}
        onChange={(e) => onChange(2, e.target.value)}
        required
        error={error}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default FamilyDetails;


