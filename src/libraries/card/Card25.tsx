import { Box, Card, Typography, useTheme, Container, Fab } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import BackButton from '../button/BackButton';

import {
  CardDetail3,
  CardDetail1,
  CardDetail2,
  ListStyle,
  BoxWrapper
} from '../styled/CardStyle';

Card25.propTypes = {
  From: PropTypes.string,
  To: PropTypes.string,
  Date: PropTypes.string,
  Text: PropTypes.string,
  ViewDetail: PropTypes.object
};

function Card25({ ViewDetail, From, To, Date, Text }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const classes = Styles();
  return (
    <>
      <Container>
        <BackButton FromRoute={'/SMSCenter/smsCenter'}/>
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
