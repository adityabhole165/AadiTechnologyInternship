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
const StudentRecords = () => {
    const dispatch = useDispatch();
    const [SelectTeacher, setSelectTeacher] = useState();
    const [SearchText, setSearchText] = useState("")
    const [StudentStatusList, setStudentStatusList] = useState([])

    const GetTeachers = useSelector((state: RootState) => state.StudentRecords.ClassTeachers);

    const GetStatusStudents = useSelector((state: RootState) => state.StudentRecords.StudentStatus);

    useEffect(() => {
        dispatch(GetTeachersList(TeachersBody))
    }, [])
    useEffect(() => {
        dispatch(GetAllStudentStatuss(GetStudentStatusBody))
    }, [])
    useEffect(() => {
        setStudentStatusList(GetStatusStudents)
    }, [GetStatusStudents])


    const TeachersBody: IGetTeacherListBody = {
        "asSchoolId": 18,
        "asAcademicYearId": 54,
        "asUserId": 4463,
        "HasFullAccess": "false"
    }
    const GetStudentStatusBody:IGetAllStudentStatusBody={

    "asSchoolId":"18",
   "asAcademicYearId":"54",
   "asStdDivId":"0",
   "asFilter":" ",
   "sortExpression":"",
   "sortDirection":"ASC",
   "StartIndex":0,
   "EndIndex":20,
   "ShowSaved":true,
   "IncludeRiseAndShine":false,
   "HasEditAccess":"N",
   "UserId":4463
    }
    const clickTeacherDropdown = (value) => {
        setSelectTeacher(value)
    }
    const changeSearchText = (value) => {
        setSearchText(value)
        if (value == "") {

            setStudentStatusList(GetStatusStudents)
        } else {
            setStudentStatusList(StudentStatusList.filter((item) => { return item.Text2.toLowerCase().includes(value.toLowerCase()) }))
        }

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
                            Label={SelectTeacher} 
                            DefaultValue={SelectTeacher}                    />
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Typography margin={'1px'}>
                    <b>Reg No/Name:</b>
                </Typography>
            </Grid>
            <Grid item xs={2} >
                <Box sx={{ marginRight: "0px", width: '110%', padding: "15px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                </Box>
            </Grid>
            <Grid item xs={2}>
            <Box sx={{ marginRight: "0px", width: '80%', padding: "1px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" ,backgroundColor:"lightblue"}}>
            <TextField label={'Search'} name="SearchText" type="text" variant="standard"
                value={SearchText} onChange={(e) => { changeSearchText(e.target.value) }} fullWidth/>
            </Box>
            </Grid>

            <Grid item xs={4}>
                <Typography margin={'1px'}>
                <FormControlLabel control={<Checkbox  />} label="Show only Rise and Shine Students" />
                </Typography>
            </Grid>
            

            </Grid>
            </Container>
       )
}

export default StudentRecords
