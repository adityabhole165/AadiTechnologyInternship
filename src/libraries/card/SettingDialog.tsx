import React, { useState, useEffect } from 'react';
import  { Avatar, Stack,Divider,Tooltip, Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import { green, orange, red } from '@mui/material/colors';
import ActiveTabType from './ActiveTabType';

function SettingDialog({clickDialogClose,clickApply}) {
    const [apply, setApply] = useState<any>('T');
    const [activeTab, setActiveTab] = useState('');
  
    useEffect(() => {
      setActiveTab('T');
    }, []);
  
    const clickTab = (value) => {
      setActiveTab(value);
    };
  
    const ViewClose = () => {
      clickApply(activeTab);
      clickDialogClose();
    };
  
    const clickClear=()=>{
      clickApply(null);
      clickDialogClose();
    }
  return (
    <div>
        <Box p={2} >
        <Typography >Select view</Typography>
        <ActiveTabType activeTab={activeTab} clickTab={clickTab}/>
         <Divider />
           <Box display={'flex'} justifyContent={'space-around'}>
            <Tooltip title="Apply Filter">
              <Avatar sx={{bgcolor: green[500],width: 24, height: 24}} variant="square" >
                <CheckIcon onClick={() => ViewClose()}  />
              </Avatar>
            </Tooltip>
            <Tooltip title="Clear Filter">
              <Avatar sx={{ bgcolor: orange[500],width: 24, height: 24}}  variant="square">
                <ReplayIcon onClick={() => clickClear()}  />
              </Avatar>
            </Tooltip>
            <Tooltip title="Cancel">
              <Avatar sx={{ bgcolor: red[500],width: 24, height: 24}} variant="square" >
                <CloseIcon onClick={clickDialogClose} />
              </Avatar>
            </Tooltip>
            </Box>
          </Box>
   
    </div>
  )
}

export default SettingDialog
