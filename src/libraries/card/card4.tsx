import { Box, Card, Typography, useTheme, Container, Fab } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import BackButton from '../button/BackButton';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate } from 'react-router-dom';
import {
  CardDetail3,
  CardDetail1,
  ListStyle,
  BoxWrapper
} from '../styled/CardStyle';

Card4.propTypes = {
  Title: PropTypes.string,
  ViewDetail: PropTypes.object,
  SubjectName: PropTypes.string,
  Assignedate: PropTypes.string,
  CompletedDate: PropTypes.string,
  Attachments: PropTypes.string,
  Details: PropTypes.string
};

function Card4({
  ViewDetail,
  SubjectName,
  Title,
  Assignedate,
  CompletedDate,
  Attachments,
  Details
}) {
  const theme = useTheme();
  const file_path =
    'https://192.168.1.80/RITeSchool' +
    '/DOWNLOADS/Homework/' +
    Attachments;

  const classes = Styles();
  return (
    <>
      <Container>
        <ListStyle
        >
          <BoxWrapper>
            <CardDetail1> {ViewDetail.SubjectName}</CardDetail1>
            <CardDetail3>{SubjectName}</CardDetail3>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.Title}</CardDetail1>
            <CardDetail3>{Title}</CardDetail3>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.AssignedDate}</CardDetail1>
            <CardDetail3>{Assignedate}</CardDetail3>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.CompleteByDate}</CardDetail1>
            <CardDetail3> {CompletedDate}</CardDetail3>
          </BoxWrapper>

          {Attachments.length === 0 ? null : (
            <>
              <BoxWrapper>
                <CardDetail1> {ViewDetail.AttachmentPath}</CardDetail1>
                <CardDetail3
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    window.open(file_path);
                  }}
                >
                  {' '}
                  {Attachments}
                </CardDetail3>
              </BoxWrapper>
            </>
          )}

          <BoxWrapper>
            <CardDetail1> {ViewDetail.Details}</CardDetail1>
            <CardDetail3>{Details}</CardDetail3>
          </BoxWrapper>

        </ListStyle>
      </Container>
    </>
  );
}
export default Card4;
