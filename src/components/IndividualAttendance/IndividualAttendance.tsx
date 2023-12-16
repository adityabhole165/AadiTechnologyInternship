import React from 'react'
import { Box, Container, Grid } from '@mui/material';
import { useState } from 'react'
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import Icon6 from 'src/libraries/icon/icon6';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, } from 'react';
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
import BackButton from 'src/libraries/button/BackButton';
import WebBackButton from 'src/libraries/button/WebBackButton';

const IndividualAttendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [IsPresentAbsent, setIsPresentAbsent] = useState(0)
  const [date, setDate] = useState(new Date());
  const formattedDate = ` ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
  const Note: string = 'Mark  Attendence of Only  individual Student.';
  const [IsClicked, setIsClicked] = useState(false)
  const HeaderPublish = [
    { Id: 1, Header: "Sun" }, { Id: 2, Header: "Mon" }, { Id: 3, Header: "Tue" }
    , { Id: 4, Header: "Wed" }
    , { Id: 5, Header: "Thu" },
    { Id: 6, Header: "Fri" },
    { Id: 7, Header: "Sat" },

  ]


  const StudentList = useSelector((state: RootState) => state.IndividualAttendance.GetStudentName);
  const CalendarForStudent = useSelector((state: RootState) => state.IndividualAttendance.GetCalendarForStudent);
  const SaveAttendanceforStudent = useSelector((state: RootState) => state.IndividualAttendance.SaveStudentAttendance);

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
  console.log(ItemList, " setItemList");

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
    <Container maxWidth={'xl'}>
      <Box sx={{ float: "right" }}>
        <Icon6 Note={Note} />
      </Box>
      <PageHeader heading={'Individual Attandance'} subheading={''} />
      <br></br>

      <WebBackButton FromRoute={'/Teacher/TAttendance/'} />

        <Grid container>
      
        <Grid item xs={2} sm={4} />
        <Grid item xs={8} sm={4}>
          <Dropdown itemList={StudentList} ClickItem={clickStudent} DefaultValue={StudentId} Label={'SelectStudent'} />
          </Grid>
          </Grid>
          <br></br>
          <CardToggle1 ItemList={itemlist2} clickToggle={clickTogle} defaultvalue={IsPresentAbsent} />
          <br></br>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          </Box>
          <Grid container>
            <Grid item xs={6}>
              <DotLegendTeacher color="primary" text="Present" />
              <DotLegendTeacher color="error" text="Absent" />
              <DotLegendTeacher color="success" text="Holiday" />
              <DotLegendTeacher color="secondary" text="Weekend" />
            </Grid>
            <Grid item xs={6}>
              <DotLegendTeacher color="warning" text="OutSideAcadamicYear" />
              <DotLegendTeacher color="info" text="LateJoin" />
              <DotLegendTeacher color="" text="NotAvailabel" />
            </Grid>
          </Grid>
          <br></br>
          <CardCalenderList ItemList={ItemList}
            ClickItem={ClickItem}
            handlePrevMonth={handlePrevMonth} handleNextMonth={handleNextMonth}
            formattedDate={formattedDate} DefaultValue={DefaultValue} ArrayList={HeaderPublish} />
          <br></br>
          <div style={{ textAlign: 'center' }}>
            <ButtonPrimary
              style={{  backgroundColor: '#ef5350'}}
              onClick={click}
            >
              Close
            </ButtonPrimary>
          
            <ButtonPrimary disabled={!IsClicked}
              onClick={SaveFile} sx={{ml:"3px"}}
            >
              Save
            </ButtonPrimary>
          </div>
        </Container>
        )
}
        export default IndividualAttendance


