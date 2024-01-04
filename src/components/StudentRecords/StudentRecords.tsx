import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
//import DynamicList from 'src/libraries/list/DynamicList'
import { IGetTeacherListBody,IGetAllStudentStatusBody } from 'src/interfaces/StudentRecords/IStudentRecords';
import { GetTeachersList,GetAllStudentStatuss } from 'src/requests/StudentRecords/RequestStudentRecords';
import { Box, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import CheckBox from '@mui/icons-material/CheckBox';
import DropDown from 'src/libraries/list/DropDown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import VisibilityIcon from '@mui/icons-material/Visibility';
const StudentRecords = () => {
    const dispatch = useDispatch();
    const [SelectTeacher, setSelectTeacher] = useState("0");
    const [StudentStatusList, setStudentStatusList] = useState([])
    const [showRiseAndShine, setShowRiseAndShine] = useState(false);
    const [regNoOrName, setRegNoOrName] = useState("");

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const StandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const TeacherId = Number(sessionStorage.getItem('TeacherId'));
    const asUpdatedById = localStorage.getItem('Id');
    const Id = Number(sessionStorage.getItem('Id'));

    const GetTeachers = useSelector((state: RootState) => state.StudentRecords.ClassTeachers);
   console.log(GetTeachers,"GetTeachers");
    const GetStatusStudents: any = useSelector((state: RootState) => state.StudentRecords.StudentStatus);
    // console.log(GetStatusStudents,"GetStatusStudents");
    const HeaderList = ["Registration Number", "Roll No.", "Class", "Name", "Action For Me", "Action"]
    const IconList = [{
            Id: 1,
            Icon: (<VisibilityIcon />),
            Action: "View"
    }]
    useEffect(() => {
        dispatch(GetTeachersList(TeachersBody))
    }, [])
    // useEffect(() => {        
    //     if(SelectTeacher!="0")
    //     dispatch(GetAllStudentStatuss(GetStudentStatusBody))
    // }, [SelectTeacher])
    
    useEffect(() => {        
        if(SelectTeacher!="0")
        dispatch(GetAllStudentStatuss(GetStudentStatusBody))
    }, [SelectTeacher])
    
    useEffect(() => {
        if(GetTeachers.length>0)
        setSelectTeacher(GetTeachers[0].Value)
    }, [GetTeachers])
   
    

    const TeachersBody: IGetTeacherListBody = {
         asSchoolId:asSchoolId,
        asAcademicYearId:asAcademicYearId,
        asUserId:Id,
        HasFullAccess:"false"
      
      
      
    }
    const GetStudentStatusBody:IGetAllStudentStatusBody={
        asSchoolId:asSchoolId.toString(),
        "asAcademicYearId":asAcademicYearId.toString(),
        "asStdDivId":SelectTeacher,
        "asFilter":regNoOrName.toString(),
        "sortExpression":"",
        "sortDirection":"ASC",
        "StartIndex":0,
        "EndIndex":20,
        "ShowSaved":true,
        "IncludeRiseAndShine":showRiseAndShine,
        "HasEditAccess":"N",
        "UserId":Id
    }
    const clickTeacherDropdown = (value) => {
        setSelectTeacher(value)
    }
    const clickSearch = (value) => {
        //  setShowRiseAndShine(value)
        //  setSelectTeacher(value)
        //  setRegNoOrName(value)
        dispatch(GetAllStudentStatuss(GetStudentStatusBody))
      
    }
       
    const ClickItem = () =>{

    }
    const handleRegNoOrNameChange = (value) =>{
        setRegNoOrName(value)
    }
    const handleCheckboxChange = (value) =>{
setShowRiseAndShine(value)
    }


    return ( 
        <Container>
        <br></br>
        <br></br>
<br></br>
<br></br>
        <Grid container spacing={10} alignItems="center">
            <Grid item xs={2}>
                <Typography marginLeft={'1px'}>
                    <b>Class Teacher:</b>
                </Typography>
            </Grid>
            <Grid item xs={2} >
                <Box sx={{ marginRight: "500px", width: '180%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                    <DropDown
                            itemList={GetTeachers}
                            ClickItem={clickTeacherDropdown}
                            Label={""} 
                            DefaultValue={SelectTeacher}                    />
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Typography margin={'1px'}>
                    <b>Reg No/Name:</b>
                </Typography>
            </Grid>
            <Grid item xs={2} >
            <TextField label=""
                    value={regNoOrName} onChange={(e) => { handleRegNoOrNameChange(e.target.value) }} fullWidth
                    /><br></br>

            </Grid>
            <Grid item xs={2}>
            <ButtonPrimary onClick={clickSearch} variant='contained' style={{ marginRight: "150px", backgroundColor: 'green' }}>
                Search
              </ButtonPrimary>

            </Grid>

            <Grid item xs={4}>
                <Typography margin={'1px'}>
                <FormControlLabel
                        control={<Checkbox checked={showRiseAndShine} 
                        onChange={(e)=>{handleCheckboxChange(e.target.checked)}} />}
                        label="Show only Rise and Shine Students"
                    />
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {GetStatusStudents != undefined &&
                <DynamicList2 HeaderList={HeaderList} ItemList={GetStatusStudents}
                ClickItem={ClickItem} IconList={IconList}/>
            }
            </Grid>

            </Grid>
            </Container>
       )
}

export default StudentRecords
