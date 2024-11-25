import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
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
import { IGetContactGroupsBody, IGetStandardClassBody, IGetUserNameBody, IGetUserRoleBody } from 'src/interfaces/ContactGroup/IContactGroup';
import { IContactGRPBody } from 'src/interfaces/MessageCenter/MessageCenter';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { ContactGroup } from 'src/requests/AdminSMSCenter/To1';
import { CDAaddUpdateGroup, CDAGetContactGroup, CDAGetStandardClass, CDAGetUserName, CDAGetUserRole, resetAddUpdateGroup } from 'src/requests/ContactGroup/ReqContactGroup';
import { RootState } from 'src/store';
import ContactGroupEditTable from './ContactGroupEditTable';
interface Group {
  GroupId: string;
  GroupName: string;
}
interface ContactGroupListProps {
  onClose,
  GPID: number,
  GPName: string,
  GPUserName: string
}
const ContactGroupList: React.FC<ContactGroupListProps> = ({ onClose, GPID = 0, GPName = '', GPUserName = '' }) => {
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const rowsPerPageOptions = [5, 10, 20, 30, 40];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedd, setSelectedd] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [previousStandardClass, setPreviousStandardClass] = useState(null); // Store the previous selected StandardClass to compar
  const [UsersRole, setUserRole] = useState('1');
  const [StandardClass, setStandardClass] = useState('1293');
  const [GroupName, setGroupName] = useState(GPName);
  const [ErrorUserRole, setErrorUserRole] = useState('');
  const [ErrorSelectedUser, setErrorSelectedUser] = useState('');
  const [ErrorGroupName, setErrorGroupName] = useState('');
  const [ErrorTypeName, setErrorTypeName] = useState('');
  const [ErrorGroupNameExists, setErrorGroupNameExists] = useState('');
  const [SearchByUserName, setSearchByUserName] = useState('');
  const [SearchUser, setSearchUser] = useState([]);
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const schoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const asUserId = Number(localStorage.getItem('UserId'));

  const [SortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');


  const [SortBy, setSortBy] = useState('Name');
  const getuserlist: any = useSelector((state: RootState) => state.getuser1.GetUser);
  const USContactGroup: any = useSelector((state: RootState) => state.ContactGroup.IContactGroups);
  const USContactGroupUserRoles: any = useSelector((state: RootState) => state.ContactGroup.IContactGroupUserRoles);
  const USGetUserRole: any = useSelector((state: RootState) => state.ContactGroup.IGetUserRole);
  const USGetStandardClass: any = useSelector((state: RootState) => state.ContactGroup.IGetStandardClass);
  const USGetUserName: any = useSelector((state: RootState) => state.ContactGroup.IlistGetUserName);
  const USAddUpdateGroup: any = useSelector((state: RootState) => state.ContactGroup.IAddUpdateGroup);

  useEffect(() => {
    setSelectedd(USContactGroupUserRoles)
  }, [USContactGroupUserRoles]);
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

  const ContactGpBody: IGetContactGroupsBody = {
    asSchoolId: schoolId.toString(),
    asAcademicYearId: academicYearId,
    asGroupId: GPID.toString(),
    asUserRoleId: RoleId,
    asUserId: asUserId.toString()
  }
  useEffect(() => {
    dispatch(CDAGetContactGroup(ContactGpBody));
  }, []);

  const ContactgroupBody: IContactGRPBody = {
    asSchoolId: schoolId,
    asAcademicYearId: academicYearId,
    asGroupId: '0',
    asUserRoleId: RoleId,
    asUserId: asUserId.toString()
  };

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
  }, [schoolId, academicYearId]);
  const UserName: IGetUserNameBody = {
    asSchoolId: Number(schoolId),
    asAcademicYearId: Number(academicYearId),
    asGroupId: GPID,
    asRoleId: Number(UsersRole),
    asStartIndex: (page - 1) * rowsPerPage,
    asEndIndex: page * rowsPerPage,
    asSortDirection: SortDirection.toString(),
    asStandardDivisionId: Number(StandardClass),
    asFilter: ''   //SearchUser.toString()
  };
  useEffect(() => {
    dispatch(CDAGetUserName(UserName));
  }, [dispatch, page, rowsPerPage, UsersRole, StandardClass, SortDirection]);

  useEffect(() => {
    const searchString = SearchUser.join(','); // Convert array to string
    console.log("Updated SearchUser as a string:", searchString);
  }, [SearchUser]);

  useEffect(() => {
    setGroupName(GPName);
  }, [GPName]);
  const clickUserRole = (Value) => {
    setUserRole(Value);
  }
  const clickStandardClass = (Value) => {
    if (Value !== StandardClass) {
      setStandardClass(Value);
      setPreviousStandardClass(StandardClass); // Update previousStandardClass
    }
  };

  const clickGroupName = (Value) => {
    setGroupName(Value);
  }
  function getXML() {
    let asUpdateSelectXML = "<MailingGroup xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n  ";

    asUpdateSelectXML +=
      " <GroupId>" + GPID + "</GroupId>\r\n  " +
      "<Name>" + GroupName + "</Name>\r\n  " +
      "<lstUserRoles>\r\n";
    selectedd.forEach(roleId => {
      asUpdateSelectXML += "    <UserRoles>\r\n      <User_Role_Id>" + roleId + "</User_Role_Id>\r\n    </UserRoles>\r\n";
    });
    asUpdateSelectXML +=
      "  </lstUserRoles>\r\n  " +
      "<Users>" + selected + "</Users>\r\n  " +
      "<IsDefault>" + false + "</IsDefault>\r\n  " +
      "<IsAllDeactivated>" + false + "</IsAllDeactivated>";

    asUpdateSelectXML += "\r\n</MailingGroup>";
    return asUpdateSelectXML;
  }
  const onClear = async () => {
    setGroupName(''); // Clear Group Name field
    setSelected([]); // Clear selected users
    setSelectedd([]);
    setSelectAll(false); // Clear selected roles
  }
  const clickConfirm = async () => {
    try {
      if (isSubmitting) return;
      setIsSubmitting(true); // Set flag to indicate submission in progress
      let isValid = true;
      setErrorGroupName('');
      setErrorUserRole('');
      setErrorSelectedUser('');
      setErrorGroupNameExists('');
      if (!GroupName || !selectedd || !selected) {
        setErrorTypeName('Please correct following errors.');
        isValid = false;
      }
      // Validate Group Name not blank
      if (!GroupName.trim()) {
        setErrorGroupName('Group Name should not be blank.');
        isValid = false;
      }
      // Validate if Group Name already exists
      if (GPID === 0) {
        if (await isGroupNameExists(GroupName)) {
          setErrorGroupNameExists('Group Name already exists.');
          isValid = false;
        }
      }
      // Validate user role selection
      if (selectedd.length === 0) {
        setErrorUserRole("At least one applicable role should be selected.");
        isValid = false;
      }
      // Validate selected users
      if (GPID === 0) {
        if (selected.length === 0) {
          setErrorSelectedUser("At least one user should be selected for the Group.");
          isValid = false;
        }
      }
      // If validation fails, stop the process
      if (!isValid) return;
      // Prepare data to save
      const SaveContactGroup = {
        asSchoolId: Number(schoolId),
        asAcademicYearId: Number(academicYearId),
        asMailingGroupXML: getXML(),
      };
      if (GPID === 0) {
        // Add group
        await dispatch(CDAaddUpdateGroup(SaveContactGroup));
      } else {
        // Update existing group
        await dispatch(CDAaddUpdateGroup(SaveContactGroup));
      }
      dispatch(resetAddUpdateGroup());
      dispatch(ContactGroup(ContactgroupBody));
      // await dispatch(CDAaddUpdateGroup(SaveContactGroup));
      // dispatch(resetAddUpdateGroup());
      // dispatch(ContactGroup(ContactgroupBody));

      setGroupName(''); // Clear Group Name field
      setSelected([]); // Clear selected users
      setSelectedd([]);
      setSelectAll(false); // Clear selected roles
      setErrorTypeName(''); // Clear error message
      setErrorGroupName(''); // Clear error message
      setErrorUserRole(''); // Clear error message
      setErrorSelectedUser(''); // Clear error message
      setErrorGroupNameExists(''); // Clear error message

    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  // Mock function to check if group name already exists
  // You would replace this with an actual API call
  const isGroupNameExists = async (groupName) => {
    try {
      const existingGroupNames = getuserlist.map((item) => (item.Value));
      return existingGroupNames.includes(groupName.trim());
    } catch (error) {
      return false; // Assume name doesn't exist on error
    }
  };



  useEffect(() => {
    if (USAddUpdateGroup) {
      if (typeof USAddUpdateGroup === 'string') {
        if (USAddUpdateGroup.toLowerCase().includes('success')) {
          toast.success(USAddUpdateGroup);
          dispatch(resetAddUpdateGroup());
          setGroupName(''); // Clear Group Name
          setSelected([]); // Clear selected users
          setSelectedd([]);
          setSelectAll(false); // Clear selected roles
          setErrorTypeName('');
          setErrorGroupName('');
          setErrorUserRole('');
          setErrorSelectedUser('');
          setErrorGroupNameExists('');
          setIsSubmitting(false);

        } else {
          toast.error(USAddUpdateGroup);
        }
      }
    }
  }, [USAddUpdateGroup, onClose, GroupName, selectedd, selected]);


  // useEffect(() => {
  //   if (USAddUpdateGroup) {
  //     if (typeof USAddUpdateGroup === 'string') {
  //       if (USAddUpdateGroup.toLowerCase().includes('success')) {
  //         toast.success(USAddUpdateGroup);
  //         // onClose();
  //       } else {
  //         toast.error(USAddUpdateGroup);
  //       }
  //     }
  //   }
  // }, [USAddUpdateGroup, onClose, GroupName, selectedd, selected]);


  // const clickConfirm = async () => {
  //   try {

  //     let isValid = true;
  //     if (!GroupName || !selectedd || !selected) {
  //       setErrorTypeName('Please correct following errors.');
  //       isValid = false;
  //     }
  //     if (!GroupName.trim()) {
  //       setErrorGroupName('Group Name should not be blank.');
  //       isValid = false;
  //     } else {
  //       setErrorGroupName('');
  //     }
  //     if (selectedd.length === 0) {
  //       setErrorUserRole("At least one applicable role should be selected.");
  //       isValid = false;
  //     } else {
  //       setErrorUserRole('');
  //     }
  //     if (selected.length === 0) {
  //       setErrorSelectedUser("At least one user should be selected for the Group.");
  //       isValid = false;
  //     } else {
  //       setErrorSelectedUser('');
  //     }
  //     if (!isValid) return;
  //     const SaveContactGroup = {
  //       asSchoolId: Number(schoolId),
  //       asAcademicYearId: Number(academicYearId),
  //       asMailingGroupXML: getXML(),
  //     };
  //     await dispatch(CDAaddUpdateGroup(SaveContactGroup));
  //     dispatch(resetAddUpdateGroup());
  //     dispatch(ContactGroup(ContactgroupBody));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   if (USAddUpdateGroup) {
  //     if (typeof USAddUpdateGroup === 'string') {
  //       if (USAddUpdateGroup.toLowerCase().includes('success')) {
  //         toast.success(USAddUpdateGroup);
  //         onClose();
  //       } else {
  //         toast.error(USAddUpdateGroup);
  //       }
  //     }
  //   }
  // }, [USAddUpdateGroup, onClose, GroupName, selectedd, selected]);

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

  };
  const handleCheckboxChanges = (userId) => {
    setSelectedd((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );

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



  const handleSortChange = (column: string) => {
    if (SortBy === column) {
      setSortDirection(SortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };



  return (
    <>
      <Box>

        <Grid container spacing={2}>

          <Grid item xs={4}>

            <TextField
              fullWidth
              label={
                <span>
                  Group Name <span style={{ color: 'red' }}>*</span>
                </span>
              }
              multiline
              rows={1}
              value={GroupName}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 50) {
                  setGroupName(value);
                }
              }}

            />
            <ErrorMessage1 Error={ErrorTypeName}></ErrorMessage1>
            <ErrorMessage1 Error={ErrorGroupName}></ErrorMessage1>
            <ErrorMessage1 Error={ErrorSelectedUser}></ErrorMessage1>
            <ErrorMessage1 Error={ErrorUserRole}></ErrorMessage1>
            <ErrorMessage1 Error={ErrorGroupNameExists}></ErrorMessage1>
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
                          defaultValue={selectedd}
                        />
                      }
                      label={item.Name}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </FormControl>
        </Grid>
      </Box>
      {GPID !== 0 && (
        <ContactGroupEditTable GPID={GPID} />
      )}
      <Grid container direction="row" alignItems="center" spacing={2} sx={{ pt: 1 }}>
        <Grid item xs={3.5}>
          <SearchableDropdown
            label="User Role "
            sx={{ minWidth: '15vw' }}
            ItemList={USGetUserRole}
            onChange={clickUserRole}
            defaultValue={UsersRole}
          />
        </Grid>
        {UsersRole === '3' && (
          <Grid item xs={3.5}>
            <SearchableDropdown
              label="Class"
              sx={{ minWidth: '15vw' }}
              ItemList={USGetStandardClass}
              onChange={clickStandardClass}
              defaultValue={StandardClass}
            />
          </Grid>
        )}
        <Grid item xs={3.5}>
          <TextField
            fullWidth
            label={
              <span>
                Search By Name <span style={{ color: 'red' }}>*</span>
              </span>
            }
            // multiline
            rows={1}
            value={SearchByUserName}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 50) {
                handleSearchByUserName(value);
              }
            }}
            // onChange={(e) => {
            //   handleSearchByUserName(e.target.value)
            // }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Tab') {
                clickSearch();
              }
            }}

          />

        </Grid>
        <Grid item xs={1.5}>
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
            <Typography variant="h4" sx={{ marginTop: 1 }}>
              Select Users To Add In Selected Group
            </Typography>
          </Box>

        </Box>
      </Box>
      <Box p={0.5}>
        {SearchUser.length !== 0 ? (
          <Box style={{ flex: 1, textAlign: 'center' }}>
            <Typography
              variant='subtitle1'
              sx={{ margin: ' 0px', textAlign: 'center' }}
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
                  <TableCell sx={{ color: 'white' }}>
                    <b onClick={() => handleSortChange('Name')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      User Name {SortBy === 'Name' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                    </b>
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
            rowsPerPageOptions={rowsPerPageOptions}
            rowsPerPage={rowsPerPage}
            PageChange={PageChange}
            pagecount={pageCount}
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
          <Button color={'error'} onClick={onClear}>
            Clear
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
            Add
            {/* {GPID === 0 ? 'Add' : 'Update'} */}
          </Button>
        </DialogActions>
      </Box>
    </>
  );
};

export default ContactGroupList;
