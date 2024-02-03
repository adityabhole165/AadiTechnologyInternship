import { Box, Container, List, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';

List10.propTypes = {
  Title: PropTypes.string,
  VideoID: PropTypes.number,
  VideoDetailsId: PropTypes.number,
  FromRoute: PropTypes.string
};

function List10({ Title, VideoID, VideoDetailsId, FromRoute }) {
  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  const classes = Styles();

  return (
    <>
      <Container>
        <RouterLink
          to={
            `/${location.pathname.split('/')[1]}/Common/Comments/` +
            VideoID +
            FromRoute
          }
          color="primary"
          style={{ textDecoration: 'none' }}
        >
          <List
            className={classes.ListStyle}
            sx={{
              background: `${theme.colors.gradients.pink1}`
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography className={classes.Listfont1}>{Title}</Typography>
            </Box>
          </List>
        </RouterLink>
      </Container>
    </>
  );
}

export default List10;
