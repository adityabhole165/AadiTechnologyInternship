import { Box, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import { decodeURL } from 'src/components/Common/Util';
import { ButtonPrimary } from '../styled/ButtonStyle';
import {
  BoxWrapper,
  CardDetail1,
  CardDetail2,
  ListStyle,
  Wordbreak
} from '../styled/CardStyle';
import { CardStyle } from '../styled/CommonStyle';

function CardDraft({
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
  MessageCenterReadMode,
  InsertDateInFormat
}) {
  const theme = useTheme();
  let attachment = Attachments;
  let attachmentObj: any = [];
  let file_path = localStorage.getItem('SiteURL') + '/RITeSchool/Uploads/';
  const UserID = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
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
  const ReplyallRecieverId = ViewSentObject.ReceiverUserId;
  const ReplyallCCRecieverId = ViewSentObject.ReceiverUserIdCc;
  const IsSender = UserID === FromUserID;
  const navigate = useNavigate();
  let {
    FromRoute
  } = useParams();

  // Decode in-place
  FromRoute = decodeURL(FromRoute);


  const navigateToInBox = () => {
    navigate('/RITeSchool/MessageCenter/msgCenter/Inbox', { state: { fromInternal: true } });
  };

  const navigateToEdit = () => {
    navigate('/RITeSchool/MessageCenter/Compose/Edit', { state: { fromInternal: true } });
  };
  return (
    <>
      <Box sx={{ px: 2 }}>
        <ListStyle sx={CardStyle}>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.From}</CardDetail1>

            <CardDetail2>{From}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>Received Date</CardDetail1>

            <CardDetail2>{InsertDateInFormat} </CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.To}</CardDetail1>

            <CardDetail2>{To}</CardDetail2>
          </BoxWrapper>
          {Cc !== '' && (
            <>
              {To === LoggedInUserNameForMessage ? null : (
                <BoxWrapper>
                  <CardDetail1> {ViewDetail.Cc}</CardDetail1>
                  <CardDetail2>{Cc}</CardDetail2>
                </BoxWrapper>
              )}
            </>
          )}

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
        <ButtonPrimary onClick={navigateToInBox}>Go to InBox</ButtonPrimary>
        <ButtonPrimary sx={{ ml: '5px' }} onClick={navigateToEdit}>
          Edit
        </ButtonPrimary>
      </Box>
    </>
  );
}
export default CardDraft;
