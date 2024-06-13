import React from 'react';
import { Box, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function AddRequisitionlist({
  ItemList,
  HeaderArray,
  clickDelete,
  textall,
  Detailschnageall
}) {
 

  return (
    <TableContainer component={Box} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`,  overflow: 'hidden' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
            {HeaderArray.map((headerItem, i) => (
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
                  justifyContent: headerItem.Header.includes('Remark Template') ? 'flex-start' : 'center'
                }}>
                  <b>{headerItem.Header}</b>
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {ItemList.map((item) => (
            <TableRow key={item.Id}>
              <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px', textAlign: 'center' }}>
                {item.ItemCode}
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px', textAlign: 'center' }}>
                {item.ItemName}
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px', textAlign: 'center' }}>
                {item.CurrentStock}
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px', textAlign: 'center' }}>
                <TextField
                  size="small"
                  id="outlined-basic"
                  value={textall}
                  variant="outlined"
                  onChange={Detailschnageall}
                  sx={{ width: '150px', height: '10px' }} />
                &nbsp; &nbsp; &nbsp;
                <Select value={item.UOMUnit} sx={{ width: '150px', height: '37px' }} disabled>
                  <MenuItem value={item.UOMUnit}>{item.UOMUnit}</MenuItem>
                </Select>
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px', textAlign: 'center' }}>
                {item.ReturnQty}
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px', textAlign: 'center' }}>
                {item.CancelQty}
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px', textAlign: 'center' }}>
                {item.IssueQty}
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center' }} align="center">
                <DeleteForeverIcon onClick={() => clickDelete(item.ItemID)} sx={{ color: 'red' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AddRequisitionlist;
