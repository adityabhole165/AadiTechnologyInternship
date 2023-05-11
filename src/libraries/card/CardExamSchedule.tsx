import { Typography, Box, Grid } from '@mui/material'
import React from 'react'
import { ListStyle } from '../styled/CardStyle'

function CardExamSchedule({ header, text2, text3, text5 }) {
  return (
    <div>
           <ListStyle>


<Grid container>
    <Grid item xs={8} sm={4}>
        <Typography variant="h6">
            {header}
        </Typography>
    </Grid>
    <Grid item xs={4} sm={4} >
        <Typography sx={{float:"right"}}>
            {text2}
        </Typography>
    </Grid>
    <Grid item xs={12} sm={4}>
        <Typography sx={{float:"right"}}>
            {text3}
        </Typography>
    </Grid>
    <Grid item xs={12} sm={12}>
        <Typography color="primary">
            {text5}
        </Typography>
    </Grid>
</Grid>
</ListStyle>
    </div>
  )
}

export default CardExamSchedule