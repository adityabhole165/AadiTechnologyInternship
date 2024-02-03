import {
  Box,
  Container,
  Grid,
  Grow,
  List,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';

List22.propTypes = {
  Title: PropTypes.string,
  Mobile: PropTypes.string,
  Date: PropTypes.string,
  Index: PropTypes.number
};

function List22({ Title, Mobile, Date, Index }) {
  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  const classes = Styles();

  return (
    <>
      <Container>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 1' }}
          {...(checked ? { timeout: 1500 } : {})}
        >
          <List
            className={classes.ListStyle}
            sx={{
              background: `${theme.colors.gradients.pink1}`
            }}
          >
            <Box>
              <Box display="flex" alignItems="center">
                <Typography className={classes.Listfont1}>{Title}</Typography>
              </Box>
            </Box>

            <Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid container xs={12}>
                  <Grid xs={10} item>
                    <Typography
                      className={classes.Listfont2}
                      sx={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                      }}
                    >
                      {Mobile}
                    </Typography>
                  </Grid>
                  <Grid xs={2} item>
                    <Typography
                      className={classes.Listfont2}
                      sx={{ display: 'flex', flexDirection: 'row-reverse' }}
                    >
                      {Date}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </List>
        </Grow>
      </Container>
    </>
  );
}

export default List22;
