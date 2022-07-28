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

Card1.propTypes = {
  header: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  FileName: PropTypes.string
};

function Card1({
  header,
  text1,
  text2,
  text3,
  isSelected,
  Color,
  FileName,
  margin
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

  return (
    <>
      <Container>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 1' }}
          {...(checked ? { timeout: 1500 } : {})}
        >
          <List
            className={classes.ListStyle}
            sx={{
              background: background,
              mx: margin
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

            <Grid container>
              <Grid xs={10}>
                <Typography
                  sx={{ fontWeight: 'bold' }}
                  className={classes.Listfont2}
                >
                  {header}
                </Typography>
              </Grid>

              <Grid xs={2}>
                <Typography
                  className={classes.Listfont2}
                  sx={{ float: 'right' }}
                >
                  {text3}
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography className={classes.Listfont2}>{text1}</Typography>
              </Grid>
              <Grid xs={4}>
                <Typography
                  className={classes.Listfont2}
                  sx={{ float: 'right',ml:'-10px' }}
                >
                  {text2}
                </Typography>
              </Grid>
            </Grid>
          </List>
        </Grow>
      </Container>
    </>
  );
}

export default Card1;
