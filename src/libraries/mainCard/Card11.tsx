import React from 'react';
import { Typography} from "@mui/material"

function Card11({item}) {
  return (
    <>
         <Typography variant='h5'>{item.header} </Typography>
          <Typography variant='body2'>{item.text1}</Typography>
    </>
  )
}

export default Card11
