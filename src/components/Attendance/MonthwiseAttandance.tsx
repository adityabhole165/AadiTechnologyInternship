import React from 'react'
import { useState } from 'react'
import { Box, Container,Grid} from '@mui/material';
import PageHeader from 'src/libraries/heading/PageHeader';
import { TextField } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, } from 'react';
import { getattendance } from 'src/requests/Attendance/requestGetMonthWiseAttendance'
import { IGetMonthwiseAttendanceBody } from 'src/interfaces/MonthwiseAttendance/IMonthwiseAttendance';
import TableAttendace from 'src/libraries/ResuableComponents/TableAttendance';
import WebBackButton from 'src/libraries/button/WebBackButton';
import Iconhelp from 'src/libraries/icon/Iconhelp';

const MonthwiseAttandance = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const StandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const StudentId = Number(sessionStorage.getItem('StudentId'))

    const HeaderArray = [{ Id: 1, Header: "Roll No." }, { Id: 2, Header: "Student Name" }, { Id: 3, Header: "Mar" }, { Id: 4, Header: "April" }, { Id: 5, Header: "May" }, { Id: 6, Header: "June" }
        , { Id: 7, Header: "July" }, { Id: 8, Header: "Aug" }, { Id: 9, Header: "Sep" }, { Id: 10, Header: "Oct" }, { Id: 10, Header: "Nov" }, { Id: 10, Header: "Des" }, { Id: 11, Header: "Jan" }, { Id: 12, Header: "Feb" }, { Id: 13, Header: "Present Days" }, { Id: 14, Header: "Total Days" }, { Id: 15, Header: "%" }]
    const [MonthWiseAttendanceList, setMonthWiseAttendanceList] = useState([])
    const [SearchText, setSearchText] = useState("")
    const Note: string = "Displays list of student along with their month wise attendance.Attendance is given in format number of days present/total attendance days"

    const MonthWiseAttendance = useSelector((state: RootState) => state.MonthwiseAttendance.GetMonthwiseAttendance);

    const GetMonthwiseAttendanceBody: IGetMonthwiseAttendanceBody = {
        asSchoolId: asSchoolId,
        asAcademicyearId: asAcademicYearId,
        asStanardDivisionId: StandardDivisionId,
        TopRanker: 1000,
        Student_Id: StudentId,
        SortExp: " ORDER BY [Roll_No] ASC",
        prm_StartIndex: 0,
        PageSize: 100
    };

    useEffect(() => {
        dispatch(getattendance(GetMonthwiseAttendanceBody));
    }, []);
    useEffect(() => {
        setMonthWiseAttendanceList(MonthWiseAttendance)
    }, [MonthWiseAttendance])

    const changeSearchText = (value) => {
        setSearchText(value)
        if (value == "") {

            setMonthWiseAttendanceList(MonthWiseAttendance)
        } else {
            setMonthWiseAttendanceList(MonthWiseAttendanceList.filter((item) => { return item.Text2.toLowerCase().includes(value.toLowerCase()) }))
        }

    }
    const click = () => {
        navigate('/extended-sidebar/Teacher/TAttendance');
    };
    return (
        <>
          <Container maxWidth={'xl'}>
            <PageHeader heading={'Monthwise Attendance'} subheading={''} />
              <WebBackButton FromRoute={'/Teacher/TAttendance/'} />
             <Box sx={{ float: "right" }}>
              
                <Iconhelp  Note={Note}/>
             </Box>
           <Grid container>
           <Grid item xs={2} sm={4}/>
            <Grid item xs={8}  sm={4}>
            <TextField label={'Search by Name'} name="SearchText" type="text" variant="standard"
                value={SearchText} onChange={(e) => { changeSearchText(e.target.value) }} fullWidth

            />
            </Grid>
           </Grid>
         
         
      
            <br></br><br></br>



            <TableAttendace ItemList={MonthWiseAttendanceList} HeaderArray={HeaderArray} />


            <Box sx={{ textAlign: "center" }} m={2}>
                <ButtonPrimary
                    style={{backgroundColor: '#ef5350'}}
                    onClick={click}
                >
                   Close
                </ButtonPrimary>
            </Box>



        </Container>
        </>
    )
}
export default MonthwiseAttandance