import { Checkbox, Grid, List, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Styles } from 'src/assets/style/student-style';

List21.PropTypes = {
  StudentName: PropTypes.string,
  check: PropTypes.any,
  handleChange1: PropTypes.any,
  data: PropTypes.any
};

function List21({ data, StudentName, check, handleChange1 }) {
  const classes = Styles();
  const theme = useTheme();
  const [checked, setChecked] = useState(false);

  const checkedbox = (event) => {
    setChecked(event.target.checked);
    handleChange1(event);
  };

  useEffect(() => {
    if (check) {
      setChecked(true);
    }
    if (!check) {
      setChecked(false);
    }
  }, [check]);

  return (
    <>
      <List
        className={classes.ListStyle}
        sx={{
          background: `${theme.colors.gradients.pink1}`
        }}
      >
        <Grid
          container
          sx={{
            marginTop: '-7px',
            marginBottom: '-7px',
            marginLeft: '-10px'
          }}
        >
          <Grid item>
            <Checkbox
              checked={checked}
              onChange={(event) => checkedbox(event)}
              inputProps={{ 'aria-label': 'controlled' }}
              value={'  ' + data.Id}
              name={'  ' + data.Name}
            />
          </Grid>
          <Grid item>
            <Typography
              sx={{ marginTop: '12px', ml: '-2px' }}
              className={classes.Listfont2}
            >
              {StudentName.slice(0, 50)}
            </Typography>
          </Grid>
        </Grid>
      </List>
    </>
  );
}
export default List21;
