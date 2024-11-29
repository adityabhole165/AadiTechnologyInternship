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
import { ICountUsersAndStoreCountsBody, IGetContactGroupsBody, IGetStandardClassBody, IGetUserNameBody, IGetUserRoleBody } from 'src/interfaces/ContactGroup/IContactGroup';
import { IContactGRPBody } from 'src/interfaces/MessageCenter/MessageCenter';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { ContactGroup } from 'src/requests/AdminSMSCenter/To1';
import { CDAaddUpdateGroup, CDACountUsersAndStoreCounts, CDAGetContactGroup, CDAGetStandardClass, CDAGetUserName, CDAGetUserRole, resetAddUpdateGroup } from 'src/requests/ContactGroup/ReqContactGroup';
import { RootState } from 'src/store';
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
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const rowsPerPageOptions = [10, 20, 30, 40, 50, 60];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedd, setSelectedd] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [previousStandardClass, setPreviousStandardClass] = useState(null);
  const [UsersRole, setUserRole] = useState('0');
  const [StandardClass, setStandardClass] = useState('0'); //1293
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
  const [SortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [SortBy, setSortBy] = useState('Name');


  const getuserlist: any = useSelector((state: RootState) => state.getuser1.GetUser);
  const USContactGroup: any = useSelector((state: RootState) => state.ContactGroup.IContactGroups);
  const USContactGroupUserRoles: any = useSelector((state: RootState) => state.ContactGroup.IContactGroupUserRoles);
  const USGetUserRole: any = useSelector((state: RootState) => state.ContactGroup.IGetUserRole);
  const USGetStandardClass: any = useSelector((state: RootState) => state.ContactGroup.IGetStandardClass);
  const USGetUserName: any = useSelector((state: RootState) => state.ContactGroup.IlistGetUserName);
  const USAddUpdateGroup: any = useSelector((state: RootState) => state.ContactGroup.IAddUpdateGroup);
  const USCountUsersAndStoreCounts: any = useSelector((state: RootState) => state.ContactGroup.IlistTotalCounts);

  useEffect(() => {
    if (GPID !== 0) {
      if (typeof USContactGroupUserRoles === "string") {
        setSelectedd(
          USContactGroupUserRoles.split(",").map(item => item.trim())
        );
      } else {
        setSelectedd([]);
      }
    }
  }, [USContactGroupUserRoles]);

  const singleTotalCount: number = useMemo(() => {
    if (!Array.isArray(USCountUsersAndStoreCounts)) {
      return 0;
    }
    return USCountUsersAndStoreCounts.reduce((acc: number, item: any) => {
      const count = Number(item.TotalCount);
      if (isNaN(count)) {
        return acc;
      }
      return acc + count;
    }, 0);
  }, [USCountUsersAndStoreCounts]);


  const UserCount: ICountUsersAndStoreCountsBody = {
    asSchoolId: Number(schoolId),
    asAcademicYearId: Number(academicYearId),
    asGroupId: 0,
    asRoleId: Number(UsersRole),
    asStandardDivisionId: Number(StandardClass),
    asCount: 0,
    asFilter: 'N'

  }
  useEffect(() => {
    dispatch(CDACountUsersAndStoreCounts(UserCount))
  }, [UsersRole, StandardClass])
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
    asSchoolId: Number(schoolId),
    asAcademicYearId: Number(academicYearId),
    asGroupId: 0,
    asUserRoleId: Number(RoleId),
    asUserId: asUserId
  };

  const UserRole: IGetUserRoleBody = {
    asSchoolId: Number(schoolId),
  };
  useEffect(() => {
    dispatch(CDAGetUserRole(UserRole));
  }, []);
  useEffect(() => {
    if (USGetUserRole.length > 0)
      setUserRole(USGetUserRole[0].Id);
  }, [USGetUserRole]);

  const StandardsClass: IGetStandardClassBody = {
    asSchoolId: Number(schoolId),
    asAcademicYearId: Number(academicYearId)
  };
  useEffect(() => {
    dispatch(CDAGetStandardClass(StandardsClass));
  }, [schoolId, academicYearId]);
  useEffect(() => {
    if (USGetStandardClass.length > 0)
      setStandardClass(USGetStandardClass[0].Id);
  }, [USGetStandardClass]);

  const UserName: IGetUserNameBody = {
    asSchoolId: Number(schoolId),
    asAcademicYearId: Number(academicYearId),
    asGroupId: 0,
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
    const searchString = SearchUser.join(',');
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
      setPreviousStandardClass(StandardClass);
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
      asUpdateSelectXML += "    <UserRoles>\r\n  <User_Role_Id>" + roleId + "</User_Role_Id>\r\n    </UserRoles>\r\n";
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
    setGroupName('');
    setSelected([]);
    setSelectedd([]);
    setSelectAll(false);
    setErrorTypeName('');
    setErrorGroupName('');
    setErrorUserRole('');
    setErrorSelectedUser('');
    setErrorGroupNameExists('');
  }
  const clickConfirm = async () => {
    //if (isSubmitting) return;
    let isValid = true;
    setErrorGroupName('');
    setErrorUserRole('');
    setErrorSelectedUser('');
    setErrorGroupNameExists('');
    setErrorTypeName('');
    // if (!GroupName || !selectedd || !selected) {
    //   setErrorTypeName('Please correct the following errors.');
    //   isValid = false;
    // }
    if (!GroupName.trim()) {
      setErrorGroupName('Group name should not be blank.');
      isValid = false;
    }
    if (GPID === 0) {
      if (await isGroupNameExists(GroupName)) {
        setErrorGroupNameExists('Group Name already exists.');
        isValid = false;
      }
    }
    if (selectedd.length === 0) {
      setErrorUserRole('At least one applicable role should be selected.');
      isValid = false;
    }
    if (GPID === 0) {
      if (selected.length === 0) {
        setErrorSelectedUser('At least one user should be selected for the group.');
        isValid = false;
      }
    }
    if (!isValid) return;
    const SaveContactGroup = {
      asSchoolId: Number(schoolId),
      asAcademicYearId: Number(academicYearId),
      asMailingGroupXML: getXML(),
    };
    dispatch(CDAaddUpdateGroup(SaveContactGroup));
    // dispatch(resetAddUpdateGroup());
    //dispatch(ContactGroup(ContactgroupBody));
    setGroupName('');
    setSelected([]);
    setSelectedd([]);
    setSelectAll(false);
    setErrorTypeName('');
    setErrorGroupName('');
    setErrorUserRole('');
    setErrorSelectedUser('');
    setErrorGroupNameExists('');
  };
  useEffect(() => {
    if (USAddUpdateGroup != "") {
      toast.success(USAddUpdateGroup);
      // dispatch(CDAaddUpdateGroup());
      dispatch(resetAddUpdateGroup());
      dispatch(ContactGroup(ContactgroupBody));
    }
  }, [USAddUpdateGroup, onClose, GroupName, selectedd, selected, GPID])
  // useEffect(() => {
  //   if (USAddUpdateGroup) {
  //     if (typeof USAddUpdateGroup === 'string') {
  //       if (USAddUpdateGroup.toLowerCase().includes('success')) {
  //         toast.success(USAddUpdateGroup)
  //         dispatch(resetAddUpdateGroup());
  //         dispatch(ContactGroup(ContactgroupBody));
  //         setGroupName('');
  //         setSelected([]);
  //         setSelectedd([]);
  //         setSelectAll(false);
  //         setErrorTypeName('');
  //         setErrorGroupName('');
  //         setErrorUserRole('');
  //         setErrorSelectedUser('');
  //         setErrorGroupNameExists('');
  //       } else {
  //         toast.error(USAddUpdateGroup);
  //       }
  //     }
  //   }
  // }, [USAddUpdateGroup, onClose, GroupName, selectedd, selected, GPID]);
  const isGroupNameExists = async (groupName) => {
    const existingGroupNames = getuserlist.map(item => item.Value);
    return existingGroupNames.includes(groupName.trim());
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


  console.log(endRecord, "🤞🤞👌")
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

          </Grid>
        </Grid>
        <Grid sx={{ marginTop: 1 }} >
          <Typography>
            <ErrorMessage1 Error={ErrorTypeName}></ErrorMessage1>
            <ErrorMessage1 Error={ErrorGroupName}></ErrorMessage1>
            <ErrorMessage1 Error={ErrorUserRole}></ErrorMessage1>
            <ErrorMessage1 Error={ErrorSelectedUser}></ErrorMessage1>
            <ErrorMessage1 Error={ErrorGroupNameExists}></ErrorMessage1>
          </Typography>
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

          {singleTotalCount > 9 ? (
            <ButtonGroupComponent
              ChangeRowsPerPage={ChangeRowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
              rowsPerPage={rowsPerPage}
              PageChange={PageChange}
              pagecount={pageCount}
            />
          ) : (
            <span></span>
          )}
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

            {GPID === 0 ? 'Add' : 'Update'}
          </Button>
        </DialogActions>
      </Box>
    </>
  );
};

export default ContactGroupList;
