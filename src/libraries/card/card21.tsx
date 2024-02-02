import { Box, Grow, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import { CardDetail2, ListStyle } from '../styled/CardStyle';

Card21.propTypes = {
  subject: PropTypes.any,
  subjectgrade: PropTypes.any,
  indexval: PropTypes.number,
  MarkScored: PropTypes.any,
  Data: PropTypes.any
};

function Card21({ Gradeormarks, subject }) {
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
      justifyContent: 'space-between'
    }
  });

  const classes = Styles();
  const clas = useStyles();

  return (
    <div>
      <>
        {Gradeormarks?.length === 0 && subject?.length === 0 ? null : (
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 1' }}
            {...(checked ? { timeout: 1500 } : {})}
          >
            <ListStyle>
              <Box>
                <Box className={clas.timesx}>
                  <CardDetail2>
                    {subject.map((sub, index) => {
                      return (
                        <div key={index}>
                          <div>{sub}</div>
                        </div>
                      );
                    })}
                  </CardDetail2>
                  <Box>
                    {Gradeormarks.length != 0 && (
                      <CardDetail2 sx={{ color: 'blueviolet' }}>
                        {Gradeormarks.map((mark, index1) => {
                          return (
                            <div key={index1}>
                              <div>{mark == 'Exempt' ? 'Exempted' : mark}</div>
                            </div>
                          );
                        })}
                      </CardDetail2>
                    )}
                  </Box>
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
