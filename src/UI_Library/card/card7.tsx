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
import BackButton from '../button/BackButton';

Card7.propTypes = {
  From: PropTypes.string,
  To: PropTypes.string,
  Date: PropTypes.string,
  Text: PropTypes.string,
  ViewDetail: PropTypes.object,
  Body: PropTypes.string,
  Attachments: PropTypes.string
};

function Card7({ ViewDetail, From, To, Body, Text, Attachments }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const file_path =
    'http://riteschool_old.aaditechnology.com' +
    '/RITeSchool/Uploads/' +
    Attachments;

  const Compredirect = () => {
    navigate('/extended-sidebar/MessageCenter/Compose');
  };

  const classes = Styles();
  return (
    <>
      <Container>
        <Card
          sx={{
            background: `${theme.colors.gradients.pink1}`
          }}
        >
          <BackButton />

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
            <Typography
              className={classes.CardBottomMargin}
              dangerouslySetInnerHTML={{ __html: Body }}
            />
          </Box>
        </Card>

        <Box onClick={Compredirect} sx={{ marginTop: '0px' }}>
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

        <Box
          onClick={Compredirect}
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
      </Container>
    </>
  );
}
export default Card7;
