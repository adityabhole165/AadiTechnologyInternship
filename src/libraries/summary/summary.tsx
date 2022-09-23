import { Styles } from 'src/assets/style/student-style'
import { styled, useTheme, Grid, Container } from '@mui/material';
import { Box } from '@mui/material';

function summary() {

  const DotLegend = styled('span')(
    ({ theme }) => `
          border-radius: 22px;
          width: ${theme.spacing(1.5)};
          height: ${theme.spacing(1.5)};
          display: inline-block;
          margin-right: ${theme.spacing(1)};
          margin-top: -${theme.spacing(0.1)};
      `
  );
  const theme = useTheme();
  const classes = Styles();

  return (
    <>
    
        <Grid container xs={12}  >
          <Grid direction="column" xs={6}>
              <DotLegend className={classes.border}
                style={{ background: '#2abf2a', marginBottom: "-2px" }}
              /><small><b>Present</b></small><br />

              <DotLegend className={classes.border}
                style={{ background: 'yellow',  marginBottom: "-2px" }}
              /><small><b>Weekend</b></small><br />

              <DotLegend className={classes.border}
                style={{ background: '#ebbb0b', marginBottom: "-2px" }}
              /><small><b>Holiday</b></small><br />

              <DotLegend className={classes.border}
                style={{ background: '#bdbdbd',  marginBottom: "-2px" }}
              /><small><b>Outside Academic Year</b></small><br />
            </Grid>

            <Grid   direction="column" xs={6} >
              <DotLegend className={classes.border}
                style={{ background: '#f33737',  marginBottom: "-2px" }}
              /><small><b>Absent</b></small><br />

              <DotLegend className={classes.border}
                style={{ background: '#b2a4dd',  marginBottom: "-2px" }}
              /><small><b>Not Available</b></small><br />

              <DotLegend className={classes.border}
                style={{ background: '#00b8d4',  marginBottom: "-2px" }}
              /><small><b style={{ marginTop: "5px" }}>Late Join</b></small><br />
            </Grid>
          </Grid>
  
     
    </>
  )
}
export default summary