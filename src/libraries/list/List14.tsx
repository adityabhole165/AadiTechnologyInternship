import { Grid, List, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import { Styles } from 'src/assets/style/student-style';
import { CardDetail1 } from '../styled/CardStyle';

List14.propTypes = {
  RollNumber: PropTypes.string,
  StudentName: PropTypes.string,
  getAttendance: PropTypes.array,
  present: PropTypes.string,
  date: PropTypes.string,
  assigne: PropTypes.string
};

function List14({
  RollNumber,
  StudentName,
  getAttendance,
  present,
  date,
  assigne
}) {
  const classes = Styles();
  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      background: '#f33737'
    },
    roo1: {
      background: `${theme.colors.gradients.pink1}`
    },
    roo2: {
      background: '#00b8d4'
    }
  });

  const clas = useStyles();
  const JoinDate = new Date(date);
  const RecordDate = new Date(assigne);
  const className =
    ' ' +
    (JoinDate > RecordDate
      ? clas.roo2
      : present === 'false'
      ? clas.root
      : clas.roo1);
  return (
    <>
      <List
        className={className}
        sx={{
          justifyContent: 'center',
          borderRadius: '6px !important',
          marginBottom: '8px !important',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Grid container>
          <Grid item xs={2}>
            <CardDetail1> {RollNumber}</CardDetail1>
          </Grid>
          <Grid item xs={10}>
            <CardDetail1>{StudentName}</CardDetail1>
          </Grid>
        </Grid>
      </List>
    </>
  );
}
export default List14;
