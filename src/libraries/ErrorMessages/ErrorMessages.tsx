import React from 'react';
import { Box, Card, Typography, useTheme, Container } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';

function ErrorMessages({ Error }) {
  const classes = Styles();

  return (
    <>
      {window.location.pathname ==
      '/extended-sidebar/Student/Progressreport' ? (
        <Typography className={classes.errorMessage4}>"{Error}"</Typography>
      ) : (
        <Typography className={classes.errorMessage3}>{Error}</Typography>
      )}
    </>
  );
}

export default ErrorMessages;
