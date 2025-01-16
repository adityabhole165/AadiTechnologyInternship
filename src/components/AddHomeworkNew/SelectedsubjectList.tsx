
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, IconButton, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { green, red } from '@mui/material/colors';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';

const SelectedsubjectList = ({
  ItemList,
  HeaderArray,
  clickDelete,
  clickEdit,
  // clickAttachment,
  clickVisibilityIcon,
  clickpublish,
  clickView
}) => {
  const clickFileName = (value) => {
    if (value !== '') {
      window.open(
        localStorage.getItem('SiteURL') +
        '/RITeSchool/DOWNLOADS/Homework/' +
        value
      );
    }
  };
  return (
    <div>

      <TableContainer component={Box} sx={{
        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
      }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
            >
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{
                    textTransform: 'capitalize',
                    color: (theme) => theme.palette.common.white,
                    py: 1,
                    width: item?.width ? item?.width : 'auto',

                  }}
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell sx={{
                    textTransform: 'capitalize', py: 1,

                  }}>
                    {item.Text1}
                  </TableCell>

                  <TableCell sx={{ textTransform: 'capitalize', py: 0, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => clickView(item.Id)} >
                    {item.Text2}
                  </TableCell>

                  <TableCell sx={{ textTransform: 'capitalize', py: 0 }}>
                    {item.Text3}
                  </TableCell>

                  <TableCell sx={{ textTransform: 'capitalize', py: 0 }}>
                    {item.Text4}
                  </TableCell>

                  <TableCell sx={{ textTransform: 'capitalize', py: 0 }}>
                    {item.Text5}
                    {/* <Link href={''} onClick={() => clickAttachment(item.Text5)} >
            
            </Link> */}
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize', py: 0 }}>
                    {item.Text9.toString() !== '0' && item.Text11 === '' ? (
                      // style={{ color: '#223354', cursor: 'pointer' }}
                      <Tooltip title={"View"}>
                        <IconButton
                          sx={{
                            color: '#223354',
                            //  backgroundColor: grey[500],
                            '&:hover': {
                              color: '#223354',
                              // backgroundColor: [100],
                              cursor: 'pointer'
                            }
                          }}>
                          <VisibilityIcon

                            onClick={() => clickVisibilityIcon(item.Id)} />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {item.Text11 !== '' && item.Text9.toString() === '0' ? (
                      // style={{ color: '#223354', cursor: 'pointer' }}
                      <Tooltip title={"View"}>
                        <IconButton
                          sx={{
                            color: '#223354',
                            //  backgroundColor: grey[500],
                            '&:hover': {
                              color: '#223354',
                              // backgroundColor: [100],
                              cursor: 'pointer'
                            }
                          }}>
                          <VisibilityIcon

                            onClick={() => clickFileName(item.Text11)} />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    {item.Text11 !== '' && item.Text9.toString() !== '0' ? (
                      // style={{ color: '#223354', cursor: 'pointer' }}
                      <Tooltip title={"View"}>
                        <IconButton
                          sx={{
                            color: '#223354',
                            //  backgroundColor: grey[500],
                            '&:hover': {
                              color: '#223354',
                              // backgroundColor: [100],
                              cursor: 'pointer'
                            }
                          }}>
                          <VisibilityIcon
                            onClick={() => {
                              clickFileName(item.Text11)
                              clickVisibilityIcon(item.Id)
                            }} />
                        </IconButton>
                      </Tooltip>
                    ) : null}

                  </TableCell>

                  <TableCell sx={{ textTransform: 'capitalize', py: 0 }}>

                    <ButtonPrimary
                      style={{ backgroundColor: item.IsPublished === 'False' ? green[500] : red[500] }}
                      onClick={() => {
                        clickpublish(item.Id, item.Text3);
                      }} sx={{ minWidth: '10px', marginLeft: '40px' }}
                    >
                      {item.IsPublished === 'False' ?
                        <Tooltip title={'Publish'}>
                          <PublishedWithChangesIcon />
                        </Tooltip>
                        :
                        <Tooltip title={'Unpublish'}>
                          <UnpublishedIcon />
                        </Tooltip>
                      }
                    </ButtonPrimary>
                  </TableCell>

                  <TableCell sx={{ textTransform: 'capitalize', py: 0 }}>
                    {item.Text7 == 'False' ? (
                      <Tooltip title="Edit">
                        <IconButton>
                          <EditTwoTone
                            style={{ color: '#223354', cursor: 'pointer' }}
                            onClick={() => clickEdit(item.Id)} />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </TableCell>

                  {/* <TableCell
            sx={{ textTransform: 'capitalize' }} >
              {item.Text7 == 'False' ? (
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteForeverIcon
                      sx={{
                        color:'#223354',
                             //  backgroundColor: grey[500],
                              '&:hover': {
                               color:'red',
                             backgroundColor: red[100]
                             }}}
                      onClick={() => clickDelete(item.Id)}
                    />
                  </IconButton>
                </ Tooltip>
              ) : null}
            </TableCell> */}
                  <TableCell
                    sx={{ textTransform: 'capitalize', py: 0 }}
                  >
                    {item.Text7 == 'False' ? (
                      <Tooltip title="Delete">
                        <IconButton
                          sx={{
                            color: '#223354',
                            //  backgroundColor: grey[500],
                            '&:hover': {
                              color: 'red',
                              backgroundColor: red[100]
                            }
                          }}>
                          <DeleteForeverIcon

                            onClick={() => clickDelete(item.Id)} />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SelectedsubjectList;

