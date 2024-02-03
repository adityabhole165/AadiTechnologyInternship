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

List2.propTypes = {
  CTeacher: PropTypes.string,
  Sub: PropTypes.string,
  Tech: PropTypes.string
};

function List2({ CTeacher, Sub, Tech }) {
  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  const classes = Styles();
  return (
    <>
      <Container>
        {CTeacher}
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
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
                <Typography className={classes.Listfont1}>{Tech}</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 1
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography className={classes.Listfont2}>{Sub}</Typography>
              </Box>
            </Box>
          </List>
        </Grow>
      </Container>
    </>
  );
}

export default List2;
