import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function Card9({ item, variant = "body2"   }) {
  return (
    <div>

      <Box display={"flex"} justifyContent={'space-between'} sx={{backgroundColor: item.IsActive?'secondary':'primary'}}>
        <Typography variant={variant === "body2" ? "body2" : "h5"} gutterBottom>
          {item.Text1}
        </Typography>
        <Typography variant={variant === "body2" ? "body2" : "h5"}>
          {item.Text2}
        </Typography>
      </Box>
    </div>
  )
}

export default Card9
