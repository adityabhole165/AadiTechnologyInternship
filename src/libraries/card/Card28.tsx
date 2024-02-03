import { Grid, useTheme } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';
import { CardDetail3, ListStyle } from '../styled/CardStyle';

function Card28({ Student }) {
  const theme = useTheme();
  const classes = Styles();
  const Class = sessionStorage.getItem('Class');
  const RollNo = sessionStorage.getItem('RollNo');
  const UserName = sessionStorage.getItem('StudentName');

  let AcademicYear = '';
  if (Student != undefined) {
    Student.map((Header) => (AcademicYear = Header.AcademicYear));
  }

  return (
    <ListStyle
      sx={{ background: `${theme.colors.gradients.HighlightedlistColor}` }}
    >
      <Grid container>
        <Grid item xs={12}>
          <CardDetail3>
            <b>Name:</b> {UserName}
          </CardDetail3>
        </Grid>
        <Grid item xs={3}>
          <CardDetail3>
            <b> Roll no:</b> {RollNo}
          </CardDetail3>
        </Grid>
        <Grid item xs={3}>
          <CardDetail3>
            <b>Class:</b> {Class}
          </CardDetail3>
        </Grid>
        <Grid item xs={6}>
          <CardDetail3>
            <b> Year:</b> {AcademicYear}
          </CardDetail3>
        </Grid>
      </Grid>
    </ListStyle>
  );
}

export default Card28;
