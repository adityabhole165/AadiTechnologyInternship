import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
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
import { toast } from 'react-toastify';
import { IAddUpdateGroupBody, IGetStandardClassBody, IGetUserNameBody, IGetUserRoleBody } from 'src/interfaces/ContactGroup/IContactGroup';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAaddUpdateGroup, CDAGetStandardClass, CDAGetUserName, CDAGetUserRole } from 'src/requests/ContactGroup/ReqContactGroup';
import { RootState } from 'src/store';
import ContactGroup from '../SMSCenter/ContactGroup';
import ContactGroupEditTable from './ContactGroupEditTable';

interface Group {
  GroupId: string;
  GroupName: string;
}

interface ContactGroupListProps {
  onClose,
  GPID: number,
  GPName: string
}

const ContactGroupList: React.FC<ContactGroupListProps> = ({ onClose, GPID = 0, GPName = '' }) => {
  console.log('G99999999PID', GPID, GPName);
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const rowsPerPageOptions = [5, 10, 20, 30, 40];


  const [selectedd, setSelectedd] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [openDialog, setOpenDialog] = useState(false);
  const [UsersRole, setUserRole] = useState('1');
  const [StandardClass, setStandardClass] = useState('1293');
  const [GroupName, setGroupName] = useState(GPName);
  const [ErrorUserRole, setErrorUserRole] = useState('');
  const [ErrorSelectedUser, setErrorSelectedUser] = useState('');
  const [ErrorGroupName, setErrorGroupName] = useState('');
  const [SearchByUserName, setSearchByUserName] = useState('');
  const [SearchUser, setSearchUser] = useState([]);
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const schoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const stdDivId = sessionStorage.getItem('StandardDivisionId');
  const asUserId = Number(localStorage.getItem('UserId'));

  const getuserlist: any = useSelector(
    (state: RootState) => state.getuser1.GetUser
  );
  console.log(SearchUser, 'filter99999');


  const USGetUserRole: any = useSelector((state: RootState) => state.ContactGroup.IGetUserRole);
  console.log(USGetUserRole, "###########")

  const USGetStandardClass: any = useSelector((state: RootState) => state.ContactGroup.IGetStandardClass);
  const USGetUserName: any = useSelector((state: RootState) => state.ContactGroup.IlistGetUserName);
  const USAddUpdateGroup: any = useSelector((state: RootState) => state.ContactGroup.IAddUpdateGroup);

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


  useEffect(() => {
    setGroupName(GPName);
  }, [GPName]);





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
  const clickGroupName = (Value) => {
    setGroupName(Value);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function getXML() {
    let asUpdateSelectXML = "<MailingGroup xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n  ";
    asUpdateSelectXML +=
      " <GroupId>" + 0 + "</GroupId>\r\n  " +
      "<Name>" + GroupName + "</Name>\r\n  " +
      "<lstUserRoles>\r\n  " +
      "<UserRoles>\r\n  " +
      "<User_Role_Id>" + selectedd + "</User_Role_Id>\r\n  " +
      "</UserRoles>\r\n  " +
      "</lstUserRoles>\r\n  " +
      "<Users>" + selected + "</Users>\r\n  " +
      "<IsDefault>" + false + "</IsDefault>\r\n  " +
      "<IsAllDeactivated>" + false + "</IsAllDeactivated>"

    asUpdateSelectXML += "\r\n</MailingGroup>";
    return asUpdateSelectXML
  }

  const clickConfirm = async () => {
    try {
      if (!GroupName.trim()) {
        //toast.error("Please enter a group name");
        setErrorGroupName('Group Name should not be blank.');
        return;
      }

      if (selectedd.length === 0) {
        //toast.error("Please select at least one user role");
        setErrorUserRole("At least one applicable role should be selected.");
        return;
      }

      if (selected.length === 0) {
        //toast.error("Please select at least one user");
        setErrorSelectedUser("At least one user should be selected for the Group.");
        return;
      }

      const SaveInvestmentDeclaration: IAddUpdateGroupBody = {
        asSchoolId: Number(schoolId),
        asAcademicYearId: Number(academicYearId),
        asMailingGroupXML: getXML(),
      };

      await dispatch(CDAaddUpdateGroup(SaveInvestmentDeclaration));
      dispatch(ContactGroup());
    } catch (error) {
      toast.error("Failed to create group. Please try again.");
      console.error("Error creating group:", error);
    }
  };

  useEffect(() => {
    if (USAddUpdateGroup) {
      if (typeof USAddUpdateGroup === 'string' && USAddUpdateGroup.toLowerCase().includes('success')) {
        toast.success(USAddUpdateGroup);
        onClose(); // Close the dialog after successful creation
      } else if (typeof USAddUpdateGroup === 'string') {
        toast.error(USAddUpdateGroup);
      }
    }
  }, [USAddUpdateGroup, onClose]);

  // ... (rest of the component code remains the same)



  // const clickConfirm = () => {
  //   const SaveInvestmentDeclaration: IAddUpdateGroupBody = {
  //     asSchoolId: Number(schoolId),
  //     asAcademicYearId: Number(academicYearId),
  //     asMailingGroupXML: getXML(),
  //   }
  //   dispatch(CDAaddUpdateGroup(SaveInvestmentDeclaration))
  //   dispatch(ContactGroup())
  //   // toast.success("Group Added Successfully");
  // };
  // useEffect(() => {
  //   if (USAddUpdateGroup !== '') {
  //     toast.success(USAddUpdateGroup);

  //   }
  // }, [USAddUpdateGroup])


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
    // console.log(selected, "***********");
  };
  const handleCheckboxChanges = (userId) => {
    setSelectedd((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
    //setSelectAll(false);
    // console.log(selected, "***********");
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    // Sorting logic can be implemented here
  };
  const handleSearchByUserName = (value) => {
    setSearchByUserName(value);
  };
  const clickSearch = () => {
    if (SearchByUserName === '') {
      setSearchUser(USGetUserName);
    } else {
      const filteredSMS = USGetUserName.filter((item) => {
        const text1Match = item.UserName.toLowerCase().includes(
          SearchByUserName.toLowerCase()
        );
        const text2Match = item.UserName.toLowerCase().includes(
          SearchByUserName.toLowerCase()
        )
        return text1Match || text2Match;
      });
      setSearchUser(filteredSMS);
    }
  };


  useEffect(() => {

    setSearchUser(USGetUserName);
  }, [USGetUserName]);

  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
  const pageCount = Math.ceil(singleTotalCount / rowsPerPage);



  return (
    <>
      <Box>

        <Grid container spacing={2}>

          <Grid item xs={6}>
            <TextField label={
              <span>
                Group Name<span style={{ color: 'red' }}> *

                </span>
              </span>
            }
              defaultValue={GroupName}
              fullWidth onChange={(e) => clickGroupName(e.target.value)} />
            <ErrorMessage1 Error={ErrorGroupName}></ErrorMessage1>
            <ErrorMessage1 Error={ErrorSelectedUser}></ErrorMessage1>
            <ErrorMessage1 Error={ErrorUserRole}></ErrorMessage1>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography pt={1}>
            <b>Applicable To </b>
          </Typography>
          <FormControl component="fieldset">
            <Grid container direction="row" alignItems="center" spacing={2}>
              {USGetUserRole.map(
                (item) => (
                  <Grid item key={item.Id}>
                    <FormControlLabel
                      control={
                        <Checkbox

                          checked={selectedd.includes(item.Id)}
                          onChange={() => handleCheckboxChanges(item.Id)}
                        // name={item.Id}
                        // onChange={handleCheckboxChanges}
                        />
                      }
                      label={item.Name}

                    />
                    {/* <ErrorMessage1 Error={ErrorUserRole}></ErrorMessage1> */}
                  </Grid>
                )
              )}
            </Grid>

          </FormControl>
        </Grid>
      </Box>
      {GPID !== 0 && (
        <ContactGroupEditTable />
      )}
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
            fullWidth
            onChange={(e) => {
              handleSearchByUserName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Tab') {
                clickSearch();
              }
            }}

          />

        </Grid>
        <Grid item xs={4}>
          <IconButton
            onClick={clickSearch}
            sx={{
              background: (theme) => theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.dark
              }
            }}
          >
            <SearchTwoTone />
          </IconButton>
        </Grid>

      </Grid>
      <Box py={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 0.5 }}>
          <Box>
            <Typography variant="h4" sx={{ pl: 0 }}>
              Select Users To Add In Selected Group
            </Typography>
          </Box>
          {SearchUser.length !== 0 ? (
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
          ) : null}
        </Box>
      </Box>
      {SearchUser.length !== 0 ? (
        <Box>
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
                {SearchUser.map((item) => (
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
          </TableContainer>
          <ButtonGroupComponent
            ChangeRowsPerPage={ChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions} // Set your options
            rowsPerPage={rowsPerPage}
            PageChange={PageChange}
            pagecount={pageCount}  // Use the calculated pageCount
          />
        </Box>
      ) : (
        <Box sx={{ backgroundColor: '#D2FDFC' }}>
          <Typography
            variant="h6"
            align="center"
            sx={{
              textAlign: 'center',
              marginTop: 1,
              backgroundColor: '#324b84',
              padding: 1,
              borderRadius: 2,
              color: 'white',
            }}
          >
            No record found.
          </Typography>
        </Box>
      )}
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
