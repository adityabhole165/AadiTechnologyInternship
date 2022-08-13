import { Box, Card, Typography, useTheme, Container, Fab } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import BackButton from '../button/BackButton';

Card3.propTypes = {
  From: PropTypes.string,
  To: PropTypes.string,
  Date: PropTypes.string,
  Text: PropTypes.string,
  ViewDetail: PropTypes.object
};

function Card3({ ViewDetail, From, To, Date, Text }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const classes = Styles();
  return (
    <>
      
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
              {ViewDetail.Received_Date}
            </Typography>
            <Typography className={classes.Cardfont2}>{Date}</Typography>

            <Typography className={classes.Cardfont1}>
              {ViewDetail.To}
            </Typography>
            <Typography className={classes.Cardfont2}>{To}</Typography>

            <Typography className={classes.Cardfont1}>
              {ViewDetail.SMS_Text}
            </Typography>
            <Typography className={classes.CardBottomMargin}>{Text}</Typography>
          </Box>
        </Card>
      </Container>
    </>
  );
}
export default Card3;
