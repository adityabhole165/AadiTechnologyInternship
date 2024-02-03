import { Box, Container, Grow, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
// import ShowMoreText from "react-show-more-text";
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { CardDetail, CardDetail1, ListStyle } from '../styled/CardStyle';

List6.propTypes = {
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
  ExamId: PropTypes?.number,
  SubjectId: PropTypes?.number
};
function List6({
  StartDate,
  StartTime,
  EndTime,
  SubjectName,
  TestType,
  Description,
  index,
  Instruction,
  ExamId,
  SubjectId
}) {
  const [checked, setChecked] = useState(true);
  const [expand, setExpand] = useState(false);

  const onClick = () => {
    setExpand(!expand);
  };
  const theme = useTheme();

  //const [instruction, setinstruction] = Instruction;

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
    <Container>
      <Grow
        in={checked}
        style={{ transformOrigin: '0 0 1' }}
        {...(checked ? { timeout: 1500 } : {})}
      >
        <ListStyle>
          <CardDetail1 sx={{ marginBottom: '25px !important' }}>
            {SubjectName}
            {TestType !== '' ? <b>{'-' + ' ' + TestType}</b> : null}
          </CardDetail1>

          <CardDetail>
            <CardDetail1 sx={{ marginTop: '-25px' }}>{StartDate}</CardDetail1>
            <CardDetail1 sx={{ marginTop: '-25px' }}>
              {StartTime}-{EndTime}
            </CardDetail1>
          </CardDetail>

          {Description !== ' ' ? (
            <>
              <CardDetail1 sx={{ color: 'darkmagenta' }}>
                <b>{Description}</b>
              </CardDetail1>
            </>
          ) : null}
          {ExamId !== undefined ? (
            <>
              <RouterLink
                to={
                  `/${
                    location.pathname.split('/')[1]
                  }/Student/onlineExamDetails/` +
                  ExamId +
                  '/' +
                  SubjectId
                }
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
        </ListStyle>
      </Grow>
    </Container>
  );
}

export default List6;
