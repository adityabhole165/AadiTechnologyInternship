import { Container, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import {
  BoxWrapper,
  CardDetail1,
  CardDetail2,
  CardDetail3,
  ListStyle
} from '../styled/CardStyle';

Card4.propTypes = {
  Title: PropTypes.string,
  ViewDetail: PropTypes.object,
  SubjectName: PropTypes.string,
  Assignedate: PropTypes.string,
  CompletedDate: PropTypes.string,
  Attachments: PropTypes.string,
  Details: PropTypes.string,
  MoreAttachments: PropTypes.arrayOf(PropTypes.string)
};

function Card4({
  ViewDetail,
  SubjectName,
  Title,
  Assignedate,
  CompletedDate,
  Attachments,
  Details,
  MoreAttachments
}) {
  const theme = useTheme();
  const file_path =
    localStorage.getItem('SiteURL') + '/RITeSchool/DOWNLOADS/Homework/';

  const classes = Styles();
  return (
    <>
      <Container>
        <ListStyle>
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
            <BoxWrapper>
              <CardDetail1> {ViewDetail.AttachmentPath}</CardDetail1>
              <CardDetail3
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  window.open(file_path + Attachments);
                }}
                color="#628def"
              >
                {Attachments}
              </CardDetail3>
            </BoxWrapper>
          )}
          {MoreAttachments.map((Attachments, i) => {
            return (
              <>
                <CardDetail1>{ViewDetail.AttachmentPath}</CardDetail1>
                <CardDetail3
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    window.open(file_path + Attachments);
                  }}
                  color="#628def"
                >
                  {Attachments}
                </CardDetail3>
              </>
            );
          })}
          <BoxWrapper>
            <CardDetail1> {ViewDetail.Details}</CardDetail1>
            <CardDetail2>
              {' '}
              {Details.split('\n').map(function (item, i) {
                return (
                  <span key={i}>
                    {item}
                    <br />
                  </span>
                );
              })}
            </CardDetail2>
          </BoxWrapper>
        </ListStyle>
      </Container>
    </>
  );
}
export default Card4;
