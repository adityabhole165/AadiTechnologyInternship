import { TextField, Container, Grid, Card, Fab, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetGetAdminAndprincipalUsers,
  GetUser,
  GetStudent,
  StartLoading
} from 'src/requests/AdminSMSCenter/To1';
import {
  GetAdminAndprincipalUsers,
  IUsergroup,
  IGetStudentsUser,
} from 'src/interfaces/AdminSMSCenter/To1';
import { RootState } from 'src/store';
import ListSelect from 'src/libraries/list/ListSelect';
import DropdownofAddrecipent from 'src/libraries/dropdown/DropdownofAddrecipent';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { BorderBox, BorderBox1 } from 'src/libraries/styled/CardStyle';
import SelectallAddrecipents from './SelectallAddrecipents';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages'
import { getShowPTA } from 'src/requests/MessageCenter/MessaageCenter';

const AddReciepents = ({ RecipientName, RecipientId, recipientListClick }) => {
  let PageName = 'MessageCenter';
  const dispatch = useDispatch();
  const [selectedRecipents, setSelectedRecipents] = useState([]);
  const [selectedRecipentsId, setSelectedRecipentsId] = useState([]);
  const [classId, setClassId] = useState([]);
  const [entireSchool, setEntireSchool] = useState([
    {
      Id: 'Entire School',
      Name: 'Entire School',
      Value: 'Entire School',
      isActive: false
    }
  ]);
  const [techerStudent1, setTeacherStudent1] = useState('');
  const [adminandSW, setAdminandSW] = useState();
  const [staffAndAdmin, setStaffAndAdmin] = useState();
  const [list, setList] = useState([]);
  const [studentlist, setStudentlist] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [teacherStudent, setTecherStudent] = useState([]);
  const [show, setShow] = useState(true);

  // Api for Admin principle and Software co-ordinator
  const getGetAdminAndprincipalUsers: any = useSelector(
    (state: RootState) =>
      state.getGetAdminAndprincipalUsers.getGetAdminAndprincipalUsers
  );
  // Api for Teacher list ,Student list ,Other staff and admin staff
  const getuserlist: any = useSelector(
    (state: RootState) => state.getuser1.GetUser
  );
  // Api for Teacher list ,Student list ,Other staff and admin staff
  const userListLoading: any = useSelector(
    (state: RootState) => state.getuser1.userListLoading
  );
  // Api for Teacher list ,Student list ,Other staff and admin staff
  const getClass: any = useSelector(
    (state: RootState) => state.getuser1.getClass
  );

  const getstudentlist: any = useSelector(
    (state: RootState) => state.getuser1.getStudent
  );
  const getPTAOption: any = useSelector(
    (state: RootState) => state.MessageCenter.PTAOption
  );

  // const Student = getstudentlist.GetStudentsUserResult;

  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const schoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const stdDivId = sessionStorage.getItem('StandardDivisionId');
  const asUserId = sessionStorage.getItem('Id');

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
  const showPTA =
  {
    asSchoolId: schoolId,
    asUserId: asUserId,
    asAcademicYearId: academicYearId
  }
  useEffect(() => {
    dispatch(getShowPTA(showPTA));
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem('RoleId') === '3') {
      setTecherStudent([
        { Id: '2', Name: 'Teacher', isActive: false },
        { Id: '6', Name: 'Admin Staff', isActive: false },
        { Id: '11', Name: 'PTA', isActive: false }
      ]);
     if ( !getPTAOption.HideStudentOption){
      setTecherStudent(myArr=>[...myArr, {Id: '3', Name: 'Student', isActive: false }])
    }
  } 
    else if (sessionStorage.getItem('RoleId') === '2') {
      setTecherStudent([
        {
          Id: '2',
          Name: 'Teacher',
          isActive: false
        },
        {
          Id: '6',
          Name: 'Admin Staff',
          isActive: false
        },
      ]);
      if ( !getPTAOption.HideStudentOption){
        setTecherStudent(myArr=>[...myArr, {Id: '3', Name: 'Student', isActive: false }])
      }
      if ( getPTAOption.ShowPTAOption){
        setTecherStudent(myArr=>[...myArr, {Id: '11', Name: 'PTA', isActive: false }])
      }
    }

    else {
      setTecherStudent([
        {
          Id: '2',
          Name: 'Teacher',
          isActive: false
        },
        {
          Id: '3',
          Name: 'Student',
          isActive: false
        },
        {
          Id: '7',
          Name: 'Other Staff',
          isActive: false
        },
        {
          Id: '6',
          Name: 'Admin Staff',
          isActive: false
        },
        {
          Id: '11',
          Name: 'PTA',
          isActive: false
        },

      ]);
    }
    setSelectedRecipents(RecipientName)
    setSelectedRecipentsId(RecipientId)
    //from reply, any recipients need to be selected
    SelectUsersInRecipients(RecipientId);

  }, [getPTAOption]);

  useEffect(() => {
    SelectUsersInRecipients(selectedRecipentsId);
  }, [getuserlist]);
  const SelectUsersInRecipients = (RecipentsIds) => {
    
    setList(getuserlist?.map((obj) => {
      return {
        ...obj, isActive:
          (RecipentsIds.includes(obj.Id) || isClassSelect()) ?
            true :
            false
      }
    }))
  }
  const isClassSelect = () => {
    let selectedClass = getClass
      .filter((obj) => obj.Id === Number(studentlist))
      .map((item) => {
        return item.Name
      })
    return selectedRecipents.includes(selectedClass[0]);
  }

  useEffect(() => {
    dispatch(StartLoading());
    dispatch(GetStudent(getStudentsUserAPIBody));
    teacherStudent?.map((obj, i) => {
      if (obj.isActive && i !== 1) {
        setShowErrorMsg(true)
      }
    });

  }, [studentlist]);

  useEffect(() => {
    dispatch(GetGetAdminAndprincipalUsers(adminAndprincipalUsersApiBody));
  }, [adminandSW]);

  useEffect(() => {
    setStaffAndAdmin(getGetAdminAndprincipalUsers);
  }, [getGetAdminAndprincipalUsers]);

  // Teacher / Students List / Admin Staff / Other Staff Body
  useEffect(() => {
    dispatch(StartLoading());
    dispatch(GetUser(getUsersInGroupAPIBody));
  }, [techerStudent1]); //SendSMS

  const classChange = (value) => {
    setStudentlist(value);

  };
  const onChange = (value) => {
    setEntireSchool(value);
    setSelectedRecipents([])
    setSelectedRecipentsId([]);
    setStaffAndAdmin(getGetAdminAndprincipalUsers);
    setTecherStudent(teacherStudent.map((obj) => { return { ...obj, isActive: false } }));
    setTeacherStudent1('');
    populateRecipient(value);
    setShow(!show);

  };

  const teacherStudentChange = (value) => {
    setShowErrorMsg(false)
    setList([]);
    setStudentlist('');
    setTeacherStudent1('');
    value?.map((obj, i) => {
      if (obj.isActive) {
        setTeacherStudent1(obj.Id);
        if (i !== 1)
          setShowErrorMsg(true)
      }
    });
    setTecherStudent(value);
  };

  const isStudentSelected = () => {
    let returnValue = false
    teacherStudent.map((item) => {
      if (item.Name === 'Student' && item.isActive)
        returnValue = true
    })
    return returnValue
  }
  const onChangeTeacher = (value) => {
    setList(value);
    //if student is selected
    if (isStudentSelected()) {
      if ((!value.some(obj => obj.isActive === false))) {
        removeAllRecipient(value)
        setClassId((prevState) => [...prevState, getSelectedClassId[0]]);
        setSelectedRecipents((prevState) => [...prevState, getSelectedClassName[0]]);
        // setSelectedRecipentsId((prevState) => [...prevState, getSelectedClassId[0]]);
      }
      else {
        setClassId([])
        setSelectedRecipents((prevState) => prevState.filter(item => item !== getSelectedClassName[0]));
        setSelectedRecipentsId((prevState) => prevState.filter(item => item !== getSelectedClassId[0]));
        populateRecipient(value);
      }
    }
    //teacher or staff is selected, student is not
    else {
      populateRecipient(value);
    }
  };
  const getSelectedClassName =
    getClass.filter((item) => item.Id == studentlist).map((obj) => { return obj.Name; })

  const getSelectedClassId =
    getClass.filter((item) => item.Id == studentlist).map((obj) => { return obj.Id; })

  const adminandSWChange = (value) => {
    setStaffAndAdmin(value);
    populateRecipient(value);
  };

  const populateRecipient = (itemList) => {
    itemList?.map((obj) => {
      if (obj.isActive && !selectedRecipentsId.includes(obj.Id)) {
        setSelectedRecipents((prevState) => [...prevState, obj.Value]);
        setSelectedRecipentsId((prevState) => [...prevState, obj.Id]);
      }
      else if (!obj.isActive && selectedRecipentsId.includes(obj.Id)) {
        setSelectedRecipentsId((prevState) => prevState.filter(item => item !== obj.Id));
        setSelectedRecipents((prevState) => prevState.filter(item => item !== obj.Value));
      }
    });
  }
  const removeAllRecipient = (itemList) => {
    itemList?.map((obj) => {
      const itemIndex = selectedRecipentsId.findIndex((item) => item === obj.Id);
      setSelectedRecipentsId((prevState) => prevState.filter(item => item !== obj.Id));
      setSelectedRecipents((prevState) => prevState.filter(item => item !== obj.Value));
    })
  }
  const clickOkay = () => {
    recipientListClick({
      RecipientName: selectedRecipents,
      RecipientId: selectedRecipentsId,
      ClassId: classId,
    });
  };
  return (
    <>
      <Container>
        <TextField
          multiline
          placeholder="Selected Recipient"
          value={selectedRecipents.map(obj => obj !== undefined ? obj.trim() : '').join('; ').replace(';', '')}
          disabled
          id="body"
          fullWidth
          margin="normal"
          style={{ scrollBehavior: 'auto' }}
          sx={{
            height: "50px",
            overflow: 'auto',
            border: "0.1px solid #c4c5c5",
            borderRadius: "5.3px",
          }}
        />
        <ButtonPrimary onClick={clickOkay} sx={{ mb: "10px" }}>Back to Compose</ButtonPrimary>
        <>
          {RoleId === '6' && (
            <BorderBox1>
              <ListSelect Itemlist={entireSchool} onChange={onChange} />
            </BorderBox1>
          )}
          {show === true ? (
            <>
              <Grid container spacing={2}>

                <Grid item xs={6}>
                  <Card>
                    <BorderBox height={RoleId === '3' ? "50px" : "180px" || RoleId === '2' ? "110px" : "100px"} >
                      <ListSelect
                        Itemlist={staffAndAdmin}
                        onChange={adminandSWChange}
                      />
                    </BorderBox>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card>
                    <BorderBox >
                      <ListSelect
                        Itemlist={teacherStudent}
                        onChange={teacherStudentChange}
                        isSingleSelect={true}
                      />
                    </BorderBox>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  {techerStudent1 === '3' && (
                    <DropdownofAddrecipent
                      Array={getClass}
                      label="Select Class"
                      handleChange={classChange}
                      defaultValue={studentlist}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  {list.length > 0 ?
                    <SelectallAddrecipents Itemlist={list} onChange={onChangeTeacher} /> :
                    showErrorMsg && !userListLoading &&
                    <ErrorMessages Error={'No records found'} />
                  }
                </Grid>
              </Grid>
            </>
          ) : null}
        </>
      </Container>
    </>
  );
};

export default AddReciepents;
