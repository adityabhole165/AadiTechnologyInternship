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
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState } from 'react';


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
  // console.log(Text);
const Text2 = Text
console.log("Text2",Text2);
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
  // const BodyId = () => ({
  //   dangerouslySetInnerHTML={{ __html: Body }}
  // })
  const BODY = Body.replace(/(<([^>]+)>)/ig, '');
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

        {/* <RouterLink
          style={{ textDecoration: 'none' }}
          to={
            `/${location.pathname.split('/')[1]
            }/MessageCenter/Compose/` + Text + "/" + To
          }
        > */}
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
        {/* </RouterLink> */}
        <RouterLink
          style={{ textDecoration: 'none' }}
          to={
            `/${location.pathname.split('/')[1]
            }/MessageCenter/Compose/` + Attachments + "/" + Text2 + "/" + BODY
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
