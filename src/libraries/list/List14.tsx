import { Grid, List, Typography, Container, useTheme } from "@mui/material"
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import { Styles } from 'src/assets/style/student-style'

List14.propTypes = {
  RollNumber: PropTypes.string,
  StudentName: PropTypes.string,
  getAttendance: PropTypes.array,
  present: PropTypes.string,
  date: PropTypes.string,
  assigne: PropTypes.string

}

function List14({ RollNumber, StudentName, getAttendance, present, date, assigne }) {
  const classes = Styles();
  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      background: "#f33737"
    },
    roo1: {
      background: `${theme.colors.gradients.pink1}`
    },
    roo2: {
      background: '#00b8d4'

    }
  });

  const clas = useStyles();
  const JoinDate = new Date(date)
  const RecordDate = new Date(assigne)
  const className = " " + (JoinDate > RecordDate ?
    clas.roo2 :
    present === "false" ?
      clas.root : clas.roo1)
  return (
    <>
      <Container >
        <List className={className}
          sx={{
            justifyContent: 'center',
            borderRadius: "6px !important",
            marginBottom: "8px !important",
            boxShadow: "6px 4px 5px grey !important",
          }}>
          <Grid container >
            <Grid item xs={2}>
              <Typography className={classes.Listfont1} >
                {RollNumber}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography className={classes.Listfont1} >
                {StudentName}
              </Typography>
            </Grid>
          </Grid>
        </List>
      </Container>

    </>
  )
}
export default List14