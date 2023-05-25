import { Typography, useTheme, Container, Card, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import { useState } from 'react';
import { ButtonPrimary } from '../styled/ButtonStyle';
import { CardStyle } from '../styled/CommonStyle';
import {
  CardWrapper,
  ListStyle,
  CardDetail1,
  BoxWrapper,
  CardDetail2,
  Wordbreak
} from '../styled/CardStyle';
import { useNavigate } from 'react-router-dom';

Card7.propTypes = {
  From: PropTypes.string,
  To: PropTypes.string,
  Cc: PropTypes.string,
  Text: PropTypes.string,
  ViewDetail: PropTypes.object,
  Body: PropTypes.string,
  Attachments: PropTypes.any,
  ID: PropTypes.string,
  Viewsent: PropTypes.array,
  LoggedInUserNameForMessage: PropTypes.string
};

function Card7({
  ViewDetail,
  From,
  To,
  Cc,
  Body,
  Text,
  Attachments,
  ID,
  Viewsent,
  ViewSentObject,
  LoggedInUserNameForMessage = '',
  MessageCenterReadMode=''
}) {
  const theme = useTheme();

  let attachment = Attachments;
  let attachmentObj: any = [];
  let file_path = localStorage.getItem('SiteURL') + '/RITeSchool/Uploads/';

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

  const classes = Styles();
  const BODY = Body.replace(/(\r\n|\r|\n)/g, '<br>');
  const FromUserID = ViewSentObject.SenderUserId;
  const navigate = useNavigate();

  const saveMessageBody = (replyFwd) => {
    const path =
      replyFwd === "Reply" ? `/${location.pathname.split('/')[1]}/MessageCenter/Compose/Reply` :
        replyFwd === "Forward" ?
          `/${location.pathname.split('/')[1]}/MessageCenter/Compose/Forward`
          : "";
    navigate(path)
    localStorage.setItem("messageBody", Body);

    localStorage.setItem("ViewMessageData", JSON.stringify(
      {
        From: replyFwd === "Reply" ? From : "",
        FromUserID: replyFwd === "Reply" ? FromUserID : "",
        Text: Text,
        Attachment: AttachmentArray,
        ID: ID
      }))
  }

  return (
    <>
      <Container maxWidth={'xl'}>
        <ListStyle sx={CardStyle}>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.From}</CardDetail1>

            <CardDetail2>{From}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.To}</CardDetail1>

            <CardDetail2>{To}</CardDetail2>
          </BoxWrapper>
          {Cc !== '' && 
          <>
          { To === LoggedInUserNameForMessage ?
              null :
            <BoxWrapper>
              <CardDetail1> {ViewDetail.Cc}</CardDetail1>
              <CardDetail2>{Cc}</CardDetail2>
            </BoxWrapper>
          }
          </>
}

          <BoxWrapper>
            <CardDetail1>{ViewDetail.Subject}</CardDetail1>
            <CardDetail2>{Text}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            {attachmentObj.length === 0 ? null : (
              <>
                {attachmentObj.map((item, i) => {
                  return (
                    <CardDetail1
                      key={i}
                      onClick={(event: React.MouseEvent<HTMLElement>) => {
                        window.open(item.FilePath);
                      }}
                      sx={{ color: '#628def' }}
                    >
                      {item.FileName.slice(0, 40) + '...'}
                    </CardDetail1>
                  );
                })}
              </>
            )}
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.Body}</CardDetail1>

            <Wordbreak dangerouslySetInnerHTML={{ __html: BODY }} />

          </BoxWrapper>
        </ListStyle>
      {MessageCenterReadMode == 'true' ? null :   <CardWrapper>
          {/* <RouterLink
            style={{ textDecoration: 'none' }}
            to={
              `/${
                location.pathname.split('/')[1]
              }/MessageCenter/Compose/Reply/` +
              From +
              '/' +
              Text +
              '/' +
              FromUserID+
              '/' +
              ID
            }
          > */}
          <ButtonPrimary onClick={() => { saveMessageBody("Reply") }}> Reply</ButtonPrimary>&nbsp;&nbsp;
          {/* </RouterLink> */}
          {/* <RouterLink
            style={{ textDecoration: 'none' }}
            to={
              `/${
                location.pathname.split('/')[1]
              }/MessageCenter/Compose/Forward/` +
              Text +
              '/' +
              AttachmentArray +
              '/' +
              ID
            }
          > */}
          <ButtonPrimary onClick={() => { saveMessageBody("Forward") }}> Forward</ButtonPrimary>
          {/* </RouterLink> */}
        </CardWrapper>}
      </Container>
    </>
  );
}
export default Card7;
