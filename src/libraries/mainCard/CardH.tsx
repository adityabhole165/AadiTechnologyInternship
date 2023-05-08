import React from 'react'
import { ListStyle } from '../styled/CardStyle'
import { Typography , Box, Hidden } from '@mui/material'

function CardH({text1 , text2 , text3 , header ,Color}) {
    const asUserRoleId = sessionStorage.getItem('RoleId');
  
  return (
    <div>
        <ListStyle color={Color}>
        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
        <Typography variant='h5'>{header}</Typography>  
        <Typography variant='body2'>{text1}</Typography>
        </Box>
       <Box sx={{display:"flex" , justifyContent:"space-between"}}>
    
        <Typography variant='body2'>{asUserRoleId=== "2" && (<Hidden mdDown> {text2}</Hidden>) }</Typography>
  
            
        <Typography variant='body2'>{text3}</Typography>
        </Box>
        </ListStyle>
    </div>
  )
}

export default CardH