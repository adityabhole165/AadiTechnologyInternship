import React from 'react'
import  { Avatar, Stack,Divider,Tooltip, Box} from '@mui/material';
import ActiveTab from './ActiveTab';

const ActiveTabType = ({activeTab,clickTab}) => {
  return (
    <div>
         <Stack direction="row" >
               <ActiveTab ButtonType='T' clickTab={clickTab} activeTab={activeTab} />
               <ActiveTab ButtonType='W' clickTab={clickTab} activeTab={activeTab} />
         </Stack>
    </div>
  )
}

export default ActiveTabType