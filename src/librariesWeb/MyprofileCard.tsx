import { Box, Card, Grid, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import UserPhoto from 'src/libraries/UserPhoto/UserPhoto';
import Header from './Header';

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
    <Box sx={{ backgroundColor: 'white', p: 1 }}>
      <Card >
        <Grid item sx={{ overflow: 'auto', display: 'flex', borderRadius: '10px' }}>
          <Grid item xs={12}>
            <Header Title="Teacher Details" />
          </Grid>
        </Grid>
        <Box
          sx={{ p: 2 }}
        >
          <Grid container>
            <Grid item md={9} sm={8}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: `1px solid gray` }}>
                        <b>Teacher Name:</b>
                      </TableCell>
                      <TableCell sx={{ border: `1px solid gray` }}><b>{UserName} </b></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: `1px solid gray` }}>
                        <b>Designation:</b>
                      </TableCell>
                      <TableCell sx={{ border: `1px solid gray` }}><b>{DesignationName}</b></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: `1px solid gray` }}>
                        <b>Class Teacher:</b>
                      </TableCell>
                      <TableCell sx={{ border: `1px solid gray` }}><b>{ClassTeacher}</b></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: `1px solid gray` }}>
                        <b>Mobile Number:</b>
                      </TableCell>
                      <TableCell sx={{ border: `1px solid gray` }}><b>{MobileNumber}</b></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={3} sm={4}>
              <Box
                sx={{
                  borderRight: `1px solid gray`,
                  borderTop: `1px solid gray`,
                  borderBottom: `1px solid gray`,
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
                  height={'179px'}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}

export default MyprofileCard;
