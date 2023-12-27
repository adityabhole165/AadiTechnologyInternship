import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import Dropdown from 'src/libraries/dropdown/Dropdown';
//import DynamicList from 'src/libraries/list/DynamicList'
import { IGetTeacherListBody,IGetAllStudentStatusBody } from 'src/interfaces/StudentRecords/IStudentRecords';
import { GetTeachersList,GetAllStudentStatuss } from 'src/requests/StudentRecords/RequestStudentRecords';
import { Box, Container, Grid, Typography } from '@mui/material'

const StudentRecords = () => {
    const dispatch = useDispatch();
    const [SelectTeacher, setSelectTeacher] = useState();
    
    const GetTeachers = useSelector((state: RootState) => state.StudentRecords.ClassTeachers);
    console.log("GetClassTeachers", GetTeachers)

    const GetStatusStudents = useSelector((state: RootState) => state.StudentRecords.StudentStatus);
    console.log("GetStatusStudents", GetStatusStudents)

    useEffect(() => {
        dispatch(GetTeachersList(TeachersBody))
    }, [])
    useEffect(() => {
        dispatch(GetAllStudentStatuss(GetStudentStatusBody))
    }, [])
    

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

    return (
        <Container>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <Grid container spacing={1} alignItems="center">
            <Grid item xs={3}>
                <Typography margin={'1px'}>
                    <b>Class Teacher:</b>
                </Typography>
            </Grid>
            <Grid item xs={3} >
                <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                    <Dropdown
                        Array={GetTeachers}
                        handleChange={clickTeacherDropdown}
                        defaultValue={SelectTeacher}
                        label={SelectTeacher}
                    />
                </Box>
            </Grid>
            </Grid>
            </Container>
       )
}

export default StudentRecords
