import { Box, Checkbox, Grid, List, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Styles } from 'src/assets/style/student-style';

List13.PropTypes = {
  RollNumber: PropTypes.number,
  StudentName: PropTypes.string,
  getAttendance: PropTypes.array,
  data: PropTypes.any,
  check: PropTypes.any,
  handleChange: PropTypes.any,
  handleChange1: PropTypes.any
};

function List13({
  RollNumber,
  StudentName,
  data,
  check,
  handleChange1,
  getAttendance
}) {
  const classes = Styles();
  const theme = useTheme();
  const [checked, setChecked] = useState(true);

  const checkedbox = (event) => {
    setChecked(event.target.checked);
    handleChange1(event);
  };

  useEffect(() => {
    if (check) {
      setChecked(true);
    }
  }, [check]);

  return (
    <>
      <List
        className={classes.ListStyle}
        sx={{
          background: `${theme.colors.gradients.pink1}`,
          justifyContent: 'center'
        }}
      >
        <Box>
          <Grid container>
            <Grid item xs={2} md={1} sx={{ mx: 'auto', mt: '5px' }}>
              <Checkbox
                checked={checked}
                onChange={(event) => checkedbox(event)}
                inputProps={{ 'aria-label': 'controlled' }}
                value={data.RollNumber}
                name={data.IsPresent}
              />
            </Grid>
            <Grid item xs={10}>
              <Grid xs={12}>
                <Grid container>
                  <Grid xs={10}>
                    <Typography
                      sx={{ ml: '20px' }}
                      className={classes.Listfont1}
                    >
                      {RollNumber}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid xs={2.5}>
                    <Typography></Typography>
                  </Grid>
                  <Grid
                    xs={9}
                    sx={{ mt: '-18px', ml: '70px', paddingBottom: '-10px' }}
                  >
                    <Typography className={classes.Listfont2}>
                      {StudentName}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </List>
    </>
  );
}
export default List13;
