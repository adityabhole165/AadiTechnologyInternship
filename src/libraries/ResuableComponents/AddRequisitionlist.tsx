import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { red } from '@mui/material/colors';

function AddRequisitionlist({
  ItemList,
  HeaderArray,
  clickDelete,
  onTextChange2
}) {
  const handleText3Change = (e, item) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, '');
    const updatedItemList = ItemList.map((listItem) =>
      listItem.ItemID === item.ItemID ? { ...listItem, Text3: numericValue } : listItem
    );
    onTextChange2(updatedItemList);
  };

  return (
    <TableContainer component={Box} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
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
                  alignItems: 'left',
                  gap: 1,
                  justifyContent: headerItem.Header.includes('Remark Template') ? 'flex-start' : 'left'
                }}>
                  <b>{headerItem.Header}</b>
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {ItemList.map((item) => (
            <TableRow key={item.ItemID}>
              <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left' }}>
                {item.ItemCode}
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left' }}>
                {item.ItemName}
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left' }}>
                {item.CurrentStock}
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left' }}>
                <TextField
                label={
                  <span>
                      <span style={{ color: 'red' }}>*</span>
                  </span>
              }
                  size="small"
                  id="outlined-basic"
                  value={item.Text3}
                  variant="outlined"
                  onChange={(e) => handleText3Change(e, item)}
                  sx={{ width: '100px', height:'1px'}}>
                  </TextField>
                
                &nbsp; &nbsp; &nbsp;
                <Select value={item.UOMUnit} sx={{ width: '100px', height: '37px' }} disabled>
                  <MenuItem value={item.UOMUnit}>{item.UOMUnit}</MenuItem>
                </Select>
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize', py: 1, textAlign: 'left' }} align="left">
                <DeleteForeverIcon onClick={() => clickDelete(item.ItemID)} 
                // sx={{
                //   cursor: 'pointer',
                //   '&:hover': { backgroundColor: 'lightgrey' }
                // }} 
                sx={{
                  ml:1,
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
  );
}

export default AddRequisitionlist;
