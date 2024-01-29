import React from 'react'
import { Box, Container, Divider, Grid, IconButton, InputBase, Paper, TextField, Tooltip } from '@mui/material';
import { useState } from 'react'
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import Icon1 from 'src/libraries/icon/icon1';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { getstudentname, getcalendar, SaveStudentAttendance, resetMessage } from 'src/requests/Attendance/requestIndividualAttendance'
import { IGetStudentNameBody, IGetCalendarForStudentBody, ISaveStudentAttendanceBody } from 'src/interfaces/IndividualAttendance/IIndividualAttendance';
import Dropdown from 'src/libraries/list/DropDown';
import CardCalenderList from 'src/libraries/ResuableComponents/CardCalenderList';
import DotLegend from 'src/libraries/summary/DotLegend';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';
import CardToggle1 from 'src/libraries/ResuableComponents/CardToggle1';
import DotLegendTeacher from 'src/libraries/summary/DotLegendTeacher';
import { getAttendanceLegend } from '../Common/Util';
import WebBackButton from 'src/libraries/button/WebBackButton';
import Iconhelp from 'src/libraries/icon/Iconhelp';
import { useTheme } from '@mui/styles';
import Reply from '@mui/icons-material/Reply';
import Help from '@mui/icons-material/QuestionMark';
import SaveAlt from '@mui/icons-material/SaveAlt';
import CloseTwoTone from '@mui/icons-material/CloseTwoTone';
import AccountBoxTwoTone from '@mui/icons-material/AccountBoxTwoTone';

const IndividualAttendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme()
  const [search, setSearch] = useState(false)
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const studentId = sessionStorage.getItem('StudentId');
  const [asStudentsAttendance, setasStudentsAttendance] = useState()
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear());
  const [ItemList, setItemList] = useState([])
  const [DefaultValue, setDefaultValue] = useState(null)
  const [StudentId, setStudentId] = useState("0");
  const itemlist2 = [{ id: "Y", Text: "Present All" }, { id: "N", Text: "Absent All" }]
  const [SearchText, setSearchText] = useState("")
  const [IsPresentAbsent, setIsPresentAbsent] = useState(0)
  const [date, setDate] = useState(new Date());
  const formattedDate = ` ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
  const Note: string = 'Mark the monthly attendance of individual students.';
  const [IsClicked, setIsClicked] = useState(false)

  const StudentList = useSelector((state: RootState) => state.IndividualAttendance.GetStudentName);
  
  const CalendarForStudent = useSelector((state: RootState) => state.IndividualAttendance.GetCalendarForStudent);
   console.log(CalendarForStudent,"CalendarForStudent-----");
   

  const SaveAttendanceforStudent = useSelector((state: RootState) => state.IndividualAttendance.SaveStudentAttendance);
   console.log(SaveAttendanceforStudent,"SaveAttendanceforStudent");
   



  
  const IGetStudentNameBody: IGetStudentNameBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: StandardDivisionId

  };
  const IGetCalendarForStudent: IGetCalendarForStudentBody =
  {
    asSchoolId: asSchoolId,
    aStudentId: Number(StudentId),
    aAcademicYearId: asAcademicYearId,
    aMonthId: Number(month),
    aYear: year
  }

  const HeaderPublish = [
    { Id: 1, Header: "Sun" },
    { Id: 2, Header: "Mon" }, 
    { Id: 3, Header: "Tue" },
     { Id: 4, Header: "Wed" }
    , { Id: 5, Header: "Thu" },
    { Id: 6, Header: "Fri" },
    { Id: 7, Header: "Sat" },

  ]

  useEffect(() => {
    dispatch(getstudentname(IGetStudentNameBody));
  }, []);

  useEffect(() => {
    if (StudentId != "0")
      dispatch(getcalendar(IGetCalendarForStudent));
  }, [month, StudentId])

  useEffect(() => {
    setItemList(CalendarForStudent)
  }, [CalendarForStudent])

  useEffect(() => {
    if (StudentList.length > 0) {
      setStudentId(StudentList[0].Value)
    }
  }, [StudentList])
  const clickStudent = (value) => {
    setIsPresentAbsent(0)
    setStudentId(value)
  }
  
  const clickTogle = (value) => {
    setItemList(
    
      ItemList.map((obj) =>
        obj.IsClickable ?
          {
            ...obj,
            Status: value,
            BackgroundColor: getAttendanceLegend(value),
            Text1: value == "Y" ? "Present" : "Absent"
          } : obj
          
      )
     
    )
    const isClicked = ItemList.some((obj) => obj.IsClickable && obj.Status !== value);
    setIsClicked(isClicked);
    setIsPresentAbsent(value)
  }
  const click = () => { navigate('/extended-sidebar/Teacher/TAttendance'); };
  const handlePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
    setMonth((newDate.getMonth() + 1).toString());
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
    setMonth((newDate.getMonth() + 1).toString());
  };
  const [AttendanceXML, setAttendanceXML] = useState("")
  const ClickItem = (value) => {
    setItemList(value)
    setAttendanceXML("<Attendance>" + getAttendanceString(value) + "</Attendance>")
  }


  const getAttendanceString = (AttendanceList) => {
    var XMLString = ""
    let isClicked = false
    AttendanceList.map((item) => {
      if (item.Status != undefined && item.Status != item.Text3)
        isClicked = true
      if (item.IsClickable)
        XMLString = XMLString + "<SchoolWiseAttendance Attendance_Date=\"" + item.Value + "\" Is_Present=\""
          + (item.Status != undefined ? item.Status : item.Text3) + "\" />"
    })
    setIsClicked(isClicked)
    return XMLString
  }

  useEffect(() => {
    if (SaveAttendanceforStudent !== '')
      toast.success(SaveAttendanceforStudent, { toastId: "success1" })
    dispatch(resetMessage())
  }, [SaveAttendanceforStudent])

  const SaveFile = () => {
    const SaveAttendance: ISaveStudentAttendanceBody =
    {
      asSchoolId: asSchoolId,
      asInsertedById: TeacherId,
      asStudentsAttendance: AttendanceXML,
      aStudentId: Number(StudentId),
      aYear: year,
      aMonthId: Number(month)
    }
    dispatch(SaveStudentAttendance(SaveAttendance));
  }
  return (
    <Container sx={{mt:2}} maxWidth={'xl'}>
       <Grid  container>
                <Grid item margin={0} padding={0} xs={3} lg={3}>
                    <PageHeader heading={'Individual Attendance'} subheading={''} />
                   
                </Grid>
                <Grid item xs={1} />

                <Grid sx={{ mt: 2  }} item xs={6} lg={8}>
                <Grid container direction='row-reverse' >


                        <WebBackButton icon={<Reply/>} FromRoute={'/Teacher/TAttendance/'} />
                         <Tooltip title='Help'>
                      <IconButton  sx={{ color:'white',backgroundColor:'gray', mx:1,  height: '36px !important',":hover":{backgroundColor:'gray'}}} >
                           <Help /> 
                        </IconButton>
                         </Tooltip>
                         <Tooltip title='Present Mark'>
                      <IconButton  sx={{ color:'white',backgroundColor:'gray',  height: '36px !important',":hover":{backgroundColor:'gray'}}} >
                          <SaveAlt/>
                        </IconButton>
                         </Tooltip>
                         <Tooltip title='Present Mark'>
                      <IconButton  sx={{ color:'white', height: '36px !important',backgroundColor:'gray', mx:1 ,":hover":{backgroundColor:'rgb(245, 17, 17)'}}} >
                          <h3>A</h3>
                        </IconButton>
                         </Tooltip>
                         <Tooltip title='Present Mark'>
                      <IconButton  sx={{ color:'white',backgroundColor:'gray',  height: '36px !important',":hover":{backgroundColor:'green'}}} >
                          <h3>P</h3>
                        </IconButton>
                         </Tooltip>
                      <Paper
                   component="form"
                sx={{  display: 'flex', justifyContent:"flex-end", alignItems: 'center', my:0, py:0, mr:1 ,ml:0,  flexWrap:'nowrap'}}>
      
                             {search ?
                        <>
                         <Dropdown width='400px' itemList={StudentList} ClickItem={clickStudent} DefaultValue={StudentId} Label={'SelectStudent'} />
                        
                      {/* <InputBase
                        sx={{ ml: 1, flex: 1, width:'450px' }}
                        placeholder="Search Text"
                        inputProps={{ 'aria-label': 'search Text' }}
                        /> */}
                      <IconButton type="button"  aria-label="search">
                        <CloseTwoTone/>
                      </IconButton>
                        </>:''}
                      <Divider sx={{ height: 28 }} orientation="vertical" />
                      
                      <IconButton onClick={()=>setSearch(!search)} color="primary"                  aria-label="directions">
                            <Tooltip title='search'>
                            <SearchIcon />
                            </Tooltip>
                      </IconButton>
                      </Paper>
                    </Grid>
                </Grid>
       </Grid> 
           
            
          <Box sx={{my:1}}>

        <CardToggle1  ItemList={itemlist2} clickToggle={clickTogle} defaultvalue={IsPresentAbsent} />
          </Box>
        
          
       
        <br></br>
        <CardCalenderList ItemList={CalendarForStudent}
          ClickItem={ClickItem}
          handlePrevMonth={handlePrevMonth} handleNextMonth={handleNextMonth}
          formattedDate={formattedDate} DefaultValue={DefaultValue} ArrayList={HeaderPublish} />
           <Grid container sx={{ mt:2}}>
          <Grid item sx={{}} gap={5} display='flex' xs={12} lg={12}>
            <DotLegendTeacher color="primary" text="Present" />
            <DotLegendTeacher color="error" text="Absent" />
            <DotLegendTeacher color="success" text="Holiday" />
            <DotLegendTeacher color="secondary" text="Weekend" />
          
            <DotLegendTeacher color="warning" text="Outside Acadamic Year " />
            <DotLegendTeacher color="info" text="Late Join " />
            <DotLegendTeacher color="" text="Not Available " />
          </Grid>
        </Grid>
        <br></br>
        <div style={{ textAlign: 'center' }}>
          <ButtonPrimary
          color='secondary'
            style={{  backgroundColor: '#ef5350', width:"90px"}}
            onClick={click}
          >
            Back
          </ButtonPrimary>
        
          <ButtonPrimary disabled={!IsClicked}
          color='success'
            onClick={SaveFile} 
            sx={{ml:1 , width:"90px"}}
          >
            Save
          </ButtonPrimary>
        </div>
      </Container>
  )
}
export default IndividualAttendance


