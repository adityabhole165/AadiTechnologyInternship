import React, { useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  List,
  Container,
  Grow,
  Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useLocation } from 'react-router-dom';
import Card4 from 'src/libraries/mainCard/Card4';

Card1.propTypes = {
  header: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  FileName: PropTypes.string,
  RealatedSection:PropTypes.string,
  borderRadius:PropTypes.string,
  marginBottom:PropTypes.string,
  boxShadow:PropTypes.string,
};

function Card1({
  header,
  text1,
  text2,
  text3,
  isSelected,
  Color,
  FileName,
  margin,
  RealatedSection,
  borderRadius,
  marginBottom,
  boxShadow,
  
}) {
  
  const date = new Date();
  const NewDate = new Date(date).toDateString();
  const Day = NewDate.slice(8, 10);
  const Month = NewDate.slice(4, 7);
  const Year = NewDate.slice(11, 15);
  const NewDateFormat = `${Day} ${Month} ${Year}`;

  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  let background = `${theme.colors.gradients.pink1}`;
  const classes = Styles();
  if (Color === undefined || Color === '')
    background =
      isSelected === 1 ? `${'#80daeb'}` : `${theme.colors.gradients.pink1}`;
  else background = Color;

  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Student/', '');

  return (
    <>
      <Container>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 1' }}
          {...(checked ? { timeout: 1500 } : {})}
        >
          <List
            className={RealatedSection == "2" ? classes.colorpta1 : classes.colorpta2 }
            sx={{
              background: background,
              mx: margin,
              borderRadius: "6px !important",
              marginBottom: "8px !important",
              boxShadow:  ' 5px 5px 10px rgba(163, 177, 198, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.2)',
            }}
          >
            {text1 == NewDateFormat ? (
              <CheckRoundedIcon
                sx={{
                  position: 'absolute',
                  top: '-20px',
                  zIndex: '2',
                  right: '-5px',
                  color: 'green',
                  fontSize: '40px'
                }}
              />
            ) : null}

            {FileName === '' || FileName === undefined ? null : (
              <Box
                sx={{
                  position: 'absolute',
                  right: 1,
                  mt: '-18px',
                  transform: 'rotateZ(-36deg)',
                  mr: '-0.8rem',
                  textAlign: 'center'
                }}
              >
                <AttachmentIcon />
              </Box>
            )}
             <Card4 header={header}
          text1={text1}
          text2={text2}
          text3={text3}
         />
         
          </List>
        </Grow>
      </Container>
    </>
  );
}

export default Card1;
