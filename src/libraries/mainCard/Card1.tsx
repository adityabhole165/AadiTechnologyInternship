import React, { useState } from 'react';
import { useTheme, Container, Grow } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Card4 from 'src/libraries/mainCard/Card4';
import { BoxStyle, ListStyle } from '../styled/CardStyle';
import {Box} from "@mui/material";
Card1.propTypes = {
  header: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  FileName: PropTypes.string,
  RealatedSection: PropTypes.string,
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
  RealatedSection
}) {
  const date = new Date();
  const NewDate = new Date(date).toDateString();
  const Day = NewDate.slice(8, 10);
  const Month = NewDate.slice(4, 7);
  const Year = NewDate.slice(11, 15);
  const NewDateFormat = `${Day} ${Month} ${Year}`;

  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  let background = `${theme.colors.gradients.listColor}`;
  
  if (Color === undefined || Color === '')
    background =
      isSelected === 1 || RealatedSection === '2'
        ? `${'#e9a69a'}`
        : `${theme.colors.gradients.listColor}`;
  else background = Color;



  return (
    <>
      <Container>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 1' }}
          {...(checked ? { timeout: 1500 } : {})}
        >
          <ListStyle
            sx={{
              background:
                text1 == NewDateFormat
                  ? `${theme.colors.gradients.HighlightedlistColor}`
                  : background,mx: margin
            }}
          >
            {FileName === '' || FileName === undefined ? null : (
              <BoxStyle>
                <AttachmentIcon />
              </BoxStyle>
            )}
            <Card4 header={header} text1={text1} text2={text2} text3={text3} />
          </ListStyle>
        </Grow>
      </Container>
    </>
  );
}

export default Card1;
