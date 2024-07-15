import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TableRow from '@mui/material/TableRow';
import { red } from '@mui/material/colors';
// ... (your other imports)

function Homeworkview({ ItemList, clickopen, clickDelete, HeaderArray }) {
  return (
    <div>
      <TableContainer component={Box} >
        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <TableHead>
            <TableRow
              sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}
            >
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{ textTransform: 'capitalize', color: 'white' }}
                  align={item.align ? item.align : 'left'}
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item) => (
              <TableRow key={item.Id}>
                <TableCell sx={{ textTransform: 'capitalize' }} onClick={() => clickopen(item.Id)}>
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align='center' >
                  <DeleteForeverIcon 
                  onClick={() => clickDelete(item.Id)} 
                  // color='error'
                  sx={{
                    color:'#223354',
                     //  backgroundColor: grey[500],
                      '&:hover': {
                    color:'red',
                     backgroundColor: red[100]
                      }}}
                   />
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Homeworkview;
