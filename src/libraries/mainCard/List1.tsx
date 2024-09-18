import AttachmentIcon from '@mui/icons-material/Attachment';
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
function List1({
  items,
  SelectedMonth = null,
  SelectedYear = null,
  linkParams = ''
}) {
  const navigate = useNavigate();
  const url = localStorage.getItem("SiteURL") + "/RITeSchool/downloads/School Notices/";
  const clickCard = (path) => {
    if (location.pathname.split('/')[1].toLocaleLowerCase() === 'schoolnotice')
      navigate('../' + path.replace('/Common/', ''));
    else if (path !== undefined) {
      if (SelectedMonth === null)
        navigate(
          '/extended-sidebar/' +
          path.replace('%', encodeURIComponent('%')) +
          linkParams
        );
      else
        navigate(
          '/extended-sidebar/' +
          path.replace('%', encodeURIComponent('%')) +
          '/' +
          SelectedMonth +
          '/' +
          SelectedYear
        );
    }
  };
  return (
    <>
      {items.length == 0 ? (
        <ErrorMessages Error={'No records found'} />
      ) : (
        <Grid >
          <Box sx={{ backgroundColor: 'white', mb: 2 }}>
            <TableContainer component={Box} >
              <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
                <TableHead>
                  <TableRow sx={{ background: (theme) => theme.palette.secondary.main }}>
                    <TableCell sx={{ color: 'white'}}>Notice Name</TableCell>
                    <TableCell sx={{ color: 'white'}}>Date</TableCell>
                    <TableCell sx={{ color: 'white', textAlign: 'center' }}>Attachment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((items, index) => (
                    <TableRow key={index} sx={{ cursor: 'pointer' }} onClick={() => {
                      clickCard(items.linkPath);
                    }}>
                      <TableCell sx={{ textTransform: 'capitalize', maxWidth:'50px' , py:1}}>
                        {items.header}
                      </TableCell>
                      <TableCell sx={{ textTransform: 'capitalize', py:1}}>
                        {items.text1}
                      </TableCell>
                      <TableCell sx={{  textAlign: 'center', py:0.3 }}>
                        {items.FileName.length > 0 ?
                          <IconButton >
                            <AttachmentIcon />
                          </IconButton> : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {/* {items.map((items, index) => (
            <Grid item xs={12} key={index}>
              <Card1
                header={items.header}
                text1={items.text1}
                text2={items.text2}
                text3={items.text3}
                text4={items.text4}
                text5={items.text5}
                text6={items.text6}
                Color={items.backgroundColor}
                Textcolor={items.Textcolor}
                margin={items.mx}
                FileName={items.FileName}
                key={items.id}
                clickCard={() => {
                  clickCard(items.linkPath);
                }}
              />
              {/* {(items.linkPath === '' || items.linkPath === undefined) ?

                  <Card1
                    header={items.header}
                    text1={items.text1} text2={items.text2} text3={items.text3} text4={items.text4} text5={items.text5} text6={items.text6}
                    Color={items.backgroundColor}
                    margin={items.mx}
                    FileName={items.FileName}
                    key={items.id}
                    clickCard={clickCard}
                  />
                  : (
                    <Link style={{ color: "#424242", textDecoration: "none" }}
                      to={
                        `/${location.pathname.split('/')[1]
                        }` + items.linkPath
                      }
                    >
                      <Card1
                        header={items.header}
                        text1={items.text1} text2={items.text2} text3={items.text3} text4={items.text4} text5={items.text5} text6={items.text6}
                        Color={items.backgroundColor}
                        margin={items.mx}
                        FileName={items.FileName}
                        key={items.id}
                      />
                    </Link>
                  )} */}
          {/* </Grid>
          ))} */}
        </Grid>
      )}
    </>
  );
}

export default List1;