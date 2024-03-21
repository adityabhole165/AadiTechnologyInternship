import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ButtonPrimary } from '../styled/ButtonStyle';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { RootState } from 'src/store';
const Assignedhomeworklist1 = ({
  ItemList,
  HeaderArray,
  clickDelete,
  clickEdit,
  clickAttachment,
  clickVisibilityIcon,
  clickpublish,
  clickView
}) => {
  return (
    <div>
      <Typography variant={"h4"} my={1}>
        Assigned homework for selected subject :
      </Typography>
      <TableContainer component={Box} sx={{
        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
      }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{ backgroundColor: (theme) => theme.colors.primary.main }}
            >
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{
                    textTransform: 'capitalize',
                    color: (theme) => theme.palette.common.white
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
                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  <Link href={''} onClick={() => clickView(item.Id)}>
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
                  <Link href={''} onClick={() => clickAttachment(item.Text5)}>
                    {item.Text5}
                  </Link>
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {item.Text6 == 0 ? null : (
                    <VisibilityIcon
                      style={{ color: 'black' }}
                      onClick={() => clickVisibilityIcon(item.Id)}
                    />
                  )}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  <ButtonPrimary onClick={() => {
                    clickpublish(item.Id)
                  }}>
                    {item.Text7 == 'False' ? 'PUBLISH' : '  UNPUBLISH'}
                  </ButtonPrimary>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {item.Text7 == 'False' ? (
                    <Edit
                      style={{ color: 'black ' }}
                      onClick={() => clickEdit(item.Id)}
                    />
                  ) : null}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {item.Text7 == 'False' ? (
                    <Delete
                      style={{ color: 'black ' }}
                      onClick={() => clickDelete(item.Id)}
                    />
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

export default Assignedhomeworklist1;

const PublishUnpublishDialog = ({ open, setOpen, publishId: Id, setPublishId, clickPublishUnpublish }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Details, setDetails] = useState('');
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asTeacherId = sessionStorage.getItem('TeacherId');
  
  const AllPublishUnPublishHomework = useSelector(
    (state: RootState) => state.AddHomework.PublishUnPublishHomework
  );

  const ClickOk = () => {
    if (Details !== '') {
      clickPublishUnpublish(Id, Details);
      setOpen(false);
      setDetails('');
    } else {
      toast.error('Please provide a reason for unpublishing.');
    }
  };
  
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          py: 1
        }}
      ></DialogTitle>
      <DialogContent dividers sx={{ px: 4 }}>
        <Typography variant={"h4"} sx={{ mb: 1 }}>
          Unpublish Reason
        </Typography>
        <TextField
          multiline
          rows={3}
          value={Details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
          sx={{ width: '100%' }}
        />
      </DialogContent>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button onClick={() => {
          setOpen(false)
        }} color={'error'}>
          Cancel
        </Button>
        <Button onClick={() => { ClickOk() }} variant={'contained'}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}