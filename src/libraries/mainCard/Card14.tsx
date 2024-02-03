import { Box, Card, Typography } from '@mui/material';

function Card14({ Text1, Text2, Text3, Text4, Text5, Text6, Text7 }) {
  return (
    <div>
      <Card component={Box} p={1}>
        <Typography variant="body2">
          {' '}
          <b>Author : </b> {Text1}
        </Typography>
        <Typography variant="body2">
          {' '}
          <b> Publisher : </b> {Text2}
        </Typography>
        <Typography variant="body2">
          {' '}
          <b> Accession No. : </b> {Text7}
        </Typography>

        <Typography variant="body2">
          {' '}
          <b> Language : </b>
          {Text4}
        </Typography>
        <Typography variant="body2">
          {' '}
          <b> Standards : </b> {Text3}
        </Typography>
        {/* <Typography variant='body2'> <b> Total : </b> {Text6}</Typography> */}
      </Card>
    </div>
  );
}

export default Card14;
