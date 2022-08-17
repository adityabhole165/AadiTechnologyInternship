import PropTypes from 'prop-types';
import BackButton from 'src/libraries/button/BackButton';
import { Container } from '@mui/material';

Card26.propTypes = {
  paymentPageLink: PropTypes.string
};

function Card26({ paymentPageLink }) {
  console.log(paymentPageLink)
  return (
    <Container>
      <div>
        <BackButton />
          <iframe
            width='100%'
            height="600px"
            allowFullScreen
            src={paymentPageLink}
            title="Online Payment"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>

        {/* <iframe src="http://riteschool_old.aaditechnology.com/RITeSchool/Accountant/PayFeeOnline.aspx?6KuPFs5XqGnXs5LKxJ2NxFQDlpGQr8o7IBszKlkdNd/lQg3D5jkU7E8UU9IjwMsaldjD8y%20BsUDcLNrT9/blnpjnZR8a2dH7q0qnovXufwKoGc5MdzFRVVR1mWd%20E3yekcJTNlO2sn9VgZgjZsckizXs4Ni0BU62aYs5xX9e6aPpOLQ1RQ6Oz/9pdnl2vbd9tLtG4st%2033a1j0t4Ybl7RhmGurZA1ur2e10QNErKHiN4BqutfZD/W0/Uhu%20fN6rWSWI6bHyfYwAfRaHXVCcB/lt3tQT1Pg2OXrfB3xOjQ88=q" title="W3Schools Free Online Web Tutorials"></iframe> */}
      </div>
    </Container>
  );
}

export default Card26;
