import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { Avatar } from '@mui/material';
function TopScroll({ executeScroll }) {
  return (
    <div>
      <Avatar
        sx={{
          zIndex: '4',
          left: '15px',
          p: '2px',
          width: 50,
          height: 50,
          backgroundColor: 'white',
          boxShadow:
            '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
        }}
        onClick={executeScroll} // Close function
      >
        <KeyboardArrowUpRoundedIcon fontSize="large" color="success" />
      </Avatar>
    </div>
  );
}

export default TopScroll;
