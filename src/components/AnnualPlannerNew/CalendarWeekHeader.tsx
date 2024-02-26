import { Box, Grid, Typography } from '@mui/material';

const CalendarWeekHeader = () => {
  const HeaderList = [
    { Id: 1, Name: 'Sun' },
    { Id: 2, Name: 'Mon' },
    { Id: 3, Name: 'Tue' },
    { Id: 4, Name: 'Wed' },
    { Id: 5, Name: 'Thu' },
    { Id: 6, Name: 'Fri' },
    { Id: 7, Name: 'Sat' }
  ];
  return (
    <Grid container>
      {HeaderList.map((Item, i) => (
        <Grid
          item
          xs={12 / 7}
          md={12 / 7}
          sx={{ textAlign: 'center', pt: 0 }}
          key={i}
        >
          <Box sx={{}}>
            <Typography
              sx={{
                textTransform: 'capitalize',
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {Item.Name}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CalendarWeekHeader;
