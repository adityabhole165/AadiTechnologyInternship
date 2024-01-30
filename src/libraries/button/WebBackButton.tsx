import ReplyIcon from '@mui/icons-material/Reply';
import PropTypes from 'prop-types';
import { useTheme, Fab, useMediaQuery, Tooltip } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import { ButtonPrimary } from '../styled/ButtonStyle';

WebBackButton.propTypes = {
  FromRoute: PropTypes?.string
};

function WebBackButton({ FromRoute , icon}) {
  const theme = useTheme();
  const ismobile = useMediaQuery('(max-width:600px)')

  const pathname = window.location.pathname;
  const pageName = pathname.replace('/schoolList', '');
  return (
    <>
      <RouterLink
        to={
          pageName == '/forgotPassword'
            ? '/schoolList'
            : (FromRoute == '/schoolnotice' || FromRoute == '/schoolList' )
            ? FromRoute
            : `/${location.pathname.split('/')[1]}` + FromRoute
        }
        color="primary"
        style={{ textDecoration: 'none' }}
      >
        <Tooltip title='Back'>

        {/* {ismobile ? */}
        <Fab
        
          sx={{
            background: `gray`,
            position: 'relative',
            // top: '60px',
             
              color:'#fff',
            width: '40px !important',
            height: '12px !important',
            borderRadius: '15% !important',
            ":hover":{
                    backgroundColor:'gray'
            },
           
            boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
          }} >
          {icon ? icon :''}
        </Fab> 
        </Tooltip>
        {/* :  */}
        {/* <ButtonPrimary  color={'secondary'} sx={(theme)=>({bgcolor: 'primary.50'})}>Back
        </ButtonPrimary> */}
        {/* } */}
      </RouterLink>
    </>
  );
}

export default WebBackButton;
