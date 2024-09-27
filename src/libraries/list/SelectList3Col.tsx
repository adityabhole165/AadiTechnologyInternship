import { Box, Grid, Table, TableCell, TableHead, TableRow } from '@mui/material';
import ListCard4ColSel from '../card/ListCard4ColSel';
const SelectList3Col = ({ Itemlist, refreshData, ActiveTab, DeleteDraft }) => {
  const clickSingle = (value) => {
    Itemlist = Itemlist.map((obj) =>
      obj.Id === value.name ? { ...obj, isActive: value.checked } : obj
    );
    refreshData(Itemlist);
  };

  return (
    <Box sx={{textAlign:'center'}}>
      {/* <Table aria-label="simple table" sx={{mb:1, border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
        <TableHead>
          <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
            <TableCell>
              Checkbox
            </TableCell>
            <TableCell>
              Subject
            </TableCell>
            <TableCell>
              To
            </TableCell>
            <TableCell>
            Attachment
            </TableCell>
            <TableCell>
            Date
            </TableCell>
          </TableRow>
        </TableHead>
      </Table> */}
      <Grid container sx={{borderRadius:'7px', mb:1, p:1.5, background: (theme) => theme.palette.secondary.main, border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
        <Grid  xs={12} sm={2} md={0.7} sx={{color:'white'}}>
         Check Box
        </Grid>
        <Grid  xs={12} sm={2} md={3} sx={{color:'white'}}>
          Subject
        </Grid>
        <Grid  xs={12} sm={2} md={4.8} sx={{color:'white'}}>
        To
        </Grid>
        <Grid  xs={12} sm={2} md={1} sx={{color:'white'}}>
        Attachment
        </Grid>
        <Grid  xs={12} sm={2} md={2.5} sx={{color:'white', }}>
        Date
        </Grid>
      </Grid>
      {Itemlist.map((item, index) => (
        <ListCard4ColSel
          key={index}
          Item={item}
          onChange={clickSingle}
          ActiveTab={ActiveTab}
          DeleteDraft={DeleteDraft}
        />
      ))}
    </Box>
  );
};

export default SelectList3Col;
