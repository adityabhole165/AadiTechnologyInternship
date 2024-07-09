
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, IconButton, Link, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { green, grey, red } from '@mui/material/colors';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

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
                    height:'10px'
                    
                  }}
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, i) => (
              <TableRow key={i}>
                <TableCell sx={{ 
                  textTransform: 'capitalize',
                  height:'5px',
                  padding:'7px'
                  }}>
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  <Link href={''} onClick={() => clickView(item.Id)} style={{ textDecoration: 'underline' }}>
                    {item.Text2}
                  </Link>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {item.Text3}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {item.Text4}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {item.Text5}
                  {/* <Link href={''} onClick={() => clickAttachment(item.Text5)} >
                  
                  </Link> */}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text9 == 0 ? null : (
                    <VisibilityIcon
                    //  style={{ color: 'black ', cursor: 'pointer' }}
                    sx={{
                      color:'#223354',
                           //  backgroundColor: grey[500],
                            '&:hover': {
                            //  color:'red',
                           backgroundColor: grey[200]
                           }}}
                      onClick={() => clickVisibilityIcon(item.Id)}
                    />
                  )}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}  >
                  <ButtonPrimary
                    style={{ backgroundColor: item.IsPublished === 'False' ? green[500] : red[500] }}
                    onClick={() => {
                      clickpublish(item.Id, item.Text3);
                    }} sx={{ minWidth: '100px' }}
                  >
                    {item.IsPublished === 'False' ?
                     <PublishedWithChangesIcon/> : 
                     <UnpublishedIcon/>
                     }
                  </ButtonPrimary>

                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text7 == 'False' ? (
                    <Tooltip title="Edit">
                      <IconButton>
                        <EditTwoTone
                         style={{ color: 'black ', cursor: 'pointer' }}
                          onClick={() => clickEdit(item.Id)}
                        />
                      </IconButton>
                    </ Tooltip>
                  ) : null}
                </TableCell>

                <TableCell 
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SelectedsubjectList;

