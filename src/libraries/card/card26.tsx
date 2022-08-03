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
        <BackButton />
        <a>
          <iframe
            width="100% "
            height="100%"
            allowFullScreen
            src={paymentPageLink}
            title="Online Payment"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </a>
      </div>
    </Container>
  );
}

export default Card26;
