import { Box, Card, Typography, useTheme, Container } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import BackButton from '../button/BackButton';
import {
  CardDetail3,
  CardDetail1,
  ListStyle,
  BoxWrapper
} from '../styled/CardStyle';

Card2.propTypes = {
  Title: PropTypes.string,
  ViewDetail: PropTypes.object,
  StartDate: PropTypes.string,
  EndDate: PropTypes.string,
  Standard: PropTypes.string,
  Attachments: PropTypes.string,
  Descriptions: PropTypes.string
};

function Card2({
  ViewDetail,
  Title,
  StartDate,

  Standard,
  Description
}) {
  const theme = useTheme();
  const classes = Styles();
  return (
    <>
      <Container>
        <ListStyle>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.Title}</CardDetail1>

            <CardDetail3>{Title}</CardDetail3>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.Start_Date}</CardDetail1>

            <CardDetail3>{StartDate}</CardDetail3>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.Standards}</CardDetail1>

            <CardDetail3>{Standard}</CardDetail3>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.Description}</CardDetail1>

            <CardDetail3>{Description}</CardDetail3>
          </BoxWrapper>
        </ListStyle>
      </Container>
    </>
  );
}
export default Card2;
