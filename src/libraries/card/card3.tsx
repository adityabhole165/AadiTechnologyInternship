import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import {
  BoxWrapper,
  CardDetail1,
  CardDetail2,
  CardDetail3,
  ListStyle
} from '../styled/CardStyle';

Card3.propTypes = {
  From: PropTypes.string,
  To: PropTypes.string,
  Date: PropTypes.string,
  Text: PropTypes.string,
  ViewDetail: PropTypes.object
};

function Card3({ ViewDetail, From, To, Date, Text }) {
  return (
    <>
      <Box sx={{ px: 2 }}>
        <ListStyle>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.From}</CardDetail1>

            <CardDetail3>{From}</CardDetail3>
          </BoxWrapper>

          <BoxWrapper>
            <CardDetail1> {ViewDetail.Received_Date}</CardDetail1>

            <CardDetail3>{Date}</CardDetail3>
          </BoxWrapper>

          <BoxWrapper>
            <CardDetail1>{ViewDetail.To}</CardDetail1>

            <CardDetail3>{To}</CardDetail3>
          </BoxWrapper>

          <BoxWrapper>
            <CardDetail1> {ViewDetail.SMS_Text}</CardDetail1>

            <CardDetail2>{Text}</CardDetail2>
          </BoxWrapper>
        </ListStyle>
      </Box>
    </>
  );
}
export default Card3;
