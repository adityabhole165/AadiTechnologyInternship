import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import PropTypes from 'prop-types';
import { Box, useTheme, Fab } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';

BackButton.propTypes = {
  FromRoute: PropTypes?.string
};

function BackButton({ FromRoute }) {
  const theme = useTheme();
  const classes = Styles();
  //const navigate = useNavigate();
  const pathname = window.location.pathname;
  const pageName = pathname.replace(
    '/schoolList',
    ''
  );

  return (
    <>
      <RouterLink
        to={
          pageName == "/forgotPassword"
          ?
          "/schoolList"
          :
          `/${location.pathname.split('/')[1]}` + FromRoute
        }
        color="primary"
        style={{ textDecoration: 'none' }}
      >
        <Fab
          className={classes.backArrow}
          sx={{
            background: `${theme.colors.gradients.pink1}`,
            position: 'absolute',
            top: '30px',
            left: '35px'
          }}
        >
          <ReplyIcon />
        </Fab>
      </RouterLink>
    </>
  );
}

export default BackButton;
