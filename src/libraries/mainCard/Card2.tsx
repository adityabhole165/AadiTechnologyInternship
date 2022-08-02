import { useState } from 'react';

import {
  Card,
  Paper,
  Typography,
  IconButton,
  useTheme,
  Box,
  Grid,
  Container,
  CardHeader
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Card3 from 'src/libraries/mainCard/Card3';
import { string } from 'prop-types';

function Card2({ items,heading,rowsCol }) { //rowsCol
  const width = 12 / rowsCol;

  const theme = useTheme();
  console.log(theme.colors.gradients.pink1);
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '20px',
          zIndex: 1
        }}
      >
        <Card
          sx={{
            width: '180px',

            textAlign: 'center',
            pt: '5px',
            zIndex: 1,
            fontSize: '20px',
            background: `${theme.colors.gradients.pink1}`,
            boxShadow: '1px 1px 20px '
          }}
        >
         {heading}
        </Card>
      </Box>
      <Card sx={{ mt: '-10px', background: `${theme.colors.gradients.orange1}` }}>
        <Grid container spacing={{ xs: 1 }} sx={{ pt: '20px' }}>
          {items.map(({ Icon, ...item }, index) => (
            <Grid item xs={width} key={index}>
              <Card3
                color={items.color}
                text={item.Text}
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