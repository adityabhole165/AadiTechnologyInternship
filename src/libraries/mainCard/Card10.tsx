import { Avatar,Typography,Grid } from '@mui/material'
import React from 'react'

import { ListStyle } from '../styled/CardStyle'

function Card10({item, variant = "body2" }) {
  return (
    <ListStyle>
        <Grid container >
        <Grid item xs={1.5}>
        <Avatar  sx={{ width: 24, height: 24 }}>1</Avatar>
        </Grid>
        <Grid item xs={6.5}>
        <Typography variant={variant === "body2" ? "body2" : "h5"} >
         {item.Text1}
        </Typography>
        </Grid>
        <Grid item xs={4}>
        <Typography variant={variant === "body2" ? "body2" : "h5"}  sx={{float:"right"}}>
        {item.Text2}
        </Typography>
        </Grid>
      </Grid>
      </ListStyle>
  )
}

export default Card10
