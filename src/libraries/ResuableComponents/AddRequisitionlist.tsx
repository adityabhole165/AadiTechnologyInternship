import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function AddRequisitionlist({
  ItemList,
  HeaderArray,
  clickDelete
  
}) {


  return (
    <>
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
                    py: 1
                  }}
                 
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: item.Header.includes('Remark Template') ? 'flex-start ' : 'center'
                  }}>
                    <b>{item.Header}</b>
                   
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, i) => (
              <TableRow key={i} >
               
                <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px',textAlign: 'center' }} >
                  {item.ItemCode}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px' ,textAlign: 'center'}} >
                  {item.ItemName}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px',textAlign: 'center' }} >
                  {item.CurrentStock}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px',textAlign: 'center' }} >
                  {item.ItemQty}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px',textAlign: 'center' }} >
                  {item.ReturnQty}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px',textAlign: 'center' }} >
                  {item.CancelQty}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px' ,textAlign: 'center' }} >
                  {item.IssueQty}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize', py: 0.5 , textAlign: 'center'  }} align="center">
                     < DeleteForeverIcon  onClick={() => clickDelete(item.ItemID)} sx={{ color: 'red' }}  />
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AddRequisitionlist;
