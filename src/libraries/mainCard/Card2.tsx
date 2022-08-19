import { useState } from 'react';

import {
  Paper,
  Grid,
  useTheme,
  Container,
  IconButton,
  Typography,
  Box,
  Card,
  Avatar,
  CardContent,
  ListItemAvatar
} from '@mui/material';

import Card3 from 'src/libraries/mainCard/Card3';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { string } from 'prop-types';
function Card2({ items, heading, rowsCol }) {
  //rowsCol
  const width = 12 / rowsCol;

  const theme = useTheme();
  console.log(theme.colors.gradients.pink1);

  return (
    <Container>
      <Card
        sx={{
          mt: '10px',

          boxShadow:
            ' 5px 5px 10px rgba(163, 177, 198, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.2)'
        }}
      >
        <Typography
          sx={{
            ml: '10px',
            mt: '3px',
            mb: '5px',
            fontSize: '14px',
            fontWeight: '600',
            textShadow:
              ' 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)'
          }}
        >
          {heading}
        </Typography>
        <Grid container spacing={{}}>
          {items.map(({ Icon, ...item }, index) => (
            <Grid item xs={width} key={index}>
              <Card3
                color={items.color}
                text1={item.Text1}
                text2={item.Text2}
                icon={item.index}
                Link1={item.Link}
                iconColor={item.iconColor}
                isAvtar="true"
                opacityLevel="1"
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

export default Card2;
