import ReplyIcon from '@mui/icons-material/Reply';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { Fab, useTheme } from '@mui/material';
import { ShowMessage } from '../styled/ErrormessageStyled';

Card26.propTypes = {
  paymentPageLink: PropTypes.string
};

function Card26() {
  const theme = useTheme();
  const { ActiveYear, InternalOrSchool } = useParams();

  return (
    <Container>
      <div>
        <RouterLink
          to={
            '/extended-sidebar/Student/Fees/' +
            ActiveYear +
            '/' +
            InternalOrSchool
          }
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
        <ShowMessage>
          On completion of payment, use back button to see fee details.
        </ShowMessage>
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
