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

Card7.propTypes = {
  From: PropTypes.string,
  To: PropTypes.string,
  Date: PropTypes.string,
  Text: PropTypes.string,
  ViewDetail: PropTypes.object,
  Body: PropTypes.string,
  Attachments: PropTypes.any,
  ID: PropTypes.string,
  Viewsent: PropTypes.array,
};

function Card7({ ViewDetail, From, To, Body, Text, Attachments, ID, Viewsent,ViewSentObject}) {
  const theme = useTheme();

  let attachment = Attachments;
  let attachmentObj: any = [];
  let file_path =  'http://riteschool_old.aaditechnology.com'  + '/RITeSchool/Uploads/';

  const [AttachmentArray,setAttachmentArray] = useState<any>([]);

  for (const property in attachment) {
    let AttachmentFile:any = {FileName: `${property}`, FilePath:file_path + `${property}`};
    AttachmentArray.push(property);
    attachmentObj.push(AttachmentFile);
  }

  const classes = Styles();
  const BODY = Body.replace(/(<([^>]+)>)/gi, '');
  const FromUserID = ViewSentObject.SenderUserId;

  return (
    <>
      <span style={{ position: 'relative', left: '20px', top: '-38px' }}>
      </span>
      <Container>
        <Card
          sx={{
            background: `${theme.colors.gradients.pink1}`
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            p={3}
            alignItems="flex-start"
            flexDirection="column"
          >
            <Typography className={classes.Cardfont1}>
              {ViewDetail.From}
            </Typography>
            <Typography className={classes.Cardfont2}>{From}</Typography>

            <Typography className={classes.Cardfont1}>
              {ViewDetail.To}
            </Typography>
            <Typography className={classes.Cardfont2}>{To}</Typography>

            <Typography className={classes.Cardfont1}>
              {ViewDetail.Subject}
            </Typography>
            <Typography className={classes.Cardfont2}>{Text}</Typography>
            {attachmentObj.length === 0 ? null : (
              <>
                {
                  attachmentObj.map((item, i) => {
                    return (
                      <Typography key={i} className={classes.Cardfont1}
                        onClick={(event: React.MouseEvent<HTMLElement>) => {
                        window.open(item.FilePath);
                      }
                    }
                      >
                        {item.FileName}
                        
                      </Typography>
                    )
                  })
                }
              </>
            )}

            <Typography className={classes.Cardfont1}>
              {ViewDetail.Body}
            </Typography>
            <Typography
              className={classes.CardBottomMargin}
              dangerouslySetInnerHTML={{ __html: Body }}
            />
          </Box>
        </Card>

        <RouterLink
          style={{ textDecoration: 'none' }}
          to={
            `/${location.pathname.split('/')[1]
            }/MessageCenter/Compose/Reply/` + From + "/" + Text + "/" + AttachmentArray + "/" + BODY + "/" + FromUserID
          }
        >
          <Box sx={{ marginTop: '0px' }}>
            {/*  onClick={Compredirect} */}
            <Button
              className={classes.Reply}
              sx={{
                background: 'rgb(11 101 214)',
                position: 'absolute'
              }}
            >
              Reply
            </Button>
          </Box>
        </RouterLink>
        <RouterLink
          style={{ textDecoration: 'none' }}
          to={
            `/${location.pathname.split('/')[1]}/MessageCenter/Compose/Forward/` + Text + '/' + AttachmentArray + '/' + BODY
          }
        >
          <Box
            // onClick={Compredirect}
            sx={{
              mt: -1
            }}
          >
            <Button
              className={classes.Forward}
              sx={{
                background: 'rgb(11 101 214)',
                position: 'absolute'
              }}
            >
              Forward
            </Button>
          </Box>
        </RouterLink>
      </Container>
    </>
  );
}
export default Card7;