import { Link as RouterLink } from 'react-router-dom';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import { Typography } from '@mui/material';

const MenuItems = () => {
  return (
    <div>
      <RouterLink
        style={{ textDecoration: 'none' }}
        to={`/${location.pathname.split('/')[1]}/MessageCenter/EmailSetting`}
      >
        <div
          style={{
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '-10px'
          }}
        >
          <SettingsSuggestOutlinedIcon 
            sx={{ fontSize: '28px' }}
          />
          <Typography ml={'20px'} fontSize={'15px'}>
            Email Setting
          </Typography>
        </div>
      </RouterLink>
    </div>
  );
};

export default MenuItems;
















{
  /* <EmailRoundedIcon sx={{ fontSize: '28px' }} />
          <span style={{ position: 'absolute', left: '30px', top: '20px' }}>
            <SettingsSuggestOutlinedIcon
              sx={{ fontSize: '18px', color: 'balck' }}
            />
          </span> */
}
