import { Box, Typography, useTheme, List, Container } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';

List12.propTypes = {
  imgId: PropTypes.string
};

function List12({ imgId }) {
  const theme = useTheme();
  const classes = Styles();

  return (
    <>
      <Container>
        <List
          className={classes.ListStyle}
          sx={{
            background: `${theme.colors.gradients.pink1}`
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography className={classes.Listfont1}>{imgId}</Typography>
          </Box>
        </List>
      </Container>
    </>
  );
}

export default List12;
