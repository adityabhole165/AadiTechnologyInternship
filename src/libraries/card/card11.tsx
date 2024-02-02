import {
  Box,
  Container,
  Grow,
  List,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';

Card11.PropTypes = {
  PDays: PropTypes.string,
  TDays: PropTypes.string,
  TWDays: PropTypes.string,
  Head: PropTypes.object
};

function Card11({ PDays, TDays, TWDays, Head }) {
  const theme = useTheme();
  const classes = Styles();
  const [checked, setChecked] = useState(true);

  const AbsentDays = TDays - PDays;

  return (
    <>
      <Grow
        in={checked}
        style={{ transformOrigin: '0 0 1' }}
        {...(checked ? { timeout: 1500 } : {})}
      >
        <Container>
          <List
            className={classes.ListStyle}
            sx={{
              background: `${theme.colors.gradients.pink1}`,
              mt: '-0.9rem'
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography className={classes.Listfont1}>
                {Head.Title2}
              </Typography>
              <Typography className={classes.Listfont1}>{TDays}</Typography>
            </Box>
          </List>

          <List
            className={classes.ListStyle}
            sx={{
              background: `${theme.colors.gradients.pink1}`
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography className={classes.Listfont1}>
                {Head.Title1}
              </Typography>
              <Typography className={classes.Listfont1}>{PDays}</Typography>
            </Box>
          </List>

          <List
            className={classes.ListStyle}
            sx={{
              background: `${theme.colors.gradients.pink1}`
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography className={classes.Listfont1}>
                {Head.Title3}
              </Typography>
              <Typography className={classes.Listfont1}>
                {AbsentDays}
              </Typography>
            </Box>
          </List>
        </Container>
      </Grow>
    </>
  );
}

export default Card11;
