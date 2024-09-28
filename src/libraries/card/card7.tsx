import { EditTwoTone, QuestionMark } from '@mui/icons-material';
import ForwardIcon from '@mui/icons-material/Forward';
import InboxIcon from '@mui/icons-material/Inbox';
import ReplyIcon from '@mui/icons-material/Reply';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import CommonPageHeader from 'src/components/CommonPageHeader';
import {
  BoxWrapper,
  CardDetail1,
  CardDetail2,
  CardWrapper,
  ListStyle
} from '../styled/CardStyle';

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
  InsertDateInFormat
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
    console.log(AttachmentArray, 'if Attachments');
  } else {
    for (const property in attachment) {
      let AttachmentFile: any = {
        FileName: `${property}`,
        FilePath: file_path + `${property}`
      };
      AttachmentArray.push(property);
      console.log(AttachmentFile, 'else Attachments');
      attachmentObj.push(AttachmentFile);
    }
  }
  // },[Attachments])
  const classes = Styles();
  const BODY = Body.replace(/(\r\n|\r|\n)/g, '<br>');
  const FromUserID = ViewSentObject.SenderUserId;
  // const FromUserID = ViewSentObject.SenderUserId;
  const ReplyallRecieverId = FromUserID + ',' + ViewSentObject.ReceiverUserId;
  const ReplyallCCRecieverId = ViewSentObject.ReceiverUserIdCc;
  const IsSender = UserID === FromUserID;
  const navigate = useNavigate();
  const FromTo = From + ',' + To;

  const saveMessageBody = (replyFwd) => {
    const path =
      replyFwd === 'Reply'
        ? `/${location.pathname.split('/')[1]}/MessageCenter/Compose/Reply`
        : replyFwd === 'Edit'
          ? `/${location.pathname.split('/')[1]}/MessageCenter/Compose/Edit`
          : replyFwd === 'Forward'
            ? `/${location.pathname.split('/')[1]}/MessageCenter/Compose/Forward`
            : replyFwd === 'ReplyAll'
              ? `/${location.pathname.split('/')[1]}/MessageCenter/Compose/ReplyAll`
              : '';
    navigate(path);
    localStorage.setItem('messageBody', Body);

    const getExcludeMe = () => {
      let arr = FromTo.split(',');
      if (ViewSentObject.LoggedInUserNameForMessage !== null) {
        arr = arr.filter(function (a) {
          return (
            a.replaceAll(' ', '') !==
            ViewSentObject?.LoggedInUserNameForMessage.replaceAll(' ', '')
          );
        });
      }
      return arr.join(',');
    };

    localStorage.setItem(
      'ViewMessageData',
      JSON.stringify({
        From:
          replyFwd === 'Reply'
            ? From
            : replyFwd === 'ReplyAll'
              ? getExcludeMe()
              : replyFwd === 'Edit'
                ? To
                : '',
        FromUserID:
          replyFwd === 'Reply'
            ? FromUserID
            : replyFwd === 'ReplyAll'
              ? ReplyallRecieverId
              : replyFwd === 'Edit'
                ? ViewSentObject.ReceiverUserId
                : '',
        Text: Text,
        Attachment: replyFwd === 'Edit' ? [] : AttachmentArray,
        ID: ID,
        CC: replyFwd === 'ReplyAll' || replyFwd === 'Edit' ? Cc : '',
        CCReceiverUserId:
          replyFwd === 'ReplyAll' || replyFwd === 'Edit'
            ? ReplyallCCRecieverId
            : ''
      })
    );
  };
  const { FromRoute } = useParams();

  const navigateToInBox = () => {
    navigate('/extended-sidebar/MessageCenter/msgCenter/Inbox');
  };

  return (
    <>
      <CommonPageHeader
        // <PageHeader heading="Message Center" subheading=""></PageHeader>
        // <BackButton FromRoute={'/MessageCenter/msgCenter/' + FromRoute} />
        navLinks={[
          { title: 'Message Center', path: '/extended-sidebar/MessageCenter/msgCenter' },
          { title: 'View Message', path: '/extended-sidebar/MessageCenter/viewMSg ' }
        ]}
        rightActions={
          <>
            {MessageCenterReadMode == true ? null : (
              <CardWrapper>
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

                <Box>
                  <Tooltip title={`View sent/received messages.`}>
                    <IconButton
                      sx={{
                        color: 'white',
                        mr: 1,
                        backgroundColor: grey[500],
                        height: '36px !important',
                        ':hover': { backgroundColor: grey[600] }
                      }}>
                      <QuestionMark />
                    </IconButton>
                  </Tooltip>
                </Box>
                {FromRoute === 'Draft' ? (
                  //  <Tooltip title={`Go to Inbox`}>
                  // <Button onClick={navigateToInBox}
                  //   sx={{
                  //     color: '#38548A',
                  //     '&:hover': {
                  //       color: '#38548A',
                  //       backgroundColor: blue[100]
                  //     }
                  //   }}
                  // >
                  //   {' '}
                  //   Go to Inbox{' '}
                  // </Button>
                  <Tooltip title={`Go to Inbox`}>
                    <IconButton
                      onClick={navigateToInBox}
                      sx={{
                        color: 'white',
                        mr: 1,
                        backgroundColor: blue[500],
                        height: '36px !important',
                        ':hover': { backgroundColor: blue[600] }
                      }}>
                      <InboxIcon />
                    </IconButton>
                  </Tooltip>

                ) : (
                  // <Button
                  //   onClick={() => {
                  //     saveMessageBody('Reply');
                  //   }}
                  //   sx={{
                  //     color: '#38548A',
                  //     '&:hover': {
                  //       color: '#38548A',
                  //       backgroundColor: blue[100]
                  //     }
                  //   }}
                  // >
                  //   {' '}
                  //   Reply
                  // </Button>

                  <Tooltip title={`Reply`}>
                    <IconButton
                      onClick={() => {
                        saveMessageBody('Reply');
                      }}
                      sx={{
                        color: 'white',
                        mr: 1,
                        backgroundColor: green[500],
                        height: '36px !important',
                        ':hover': { backgroundColor: green[600] }
                      }}>
                      <ReplyIcon />
                    </IconButton>
                  </Tooltip>
                )}{' '}

                {RoleId !== '3' && (
                  <>
                    {!IsSender && (
                      // <Button
                      //   onClick={() => {
                      //     saveMessageBody('ReplyAll');
                      //   }}
                      //   sx={{
                      //     color: '#38548A',
                      //     '&:hover': {
                      //       color: '#38548A',
                      //       backgroundColor: blue[100]
                      //     }
                      //   }}
                      // >
                      //   {' '}
                      //   Reply All
                      // </Button>
                      <Tooltip title={`Reply All`}>
                        <IconButton
                          onClick={() => {
                            saveMessageBody('ReplyAll');
                          }}
                          sx={{
                            color: 'white',
                            mr: 1,
                            backgroundColor: green[500],
                            height: '36px !important',
                            ':hover': { backgroundColor: green[600] }
                          }}>
                          {' '}
                          <ReplyAllIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                  </>
                )}
                {FromRoute === 'Draft' ? (
                  // <Button
                  //   onClick={() => {
                  //     saveMessageBody('Edit');
                  //   }}
                  //   sx={{
                  //     color: '#38548A',
                  //     '&:hover': {
                  //       color: '#38548A',
                  //       backgroundColor: blue[100]
                  //     }
                  //   }}
                  // >
                  //   {' '}
                  //   Edit{' '}
                  // </Button>
                  <Tooltip title={"Edit"}>
                    <IconButton
                      onClick={() => {
                        saveMessageBody('Edit');
                      }}
                      sx={{
                        color: 'white',
                        mr: 1,
                        backgroundColor: blue[500],
                        height: '36px !important',
                        ':hover': { backgroundColor: blue[600] }
                      }}
                    >
                      <EditTwoTone />
                    </IconButton>
                  </Tooltip>
                ) : (

                  // <Button
                  //   onClick={() => {
                  //     saveMessageBody('Forward');
                  //   }}
                  //   sx={{
                  //     color: '#38548A',
                  //     '&:hover': {
                  //       color: '#38548A',
                  //       backgroundColor: blue[100]
                  //     }
                  //   }}
                  // >
                  //   {' '}
                  //   Forward{' '}
                  // </Button>
                  <Tooltip title={`Forward`}>
                    <IconButton
                      onClick={() => {
                        saveMessageBody('Forward');
                      }}
                      sx={{
                        color: 'white',
                        backgroundColor: blue[500],
                        height: '36px !important',
                        ':hover': { backgroundColor: blue[600] }
                      }}>
                      <ForwardIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </CardWrapper>
            )}
          </>
        }
      />
      <Box>
        <ListStyle >
          <BoxWrapper >
            <CardDetail1> {ViewDetail.From}</CardDetail1>

            <CardDetail2>{From}</CardDetail2>
          </BoxWrapper><hr></hr>
          <BoxWrapper>
            <CardDetail1>Received Date</CardDetail1>

            <CardDetail2>{InsertDateInFormat} </CardDetail2>
          </BoxWrapper><hr></hr>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.To}</CardDetail1>

            <CardDetail2>{To}</CardDetail2>
          </BoxWrapper><hr></hr>
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
          </BoxWrapper><hr></hr>
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

            {/* <Wordbreak  /> */}
            <Typography dangerouslySetInnerHTML={{ __html: Body }}></Typography>
          </BoxWrapper>
        </ListStyle>
      </Box>
    </>
  );
}
export default Card7;
