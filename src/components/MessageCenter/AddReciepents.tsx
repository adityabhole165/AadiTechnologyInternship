import { QuestionMark } from '@mui/icons-material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SquareIcon from '@mui/icons-material/Square';
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  GetAdminAndprincipalUsers,
  IGetStudentsUser,
  IUsergroup
} from 'src/interfaces/AdminSMSCenter/To1';
import { IAddUpdateGroupBody } from 'src/interfaces/ContactGroup/IContactGroup';
import { IContactGRPBody } from 'src/interfaces/MessageCenter/MessageCenter';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import DropdownofAddrecipent from 'src/libraries/dropdown/DropdownofAddrecipent';
import ListSelect from 'src/libraries/list/ListSelect';
import {
  ContactGroup,
  GetGetAdminAndprincipalUsers,
  getShowPTA,
  GetStudent,
  GetUser
} from 'src/requests/AdminSMSCenter/To1';
import { CDAaddUpdateGroup, resetDeleteMailGroupMsg } from 'src/requests/ContactGroup/ReqContactGroup';
import { RootState } from 'src/store';
import { GetScreenPermission } from '../Common/Util';
import ContactGroupList from './ContactGroupList';
import SelectallAddrecipents from './SelectallAddrecipents';

const AddReciepents = ({
  RecipientName,
  RecipientId,
  recipientListClick,
  contactGroupList,
  classIdList,
  IsConfirm
}) => {
  let PageName = 'MessageCenter';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [showRecipients, setShowRecipients] = useState(false);
  const [IsConfirm1, setIsConfirm1] = useState('');

  //const navigate = useNavigate();
  const [selectedRecipents, setSelectedRecipents] = useState(
    RecipientName || []
  );
  const [selectedRecipentsId, setSelectedRecipentsId] = useState(
    RecipientId || []
  );
  const [classId, setClassId] = useState(classIdList || []);

  const [contactGroup, setContactGroup] = useState(contactGroupList || []);
  const [techerStudent1, setTeacherStudent1] = useState('');
  const [adminandSW, setAdminandSW] = useState();
  const [staffAndAdmin, setStaffAndAdmin] = useState();
  const [list, setList] = useState([]);
  const [studentlist, setStudentlist] = useState('');
  console.log(studentlist, "studentlist");
  const [teacherStudent, setTecherStudent] = useState([]);
  const [show, setShow] = useState(true);
  const [SearchByName, setSearchByName] = useState('');
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const schoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const stdDivId = sessionStorage.getItem('StandardDivisionId');
  const asUserId = sessionStorage.getItem('Id');
  const MessageCenterFullAccess = GetScreenPermission('Message Center');

  console.log(MessageCenterFullAccess, '###### ')
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

  // Api for Teacher list ,Student list ,Other staff and admin staff
  const getuserlist: any = useSelector(
    (state: RootState) => state.getuser1.GetUser
  );
  console.log(getuserlist, 'getuserlist');

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
  const USDeleteContactGroup: any = useSelector(
    (state: RootState) => state.ContactGroup.IDeleteMailGroupMsg);
  useEffect(() => {
    if (USDeleteContactGroup !== '') {
      toast.success(USDeleteContactGroup);
      dispatch(resetDeleteMailGroupMsg());
    }
  }, [USDeleteContactGroup]);
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
    asSchoolId: schoolId,
    asAcademicYearId: academicYearId,
    asGroupId: '0',
    asUserRoleId: RoleId,
    asUserId: asUserId
  };
  useEffect(() => {
    dispatch(getShowPTA(showPTA));
  }, []);
  console.log(asUserId, "$$$$$4444")
  const handleDelete = (recipient) => {
    const updatedRecipients = selectedRecipents.filter((r) => r !== recipient);
    const updatedRecipientIds = selectedRecipentsId.filter(
      (id, index) => selectedRecipents[index] !== recipient
    );

    setSelectedRecipents(updatedRecipients);
    setSelectedRecipentsId(updatedRecipientIds);
  };
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
    setStaffAndAdmin(
      getGetAdminAndprincipalUsers?.map((obj) => {
        return {
          ...obj,
          isActive: RecipientId.includes(obj.Id) ? true : false
        };
      })
    );
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
  };

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
    dispatch(ContactGroup(ContactgroupBody))
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
  useEffect(() => {
    if (IsConfirm != '') clickOkay();
  }, [IsConfirm]);
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
  const handleClick = () => {
    navigate('/extended-sidebar/SMSCenter/ContactGroup'); // Replace with your desired route path
  };

  const handleOpenDialog = (isRecipients) => {
    setIsConfirm1('');
    setShowRecipients(isRecipients);
    setOpenDialog(true);
  };

  return (
    <>
      <Box>
        <Grid xs={12} sm={12} mt={0.7} item>

          <TextField
            sx={{ width: '15vw', mt: 0 }}
            fullWidth
            label="Search By Name"
            value={SearchByName}
            variant={'outlined'}
            size={'small'}
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
          <Grid item xs={12} sm={10}>

            <TextField
              fullWidth
              // multiline
              placeholder="Selected Recipient"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', overflowY: 'scroll', minWidth: '100%', height: '115px' }}>
                    {selectedRecipents.map((recipient, index) => (
                      <Chip
                        key={index}
                        label={recipient?.trim()}
                        onDelete={() => handleDelete(recipient)} // Handle chip deletion
                        sx={{ my: 1, mx: 0.5, }}
                      />
                    ))}
                  </Box>
                ),
                readOnly: true // Ensure the TextField is read-only
              }}
              value={''}

            />
          </Grid>

        </Grid>
        <>
          {RoleId === '6' && (
            <Box
              sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}
            >
              <ListSelect Itemlist={entireSchool} onChange={onChange} />
            </Box>
          )}
          {show === true ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={12}>
                      {/* <Card> */}
                      <Box >
                        <ListSelect
                          Itemlist={staffAndAdmin}
                          onChange={adminandSWChange}
                        />
                      </Box>
                      {/* </Card> */}
                    </Grid>
                    <Grid item xs={6} sm={12}>
                      {/* <Card> */}
                      <Box>
                        <ListSelect
                          Itemlist={teacherStudent}
                          onChange={teacherStudentChange}
                          isSingleSelect={true}
                        />
                      </Box>
                      {/* </Card> */}
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
                      size={'small'}
                    ></DropdownofAddrecipent>
                  )}
                  {techerStudent1 === '9' && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 0.5 }}>
                      <Box sx={{ background: 'white', pt: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'center'
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              mb: 0,
                              lineHeight: 'normal',
                              alignSelf: 'center',
                              paddingBottom: '2px'
                            }}
                          >
                            Legend
                          </Typography>
                          <Box sx={{ display: 'flex', gap: '20px' }}>
                            <Box
                              sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center'
                              }}
                            >
                              <SquareIcon
                                style={{
                                  color: '#F0F0F0',
                                  fontSize: 25,
                                  position: 'relative',
                                  top: '-2px'
                                }}
                              />
                              <Typography>Deactivated User</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        {MessageCenterFullAccess === 'Y' && (
                          <Tooltip title="Add New Group">
                            <IconButton
                              sx={{
                                color: '#38548A',
                                backgroundColor: grey[100],
                                '&:hover': {
                                  color: '#38548A',
                                  backgroundColor: blue[100]
                                }
                              }}
                              onClick={() => handleOpenDialog(true)}
                            >
                              <GroupAddIcon />
                            </IconButton>
                          </Tooltip>

                        )}
                      </Box>
                    </Box>
                  )}

                  {Loading ? (
                    <SuspenseLoader />
                  ) : (list.length === 0 ? (
                    (isSelected('Student') ||
                      isTeacherSelected()) && studentlist !== '' && (
                      <Typography
                        variant="h6"
                        align="center"
                        color="blue"
                        sx={{
                          textAlign: 'center',
                          marginTop: 1,
                          backgroundColor: '#324b84',
                          padding: 1,
                          borderRadius: 2,
                          color: 'white'
                        }}
                      >
                        No record found.
                      </Typography>
                    )
                  ) : (
                    <SelectallAddrecipents
                      Itemlist={list}
                      onChange={onChangeTeacher}
                      ContactGP={techerStudent1}
                    />
                  )
                  )}
                </Grid>
              </Grid>
            </>
          ) : null}
        </>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: '15px' } }}
      >
        <DialogTitle sx={{ bgcolor: '#223354' }}>
          <Tooltip
            title={'Add/edit delete contact group(s).'}
            placement="bottom-end"
          >
            <QuestionMark
              sx={{
                color: 'white',
                // background:'white',
                borderRadius: '10px',
                position: 'absolute',
                top: '4px',
                right: '35px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: grey[600] }
              }}
            />
          </Tooltip>
          <ClearIcon
            onClick={handleCloseDialog}
            sx={{
              color: 'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '5px',
              right: '8px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red'
              }
            }}
          />
        </DialogTitle>
        <Typography variant="h3" sx={{ pt: 2, pl: 3 }}>
          Add/edit delete contact group(s).
        </Typography>

        <DialogContent>
          <Box>
            <ContactGroupList onClose={handleCloseDialog} GPID={0} GPName={''} GPUserName={''} />
          </Box>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddReciepents;
