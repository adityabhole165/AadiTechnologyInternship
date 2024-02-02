import ReplyIcon from '@mui/icons-material/Reply';
import { Fab, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';

BackButton.propTypes = {
  FromRoute: PropTypes?.string
};

function BackButton({ FromRoute }) {
  const theme = useTheme();

  const pathname = window.location.pathname;
  const pageName = pathname.replace('/schoolList', '');
  return (
    <>
      <RouterLink
        to={
          pageName == '/forgotPassword'
            ? '/schoolList'
            : FromRoute == '/schoolnotice' || FromRoute == '/schoolList'
            ? FromRoute
            : `/${location.pathname.split('/')[1]}` + FromRoute
        }
        color="primary"
        style={{ textDecoration: 'none' }}
      >
        <Fab
          sx={{
            background: `${theme.colors.gradients.listColor}`,
            position: 'absolute',
            top: '18px',
            left: '20px',
            width: '35px !important',
            height: '10px !important',
            borderRadius: '4px !important'
            // boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
          }}
        >
          <ReplyIcon />
        </Fab>
      </RouterLink>
    </>
  );
}

export default BackButton;
