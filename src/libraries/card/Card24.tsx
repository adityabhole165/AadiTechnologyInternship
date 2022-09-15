import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme
} from '@mui/material';

function Card24() {
  const theme = useTheme();
  const Address = sessionStorage.getItem('Address');
  const ResidenceNo = sessionStorage.getItem('Residence_Phone_Number');
  const CasteAndSubCaste = sessionStorage.getItem('CasteAndSubCaste');
  const UDISENumber = sessionStorage.getItem('UDISENumber');
  const Birth_Place = sessionStorage.getItem('Birth_Place');
  const Nationality = sessionStorage.getItem('Nationality');
  const Mother_Tongue = sessionStorage.getItem('Mother_Tongue');
  const Blood_Group = sessionStorage.getItem('Blood_Group');
  const RollNo = sessionStorage.getItem('RollNo');

  return (
    <>
      <Container>
        <Card sx={{ display: 'flex', background: '#85b8bf8a', mt: 1 }}>
          <Grid container direction="row">
            <Grid
              xs={4}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                borderRight: 1,
                borderRadius: 1,
                border: 'none'
              }}
            >
              <CardContent sx={{ color: 'black' }}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ textAlign: 'center' }}
                >
                  Roll No:
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={8}>
              <CardContent sx={{ color: 'black' }}>
                <Typography component="div" sx={{ textAlign: 'center' }}>
                  {RollNo}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ display: 'flex', background: '#85b8bf8a', mt: 1 }}>
          <Grid container direction="row">
            <Grid
              xs={4}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                borderRight: 1,
                borderRadius: 1,
                border: 'none'
              }}
            >
              <CardContent sx={{ flex: '1 0 auto', color: 'black' }}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ textAlign: 'center' }}
                >
                  Residence Phone No:
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={8}>
              <CardContent sx={{ color: 'black' }}>
                <Typography component="div" sx={{ textAlign: 'center' }}>
                  {ResidenceNo}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ display: 'flex', background: '#85b8bf8a', mt: 1 }}>
          <Grid container direction="row">
            <Grid
              xs={4}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                borderRight: 1,
                borderRadius: 1,
                border: 'none'
              }}
            >
              <CardContent sx={{ flex: '1 0 auto', color: 'black' }}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ textAlign: 'center' }}
                >
                  Religion:
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={8}>
              <CardContent sx={{ color: 'black' }}>
                <Typography
                  component="div"
                  sx={{ textAlign: 'center' }}
                ></Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ display: 'flex', background: '#85b8bf8a', mt: 1 }}>
          <Grid container direction="row">
            <Grid
              xs={4}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                borderRight: 1,
                borderRadius: 1,
                border: 'none'
              }}
            >
              <CardContent sx={{ flex: '1 0 auto', color: 'black' }}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ textAlign: 'center' }}
                >
                  Caste & Sub-Caste:
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={8}>
              <CardContent sx={{ color: 'black' }}>
                <Typography component="div" sx={{ textAlign: 'center' }}>
                  {CasteAndSubCaste}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ display: 'flex', background: '#85b8bf8a', mt: 1 }}>
          <Grid container direction="row">
            <Grid
              xs={4}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                borderRight: 1,
                borderRadius: 1,
                border: 'none'
              }}
            >
              <CardContent sx={{ flex: '1 0 auto', color: 'black' }}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ textAlign: 'center' }}
                >
                  Category:
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={8}>
              <CardContent sx={{ color: 'black', background: '#c8dccb' }}>
                <Typography
                  component="div"
                  sx={{ textAlign: 'center' }}
                ></Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ display: 'flex', background: '#85b8bf8a', mt: 1 }}>
          <Grid container direction="row">
            <Grid
              xs={4}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                borderRight: 1,
                borderRadius: 1,
                border: 'none'
              }}
            >
              <CardContent sx={{ flex: '1 0 auto', color: 'black' }}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ textAlign: 'center' }}
                >
                  UDISE Number:
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={8}>
              <CardContent sx={{ color: 'black' }}>
                <Typography component="div" sx={{ textAlign: 'center' }}>
                  {UDISENumber}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ display: 'flex', background: '#85b8bf8a', mt: 1 }}>
          <Grid container direction="row">
            <Grid
              xs={4}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                borderRight: 1,
                borderRadius: 1,
                border: 'none'
              }}
            >
              <CardContent sx={{ flex: '1 0 auto', color: 'black' }}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ textAlign: 'center' }}
                >
                  Place of Birth:
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={8}>
              <CardContent sx={{ color: 'black' }}>
                <Typography component="div" sx={{ textAlign: 'center' }}>
                  {Birth_Place}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ display: 'flex', background: '#85b8bf8a', mt: 1 }}>
          <Grid container direction="row">
            <Grid
              xs={4}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                borderRight: 1,
                borderRadius: 1,
                border: 'none'
              }}
            >
              <CardContent sx={{ flex: '1 0 auto', color: 'black' }}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ textAlign: 'center' }}
                >
                  Nationality:
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={8}>
              <CardContent sx={{ color: 'black' }}>
                <Typography component="div" sx={{ textAlign: 'center' }}>
                  {Nationality}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ display: 'flex', background: '#85b8bf8a', mt: 1 }}>
          <Grid container direction="row">
            <Grid
              xs={4}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                borderRight: 1,
                borderRadius: 1,
                border: 'none'
              }}
            >
              <CardContent sx={{ flex: '1 0 auto', color: 'black' }}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ textAlign: 'center' }}
                >
                  Mother Tongue:
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={8}>
              <CardContent sx={{ color: 'black' }}>
                <Typography component="div" sx={{ textAlign: 'center' }}>
                  {Mother_Tongue}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ display: 'flex', background: '#85b8bf8a', mt: 1 }}>
          <Grid container direction="row">
            <Grid
              xs={4}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                borderRight: 1,
                borderRadius: 1,
                border: 'none'
              }}
            >
              <CardContent sx={{ flex: '1 0 auto', color: 'black' }}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ textAlign: 'center' }}
                >
                  Blood Group:
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={8}>
              <CardContent sx={{ color: 'black' }}>
                <Typography component="div" sx={{ textAlign: 'center' }}>
                  {Blood_Group}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ display: 'flex', background: '#85b8bf8a', mt: 1 }}></Card>
      </Container>
    </>
  );
}
export default Card24;
