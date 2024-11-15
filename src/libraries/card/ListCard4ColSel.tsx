import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Grid, Grow, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardMessage from '../mainCard/CardMessage';
import { ListStyle } from '../styled/CardStyle';
import CheckboxImg from './CheckboxImg';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const ListCard4ColSel = ({ Item, onChange, ActiveTab, DeleteDraft }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  return (
    <>
      <Grow
        in={checked}
        style={{ transformOrigin: '0 0 1' }}
        {...(checked ? { timeout: 1500 } : {})}
      >
        {/* <ListStyle>
          <Grid container>
            <Grid item xs={1} sm={0.5} sx={{ mt: '5px' }}>
              {ActiveTab !== 'Draft' ? (
                <CheckboxImg
                  name={Item.Id}
                  value={Item.Id}
                  checked={Item.isActive}
                  onChange={onChange}
                />
              ) : (
                <Tooltip
                  title="Delete">
                  <DeleteForeverIcon
                    onClick={() => DeleteDraft(Item.Id)}
                    sx={{
                      color: '#38548A',
                      cursor: 'pointer',
                      //  backgroundColor: grey[500],
                      '&:hover': {
                        color: 'red',
                        backgroundColor: red[100]
                      }
                    }}
                  />
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={11} sm={11}>
              <CardMessage
                header={Item.text1}
                text1={Item.text2}
                text2={Item.text3}
                text3={Item.text4}
                ActiveTab={ActiveTab}
                IsRead={Item.IsRead}
                IsSchedule={Item.IsSchedule}
                HasReadReceipt={Item.HasReadReceipt}
                RequestReadReceipt={Item.RequestReadReceipt}
                IsAttachmentExist={Item.IsAttachmentExist}
                DetailsId={Item.DetailsId}
                NavPath={Item.NavPath}
              />
            </Grid>
          </Grid>
        </ListStyle> */}
<Box sx={{backgroundColor:'white'}}>
<TableContainer component={Box}>
  <Table sx={{
          border: (theme) => `1px solid ${theme.palette.grey[300]}`,
          overflow: 'hidden'
        }}>
    {/* <TableHead>
      <TableRow>
        <TableCell>Action</TableCell>
        <TableCell>Header</TableCell>
        <TableCell>Text 1</TableCell>
        <TableCell>Text 2</TableCell>
        <TableCell>Text 3</TableCell>
      </TableRow>
    </TableHead> */}
    <TableBody>
      {/* {data.map((Item) => ( */}
        <TableRow key={Item.Id}>
          <TableCell sx={{textAlign:'left',width:'40px', py:0.5 }}>
            {ActiveTab !== 'Draft' ? (
              <CheckboxImg
                name={Item.Id}
                value={Item.Id}
                checked={Item.isActive}
                onChange={onChange}
                
              />
            ) : (
              <Tooltip title="Delete">
                <DeleteForeverIcon
                  onClick={() => DeleteDraft(Item.Id)}
                  sx={{
                    color: '#38548A',
                    cursor: 'pointer',
                    ml:1,
                    '&:hover': {
                      color: 'red',
                      backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    },
                  }}
                />
              </Tooltip>
            )}
          </TableCell>
          <TableCell sx={{justifyContent:'left', textAlign:'left',py:0.5}}>
          <CardMessage
                header={Item.text1}
                text1={Item.text2}
                text2={Item.text3}
                text3={Item.text4}
                ActiveTab={ActiveTab}
                IsRead={Item.IsRead}
                IsSchedule={Item.IsSchedule}
                HasReadReceipt={Item.HasReadReceipt}
                RequestReadReceipt={Item.RequestReadReceipt}
                IsAttachmentExist={Item.IsAttachmentExist}
                DetailsId={Item.DetailsId}
                NavPath={Item.NavPath}
              />
          </TableCell>
        </TableRow>
      {/* ))} */}
    </TableBody>
  </Table>
</TableContainer>
</Box>
      </Grow>
    </>
  );
};
export default ListCard4ColSel;
