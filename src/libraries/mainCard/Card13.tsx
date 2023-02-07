import { Typography,Box,Card } from '@mui/material'
import React from 'react'


function Card13({Text1, Text2,Text3}) {
  return (
    <Card  component={Box} p={1}>
   <Typography variant='body2'> <b>Issue Date :</b> {Text1}</Typography>
   <Typography variant='body2'> <b>Return Date :</b> {Text2}</Typography>
   <Typography variant='body2'><b>Issued To Parent :</b> {Text3 === true ? "Yes" : "No"}</Typography>
    </Card>
  )
}

export default Card13
