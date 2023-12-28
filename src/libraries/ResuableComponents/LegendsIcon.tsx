import { Typography, Box } from '@mui/material';
import React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import TaskIcon from '@mui/icons-material/Task';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import CheckIcon from '@mui/icons-material/Check';
import BadgeIcon from '@mui/icons-material/Badge';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditOffIcon from '@mui/icons-material/EditOff';

const LegendsIcon = ({  text1={}, text2={},  text5={}, text3={}, color }) => {
  return (
    <>
      

      <Box sx={{ display: 'flex', maxWidth: '300px' }}>
        <EditOffIcon style={{ color: '#76ff03' }} />
        <Typography> {text1}</Typography>
      </Box>

      <Box sx={{ display: 'flex', maxWidth: '300px' }}>
        <TaskIcon style={{ color: '#ff9800' }} />
        <Typography> {text2}</Typography>
      </Box>

      <Box sx={{ display: 'flex', maxWidth: '300px' }}>
        <AssignmentIcon style={{ color: '#ff5722' }} />
        <Typography> {text3}</Typography>
      </Box>

      

      <Box sx={{ display: 'flex', maxWidth: '300px' }}>
        <CheckIcon style={{ color: '#607d8b' }} />
        <Typography> {text5}</Typography>
      </Box>
    </>
  );
};

export default LegendsIcon;
