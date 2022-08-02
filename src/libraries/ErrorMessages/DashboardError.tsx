import React from 'react'
import {
    Box,
    Card,
    Typography,
    useTheme,
    Container,
  } from '@mui/material';
  import { Styles } from 'src/assets/style/student-style';

function DashboardError({Error}) {

  const classes = Styles();

  return (
    <>
        <Container>
            <Typography className={classes.errorMessage}>{Error}</Typography>
        </Container>
    </>
  )
}

export default DashboardError