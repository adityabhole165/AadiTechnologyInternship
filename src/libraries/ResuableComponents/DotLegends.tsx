import AssignmentIcon from '@mui/icons-material/Assignment';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BadgeIcon from '@mui/icons-material/Badge';
import CheckIcon from '@mui/icons-material/Check';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import EditOff from '@mui/icons-material/EditOff';
import TaskIcon from '@mui/icons-material/Task';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EventBusyIcon from '@mui/icons-material/EventBusy';

import { Box, Typography } from '@mui/material';

const DotLegends = ({ text, text1, text2, text4, text5, text3, color }) => {
  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <FaceRetouchingOffIcon style={{ color: '#34a4eb' }} />
        <Typography> {text}</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <EditOff style={{ color: '#f44336' }} />
        <Typography> {text1}</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <DesignServicesIcon style={{ color: '#ff9800' }} />
        <Typography> {text2}</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <EventAvailableIcon style={{ color: '#25e67b' }} />
        <Typography> {text3}</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <EventBusyIcon style={{ color: '#0f0f0f' }} />
        <Typography> {text4}</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <CheckIcon style={{ color: '#07bc0c' }} />
        <Typography> {text5}</Typography>
      </Box>
    </>
  );
};

export default DotLegends;
