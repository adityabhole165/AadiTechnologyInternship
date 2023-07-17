import React from 'react'
import { ListStyle } from '../styled/CardStyle'
import { Typography , Box, Hidden } from '@mui/material'

function CardH({Text1 , Text2 , Text3 , Header ,Color ,ClickItem }) {
    const asUserRoleId = sessionStorage.getItem('RoleId');
 
  return (
    <div>
        <ListStyle color={Color} onClick={ClickItem}>
        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
        <Typography variant='h5'>{Header}</Typography>  
        <Typography variant='body2'>{Text1}</Typography>
        </Box>
       <Box sx={{display:"flex" , justifyContent:"space-between"}}>
    
        <Typography variant='body2'>{asUserRoleId=== "2" && (<Hidden mdDown> {Text2}</Hidden>) }</Typography>
  
            
        <Typography variant='body2'>{Text3}</Typography>
        </Box>
        </ListStyle>
    </div>
  )
}

export default CardH