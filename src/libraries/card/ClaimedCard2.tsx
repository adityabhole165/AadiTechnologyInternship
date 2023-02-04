import { Box,Paper, Typography,Button } from '@mui/material';
import React from 'react';
import { ButtonPrimary } from '../styled/ButtonStyle';
import { ListStyle } from '../styled/CardStyle';

function ClaimedCard({Text1,Text2,Text3,Text4,Text5}) {
   
  return (
    <div>
      <ListStyle>
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
        <Typography> <b>Date : </b> {Text1}</Typography>
        <Typography><b>Claimed by Parent : </b> {Text2 === true ? 'Yes' : 'No'}</Typography>
        </Box>
        <Typography><b>UserName : </b> {Text3}</Typography>
        <Box sx={{display:"flex", justifyContent:"space-between"}} pb={1}>
        <Typography> <b> Class : </b> {Text5}</Typography>
        <Typography><b>Designation : </b> {Text4}</Typography>
        </Box>
     
      </ListStyle>
    </div>
  )
}

export default ClaimedCard
