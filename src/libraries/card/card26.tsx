import PropTypes from 'prop-types';
import BackButton from 'src/libraries/button/BackButton';
import { Container } from '@mui/material';

Card26.propTypes = {
  paymentPageLink: PropTypes.string
};

function Card26({ paymentPageLink }) {
  return (
    <Container>
      <div>
        <BackButton FromRoute={"/Student/Fees"}/>
          <iframe
            width='100%'
            height="600px"
            allowFullScreen
            src={paymentPageLink}
            title="Online Payment"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
      </div>
    </Container>
  );
}

export default Card26;
