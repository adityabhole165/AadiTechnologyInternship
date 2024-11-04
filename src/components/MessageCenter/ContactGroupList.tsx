import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAddUpdateGroupBody, IGetStandardClassBody, IGetUserNameBody, IGetUserRoleBody } from 'src/interfaces/ContactGroup/IContactGroup';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAaddUpdateGroup, CDAGetStandardClass, CDAGetUserName, CDAGetUserRole } from 'src/requests/ContactGroup/ReqContactGroup';
import { RootState } from 'src/store';
import ContactGroup from '../SMSCenter/ContactGroup';

interface Group {
  GroupId: string;
  GroupName: string;
}

interface ContactGroupListProps {
  onClose
}

const ContactGroupList: React.FC<ContactGroupListProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const rowsPerPageOptions = [5, 10, 20, 30, 40];

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [openDialog, setOpenDialog] = useState(false);
  // const [sortOrder, setSortOrder] = useState('asc');
  const [UsersRole, setUserRole] = useState();
  const [StandardClass, setStandardClass] = useState();
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const schoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const stdDivId = sessionStorage.getItem('StandardDivisionId');
  const asUserId = Number(localStorage.getItem('UserId'));

  console.log(UsersRole, "###########")

  const USGetUserRole: any = useSelector((state: RootState) => state.ContactGroup.IGetUserRole);
  const USGetStandardClass: any = useSelector((state: RootState) => state.ContactGroup.IGetStandardClass);
  const USGetUserName: any = useSelector((state: RootState) => state.ContactGroup.IGetUserName);
  const [sortsOrder, setSortOrders] = useState();
  const singleTotalCount: number = useMemo(() => {
    if (!Array.isArray(USGetUserName)) {
      return 0;
    }
    return USGetUserName.reduce((acc: number, item: any) => {
      const count = Number(item.TotalCount);
      if (isNaN(count)) {
        return acc;
      }
      return acc + count;
    }, 0);
  }, [USGetUserName]);

  const UserRole: IGetUserRoleBody = {
    asSchoolId: Number(schoolId),
  };
  useEffect(() => {
    dispatch(CDAGetUserRole(UserRole));
  }, []);
  const StandardsClass: IGetStandardClassBody = {
    asSchoolId: Number(schoolId),
    asAcademicYearId: Number(academicYearId)
  };
  useEffect(() => {
    dispatch(CDAGetStandardClass(StandardsClass));
  }, []);
  const UserName: IGetUserNameBody = {
    asSchoolId: Number(schoolId),
    asAcademicYearId: Number(academicYearId),
    asGroupId: 0,
    asRoleId: Number(UsersRole),
    asStartIndex: (page - 1) * rowsPerPage,
    asEndIndex: page * rowsPerPage,
    asSortDirection: "ASC",
    asStandardDivisionId: Number(StandardClass),
    asFilter: ""
  };
  useEffect(() => {
    dispatch(CDAGetUserName(UserName));
  }, [dispatch, page, rowsPerPage, UsersRole, StandardClass]);






  // Sort function for User Name
  //const [userData, setUserData] = useState(USGetUserName);
  // const handleSort = () => {
  //   const sortedData = [...userData].sort((a, b) => {
  //     if (sortOrder === 'asc') {
  //       return a.name.localeCompare(b.name);
  //     } else {
  //       return b.name.localeCompare(a.name);
  //     }
  //   });
  //   setUserData(sortedData);
  //   setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  // };
  const clickUserRole = (Value) => {
    setUserRole(Value);
  }
  const clickStandardClass = (Value) => {
    setStandardClass(Value);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function getXML() {
    let asUpdateSelectXML = "<MailingGroup xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n  ";
    asUpdateSelectXML +=
      " <GroupId>" + 0 + "</GroupId>\r\n  " +
      "<Name>" + "students" + "</Name>\r\n  " +
      "<lstUserRoles>\r\n  " +
      "<UserRoles>\r\n  " +
      "<User_Role_Id>" + 3 + "</User_Role_Id>\r\n  " +
      "</UserRoles>\r\n  " +
      "</lstUserRoles>\r\n  " +
      "<Users>" + "6926, 7040, 6904, 5781, 5892, 5821 " + "</Users>\r\n  " +
      "<IsDefault>" + false + "</IsDefault>\r\n  " +
      "<IsAllDeactivated>" + false + "</IsAllDeactivated>"

    asUpdateSelectXML += "\r\n</MailingGroup>";
    return asUpdateSelectXML
  }

  const clickConfirm = () => {
    const SaveInvestmentDeclaration: IAddUpdateGroupBody = {
      asSchoolId: Number(schoolId),
      asAcademicYearId: Number(academicYearId),
      asMailingGroupXML: getXML(),
    }
    dispatch(CDAaddUpdateGroup(SaveInvestmentDeclaration))
    dispatch(ContactGroup())
  };

  const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  const PageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      setSelected(USGetUserName.map((item) => item.UserId));
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxChange = (userId) => {
    setSelected((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
    setSelectAll(false);
    console.log(selected, "***********");
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    // Sorting logic can be implemented here
  };

  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
  const pageCount = Math.ceil(singleTotalCount / rowsPerPage);
  return (
    <>
      <Box>
        {/* <Typography variant="h4" sx={{ py: 2 }}>
          Add/Update Group
        </Typography> */}
        <Grid container spacing={2}>
          {/* Group Name */}
          <Grid item xs={6}>
            <TextField label={
              <span>
                Group Name<span style={{ color: 'red' }}> *</span>
              </span>
            }
              fullWidth />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography pt={1}>
            <b>Applicable To </b>
          </Typography>
          <FormControl component="fieldset">
            <Grid container direction="row" alignItems="center" spacing={2}>
              {['Admin', 'Teacher', 'Student', 'Admin Staff', 'Ex. Admin'].map(
                (option) => (
                  <Grid item key={option}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={option}
                        // onChange={handleCheckboxChange}
                        />
                      }
                      label={option}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </FormControl>
        </Grid>

        {/* <Box py={1} sx={{ overflow: 'auto', }}>
          <ContactGroupEditTable />
        </Box> */}

      </Box>
      <Grid container direction="row" alignItems="center" spacing={2} sx={{ pt: 1 }}>
        <Grid item xs={4}>
          <SearchableDropdown
            label="User Role "
            sx={{ minWidth: '15vw' }}
            ItemList={USGetUserRole}
            onChange={clickUserRole}
            defaultValue={UsersRole}
          />
        </Grid>
        {UsersRole === '3' && (
          <Grid item xs={4}>
            <SearchableDropdown
              label="Class"
              sx={{ minWidth: '15vw' }}
              ItemList={USGetStandardClass}
              onChange={clickStandardClass}
              defaultValue={StandardClass}
            />
          </Grid>
        )}
        <Grid item xs={4}>
          <TextField
            label="Search By Name"
            fullWidth />
        </Grid>
      </Grid>
      <Box py={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 0.5 }}>
          <Box>
            <Typography variant="h4" sx={{ pl: 0 }}>
              Select Users To Add In Selected Group
            </Typography>
          </Box>
          <Box style={{ flex: 1, textAlign: 'center' }}>
            <Typography
              variant='subtitle1'
              sx={{ margin: '16px 0', textAlign: 'center' }}
            >
              <Box component='span' fontWeight='fontWeightBold'>
                {startRecord} to {endRecord}
              </Box>{' '}
              out of{' '}
              <Box component='span' fontWeight='fontWeightBold'>
                {singleTotalCount}
              </Box>{' '}
              {singleTotalCount === 1 ? 'record' : 'records'}
            </Typography>
          </Box>
        </Box>
      </Box>
      <TableContainer component={Box} sx={{ overflow: 'auto', }}>
        <Table aria-label="simple table"
          sx={{
            border: (theme) => `1px solid ${theme.palette.grey[300]}`,
            overflow: 'hidden'
          }}
        >
          <TableHead>
            <TableRow sx={{
              background: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.common.white,

            }}
            >
              <TableCell padding="checkbox" sx={{ py: 0.5, color: 'white', }}>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll} />
              </TableCell>
              <TableCell sx={{ py: 0.5, color: 'white', }}>
                <Box display="flex" alignItems="center">
                  User Name
                  <IconButton onClick={handleSort} size="small">
                    {sortOrder === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {USGetUserName.map((item) => (
              <TableRow key={item.UserId}>
                <TableCell padding="checkbox" sx={{ py: 0.5 }}>
                  <Checkbox
                    checked={selected.includes(item.UserId)}
                    onChange={() => handleCheckboxChange(item.UserId)} />
                </TableCell>
                <TableCell sx={{ py: 0.5 }}>{item.UserName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ButtonGroupComponent
          ChangeRowsPerPage={ChangeRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions} // Set your options
          rowsPerPage={rowsPerPage}
          PageChange={PageChange}
          pagecount={pageCount}  // Use the calculated pageCount
        />
      </TableContainer>
      <Box>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Button color={'error'} onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={clickConfirm}
            sx={{
              color: 'green',
              '&:hover': {
                color: 'green',
                backgroundColor: green[100]
              }
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Box>
    </>
  );
};

export default ContactGroupList;
