import { Grid, useTheme } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';
import { CardDetail7 } from '../styled/CardStyle';
import { DotLegend1, DotLegendStyled1 } from '../styled/DotLegendStyled';

function summary() {
  const theme = useTheme();
  const classes = Styles();

  return (
    <>
      <Grid container item xs={12}>
        <Grid item xs={7}>
          <DotLegend1>
            <DotLegendStyled1
              className={classes.border}
              style={{ background: '#2abf2a' }}
            />
            <CardDetail7>Present</CardDetail7>
          </DotLegend1>

          <DotLegend1>
            <DotLegendStyled1
              className={classes.border}
              style={{ background: 'yellow' }}
            />
            <CardDetail7>Weekend</CardDetail7>
          </DotLegend1>
          <DotLegend1>
            <DotLegendStyled1
              className={classes.border}
              style={{ background: '#ebbb0b' }}
            />
            <CardDetail7>Holiday</CardDetail7>
          </DotLegend1>
        </Grid>

        <Grid item xs={5}>
          <DotLegend1>
            <DotLegendStyled1
              className={classes.border}
              style={{ background: '#f33737' }}
            />
            <CardDetail7>Absent</CardDetail7>
          </DotLegend1>
          <DotLegend1>
            <DotLegendStyled1
              className={classes.border}
              style={{ background: '#b2a4dd' }}
            />

            <CardDetail7>Not Available</CardDetail7>
          </DotLegend1>
          <DotLegend1>
            <DotLegendStyled1
              className={classes.border}
              style={{ background: '#00b8d4' }}
            />
            <CardDetail7>Late Join</CardDetail7>
          </DotLegend1>
        </Grid>
        <Grid item xs={12}>
          <DotLegend1>
            <DotLegendStyled1
              className={classes.border}
              style={{ background: '#bdbdbd' }}
            />
            <CardDetail7>Outside Academic Year</CardDetail7>
          </DotLegend1>
        </Grid>
      </Grid>
    </>
  );
}
export default summary;
