import {
  Box,
  Container,
  Grid,
  Grow,
  List,
  Typography,
  useTheme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';

Card1.propTypes = {
  Title: PropTypes.string,
  To: PropTypes.string,
  From: PropTypes.string,
  Subtitle: PropTypes.string,
  Standards: PropTypes.string
};

function Card1({ Title, To, From, Subtitle, index, Standards }) {
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const RoleId = sessionStorage.getItem('RoleId');

  const useStyles = makeStyles({
    root: {
      background: '#e9a69a'
    },
    roo1: {
      background: `${theme.colors.gradients.pink1}`
    }
  });

  const classes = Styles();
  const clas = useStyles();
  return (
    <>
      <Container>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 1' }}
          {...(checked ? { timeout: 1500 } : {})}
        >
          <List
            className={' ' + (index === 0 ? clas.root : clas.roo1)}
            sx={{
              boxShadow: '8px 4px 5px grey !important',
              borderRadius: 1,
              mb: 1
            }}
          >
            <Box>
              <Box display="flex" alignItems="center">
                <Typography
                  className={classes.Listfont1}
                  sx={{ color: 'black' }}
                >
                  {Title}
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid container xs={12}>
                <Grid xs={6} item>
                  <Typography className={classes.Listfont2}>
                    {To} - {From}
                  </Typography>
                </Grid>
                <Grid xs={6} item>
                  <Typography
                    className={classes.Listfont2}
                    sx={{ display: 'flex', flexDirection: 'row-reverse' }}
                  >
                    {Subtitle}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </List>
        </Grow>
      </Container>
    </>
  );
}

export default Card1;
