import React from 'react'
import {
    Box,
    Card,
    Typography,
    useTheme,
    Container,
  } from '@mui/material';
  import { Styles } from 'src/assets/style/student-style';

function ErrorMessages({Error}) {

  const classes = Styles();

  return (
    <>
        <Container>
            <Typography className={classes.errorMessage3}>{Error}</Typography>
        </Container>
    </>
  )
}

export default ErrorMessages