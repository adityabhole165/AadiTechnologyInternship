import {
  Box,
  Card,
  Typography,
  useTheme,
  Container,
  Button
} from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { ButtonPrimary } from '../styled/ButtonStyle';
import {
  CardWrapper,
  ListStyle,
  CardDetail3,
  CardDetail1,
  BoxWrapper
} from '../styled/CardStyle';

Card7.propTypes = {
  From: PropTypes.string,
  To: PropTypes.string,
  Date: PropTypes.string,
  Text: PropTypes.string,
  ViewDetail: PropTypes.object,
  Body: PropTypes.string,
  Attachments: PropTypes.any,
  ID: PropTypes.string,
  Viewsent: PropTypes.array
};

function Card7({
  ViewDetail,
  From,
  To,
  Body,
  Text,
  Attachments,
  ID,
  Viewsent,
  ViewSentObject
}) {
  const theme = useTheme();

  let attachment = Attachments;
  let attachmentObj: any = [];
  let file_path = 'https://192.168.1.80' + '/RITeSchool/Uploads/';

  const [AttachmentArray, setAttachmentArray] = useState<any>([]);

  if (Object.keys(Attachments).length == 0) {
    AttachmentArray.push('null');
  } else {
    for (const property in attachment) {
      let AttachmentFile: any = {
        FileName: `${property}`,
        FilePath: file_path + `${property}`
      };
      AttachmentArray.push(property);
      attachmentObj.push(AttachmentFile);
    }
  }
  // console.log(Object.keys(Attachments).length)

  const classes = Styles();
  const BODY = Body.replace(/(<([^>]+)>)/gi, '');
  const FromUserID = ViewSentObject.SenderUserId;
  console.log(BODY);

  return (
    <>
    
      <Container>
        <ListStyle>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.From}</CardDetail1>

            <CardDetail3>{From}</CardDetail3>

            <CardDetail1> {ViewDetail.To}</CardDetail1>

            <CardDetail3>{To}</CardDetail3>
            <CardDetail1>{ViewDetail.Subject}</CardDetail1>
            <CardDetail3>{Text}</CardDetail3>
            {attachmentObj.length === 0 ? null : (
              <>
                {attachmentObj.map((item, i) => {
                  return (
                    <Typography
                      key={i}
                      className={classes.Cardfont1}
                      onClick={(event: React.MouseEvent<HTMLElement>) => {
                        window.open(item.FilePath);
                      }}
                    >
                      {item.FileName}
                    </Typography>
                  );
                })}
              </>
            )}

            <CardDetail1> {ViewDetail.Body}</CardDetail1>
            <CardDetail3
              className={classes.CardBottomMargin}
              dangerouslySetInnerHTML={{ __html: Body }}
            />
          </BoxWrapper>
        </ListStyle>
        <CardWrapper>
          <RouterLink
            style={{ textDecoration: 'none' }}
            to={
              `/${
                location.pathname.split('/')[1]
              }/MessageCenter/Compose/Reply/` +
              From +
              '/' +
              Text +
              '/' +
              AttachmentArray +
              '/' +
              BODY +
              '/' +
              FromUserID
            }
          >
            <ButtonPrimary> Reply</ButtonPrimary>&nbsp;&nbsp;
          </RouterLink>
          <RouterLink
            style={{ textDecoration: 'none' }}
            to={
              `/${
                location.pathname.split('/')[1]
              }/MessageCenter/Compose/Forward/` +
              Text +
              '/' +
              AttachmentArray +
              '/' +
              BODY
            }
          >
            <ButtonPrimary> Forward</ButtonPrimary>
          </RouterLink>
        </CardWrapper>
      </Container>
    </>
  );
}
export default Card7;
