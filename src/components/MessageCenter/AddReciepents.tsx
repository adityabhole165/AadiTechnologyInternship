import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  GetAdminAndprincipalUsers,
  IGetStudentsUser,
  IUsergroup
} from 'src/interfaces/AdminSMSCenter/To1';
import { IContactGRPBody } from 'src/interfaces/MessageCenter/MessageCenter';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import DropdownofAddrecipent from 'src/libraries/dropdown/DropdownofAddrecipent';
import ListSelect from 'src/libraries/list/ListSelect';
import {
  ContactGroup,
  GetGetAdminAndprincipalUsers,
  GetStudent,
  GetUser,
  getShowPTA
} from 'src/requests/AdminSMSCenter/To1';
import { RootState } from 'src/store';
import SelectallAddrecipents from './SelectallAddrecipents';

const AddReciepents = ({ RecipientName, RecipientId, recipientListClick, IsConfirm }) => {
  // console.log(recipientListClick, "recipientListClick");

  let PageName = 'MessageCenter';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRecipents, setSelectedRecipents] = useState([]);
  const [selectedRecipentsId, setSelectedRecipentsId] = useState([]);
  const [classId, setClassId] = useState([]);
  const [contactGroup, setContactGroup] = useState([]);
  const [techerStudent1, setTeacherStudent1] = useState('');
  const [adminandSW, setAdminandSW] = useState();
  const [staffAndAdmin, setStaffAndAdmin] = useState();
  const [list, setList] = useState([]);
  const [studentlist, setStudentlist] = useState('');
  const [teacherStudent, setTecherStudent] = useState([]);
  const [show, setShow] = useState(true);
  const [SearchByName, setSearchByName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const schoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const stdDivId = sessionStorage.getItem('StandardDivisionId');
  const asUserId = sessionStorage.getItem('Id');

  const [entireSchool, setEntireSchool] = useState([
    {
      Id: 'Entire School',
      Name: 'Entire School',
      Value: 'Entire School',
      isActive: false
    }
  ]);

  // Api for Admin principle and Software co-ordinator
  const getGetAdminAndprincipalUsers: any = useSelector(
    (state: RootState) =>
      state.getGetAdminAndprincipalUsers.getGetAdminAndprincipalUsers
  );
  console.log(getGetAdminAndprincipalUsers, "getGetAdminAndprincipalUsers");

  // Api for Teacher list ,Student list ,Other staff and admin staff
  const getuserlist: any = useSelector(
    (state: RootState) => state.getuser1.GetUser
  );
  console.log(getuserlist, "getuserlist");

  // Api for Teacher list ,Student list ,Other staff and admin staff
  const Loading: any = useSelector(
    (state: RootState) => state.getuser1.Loading
  );
  // Api for Teacher list ,Student list ,Other staff and admin staff
  const getClass: any = useSelector(
    (state: RootState) => state.getuser1.getClass
  );

  const getstudentlist: any = useSelector(
    (state: RootState) => state.getuser1.getStudent
  );
  const getPTAOption: any = useSelector(
    (state: RootState) => state.getuser1.PTAOption
  );

  // const Student = getstudentlist.GetStudentsUserResult;

  const adminAndprincipalUsersApiBody: GetAdminAndprincipalUsers = {
    asAcademicYearId: academicYearId,
    asSchoolId: schoolId
  };
  // Standared List
  const getStudentsUserAPIBody: IGetStudentsUser = {
    asStdDivId: studentlist,
    asAcadmeicYearId: academicYearId,
    asSchoolId: schoolId
  };

  // Teacher / Students / Other Staff / Admin Staff Body
  const getUsersInGroupAPIBody: IUsergroup = {
    asAcademicYearId: academicYearId,
    asSchoolId: schoolId,
    asStdDivId: stdDivId,
    asUserId: asUserId,
    asSelectedUserGroup: techerStudent1,
    abIsSMSCenter: PageName == 'SMSCenter' ? true : false
  };
  const showPTA = {
    asSchoolId: schoolId,
    asUserId: asUserId,
    asAcademicYearId: academicYearId
  };
  const ContactgroupBody: IContactGRPBody = {
    asScholId: schoolId,
    asAcademicYearId: academicYearId,
    asGroupId: '0',
    asUserRoleId: '3',
    asUserId: asUserId
  };
  useEffect(() => {
    dispatch(getShowPTA(showPTA));
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('RoleId') === '3') {
      setTecherStudent([
        { Id: '2', Name: 'Teacher', isActive: false },
        { Id: '6', Name: 'Admin Staff', isActive: false },
        { Id: '9', Name: 'Contact group', isActive: false }
      ]);
      if (getPTAOption.ShowPTAOption) {
        setTecherStudent((myArr) => [
          ...myArr,
          { Id: '11', Name: 'PTA', isActive: false }
        ]);

        if (!getPTAOption.HideStudentOption) {
          setTecherStudent((myArr) => [
            ...myArr,
            { Id: '3', Name: 'Student', isActive: false }
          ]);
        }
      } else {
        if (getPTAOption.HideStudentOption == true) {
        }
      }
    } else if (sessionStorage.getItem('RoleId') === '2') {
      setTecherStudent([
        { Id: '2', Name: 'Teacher', isActive: false },
        { Id: '6', Name: 'Admin Staff', isActive: false },
        { Id: '9', Name: 'Contact group', isActive: false }
      ]);
      if (getPTAOption.ShowPTAOption) {
        setTecherStudent((myArr) => [
          ...myArr,
          { Id: '11', Name: 'PTA', isActive: false }
        ]);
      }
      if (!getPTAOption.HideStudentOption) {
        setTecherStudent((myArr) => [
          ...myArr,
          { Id: '3', Name: 'Student', isActive: false }
        ]);
      }
    } else {
      setTecherStudent([
        { Id: '2', Name: 'Teacher', isActive: false },
        { Id: '3', Name: 'Student', isActive: false },
        { Id: '7', Name: 'Other Staff', isActive: false },
        { Id: '6', Name: 'Admin Staff', isActive: false },
        { Id: '11', Name: 'PTA', isActive: false },
        { Id: '9', Name: 'Contact group', isActive: false }
      ]);
    }
    setSelectedRecipents(RecipientName);
    setSelectedRecipentsId(RecipientId);
    //from reply, any recipients need to be selected
    SelectUsersInRecipients(RecipientId);
  }, [getPTAOption]);

  useEffect(() => {
    dispatch(GetStudent(getStudentsUserAPIBody));
  }, [studentlist]);

  useEffect(() => {
    dispatch(GetGetAdminAndprincipalUsers(adminAndprincipalUsersApiBody));
  }, [adminandSW]);

  useEffect(() => {
    setStaffAndAdmin(getGetAdminAndprincipalUsers);
  }, [getGetAdminAndprincipalUsers]);

  // Teacher / Students List / Admin Staff / Other Staff Body
  useEffect(() => {
    if (techerStudent1 == '9') {
      dispatch(ContactGroup(ContactgroupBody));
    } else dispatch(GetUser(getUsersInGroupAPIBody));
  }, [techerStudent1]); //SendSMS

  useEffect(() => {
    SelectUsersInRecipients(selectedRecipentsId);
  }, [getuserlist]);

  const SelectUsersInRecipients = (RecipentsIds) => {
    setList(
      getuserlist?.map((obj) => {
        return {
          ...obj,
          isActive: (
            isSelected('Contact group')
              ? contactGroup.includes(obj.Id)
              : RecipentsIds.includes(obj.Id) || isClassSelect()
          )
            ? true
            : false
        };
      })
    );
  };

  const isClassSelect = () => {
    let selectedClass = getClass
      .filter((obj) => obj.Id === Number(studentlist))
      .map((item) => {
        return item.Name;
      });
    return selectedRecipents.includes(selectedClass[0]);
  };

  const classChange = (value) => {
    setStudentlist(value);
  };
  const onChange = (value) => {
    setEntireSchool(value);
    setSelectedRecipents([]);
    setSelectedRecipentsId([]);
    setStaffAndAdmin(getGetAdminAndprincipalUsers);
    setTecherStudent(
      teacherStudent.map((obj) => {
        return { ...obj, isActive: false };
      })
    );
    setTeacherStudent1('');
    populateRecipient(value);
    setShow(!show);
  };
  const clickSearch = () => {
    if (SearchByName === '') {
      setList(getuserlist);
    } else {
      setList(
        getuserlist.filter((item) => {
          const text1Match = item.Name.toLowerCase().includes(
            SearchByName.toLowerCase()
          );
          return text1Match;
        })
      );
    }
  };
  const handleSearchByName = (value) => {
    setSearchByName(value);
  }

  const teacherStudentChange = (value) => {
    setList([]);
    setStudentlist('');
    setTeacherStudent1('');
    value?.map((obj, i) => {
      if (obj.isActive) {
        setTeacherStudent1(obj.Id);
      }
    });
    setTecherStudent(value);
  };

  const isSelected = (value) => {
    let returnValue = false;
    teacherStudent.map((item) => {
      if (item.Name === value && item.isActive) returnValue = true;
    });
    return returnValue;
  };
  const isTeacherSelected = () => {
    let returnValue = false;
    teacherStudent.map((item) => {
      if (item.isActive) returnValue = true;
    });
    return returnValue;
  };
  const onChangeTeacher = (value) => {
    setList(value);
    //if student is selected

    if (isSelected('Student')) {
      if (!value.some((obj) => obj.isActive === false)) {
        removeAllRecipient(value);
        setClassId((prevState) => [...prevState, getSelectedClassId[0]]);
        setSelectedRecipents((prevState) => [
          ...prevState,
          getSelectedClassName[0]
        ]);
        // setSelectedRecipentsId((prevState) => [...prevState, getSelectedClassId[0]]);
      } else {
        setClassId([]);
        setSelectedRecipents((prevState) =>
          prevState.filter((item) => item !== getSelectedClassName[0])
        );
        setSelectedRecipentsId((prevState) =>
          prevState.filter((item) => item !== getSelectedClassId[0])
        );
        populateRecipient(value);
      }
    }
    //teacher or staff is selected, student is not
    else {
      populateRecipient(value);
    }
  };
  const getSelectedClassName = getClass
    .filter((item) => item.Id == studentlist)
    .map((obj) => {
      return obj.Name;
    });

  const getSelectedClassId = getClass
    .filter((item) => item.Id == studentlist)
    .map((obj) => {
      return obj.Id;
    });

  const adminandSWChange = (value) => {
    setStaffAndAdmin(value);
    populateRecipient(value);
  };

  const populateRecipient = (itemList) => {
    itemList?.map((obj) => {
      if (
        obj.isActive &&
        ((!isSelected('Contact group') &&
          !selectedRecipentsId.includes(obj.Id)) ||
          (isSelected('Contact group') && !contactGroup.includes(obj.Id)))
      ) {
        setSelectedRecipents((prevState) => [...prevState, obj.Value]);
        if (isSelected('Contact group')) {
          setContactGroup((prevState) => [...prevState, obj.Id]);
        } else {
          setSelectedRecipentsId((prevState) => [...prevState, obj.Id]);
        }
      } else if (
        !obj.isActive &&
        ((!isSelected('Contact group') &&
          selectedRecipentsId.includes(obj.Id)) ||
          (isSelected('Contact group') && contactGroup.includes(obj.Id)))
      ) {
        setSelectedRecipents((prevState) =>
          prevState.filter((item) => item !== obj.Value)
        );
        if (isSelected('Contact group')) {
          setContactGroup((prevState) =>
            prevState.filter((item) => item !== obj.Id)
          );
        } else {
          setSelectedRecipentsId((prevState) =>
            prevState.filter((item) => item !== obj.Id)
          );
        }
      }
    });
  };
  const removeAllRecipient = (itemList) => {
    itemList?.map((obj) => {
      const itemIndex = selectedRecipentsId.findIndex(
        (item) => item === obj.Id
      );
      setSelectedRecipentsId((prevState) =>
        prevState.filter((item) => item !== obj.Id)
      );
      setSelectedRecipents((prevState) =>
        prevState.filter((item) => item !== obj.Value)
      );
    });
  };
  console.log(IsConfirm, "IsConfirm")
  useEffect(() => {
    clickOkay()
  }, [IsConfirm])
  const clickOkay = () => {
    recipientListClick({
      RecipientName: selectedRecipents,
      RecipientId: selectedRecipentsId,
      ClassId: classId,
      ContactGroup: contactGroup
    });
    // navigate('/extended-sidebar/MessageCenter/Compose');
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Box>
        <Grid xs={12} sm={12} item>
          {/* Searchable Dropdown For Search Teacher  */}

          {/* <SearchableDropdown
            sx={{ minWidth: '15vw' }}
            // ItemList={Requision}
            // onChange={GetRequisitionStatusDropdown}
            label={'Status'}
            // defaultValue={SelectResult.toString()}
            mandatory
            size={"small"}
          /> */}
          <TextField
            sx={{ width: '15vw' }}
            fullWidth
            label="Search By Name"
            value={SearchByName}
            variant={'outlined'}
            size={"small"}
            onChange={(e) => {
              handleSearchByName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Tab') {
                clickSearch();
              }
            }}
          />
        </Grid>

        {/* field and back Compose code  */}
        <Grid container>
          <Grid item xs={12} sm={10}  >
            <TextField
              fullWidth
              disabled
              multiline
              placeholder="Selected Recipient"
              id="body"
              margin="normal"
              style={{ scrollBehavior: 'auto' }}
              value={selectedRecipents
                .map((obj) => (obj !== undefined ? obj.trim() : ''))
                .join('; ')}
              sx={{
                height: '50px',
                overflow: 'auto',
                border: '0.1px solid #c4c5c5',
                borderRadius: '5.3px'
              }}
            /></Grid>
          <Grid item xs={6} sm={2} mt={2}>
            <Button onClick={clickOkay}
              sx={{
                color: '#38548A',
                width: '150px',
                ml: 1,
                '&:hover': {
                  color: '#38548A',
                  backgroundColor: blue[100]
                }
              }}>
              Back to Compose
            </Button>
          </Grid>
        </Grid>
        <>
          {RoleId === '6' && (
            <Box sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
              <ListSelect Itemlist={entireSchool} onChange={onChange} />
            </Box>
          )}
          {show === true ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={12}>
                      <Card>
                        <Box sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}
                          height={
                            RoleId === '3'
                              ? '50px'
                              : RoleId === '2'
                                ? '97px'
                                : '180px'
                          }
                        >
                          <ListSelect
                            Itemlist={staffAndAdmin}
                            onChange={adminandSWChange}
                          />
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={6} sm={12}>
                      <Card>
                        <Box sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}` }}>
                          <ListSelect
                            Itemlist={teacherStudent}
                            onChange={teacherStudentChange}
                            isSingleSelect={true}
                          />
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {techerStudent1 === '3' && (
                    // <DropdownofAddrecipent
                    //   Array={getClass}
                    //   defaultValue={studentlist}
                    //   label="Select Class"
                    //   handleChange={classChange}
                    // />
                    <DropdownofAddrecipent
                      sx={{ minWidth: '300px' }}
                      ItemList={getClass}
                      onChange={classChange}
                      label={'Select Class'}
                      defaultValue={studentlist}
                      size={"small"}></DropdownofAddrecipent>

                  )}

                  {Loading ? (
                    <SuspenseLoader />
                  ) : list.length === 0 ? (
                    !isSelected('Student') &&
                    isTeacherSelected() && (
                      <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
                        No record found.
                      </Typography>
                    )
                  ) : (
                    <SelectallAddrecipents
                      Itemlist={list}
                      onChange={onChangeTeacher}
                    />
                  )}
                </Grid>
              </Grid>
            </>
          ) : null}
        </>
      </Box>
    </>
  );
};

export default AddReciepents;
