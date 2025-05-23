import {
  Box,
  Grid,
  Grow,
  List,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';

List20.propTypes = {
  Subject: PropTypes.string,
  DisplayText: PropTypes.string,
  Date: PropTypes.string,
  Time: PropTypes.string,
  Index: PropTypes.number,
  Form: PropTypes.string,
  UserName: PropTypes.string
};

function List20({ Subject, DisplayText, Date, Time, Index, Form, UserName }) {
  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  const classes = Styles();

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 1' }}
          {...(checked ? { timeout: 1500 } : {})}
        >
          <List
            className={classes.ListStyle}
            sx={{
              background: `${theme.colors.gradients.pink1}`,
              padding: '8px'
            }}
          >
            <Box>
              <Box display="flex" alignItems="center">
                <Typography className={classes.Listfont1}>{Subject}</Typography>
              </Box>
            </Box>

            <Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid container>
                  <Grid xs={8} item>
                    <Typography className={classes.Listfont2}>
                      {UserName}
                    </Typography>
                  </Grid>
                  <Grid xs={4} item justifyContent="flex-end">
                    <Typography className={classes.Listfont2}>
                      {Time} {Date}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </List>
        </Grow>
      </Box>
    </>
  );
}

export default List20;
