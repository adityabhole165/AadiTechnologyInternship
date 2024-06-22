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
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {/* <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', maxWidth: '300px' }}> */}
      {text && <FaceRetouchingOffIcon style={{ color: '#34a4eb', fontSize: 'large',position: 'relative', top: '-2px' }} />}
       {text && <Typography> {text}</Typography>}
      </Box>

      {/* <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}> */}
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', maxWidth: '300px' }}>
       {text1&& <EditOff style={{ color: '#f44336', fontSize: 'large',position: 'relative', top: '-2px' }} />}
       {text1&& <Typography> {text1}</Typography>}
      </Box>

      {/* <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}> */}
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', maxWidth: '300px' }}>
        {text2 &&<DesignServicesIcon style={{ color: '#ff9800' , fontSize: 'large',position: 'relative', top: '-2px'}} />}
       {text2 &&<Typography> {text2}</Typography>}
      </Box>

      {/* <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}> */}
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', maxWidth: '300px' }}>
        {text3&&<EventAvailableIcon style={{ color: '#25e67b', fontSize: 'large',position: 'relative', top: '-2px' }} />}
       {text3&&<Typography> {text3}</Typography>}
      </Box>

      {/* <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}> */}
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', maxWidth: '300px' }}>
        {text4&&<EventBusyIcon style={{ color: '#0f0f0f' , fontSize: 'large',position: 'relative', top: '-2px'}} />}
        {text4&&<Typography> {text4}</Typography>}
      </Box>

      {/* <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}> */}
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', maxWidth: '300px' }}>
        {text5&&<CheckIcon style={{ color: '#07bc0c', fontSize: 'large',position: 'relative', top: '-2px' }} />}
        {text5&&<Typography> {text5}</Typography>}
      </Box>
    </>
  );
};

export default DotLegends;
