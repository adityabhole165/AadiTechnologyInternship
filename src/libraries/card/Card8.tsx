import ReplyIcon from '@mui/icons-material/Reply';
import {
  Box,
  Button,
  Card,
  Fab,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import { encodeURL } from 'src/components/Common/Util';

Card8.propTypes = {
  From: PropTypes.string,
  To: PropTypes.string,
  Date: PropTypes.string,
  Text: PropTypes.string,
  ViewDetail: PropTypes.object,
  Body: PropTypes.string,
  Attachments: PropTypes.string
};

function Card8({ ViewDetail, From, To, Body, Text, Attachments }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const file_path =
    localStorage.getItem('SiteURL') + '/RITeSchool/Uploads/' + encodeURL(Attachments);

  const redirect = () => {
    navigate('/RITeSchool/Student/Inbox', { state: { fromInternal: true } });
  };
  const Compredirect = () => {
    navigate('/RITeSchool/Student/Compose', { state: { fromInternal: true } });
  };

  const classes = Styles();
  return (
    <>
      <Box sx={{ px: 2 }}>
        <Card
          sx={{
            background: `${theme.colors.gradients.pink1}`
          }}
        >
          <Box onClick={redirect} sx={{}}>
            <Fab
              className={classes.backArrow}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                position: 'absolute'
              }}
            >
              <ReplyIcon />
            </Fab>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            alignItems="flex-start"
            flexDirection="column"
            marginTop="10px"
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
            {Attachments.length === 0 ? null : (
              <>
                <Typography className={classes.Cardfont1}>
                  {ViewDetail.Attachment}
                </Typography>
                <Typography
                  className={classes.Cardfont2}
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    window.open(file_path);
                  }}
                >
                  {Attachments}
                </Typography>
              </>
            )}

            <Typography className={classes.Cardfont1}>
              {ViewDetail.Body}
            </Typography>
            <Typography className={classes.Cardfont2}>{Body}</Typography>
          </Box>
        </Card>
        <Box onClick={Compredirect} sx={{}}>
          <Button
            className={classes.Reply}
            sx={{
              paddingBlock: '15px',
              background: `${theme.colors.gradients.pink1}`,
              position: 'absolute'
            }}
          >
            Reply
          </Button>
        </Box>
        <Box onClick={Compredirect} sx={{}}>
          <Button
            className={classes.Forward}
            sx={{
              paddingBlock: '15px',
              background: `${theme.colors.gradients.pink1}`,
              position: 'absolute'
            }}
          >
            Forward
          </Button>
        </Box>
      </Box>
    </>
  );
}
export default Card8;
