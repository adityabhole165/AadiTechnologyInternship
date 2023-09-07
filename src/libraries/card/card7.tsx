import { Typography, useTheme, Container, Card, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';

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
  MessageCenterReadMode,
  InsertDateInFormat,
  
}) {

  const theme = useTheme();
  let attachment = Attachments;
  let attachmentObj: any = [];
  let file_path = localStorage.getItem('SiteURL') + '/RITeSchool/Uploads/';
  const UserID = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const [AttachmentArray, setAttachmentArray] = useState<any>([]);
  // useEffect(()=>{
    if (Object.keys(Attachments).length == 0) {
    
      AttachmentArray.push('null');
      console.log(AttachmentArray,"if Attachments")
    } else {
      for (const property in attachment) {
        let AttachmentFile: any = {
          FileName: `${property}`,
          FilePath: file_path + `${property}`
        };
        AttachmentArray.push(property);
      console.log(AttachmentFile,"else Attachments")
      attachmentObj.push(AttachmentFile);
      }
    } 
    // },[Attachments])
  const classes = Styles();
  const BODY = Body.replace(/(\r\n|\r|\n)/g, '<br>');
  const FromUserID = ViewSentObject.SenderUserId;
  // const FromUserID = ViewSentObject.SenderUserId;
  const ReplyallRecieverId =FromUserID +','+ ViewSentObject.ReceiverUserId
  const ReplyallCCRecieverId = ViewSentObject.ReceiverUserIdCc
  const IsSender = UserID === FromUserID
  const navigate = useNavigate();
  const FromTo = From +','+ To

  const saveMessageBody = (replyFwd) => {  
    const path =
      replyFwd === "Reply" ? `/${location.pathname.split('/')[1]}/MessageCenter/Compose/Reply` :
      replyFwd === "Edit" ? `/${location.pathname.split('/')[1]}/MessageCenter/Compose/Edit` :
        replyFwd === "Forward" ?
          `/${location.pathname.split('/')[1]}/MessageCenter/Compose/Forward`
          :replyFwd === "ReplyAll"?  `/${location.pathname.split('/')[1]}/MessageCenter/Compose/ReplyAll`:"";
    navigate(path)
    localStorage.setItem("messageBody", Body);

    const getExcludeMe = () =>{
      let arr = FromTo.split(',');
      arr = arr.filter(function(a){return a.replaceAll(' ','') !== ViewSentObject.LoggedInUserNameForMessage.replaceAll(' ','')})
      return arr.join(',');
    } 
    if(replyFwd === "Edit")
    setAttachmentArray([])
    localStorage.setItem("ViewMessageData", JSON.stringify(
      {
        From: replyFwd === "Reply" ? From :  replyFwd ==="ReplyAll" ? getExcludeMe() : 
        replyFwd === "Edit" ? To :"",
        FromUserID: replyFwd === "Reply" ? FromUserID : replyFwd ==="ReplyAll" ? ReplyallRecieverId : 
        replyFwd === "Edit" ? ViewSentObject.ReceiverUserId :"",
        Text: Text,
        Attachment: AttachmentArray,
        ID: ID,
        CC:replyFwd ==="ReplyAll" ? Cc : "",
        CCReceiverUserId:replyFwd ==="ReplyAll" ? ReplyallCCRecieverId : ""
      }))
  }
  const {  FromRoute } = useParams();


const navigateToInBox =()=>{
  navigate('/extended-sidebar/MessageCenter/msgCenter/Inbox' )
}

  return (
    <>
      <Container maxWidth={'xl'}>
        <ListStyle >
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
            {attachmentObj.length > 0 && (
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
      {MessageCenterReadMode == true ? null :   <CardWrapper>
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

        {FromRoute === 'Draft' ? <ButtonPrimary onClick={navigateToInBox}> GoTo InBox </ButtonPrimary> :
        <ButtonPrimary onClick={() => { saveMessageBody("Reply") }}> Reply</ButtonPrimary>
        } &nbsp; &nbsp;            
          
         {RoleId !== "3" &&  <>
        {!IsSender &&  <ButtonPrimary onClick={() => { saveMessageBody("ReplyAll") }}> Reply All</ButtonPrimary>}&nbsp;&nbsp;
          </>}

        {FromRoute === 'Draft' ? <ButtonPrimary onClick={() => { saveMessageBody("Edit") }}> Edit </ButtonPrimary> :
        <ButtonPrimary onClick={() => { saveMessageBody("Forward") }}> Forward </ButtonPrimary>}
         
        </CardWrapper>}
      </Container>
    </>
  );
}
export default Card7;
