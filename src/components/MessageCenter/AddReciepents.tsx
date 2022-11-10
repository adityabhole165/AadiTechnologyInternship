import { Box, TextField, Container, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import {
  GetGetAdminAndprincipalUsers,
  GetUser,
  GetStudent
} from 'src/requests/AdminSMSCenter/To1';
import {
  GetAdminAndprincipalUsers,
  IUsergroup,
  IGetStudentsUser,
  GetStudentsUserResult
} from 'src/interfaces/AdminSMSCenter/To1';
import { RootState } from 'src/store';
import ListSelect from 'src/libraries/list/ListSelect';
import DropdownofAddrecipent from 'src/libraries/dropdown/DropdownofAddrecipent';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { BorderBox } from 'src/libraries/styled/CardStyle';

const AddReciepents = ({ recipientListClick }) => {
  let PageName = 'MessageCenter';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRecipents, setSelectedRecipents] = useState([]);
  const [selectedRecipentsId, setSelectedRecipentsId] = useState([]);
  const [entireSchool, setEntireSchool] = useState([
    {
      Id: '0',
      Name: 'EntireSchool',
      Value: 'EntireSchool',
      isActive: false
    }
  ]);
  const [techerStudent1, setTecherStudent1] = useState('');
  const [adminandSW, setAdminandSW] = useState();
  const [staffAndAdmin, setStaffAndAdmin] = useState();
  const [list, setList] = useState([]);
  const [studentlist, setStudentlist] = useState();
  // const [dropdownlist, setDropdownlist] = useState([])
  const [techerStudent, setTecherStudent] = useState([]);
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
  const getClass: any = useSelector(
    (state: RootState) => state.getuser1.getClass
  );

  const getstudentlist: any = useSelector(
    (state: RootState) => state.getuser1.getStudent
  );
  // const Student = getstudentlist.GetStudentsUserResult;

  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const schoolId = localStorage.getItem('localSchoolId');
  const RoleName = localStorage.getItem('RoleName');
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

  useEffect(() => {
    // console.log('[]');
    if (sessionStorage.getItem('RoleId') === '3') {
      setTecherStudent([
        { Id: '2', Name: 'Teacher', isActive: false },
        { Id: '6', Name: 'Admin Staff', isActive: false }
      ]);
    } 
    else if (sessionStorage.getItem('RoleId') === '2') {
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
          Id: '6',
          Name: 'Admin Staff',
          isActive: false
        }
      ]);
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
        }
      ]);
    }
  }, []);
  useEffect(() => {
    console.log('getuserlist');

    setList(getuserlist);
  }, [getuserlist]);

  // useEffect(() => {
  //   console.log("getClass")

  //   setDropdownlist(getClass)
  // }, [getClass]);
  useEffect(() => {
    console.log('studentlist');

    if (studentlist !== undefined) dispatch(GetStudent(getStudentsUserAPIBody));
  }, [studentlist]);

  useEffect(() => {
    console.log('adminandSW');

    dispatch(GetGetAdminAndprincipalUsers(adminAndprincipalUsersApiBody));
  }, [adminandSW]);
  useEffect(() => {
    console.log('getGetAdminAndprincipalUsers');

    setStaffAndAdmin(getGetAdminAndprincipalUsers);
  }, [getGetAdminAndprincipalUsers]);
  // Teacher / Students List / Admin Staff / Other Staff Body
  useEffect(() => {
    console.log('techerStudent1');
    dispatch(GetUser(getUsersInGroupAPIBody));
  }, [techerStudent1]); //SendSMS

  const classChange = (value) => {
    setStudentlist(value);
  };
  const onChange = (value) => {
    setEntireSchool(value);
    mergeToList(value, staffAndAdmin, list);
    setShow(!show);
  };
  const techerStudentChange = (value) => {
    setList([]);
    setTecherStudent1('');
    value?.map((obj) => {
      if (obj.isActive) {
        setTecherStudent1(obj.Id);
      }
    });
    setTecherStudent(value);
    // mergeToList(value,entireSchool,adminandSW)
  };

  const onChangeTeacher = (value) => {
    setList(value);
    mergeToList(entireSchool, staffAndAdmin, value);
  };
  const adminandSWChange = (value) => {
    setStaffAndAdmin(value);
    mergeToList(entireSchool, value, list);
  };
  const mergeToList = (itemList, adminandSW, list) => {
    setSelectedRecipents([]);
    itemList?.map((obj) => {
      if (obj.isActive) {
        setSelectedRecipents((prevState) => [...prevState, obj.Value]);
        setSelectedRecipentsId((prevState) => [...prevState, obj.Id]);
      }
    });
    adminandSW?.map((obj) => {
      if (obj.isActive) {
        setSelectedRecipents((prevState) => [...prevState, obj.Value]);
        setSelectedRecipentsId((prevState) => [...prevState, obj.Id]);
      }
    });
    list?.map((obj) => {
      if (obj.isActive) {
        setSelectedRecipents((prevState) => [...prevState, obj.Value]);
        setSelectedRecipentsId((prevState) => [...prevState, obj.Id]);
      }
    });
  };
  const clickOkay = () => {
    recipientListClick({
      RecipientName: selectedRecipents,
      RecipientId: selectedRecipentsId
    });
    // navigate("/extended-sidebar/MessageCenter/msgCenter")
  };
  return (
    <>
      <Container>
        <TextField
          multiline
          placeholder="Selected Recipient"
          value={selectedRecipents}
          variant="outlined"
          id="body"
          fullWidth
          margin="normal"
          style={{ scrollBehavior: 'auto' }}
          sx={{
          
       
            // 19rem
            maxHeight: '60px',
            overflow: 'auto'
          }}
        />
        {/* <RouterLink to={`/${location.pathname.split('/')[1]}/MessageCenter/msgCenter/` + selectedRecipents}> */}
        <ButtonPrimary onClick={clickOkay} sx={{mb:"10px"}}>Okay</ButtonPrimary>
        {/* </RouterLink> */}
        <>
          {RoleId === '6' && (
            <ListSelect Itemlist={entireSchool} onChange={onChange} />
          )}
          {show === true ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <BorderBox height={RoleId === '3' ? "600px" :"160px"} >
                    <ListSelect
                      Itemlist={staffAndAdmin}
                      onChange={adminandSWChange}
                    />
                  </BorderBox>
                </Grid>
                <Grid item xs={6}>
                  <BorderBox height={RoleId === '3' ? "100px" :"200px"}>
                    <ListSelect
                      Itemlist={techerStudent}
                      onChange={techerStudentChange}
                      isSingleSelect={true}
                    />
                  </BorderBox>
                </Grid>
                
      
                <Grid item xs={12}>
            {techerStudent1 === '3' && (
              <DropdownofAddrecipent
                Array={getClass}
                label="Select Class"
                handleChange={classChange}
              />
            )}
         </Grid>
         
                <Grid item xs={12}>
                  <ListSelect Itemlist={list} onChange={onChangeTeacher} />
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
