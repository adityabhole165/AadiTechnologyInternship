import { Grid, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import { CardDetail1, ListStyle } from '../styled/CardStyle';

List16.propTypes = {
  Class: PropTypes.string,
  Status: PropTypes.string,
  getAttendance: PropTypes.array
};

function List16({ Class }) {
  const classes = Styles();
  const theme = useTheme();

  return (
    <ListStyle>
      <Grid container>
        <Grid item xs={10}>
          <CardDetail1>{Class}</CardDetail1>
        </Grid>
      </Grid>
    </ListStyle>
  );
}
export default List16;
