import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  FormGroup,
  Grid,
  List,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import ErrorMessages2 from 'src/libraries/ErrorMessages/DashboardError';

Card9.propTypes = {
  Count: PropTypes.number,
  UnreadMessage: PropTypes.array,
  SenderPhoto: PropTypes.array
};

function Card9({ Count, UnreadMessage, SenderPhoto }) {
  const classes = Styles();
  const theme = useTheme();
  const location = useLocation();
  return (
    <Container>
      <Card sx={{ boxShadow: '6px 4px 5px grey !important' }}>
        <List
          sx={{
            background: `${theme.colors.gradients.pink1}`
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography sx={{ color: 'black' }}>
              <b>Unread Messages</b>
            </Typography>

            <Avatar sx={{ height: '30px', width: '30px' }}>
              <Typography color={'black'}>
                <b>{Count}</b>
              </Typography>
            </Avatar>
          </Box>
        </List>

        <>
          {UnreadMessage === undefined ? (
            <ErrorMessages2 Error={'No record found'} />
          ) : (
            <>
              {UnreadMessage.map((items, i) => {
                return (
                  <RouterLink
                    key={i}
                    to={
                      `/${
                        location.pathname.split('/')[1]
                      }/MessageCenter/viewMSg/` + items.MessageDetailsId
                    }
                    color="primary"
                    style={{ textDecoration: 'none' }}
                  >
                    <Divider />
                    <List>
                      <Box>
                        {SenderPhoto.map((image, i) => {
                          if (image.Id === items.SenderUserId) {
                            return (
                              <FormGroup>
                                <Avatar
                                  alt="u"
                                  src={`data:image/png;base64,${image.Photo}`}
                                />
                              </FormGroup>
                            );
                          }
                        })}

                        <Grid xs={8}>
                          <Typography
                            className={classes.Listfont1}
                            sx={{
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              marginTop: '-42px',
                              marginLeft: '45px',
                              marginBottom: '20px'
                            }}
                          >
                            {items.UserName}
                          </Typography>
                        </Grid>

                        <Box
                          sx={{
                            mt: 1
                          }}
                        >
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography
                              className={classes.Listfont2}
                              sx={{
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                width: 132,
                                marginLeft: '45px',
                                marginTop: '-15px'
                              }}
                            >
                              {items.Subject}
                            </Typography>

                            <Typography
                              className={classes.Listfont2}
                              sx={{ marginTop: '-15px' }}
                            >
                              {items.Date}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </List>
                  </RouterLink>
                );
              })}
            </>
          )}
        </>

        <List
          sx={{
            background: `${theme.colors.gradients.pink1}`
          }}
        >
          <RouterLink
            to={`/${
              location.pathname.split('/')[1]
            }/MessageCenter/msgCenter/Inbox`}
          >
            <Box display="flex" flexDirection="row" justifyContent="right">
              <Typography
                className={classes.Listfont1}
                sx={{ textDecoration: 'underline', color: 'blue' }}
              >
                See all messages
              </Typography>
              <ArrowForwardTwoToneIcon fontSize="small" />
            </Box>
          </RouterLink>
        </List>
      </Card>
    </Container>
  );
}

export default Card9;
