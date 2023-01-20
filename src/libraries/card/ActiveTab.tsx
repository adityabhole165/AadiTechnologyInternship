import { Box, Typography } from '@mui/material';
import React from 'react'
import { ListStyle1 } from 'src/libraries/styled/CardStyle';

function ActiveTab({ ButtonType, clickTab,activeTab }) {
  return (
    <div>
       <ListStyle1 color={activeTab == ButtonType?'secondary':'primary'} onClick={()=>{clickTab(ButtonType)}}>
                <Typography sx={{fontWeight:"bold"}}>{ButtonType}</Typography>
         </ListStyle1>
    </div>
  )
}

export default ActiveTab
