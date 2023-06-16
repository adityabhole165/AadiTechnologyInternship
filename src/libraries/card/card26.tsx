import PropTypes from 'prop-types';
import BackButton from 'src/libraries/button/BackButton';
import { Container, Box } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link as RouterLink } from 'react-router-dom';

import { useTheme, Fab } from '@mui/material';
import { ShowMessage } from '../styled/ErrormessageStyled';

Card26.propTypes = {
  paymentPageLink: PropTypes.string
};

function Card26() {
  const theme = useTheme();
  
  
    return (
    <Container>
      <div>
        <RouterLink
          to={'/extended-sidebar/Student/Fees'}
          color="primary"
          style={{ textDecoration: 'none' }}
        >
          <Fab
            sx={{
              background: `${theme.colors.gradients.listColor}`,
              position: 'absolute',
              top: '18px',
              left: '8px',

              width: '35px !important',
              height: '10px !important',
              borderRadius: '4px !important',
              boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ReplyIcon />
          </Fab>
        </RouterLink>
        <ShowMessage>On completion of payment, use back button to see fee details.</ShowMessage>
        {/* <iframe
          width="100%"
          height="600px"
          allowFullScreen
          src={paymentPageLink}
          title="Online Payment"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe> */}
      </div>
    </Container>
  );
}

export default Card26;
