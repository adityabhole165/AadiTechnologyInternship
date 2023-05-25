import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
function Card9({ item, variant = "body2", IsDivider = false }) {
  return (
    <div>

      <Box display={"flex"} justifyContent={'space-between'} sx={{ backgroundColor: item.IsActive ? 'secondary' : 'primary' }}>
      <Typography variant={variant === "body2" ? "body2" : "h5"}>
          {item.IsDial ?
            <a href='tel:8888850696'>{item.Text2}</a> :
            item.Text2}
        </Typography>
        <Typography variant={variant === "body2" ? "body2" : "h5"} gutterBottom>
          {item.Text1}
        </Typography>
        </Box>
      {IsDivider && <Divider sx={{ background: '#5b5258', my: "3px", height: "0.5px" }} />}

    </div>
  )
}

export default Card9
