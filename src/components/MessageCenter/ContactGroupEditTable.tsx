// UserTable.tsx
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { red } from '@mui/material/colors';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AlertContext } from 'src/contexts/AlertContext';
import { IDeleteMailingGroupUserBody } from 'src/interfaces/ContactGroup/IContactGroup';
import { CDADeleteMailingGroupUserMsg } from 'src/requests/ContactGroup/ReqContactGroup';
// Sample data array
const userData = [
  { id: 1, name: 'Mr. Devendra Kumar (Principal)' },
  { id: 2, name: 'Dr. Anjali S. Gurjar (Ex Principal)' },
  { id: 12, name: 'Mr. Devendra Kumar (Principal)' },
  { id: 23, name: 'Dr. Anjali S. Gurjar (Ex Principal)' }
];

function ContactGroupEditTable() {
  const dispatch = useDispatch();
  const { showAlert, closeAlert } = useContext(AlertContext);
  const schoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const handleDelete = (id) => {
    const DeleteMailingGroupUserBody: IDeleteMailingGroupUserBody = {
      asSchoolId: Number(schoolId),
      asAcademicYearId: Number(academicYearId),
      asGroupId: 15,
      asUserId: id,
      asInsertedById: 0
    }
    if (id) {

      showAlert({
        title: 'Please Confirm',
        message: 'Are you sure you want to remove this Group?',
        variant: 'warning',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onCancel: () => {
          closeAlert();
        },
        onConfirm: () => {

          dispatch(CDADeleteMailingGroupUserMsg(DeleteMailingGroupUserBody));
          closeAlert();
        },
      });



    }
  }



  return (
    <TableContainer component={Box}>
      <Table
        aria-label="simple table"
        sx={{
          border: (theme) => `1px solid ${theme.palette.grey[300]}`,
          overflow: 'hidden'
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              background: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.common.white,

            }}
          >
            <TableCell
              sx={{
                background: (theme) => theme.palette.secondary.main,
                color: 'white',
                fontWeight: 'bold',
                py: 1.5
              }}
            >
              User Name
            </TableCell>
            <TableCell
              align="center"
              sx={{
                background: (theme) => theme.palette.secondary.main,
                color: 'white',
                fontWeight: 'bold',
                py: 1
              }}
            >
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.id}>
              <TableCell sx={{ py: 0.5 }}>{user.name}</TableCell>
              <TableCell align="center" sx={{ py: 1 }}>
                <IconButton
                  onClick={() => handleDelete(user.id)}
                  sx={{
                    color: '#38548A	',
                    //  backgroundColor: grey[500],
                    '&:hover': {
                      color: 'red',
                      backgroundColor: red[100]
                    }
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContactGroupEditTable;


