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

  return (
    <Container>
      <Card 
        sx={{
          mt: '10px',

          boxShadow:
            ' 0px 8px 15px rgba(0, 0, 0, 0.1)'
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
              '  0px 8px 15px rgba(0, 0, 0, 0.1)'
          }}
        >
          {heading}
        </Typography>
        <Grid container spacing={-0.1}>
          {items.map(({ Icon, ...item }, index) => (
            <Grid item xs={width} key={index}>
              <Card3
                color={items.color}
                text1={item.Text1}
                text2={item.Text2}
                icon={item.index}
                Link1={item.Link}
                
               ImageUrl={item.ImageUrl}

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
