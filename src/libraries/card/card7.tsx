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
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { array } from 'yup/lib/locale';

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

function Card7({ ViewDetail, From, To, Body, Text, Attachments, ID, Viewsent}) {
  const theme = useTheme();
  const navigate = useNavigate();
  console.log(From)

  let attachment = Attachments;
  let attachmentObj: any = [];
  let file_path =  'http://riteschool_old.aaditechnology.com'  + '/RITeSchool/Uploads/';

  for (const property in attachment) {
    let AttachmentFile:any = {FileName: `${property}`, FilePath:file_path + `${property}`};
    attachmentObj.push(AttachmentFile);
  }

  const classes = Styles();

  const BODY = Body.replace(/(<([^>]+)>)/gi, '');
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
            }/MessageCenter/Compose/Reply/` + From + "/" + Text + "/" + Attachments + "/" + BODY
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
            `/${location.pathname.split('/')[1]}/MessageCenter/Compose/Forward/` + Text + '/' + Attachments + '/' + BODY
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