import { Avatar, Grid, Typography } from '@mui/material';

import { ListStyle } from '../styled/CardStyle';

function Card10({ item, selected }) {
  return (
    <ListStyle color={selected ? 'secondary' : 'primary'}>
      <Grid container alignItems="center">
        <Grid item xs={1.5}>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              color: '#5c6981',
              backgroundColor: 'white',
              border: '2px solid #5c6981'
            }}
          >
            {item.Text1}
          </Avatar>
        </Grid>
        <Grid item xs={6.5}>
          <Typography variant={'h5'}>{item.Text2}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant={'body2'} sx={{ float: 'right' }}>
            {item.Text3}
          </Typography>
        </Grid>
      </Grid>
    </ListStyle>
  );
}

export default Card10;
