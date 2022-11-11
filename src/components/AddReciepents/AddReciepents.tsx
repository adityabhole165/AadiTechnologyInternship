import { TextField,Grid,Card } from '@mui/material'
import { Container,Box} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
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
import { RootState } from 'src/store'
import ListSelect from 'src/libraries/list/ListSelect';
import DropdownofAddrecipent from 'src/libraries/dropdown/DropdownofAddrecipent';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle, BorderBox } from 'src/libraries/styled/CardStyle';
import { Styles } from "src/assets/style/student-style";



const AddReciepents = () => {
  const classes = Styles();
  let PageName = 'MessageCenter'
  const dispatch = useDispatch();
  const [selectedRecipents, setSelectedRecipents] = useState([])
  const [entireSchool, setEntireSchool] = useState([{
    Id: "0",
    Name: "EntireSchool",
    Value: "EntireSchool",
    isActive: false
  }])
  const [techerStudent1,setTecherStudent1]=useState('')
  const [adminandSW, setAdminandSW] = useState()
  const [staffAndAdmin, setStaffAndAdmin] = useState()
  const [list, setList] = useState([])
  const [studentlist,setStudentlist]=useState()
  const [dropdownlist,setDropdownlist]=useState([])
  const [techerStudent, setTecherStudent] = useState([
    {
      Id: "2",
      Name: "Teacher",
      isActive: false
    },
    {
      Id: "3",
      Name: "Student",
      isActive: false
    },
    {
      Id: "7",
      Name: "Other Staff",  
      isActive: false
    },
    {
      Id: "6",
      Name: "Admin Staff",
      isActive: false
    },

  ])
  // Api for Admin principle and Software co-ordinator
  const getGetAdminAndprincipalUsers: any = useSelector(
    (state: RootState) =>
      state.getGetAdminAndprincipalUsers.getGetAdminAndprincipalUsers
  );
  // Api for Teacher list ,Student list ,Other staff and admin staff
  const getuserlist: any = useSelector(
    (state: RootState) => state.getuser.GetUser
  );
  
  // Api for Teacher list ,Student list ,Other staff and admin staff
  const getClass: any = useSelector(
    (state: RootState) => state.getuser1.getClass
  );

  const getstudentlist: any = useSelector(
    (state: RootState) => state.getuser.getStudent
  );
  // const Student = getstudentlist.GetStudentsUserResult;
  

  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const schoolId = localStorage.getItem('localSchoolId');
  const RoleName = localStorage.getItem('RoleName');
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
    asSelectedUserGroup:techerStudent1,
    abIsSMSCenter: PageName == 'SMSCenter' ? true : false
  };
  

  useEffect(() => {
    setList(getuserlist)
  }, [getuserlist]);

  useEffect(() => {
   setDropdownlist(getClass)
  }, [getClass]);
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
    dispatch(GetUser(getUsersInGroupAPIBody));
  }, [techerStudent1]); //SendSMS


   const classChange=(value)=>{
    setStudentlist(value)
    console.log(value,"value")
   }
  const onChange = (value) => {
    setEntireSchool(value)
    mergeToList(value, adminandSW,list)
  }
  const techerStudentChange =(value)=>{
    setList([])
    setTecherStudent1('')
    value?.map((obj) => {
      if (obj.isActive) {
        setTecherStudent1(obj.Id)
      }   
    })   
    setTecherStudent(value)
    mergeToList(value,entireSchool,adminandSW)
  }
   const onChangeTeacher =(value)=>{
     setList(value)
    mergeToList(value,entireSchool,list)
   }
  const adminandSWChange = (value) => {
    setStaffAndAdmin(value)
    mergeToList(entireSchool, value,list)
  }
  const mergeToList = (itemList, adminandSW,list) => {
    setSelectedRecipents([])
    itemList?.map((obj) => {
      if (obj.isActive) {
        setSelectedRecipents(prevState => ([...prevState, obj.Value]))
      }
    })
    adminandSW?.map((obj) => {
      if (obj.isActive) {
        setSelectedRecipents(prevState => ([...prevState, obj.Value]))
      }
    })
    list?.map((obj) => {
      if (obj.isActive) {
        setSelectedRecipents(prevState => ([...prevState, obj.Value]))
      }
    })

  }

  return (
    <>
  
        <TextField
            multiline
            placeholder="Selected Recipient"
            value={selectedRecipents}
            variant="outlined"
            id="body"
            fullWidth
            margin="normal"
            sx={{
               maxHeight: '60px',
              overflow: 'auto',
            }}
          />
          <ButtonPrimary sx={{mb:"5px"}}>Okay</ButtonPrimary>
         <Box sx={{mb:"10px"}}>
        <ListSelect Itemlist={entireSchool} onChange={onChange} />
        </Box> 
        <Grid container spacing={2} >
       <Grid item xs={6} >
        <BorderBox>
       <ListSelect Itemlist={staffAndAdmin} onChange={adminandSWChange} />
       </BorderBox>
       </Grid>
      <Grid item xs={6} >
      <BorderBox>
       <ListSelect Itemlist={techerStudent} onChange={techerStudentChange} isSingleSelect={true}/>
       </BorderBox>
      </Grid>
      </Grid>
       <Box sx={{mb:"20px",mt:"10px"}}>
       {techerStudent1==="3" && <DropdownofAddrecipent Array={dropdownlist} label="Select Class" handleChange={classChange}/> }
       </Box>
    
        <ListSelect Itemlist={list} onChange={onChangeTeacher} />
  
       
       
    
    </>
  )
}

export default AddReciepents
