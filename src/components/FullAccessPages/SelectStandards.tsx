import React from 'react';
import { Grid, Typography, Checkbox, FormControlLabel, Box } from '@mui/material';

const standards = [
  { label: 'Nursery' },
  { label: 'Junior KG' },
  { label: 'Senior KG' },
  { label: '1' },
  { label: '2' },
  { label: '4' },
  { label: '5' },
  { label: '6' },
  { label: '7' },
  { label: '8' },
  { label: '9' },
  { label: '10' },
];

const SelectStandards: React.FC = () => {
  return (
    <Box sx={{pl:0.5}}>
      <Typography variant="h5" color="primary" gutterBottom>
        Select Standards :
      </Typography>
      <Grid container spacing={1}>
        {standards.map((standard, index) => (
          <Grid item xs={3} sm={2} md={1} key={index}>
            <FormControlLabel
              control={<Checkbox />}
              label={standard.label}
              labelPlacement="bottom"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SelectStandards;
