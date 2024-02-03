import {
  Box,
  Container,
  Grow,
  List,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
// import ShowMoreText from "react-show-more-text";
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';

List15.propTypes = {
  StartDate: PropTypes.string,
  StartTime: PropTypes.string,
  EndTime: PropTypes.string,
  SubjectName: PropTypes.string,
  TestType: PropTypes.string,
  Description: PropTypes.string,
  Index: PropTypes.number,
  Instruction: PropTypes.string,
  StartDateAndTime: PropTypes.string,
  Subject_Name: PropTypes.string,
  ExamId: PropTypes?.number
};
function List15({
  StartDate,
  StartTime,
  EndTime,
  SubjectName,
  TestType,
  index,
  Instruction,
  ExamId,
  Description
}) {
  const [checked, setChecked] = useState(true);
  const [expand, setExpand] = useState(false);

  const onClick = () => {
    setExpand(!expand);
  };
  const theme = useTheme();

  const useStyles = makeStyles({
    root: {
      background: '#ff7961'
    },
    roo1: {
      background: `${theme.colors.gradients.pink1}`
    },
    testtypessx: {
      borderColor: '#223294',
      border: '1',
      width: '5rem',
      height: '2rem',
      paddingTop: '9px',
      paddingLeft: '22px',
      fontSize: 'inherit',
      fontWeight: 'bold',
      borderRadius: '15px 2px',
      backgroundColor: 'whitesmoke',
      boxShadow: '4px 1px 1px black',
      borderTop: '0px solid',
      alignItems: 'center'
    },
    timesx: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '-14px'
    }
  });

  const classes = Styles();
  const clas = useStyles();

  return (
    <>
      <Container>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 1' }}
          {...(checked ? { timeout: 1500 } : {})}
        >
          <List
            sx={{
              boxShadow: '8px 4px 5px grey !important',
              borderRadius: 1,
              background: `${theme.colors.gradients.pink1}`,
              mb: 1,
              padding: '12px'
            }}
          >
            <Box>
              <Typography
                sx={{ marginBottom: '25px !important' }}
                className={classes.Listfont1}
              >
                <b>
                  {SubjectName}{' '}
                  {TestType !== '' ? <b>{'-' + ' ' + TestType}</b> : null}
                </b>
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 2
              }}
            >
              <Box className={clas.timesx}>
                <Typography
                  className={classes.Listfont2}
                  sx={{ marginTop: '-10px' }}
                >
                  {StartDate}
                </Typography>
                <Typography
                  className={classes.Listfont2}
                  sx={{ marginTop: '-10px' }}
                >
                  {StartTime}-{EndTime}
                </Typography>
              </Box>
            </Box>

            {Description !== ' ' ? (
              <>
                <Typography
                  className={classes.Listfont2}
                  sx={{ color: 'darkmagenta', marginTop: '0px' }}
                >
                  <b>{Description}</b>
                </Typography>
              </>
            ) : null}

            {ExamId !== undefined ? (
              <>
                <RouterLink
                  to={`/${
                    location.pathname.split('/')[1]
                  }/Student/onlineExamDetails`}
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="right"
                    sx={{ marginRight: '18px' }}
                  >
                    <Typography
                      className={classes.Listfont1}
                      sx={{ color: 'blue', marginRight: '6px' }}
                    >
                      Exam
                    </Typography>
                  </Box>
                </RouterLink>
              </>
            ) : null}
          </List>
        </Grow>
      </Container>
    </>
  );
}

export default List15;
