import {  Grid, List, Typography, Container, useTheme, Grow, Checkbox } from "@mui/material"
import PropTypes from 'prop-types';
import { Styles } from "src/assets/style/student-style";

List16.propTypes = {
  Class: PropTypes.string,
  Status: PropTypes.string,
  getAttendance: PropTypes.array
}

function List16({ Class }) {
  const classes = Styles();
  const theme = useTheme();

  return (
      <Container >
        <List className={classes.ListStyle}
          sx={{
            background: `${theme.colors.gradients.listColor}`, justifyContent: 'center'
          }}>
          <Grid container >
            <Grid item xs={10}>
              <Typography className={classes.Listfont1} >
                {Class}
              </Typography>
            </Grid>
          </Grid>
        </List>
      </Container>
  )
}
export default List16;