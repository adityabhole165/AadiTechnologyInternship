import { Box, Grid, styled, useTheme } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';

const LogoSignWrapper = styled(Box)(
  () => `
        width: 252px;
        height: 38px;
`
);

function Logo() {
  const img_src =
    'https://riteschoolmobileservicehttps.riteschool.com/images/' +
    localStorage.getItem('TermsSchoolName')?.split(' ').join('%20') +
    '_logo.png';
  const SchoolName = localStorage.getItem('SchoolName');

  const theme = useTheme();
  const classes = Styles();

  return (
    <LogoSignWrapper>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <img src={img_src} className={classes.smalllogo} />
        </Grid>
        <Grid item xs={9} sx={{ mt: 2 }} className={classes.logoLable}>
          {SchoolName}
        </Grid>
      </Grid>
    </LogoSignWrapper>
  );
}

export default Logo;
