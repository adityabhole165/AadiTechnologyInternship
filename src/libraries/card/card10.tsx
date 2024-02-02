import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Box,
  Card,
  Container,
  Divider,
  List,
  Typography,
  useTheme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import { GetUpcomingEventsResult } from 'src/interfaces/Student/dashboard';
import ErrorMessages2 from 'src/libraries/ErrorMessages/DashboardError';

Card10.propTypes = {
  Sub: PropTypes.array,
  headd: PropTypes.object
};

function Card10({ Sub, headd, index }) {
  const theme = useTheme();
  const location = useLocation();

  const useStyles = makeStyles({
    root: {
      background: '#e9a69a'
    },
    roo1: {
      background: `${theme.colors.gradients.pink1}`
    }
  });

  const clas = useStyles();
  const classes = Styles();
  const refreshPage = () => {
    window.location.reload();
  };

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
              <b>Upcoming Events</b>
            </Typography>
            <RefreshIcon
              onClick={refreshPage}
              sx={{ ml: '4px', mr: '4px', mt: '3px' }}
            />
          </Box>
        </List>

        <>
          {Sub.length === 0 ? (
            <ErrorMessages2 Error={'No record found'} />
          ) : (
            <>
              {Sub.map((items: GetUpcomingEventsResult, i) => {
                return (
                  <List
                    className={' '}
                    key={i}
                    sx={{
                      marginLeft: '-30px',
                      marginTop: '-10px',
                      marginBottom: '-10px'
                    }}
                  >
                    <Box>
                      <Divider
                        sx={{ marginRight: '-10px', marginTop: '-3px' }}
                      />

                      <Typography
                        className={
                          items.EventType === 'Holiday'
                            ? classes.color2
                            : classes.color1
                        }
                        sx={{ marginLeft: '35px', marginBottom: '20px' }}
                      >
                        {items.EventTitle}&nbsp;({items.StartDate})
                      </Typography>

                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography
                          className={classes.Listfont2}
                          sx={{ marginLeft: '35px', marginTop: '-16px' }}
                        >
                          {headd.Standard}
                          {items.StandardName}
                        </Typography>
                      </Box>
                    </Box>
                  </List>
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
            to={`/${location.pathname.split('/')[1]}/Student/eventoverview`}
          >
            <Box display="flex" flexDirection="row" justifyContent="right">
              <Typography
                className={classes.Listfont1}
                sx={{ textDecoration: 'underline', color: 'blue' }}
              >
                See all Events
              </Typography>
              <ArrowForwardTwoToneIcon fontSize="small" />
            </Box>
          </RouterLink>
        </List>
      </Card>
    </Container>
  );
}

export default Card10;
