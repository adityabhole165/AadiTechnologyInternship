import { Box,Paper, Typography,Button } from '@mui/material';
import React from 'react';
import { ButtonPrimary } from '../styled/ButtonStyle';
import { ListStyle } from '../styled/CardStyle';

function ClaimedCard({Text1,Text2,confirmsg}) {
   
  return (
    <div>
      <ListStyle>
        <Box sx={{display:"flex", justifyContent:"space-between"}} pb={1}>
        <Typography> <b>Date : </b> {Text1}</Typography>
        <Typography><b>Claimed by Parent : </b> {Text2 === true ? 'Yes' : 'No'}</Typography>
        </Box>
        <ButtonPrimary onClick={confirmsg}>Cancel</ButtonPrimary>
      </ListStyle>
    </div>
  )
}

export default ClaimedCard
