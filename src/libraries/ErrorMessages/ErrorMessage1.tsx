import React from 'react';
import { Box, Card, Typography, useTheme, Container } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';
import {  ErrorDetail1, ErrorDetail2 } from '../styled/ErrormessageStyled'

function ErrorMessage1({ Error }) {
  const classes = Styles();

  return (
    <>
     
        <ErrorDetail2>{Error}</ErrorDetail2>
     
    </>
  );
}

export default ErrorMessage1;
