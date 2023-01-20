import { Box,Card,Badge } from '@mui/material';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import RefreshIcon from '@mui/icons-material/Refresh';


function CardHeader({ clickDialogOpen ,itemList}) {
  return (
  <Card component={Box} my={2} p={1} sx={{backgroundColor:"#FFA69E"}}>
<Box sx={{float:"right"}}>
<SettingsIcon onClick={clickDialogOpen} />
<RefreshIcon />
<Badge
badgeContent={itemList.length !== 0 ?  itemList.length :'0' }
color="secondary"/>
   </Box>
 </Card>
  );
}

export default CardHeader;
