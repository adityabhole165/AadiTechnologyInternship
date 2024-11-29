import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const AddNewFeedback: React.FC = () => {
  const [formData, setFormData] = useState({
    feedbackFor: {
      school: false,
      software: false,
    },
    feedbackType: {
      general: false,
      concern: false,
      testimonial: false,
    },
    textBox1: '',
    textBox2: '',
  });

  const handleCheckboxChange = (group: string, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [group]: {
        ...prevState[group],
        [field]: event.target.checked,
      },
    }));
  };

  const handleTextChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    alert('Feedback submitted successfully!');
  };



  return (
    <Box p={0}>
      
      <Grid container spacing={3}>
        {/* Feedback For Section */}
        <Grid item xs={12}>
          <Typography variant="h5" >
            Feedback For 
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.feedbackFor.school}
                onChange={handleCheckboxChange('feedbackFor', 'school')}
              />
            }
            label="School"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.feedbackFor.software}
                onChange={handleCheckboxChange('feedbackFor', 'software')}
              />
            }
            label="Software"
          />
        </Grid>

        {/* Feedback Type Section */}
        <Grid item xs={12}>
          <Typography variant="h5" >
            Feedback Type 
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.feedbackType.general}
                onChange={handleCheckboxChange('feedbackType', 'general')}
              />
            }
            label="General Feedback"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.feedbackType.concern}
                onChange={handleCheckboxChange('feedbackType', 'concern')}
              />
            }
            label="Concern or Issue"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.feedbackType.testimonial}
                onChange={handleCheckboxChange('feedbackType', 'testimonial')}
              />
            }
            label="Testimonial"
          />
        </Grid>

        {/* Text Boxes */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label={
                <span>
                  Name <span style={{ color: 'red' }}> *</span>
                </span>
              }
            value={formData.textBox1}
            onChange={handleTextChange('textBox1')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label={
                <span>
                  E-mail <span style={{ color: 'red' }}> *</span>
                </span>
              }
            value={formData.textBox2}
            onChange={handleTextChange('textBox2')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            label={
                <span>
                  Comments <span style={{ color: 'red' }}> *</span>
                </span>
              }
            rows={3}
            sx={{
                '& .MuiInputBase-root': {
                    resize: 'both', // Allows the TextField to be resizable
                    overflow: 'auto',
                },
            }}
            value={formData.textBox1}
            onChange={handleTextChange('textBox1')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddNewFeedback;
