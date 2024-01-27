import React from 'react'
import { Box, Container, Grid, IconButton, TextField } from '@mui/material';
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
   


  const changeSearchText = (value) => {
    setSearchText(value)
    

}
  

//   const StudentList=[
//     {
//         "Id": "1 -  Miss Akshara Amit Bhosale",
//         "Name": "1 -  Miss Akshara Amit Bhosale",
//         "Value": "33902"
//     },
//     {
//         "Id": "2 -  Miss Mansvi Sachin Bhosale",
//         "Name": "2 -  Miss Mansvi Sachin Bhosale",
//         "Value": "38562"
//     },
//     {
//         "Id": "3 -  Miss Vidhi Nikhil Ekatpure",
//         "Name": "3 -  Miss Vidhi Nikhil Ekatpure",
//         "Value": "33860"
//     },
//     {
//         "Id": "4 -  Miss Avya Shubham Ghule",
//         "Name": "4 -  Miss Avya Shubham Ghule",
//         "Value": "33922"
//     },
//     {
//         "Id": "5 -  Miss Shreya Vaibhav Hemane",
//         "Name": "5 -  Miss Shreya Vaibhav Hemane",
//         "Value": "33857"
//     },
//     {
//         "Id": "6 -  Miss Aarvi Sunil Jathar",
//         "Name": "6 -  Miss Aarvi Sunil Jathar",
//         "Value": "33923"
//     },
//     {
//         "Id": "7 -  Miss Athashree Ajit Kashid",
//         "Name": "7 -  Miss Athashree Ajit Kashid",
//         "Value": "33847"
//     },
    
   
// ]



//  const CalendarForStudent=[
//   {
//       "Id": 0,
//       "Name": "<b>1</b>",
//       "Value": "1/1/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "p",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 1,
//       "Name": "2",
//       "Value": "1/2/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "a",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 2,
//       "Name": "3",
//       "Value": "1/3/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "h",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 3,
//       "Name": "4",
//       "Value": "1/4/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "w",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 4,
//       "Name": "5",
//       "Value": "1/5/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "h",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 5,
//       "Name": "6",
//       "Value": "1/6/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "l",
//       "Text3": "D",
//       "BackgroundColor": "lightsalmon ",
//       "ForeColur": "red",
//       "IsClickable": false
//   },
//   {
//       "Id": 6,
//       "Name": "7",
//       "Value": "1/7/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "w",
//       "Text3": "D",
//       "BackgroundColor": "lightsalmon ",
//       "ForeColur": "red",
//       "IsClickable": false
//   },
//   {
//       "Id": 7,
//       "Name": "8",
//       "Value": "1/8/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "p",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 8,
//       "Name": "9",
//       "Value": "1/9/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 9,
//       "Name": "10",
//       "Value": "1/10/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "a",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 10,
//       "Name": "11",
//       "Value": "1/11/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 11,
//       "Name": "12",
//       "Value": "1/12/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "g",
//       "Text3": "x",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 12,
//       "Name": "13",
//       "Value": "1/13/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "w",
//       "Text3": "D",
//       "BackgroundColor": "lightsalmon ",
//       "ForeColur": "red",
//       "IsClickable": false
//   },
//   {
//       "Id": 13,
//       "Name": "14",
//       "Value": "1/14/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "D",
//       "BackgroundColor": "lightsalmon ",
//       "ForeColur": "red",
//       "IsClickable": false
//   },
//   {
//       "Id": 14,
//       "Name": "15",
//       "Value": "1/15/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 15,
//       "Name": "16",
//       "Value": "1/16/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "o",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 16,
//       "Name": "17",
//       "Value": "1/17/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "l",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 17,
//       "Name": "18",
//       "Value": "1/18/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 18,
//       "Name": "19",
//       "Value": "1/19/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 19,
//       "Name": "20",
//       "Value": "1/20/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "w",
//       "Text3": "D",
//       "BackgroundColor": "lightsalmon ",
//       "ForeColur": "red",
//       "IsClickable": false
//   },
//   {
//       "Id": 20,
//       "Name": "21",
//       "Value": "1/21/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "w",
//       "Text3": "D",
//       "BackgroundColor": "lightsalmon ",
//       "ForeColur": "red",
//       "IsClickable": false
//   },
//   {
//       "Id": 21,
//       "Name": "22",
//       "Value": "1/22/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 22,
//       "Name": "23",
//       "Value": "1/23/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 23,
//       "Name": "24",
//       "Value": "1/24/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 24,
//       "Name": "25",
//       "Value": "1/25/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 25,
//       "Name": "26",
//       "Value": "1/26/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "h",
//       "Text3": "B",
//       "BackgroundColor": "lightcoral",
//       "ForeColur": "brown",
//       "IsClickable": false
//   },
//   {
//       "Id": 26,
//       "Name": "27",
//       "Value": "1/27/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "w",
//       "Text3": "D",
//       "BackgroundColor": "lightsalmon ",
//       "ForeColur": "red",
//       "IsClickable": false
//   },
//   {
//       "Id": 27,
//       "Name": "28",
//       "Value": "1/28/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "w",
//       "Text3": "D",
//       "BackgroundColor": "lightsalmon ",
//       "ForeColur": "red",
//       "IsClickable": false
//   },
//   {
//       "Id": 28,
//       "Name": "29",
//       "Value": "1/29/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 29,
//       "Name": "30",
//       "Value": "1/30/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   },
//   {
//       "Id": 30,
//       "Name": "31",
//       "Value": "1/31/2024-undefined-undefined",
//       "IsActive": false,
//       "Text1": "n",
//       "Text3": "X",
//       "BackgroundColor": "plum",
//       "ForeColur": "#a9a9a9",
//       "IsClickable": false
//   }
// ]

  
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
                <Grid item margin={0} padding={0} xs={12} lg={3}>
                <PageHeader heading={'Individual Attendance'} subheading={''} />
                   

                </Grid>

                <Grid sx={{ mt: 2, display: 'flow',  p:0 }} item xs={8} md={5} lg={6}>


                <Dropdown  itemList={StudentList} ClickItem={clickStudent} DefaultValue={StudentId} Label={'SelectStudent'} />
            

                 
                  
                </Grid>

             

                <Grid item xs={1} lg={2}/>
                
          
                <Grid item sx={{ mt: 2 }} xs={3} lg={1}>
                    <Grid container>
                      <Grid item xs={4}md={2} lg={0}/>
                        <Grid item xs={3} lg={3}>
                            <Iconhelp Note={Note} />

                        </Grid>
                        <Grid item xs={1} lg={0}/>
                       <Grid item xs={4} lg={5}>
                        <WebBackButton 
                        icon={<Reply/>}FromRoute={'/Teacher/TAttendance/'} />
                          </Grid>
                   
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
            style={{  backgroundColor: '#ef5350', width:"90px"}}
            onClick={click}
          >
            Close
          </ButtonPrimary>
        
          <ButtonPrimary disabled={!IsClicked}
          color='secondary'
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


