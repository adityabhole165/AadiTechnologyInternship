import { Container, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import {
  BoxWrapper,
  CardDetail1,
  CardDetail2,
  ListStyle
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
  EndDate,
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

            <CardDetail2>{Title}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.Start_Date}</CardDetail1>

            <CardDetail2>{StartDate}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.End_Date}</CardDetail1>

            <CardDetail2>{EndDate}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.Standards}</CardDetail1>

            <CardDetail2>{Standard}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.Description}</CardDetail1>

            <CardDetail2>{Description}</CardDetail2>
          </BoxWrapper>
        </ListStyle>
      </Container>
    </>
  );
}
export default Card2;
