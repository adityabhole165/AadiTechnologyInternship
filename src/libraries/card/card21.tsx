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
import { CardDetail2, ListStyle } from '../styled/CardStyle';

Card21.propTypes = {
  subject: PropTypes.any,
  subjectgrade: PropTypes.any,
  indexval: PropTypes.number,
  MarkScored: PropTypes.any,
  Data: PropTypes.any
};

function Card21({ subjectgrade, subject, indexval, MarkScored, Data, showonlyGrade, examstatus }) {
  console.log("examstatus", examstatus);

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

    }
  });

  const classes = Styles();
  const clas = useStyles();

  return (
    <div>
      <>
        {subjectgrade?.length === 0 && subject?.length === 0 ? null : (

          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 1' }}
            {...(checked ? { timeout: 1500 } : {})}
          >
            <ListStyle>
              <Box>
                <Box className={clas.timesx}>
                  <CardDetail2 >
                    {subject.map((sub, index) => {
                      return (
                        <div key={index}>
                          <div>{sub}</div>
                        </div>
                      );
                    })}
                  </CardDetail2>


                  {showonlyGrade === 'true' ?
                    <CardDetail2
                      sx={{ color: 'blueviolet' }}
                    >
                      {subjectgrade.map((subgrade, index) => {
                        return (
                          <div key={index}>
                            <div key={index}>{subgrade}</div>
                          </div>
                        );
                      })}
                    </CardDetail2>
                    :
                    <CardDetail2
                      sx={{ color: 'blueviolet' }}
                    > 
                      {MarkScored.map((mark, indee) => {
                              return (
                                <div key={indee}>
                             <div key={indee}>{mark}</div> 
                                </div>  
                              );
                            })}       
                    </CardDetail2>
                  }


                </Box>
              </Box>

            </ListStyle>
          </Grow>

        )}
      </>
    </div>
  );
}

export default Card21;
