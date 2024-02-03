import { Box, Card, Grow, Typography } from '@mui/material';
import { useState } from 'react';

function Card13({ Text1, Text2, Text3, Text4, Text5 }) {
  const [checked, setChecked] = useState(true);
  return (
    <Grow
      in={checked}
      style={{ transformOrigin: '0 0 0' }}
      {...(checked ? { timeout: 1000 } : {})}
    >
      <Card component={Box} p={1} m={1}>
        <Typography variant="body2">
          {' '}
          <b>Book Title :</b> {Text1}
        </Typography>
        <Typography variant="body2">
          {' '}
          <b>Issue Date :</b> {Text3}
        </Typography>
        <Typography variant="body2">
          {' '}
          <b>Return Date :</b> {Text2}
        </Typography>
        <Typography variant="body2">
          {' '}
          <b>Accession No. :</b> {Text5}
        </Typography>
        <Typography variant="body2">
          <b>Issued To Parent :</b> {Text4 === true ? 'Yes' : 'No'}
        </Typography>
      </Card>
    </Grow>
  );
}

export default Card13;
