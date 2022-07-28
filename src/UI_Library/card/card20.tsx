import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  useTheme,
  List,
  Container,
  Grow,
  Divider
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Styles } from 'src/assets/style/student-style';
import ExpandLess from '@mui/material/Icon/Icon';
import ExpandMore from '@mui/material/Icon/Icon';
import { makeStyles } from '@mui/styles';
import Card21 from 'src/UI_Library/card/card21';

Card20.propTypes = {
  percentage: PropTypes.any,
  subjecttotalmarks: PropTypes.string,
  testgrade: PropTypes.string,
  rank: PropTypes.string,
  grade: PropTypes.string,
  subject: PropTypes.any,
  subjectgrade: PropTypes.any,
  indexval: PropTypes.any
};

function Card20({
  percentage,
  rank,
  grandTotal,
  subjectTotalMarks,
  grade,
  subjectgrade,
  subject,
  indexval
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
    <div style={{ marginTop: '4' }}>
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
                margin: '4px -19px'
              }}
            >
              <Box
                sx={{
                  mt: 2
                }}
              >
                <Box className={clas.timesx}>
                  <Typography
                    className={classes.Listfont2}
                    sx={{ marginTop: '-2px' }}
                  >
                    Total
                  </Typography>
                  <Typography
                    className={classes.Listfont2}
                    sx={{ marginTop: '-2px' }}
                  >
                    {grandTotal}/{subjectTotalMarks}
                  </Typography>
                </Box>
                <Divider />

                <Box className={clas.timesx}>
                  <Typography
                    className={classes.Listfont2}
                    sx={{ marginTop: '15px' }}
                  >
                    Percentage
                  </Typography>
                  <Typography
                    className={classes.Listfont2}
                    sx={{ marginTop: '15px' }}
                  >
                    {percentage}
                  </Typography>
                </Box>
                <Divider />

                <Box className={clas.timesx}>
                  <Typography
                    className={classes.Listfont2}
                    sx={{ marginTop: '15px' }}
                  >
                    Grade
                  </Typography>
                  <Typography
                    className={classes.Listfont2}
                    sx={{ marginTop: '15px' }}
                  >
                    {grade}
                  </Typography>
                </Box>
                <Divider />

                <Box className={clas.timesx}>
                  <Typography
                    className={classes.Listfont2}
                    sx={{ marginTop: '15px' }}
                  >
                    Rank
                  </Typography>
                  <Typography
                    className={classes.Listfont2}
                    sx={{ marginTop: '15px' }}
                  >
                    {rank}
                  </Typography>
                </Box>
              </Box>
            </List>
          </Grow>
        </Container>

        <Card21
          subjectgrade={subjectgrade}
          subject={subject}
          indexval={indexval}
        />
      </>
    </div>
  );
}

export default Card20;
