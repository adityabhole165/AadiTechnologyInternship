import React from 'react'
import { useState } from 'react'
import { Box, Container,Divider,Fab,Grid, IconButton, InputBase, ListItemSecondaryAction, Paper, Tooltip, } from '@mui/material';
import PageHeader from 'src/libraries/heading/PageHeader';
import { TextField } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, } from 'react';
import { getattendance } from 'src/requests/Attendance/requestGetMonthWiseAttendance'
import { IGetMonthwiseAttendanceBody } from 'src/interfaces/MonthwiseAttendance/IMonthwiseAttendance';
import SearchIcon from '@mui/icons-material/Search';
import TableAttendace from 'src/libraries/ResuableComponents/TableAttendance';
import WebBackButton from 'src/libraries/button/WebBackButton';
import Iconhelp from 'src/libraries/icon/Iconhelp';
import DirectionsIcon from '@mui/icons-material/Directions';
import CloseTwoTone from '@mui/icons-material/CloseTwoTone';
import MenuBook from '@mui/icons-material/MenuBook';
import MenuTwoTone from '@mui/icons-material/MenuTwoTone';
import Search from '@mui/icons-material/Search';
import ReplyIcon from '@mui/icons-material/Reply';
import { useTheme } from '@emotion/react';
import Help from '@mui/icons-material/QuestionMark';

const MonthwiseAttandance = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const StandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const StudentId = Number(sessionStorage.getItem('StudentId'));

    const HeaderArray = [{ Id: 1, Header: "Roll No." }, { Id: 2, scope:'row', Header: "Student Name", align :' left'  }, { Id: 3, Header: "Mar" }, { Id: 4, Header: "Apr" }, { Id: 5, Header: "May" }, { Id: 6, Header: "Jun" }
        , { Id: 7, Header: "Jul" }, { Id: 8,Header: "Aug" }, { Id: 9, Header: "Sep" }, { Id: 10, Header: "Oct" }, { Id: 10, Header: "Nov" }, { Id: 10, Header: "Dec" }, { Id: 11, Header: "Jan" }, { Id: 12, Header: "Feb" }, { Id: 13,scope:'row', Header: "Present Days" }, { Id: 14, scope:'row',Header: "Total Days" }, { Id: 15, Header: "%" }]
    const Note: string = "Displays students'  attendance for each month. Attendance is presented in the following format: number of days present/total attendance days."

    const MonthWiseAttendance = useSelector((state: RootState) => state.MonthwiseAttendance.GetMonthwiseAttendance);

        const [MonthWiseAttendanceList, setMonthWiseAttendanceList] = useState([MonthWiseAttendance]);
        const [search, setSearch] = useState(false);
        const [SearchText, setSearchText] = useState("");
      
        const changeSearchText = () => {
          if (SearchText === "") {
            setMonthWiseAttendanceList(MonthWiseAttendance);
          } else {
            setMonthWiseAttendanceList(
              MonthWiseAttendance.filter((item) => {
                return item.Text2.toLowerCase().includes(SearchText.toLowerCase());
              })
            );
          }
        };
      
        const SearchNameChange = (value) => {
          setSearchText(value);
        };
      
        const clickReset = () => {
          setMonthWiseAttendanceList(MonthWiseAttendance);
          setSearchText("");
        };
      

    const theme = useTheme();
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

 
    const click = () => {
        navigate('/extended-sidebar/Teacher/TAttendance');
    };
    return (
     
          <>
          {/* <div style={{ marginLeft: '70px', marginRight: '50px', marginTop: '15px' }}> */}
            <Container sx={{marginTop:'20px'}}  maxWidth='xl' >

            <Grid  container>
                <Grid item margin={0} padding={0} xs={3} lg={3}>
                    <PageHeader heading={'Month Wise Attendance'} subheading={''} />
                   
                </Grid>
                <Grid item xs={1} />

                <Grid sx={{ mt: 2  }} item xs={6} lg={8}>
                <Grid container direction='row-reverse' >


                        <WebBackButton icon={<ReplyIcon/>} FromRoute={'/Teacher/TAttendance/'} />
                        <Tooltip title={Note}>
                      <IconButton  sx={{ color:'white',backgroundColor:'gray', mx:1 ,":hover":{backgroundColor:'gray'}}} >
                           <Help /> 
                        </IconButton>
                         </Tooltip>

                     
                       

                    
                         <Paper
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          my: 0,
          py: 0,
          mx: 0,
          flexWrap: 'nowrap',
        }}
      >
        {search ? (
          <>
            <InputBase
              sx={{ ml: 1, flex: 1, width: '450px' }}
              placeholder="Search Text"
              inputProps={{ 'aria-label': 'search Text' }}
              value={SearchText}
              onChange={(e) => SearchNameChange(e.target.value)}
            />
          

            <IconButton type="button" aria-label="search"   >
              <CloseTwoTone onClick={clickReset} />
            </IconButton>
          </>
        ) : (
          ''
        )}
        <Divider sx={{ height: 28 }} orientation="vertical" />

        <IconButton
          onClick={() => {
            setSearch(!search);
            changeSearchText();
          }}
          color="primary"
          aria-label="directions"
        >
          <Tooltip title="search">
            <SearchIcon />
          </Tooltip>
        </IconButton>
      </Paper>


                    </Grid>
                </Grid>
                </Grid> 
           
           


            

            <TableAttendace ItemList={MonthWiseAttendanceList} HeaderArray={HeaderArray} />

            </Container>
        <Box sx={{ textAlign: "center", gap: '10px' }} m={2}>   
                <ButtonPrimary
                    style={{ backgroundColor: '#ef5350' }}
                    onClick={click}
                    className='bold'
                >
                    Back
                </ButtonPrimary>
            </Box>
            
            </>


        
 
    )
}
export default MonthwiseAttandance