import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  useTheme,
  Divider,
  getBottomNavigationUtilityClass
} from '@mui/material';
import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Grow,
  List,
  ListItem,
  ListItemText,
  Card
} from '@mui/material';
import { Styles } from 'src/assets/style/student-style';
import ExpandLess from '@mui/material/Icon/Icon';
import ExpandMore from '@mui/material/Icon/Icon';
import { makeStyles } from '@mui/styles';
import { display } from '@mui/system';

Card21.propTypes = {
  subject: PropTypes.any,
  subjectgrade: PropTypes.any,
  indexval: PropTypes.number
};

function Card21({ subjectgrade, subject, indexval }) {
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
    <div>
      <>
        {subjectgrade?.length === 0 && subject?.length === 0 ? null : (
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
                      sx={{ marginTop: '-2px', color: '#5C3317' }}
                    >
                      {subject.map((sub, index) => {
                        return (
                          <div key={index}>
                            <h3>{sub}</h3>
                          </div>
                        );
                      })}
                    </Typography>
                    <Typography
                      className={classes.Listfont2}
                      sx={{ marginTop: '-2px', color: 'blueviolet' }}
                    >
                      {subjectgrade.map((subgrade, index) => {
                        return (
                          <div key={index}>
                            <h3 key={index}>{subgrade}</h3>
                          </div>
                        );
                      })}
                    </Typography>
                  </Box>
                  <Divider />
                </Box>
                <br></br>
              </List>
            </Grow>
          </Container>
        )}
      </>
    </div>
  );
}

export default Card21;
