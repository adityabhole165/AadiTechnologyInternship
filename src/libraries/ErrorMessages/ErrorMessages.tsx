import React from 'react';
import { Box, Card, Typography, useTheme, Container } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';
import { ErrorDetail } from '../styled/ErrormessageStyled'

function ErrorMessages({ Error }) {
  const classes = Styles();

  return (
    <>
      <ErrorDetail >{Error}</ErrorDetail>
    </>
  );
}

export default ErrorMessages;
