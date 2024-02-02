import { Container, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import BackButton from '../button/BackButton';

import {
  BoxWrapper,
  CardDetail1,
  CardDetail2,
  ListStyle
} from '../styled/CardStyle';

Card25.propTypes = {
  From: PropTypes.string,
  To: PropTypes.string,
  Date: PropTypes.string,
  Text: PropTypes.string,
  ViewDetail: PropTypes.object
};

function Card25({ ViewDetail, From, To, Date, Text, FromURL = 'Received' }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const classes = Styles();
  return (
    <>
      <Container>
        <BackButton FromRoute={'/SMSCenter/smsCenter/' + FromURL} />
        <ListStyle
          sx={{
            background: `${theme.colors.gradients.pink1}`
          }}
        >
          <BoxWrapper>
            <CardDetail1>{ViewDetail.From}</CardDetail1>
            <CardDetail2>{From}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.To}</CardDetail1>
            <CardDetail2>{To}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.Scheduled_Date}</CardDetail1>
            <CardDetail2>{Date}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.SMS_Text}</CardDetail1>
            <CardDetail2>{Text}</CardDetail2>
          </BoxWrapper>
        </ListStyle>
      </Container>
    </>
  );
}
export default Card25;
