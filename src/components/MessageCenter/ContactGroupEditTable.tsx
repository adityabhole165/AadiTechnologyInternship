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
  TableRow,
  Tooltip
} from '@mui/material';
import { red } from '@mui/material/colors';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertContext } from 'src/contexts/AlertContext';
import { IDeleteMailingGroupUserBody, IGetUsersBody } from 'src/interfaces/ContactGroup/IContactGroup';
import { CDADeleteMailingGroupUserMsg, CDAGetUser } from 'src/requests/ContactGroup/ReqContactGroup';
import { RootState } from 'src/store';
function ContactGroupEditTable({ GPID = 0 }) {
  const dispatch = useDispatch();
  const { showAlert, closeAlert } = useContext(AlertContext);
  const schoolId = localStorage.getItem('localSchoolId');
  // const asUserId = sessionStorage.getItem('Id');
  const academicYearId = sessionStorage.getItem('AcademicYearId');


  //const USUserData: any = useSelector((state: RootState) => state.ContactGroup.IContactGroups);
  const USUserData: any = useSelector((state: RootState) => state.ContactGroup.IGetUser);
  const UserBody: IGetUsersBody = {
    asSchool_Id: Number(schoolId),
    asAcademicYearId: Number(academicYearId),
    asGroupId: GPID,
  }
  useEffect(() => {
    dispatch(CDAGetUser(UserBody));
  }, []);


  const handleDelete = (UserId) => {
    const DeleteMailingGroupUserBody: IDeleteMailingGroupUserBody = {
      asSchoolId: Number(schoolId),
      asAcademicYearId: Number(academicYearId),
      asGroupId: GPID,
      asUserId: UserId,
      asInsertedById: 0
    }
    if (UserId) {

      showAlert({
        title: 'Please Confirm',
        message: 'Are you sure you want to remove this user from selected group?',
        variant: 'warning',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onCancel: () => {
          closeAlert();
        },
        onConfirm: () => {
          dispatch(CDADeleteMailingGroupUserMsg(DeleteMailingGroupUserBody));
          dispatch(CDAGetUser(UserBody));
          closeAlert();
        },
      });

    }
    useEffect(() => {
      dispatch(CDADeleteMailingGroupUserMsg(DeleteMailingGroupUserBody));
      dispatch(CDAGetUser(UserBody));
    }, []);
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
          {USUserData.map((user) => (
            <TableRow key={user.UserId}>
              <TableCell sx={{ py: 0.5 }}>{user.UserName}</TableCell>
              <TableCell align="center" sx={{ py: 1 }}>
                <IconButton
                  onClick={() => handleDelete(user.UserId)}
                  sx={{
                    color: '#38548A	',
                    '&:hover': {
                      color: 'red',
                      backgroundColor: red[100]
                    }
                  }}
                >
                  <Tooltip title="Delete" >
                    <DeleteForeverIcon />
                  </Tooltip>
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


