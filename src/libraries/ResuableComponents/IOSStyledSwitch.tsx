import { Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const IOSSwitch = styled(Switch)(({ theme }) => ({
  padding: 7,
  '& .MuiSwitch-thumb': {
    backgroundColor: '#fff',
    width: 23,
    height: 20,
    boxShadow: 'none',
    transition: 'background-color 0.3s ease-in-out'
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    transform: 'translateX(12px)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#3f51b5',
    opacity: 1,
    borderRadius: 20 / 2,
    transition: 'background-color 0.3s ease-in-out'
  }
}));

const IOSSwitchLabel = styled(Typography)(({ theme }) => ({
  color: '#3f51b5',
  fontWeight: 'bold'
}));

const IOSStyledSwitch = ({ label, checked, onChange }) => {
  return (
    <>
      <IOSSwitchLabel variant="h6" gutterBottom>
        {label}
      </IOSSwitchLabel>
      <IOSSwitch
        checked={checked}
        onChange={onChange}
        color="primary"
        sx={{
          '& .MuiSwitch-thumb': {
            backgroundColor: checked ? '#4caf50' : '#f44336'
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: checked ? '#4caf50' : '#f44336'
          }
        }}
      />
    </>
  );
};

export default IOSStyledSwitch;
