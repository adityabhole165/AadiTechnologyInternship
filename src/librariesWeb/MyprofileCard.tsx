import { Box, Card, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import UserPhoto from 'src/libraries/UserPhoto/UserPhoto';

function MyprofileCard() {
  const UserName = sessionStorage.getItem('StudentName') || '-';
  const DesignationName = sessionStorage.getItem('DesignationName') || '-';
  const ClassTeacher = sessionStorage.getItem('ClassName') || '-';
  const MobileNumber = sessionStorage.getItem('MobileNumber') || '-';
  const ImgUrl = sessionStorage.getItem('PhotoFilePath');

  const userPhoto =
    ImgUrl && ImgUrl.length !== 0
      ? 'data:image/png;base64,' + ImgUrl
      : '/imges/defualtUser.jpg';

  return (
    <div>
      <Card sx={{ boxShadow: 2 }}>
        <Box sx={{ backgroundColor: '#4db6ac', p: 1 }}>
          <Typography variant="h3" color="white">
            Teacher Details
          </Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          <Grid container>
            <Grid item md={9} sm={8}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: `1px solid #4db6ac` }}>
                        <b>Teacher Name:</b>
                      </TableCell>
                      <TableCell sx={{ border: `1px solid #4db6ac` }}>{UserName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: `1px solid #4db6ac` }}>
                        <b>Designation:</b>
                      </TableCell>
                      <TableCell sx={{ border: `1px solid #4db6ac` }}>{DesignationName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: `1px solid #4db6ac` }}>
                        <b>Class Teacher:</b>
                      </TableCell>
                      <TableCell sx={{ border: `1px solid #4db6ac` }}>{ClassTeacher}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: `1px solid #4db6ac` }}>
                        <b>Mobile Number:</b>
                      </TableCell>
                      <TableCell sx={{ border: `1px solid #4db6ac` }}>{MobileNumber}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid
              item
              md={3}
              sm={4}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Box
                sx={{
                  border: `1px solid #4db6ac`,
                  padding: '15.7px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <UserPhoto
                  ImgUrl={userPhoto}
                  alt={'User Photo'}
                  width={'140px'}
                  height={'180px'}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default MyprofileCard;
