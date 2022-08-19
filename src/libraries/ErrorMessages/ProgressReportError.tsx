import React from 'react'
import {
    Box,
    Card,
    Typography,
    useTheme,
    Container,
  } from '@mui/material';
  import { Styles } from 'src/assets/style/student-style';

function ErrorMessagess({Error}) {

  const classes = Styles();

  return (
    <>
        <Container>
            <Typography className={classes.errorMessage4}>{Error}</Typography>
        </Container>
    </>
  )
}

export default ErrorMessagess