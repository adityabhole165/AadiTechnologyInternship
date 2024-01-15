import React, { useEffect, useState } from 'react'
import { ITeacherDropdownBody, IClassDropDownBody, IGetTeacherSubjectDetailsBody,IClassTeacherDropdownBody } from 'src/interfaces/AssignHomework/IAssignHomework';
import { TeacherNameList, ClassName, SubjectDetails,FullTeacherName } from 'src/requests/AssignHomework/RequestAssignHomework';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store';
import DropDown from 'src/libraries/list/DropDown';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Box, Card, Grid, Typography,Stack, TextField, InputLabel, selectClasses, Container } from '@mui/material';
import ListCard from 'src/libraries/list/ListCard';
import Card1 from 'src/libraries/mainCard/Card1';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import List2 from 'src/libraries/mainCard/List2';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { Navigate, useNavigate, useParams } from 'react-router';
import DotLegend from 'src/libraries/summary/DotLegend';
import { green } from '@mui/material/colors';
import ListEditIcon1 from 'src/libraries/ResuableComponents/ListEditIcon1';
import Assignhomeworklist from 'src/libraries/ResuableComponents/Assignhomeworklist';


const AssignHomework = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const{Id} = useParams();
    

    const [SelectTeacher, setSelectTeacher] = useState( Number(sessionStorage.getItem('TeacherId')));
    const [SelectClass, setSelectClass] = useState(0);
    const [subjectDetailList, setSubjectDetailList] = useState([]);
    const [MySubject, setMySubject] = useState();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asShowHomeworkToClassTeacher = Number(sessionStorage.getItem('ShowHomeworkToClassTeacher'));
    const TeacherId = Number(sessionStorage.getItem('TeacherId'));
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const ScreensAccessPermission = JSON.parse(sessionStorage.getItem('ScreensAccessPermission'));

console.log("ScreensAccessPermission",ScreensAccessPermission)

const GetScreenPermission=()=>{
    let perm = "N"
    ScreensAccessPermission.map((item)=>{
        if(item.ScreenName==="Assign Homework") 
        perm = item.IsFullAccess
    })
    return perm;
}
    const TeacherList :any  = useSelector((state: RootState) => state.TeacherNameList.TeacherList)
    console.log("TeacherList", TeacherList)
    const ClassList = useSelector((State: RootState) => State.TeacherNameList.ClassList)
    console.log("ClassList", ClassList)
    const SubjectDetailLists :any = useSelector((State: RootState) => State.TeacherNameList.SubjectList)
    console.log("SubjectDetailList", subjectDetailList)

    const FullAccessTeacher :any = useSelector((State: RootState) => State.TeacherNameList.ClassTeacherList)
    console.log("FullAccessTeacher", FullAccessTeacher)

    useEffect(() => {
        setSubjectDetailList(SubjectDetailLists.map((item) => { return { ...item, Icon: <AssignmentTurnedInIcon /> } }))
    }, [SubjectDetailLists])

    //Select Teacher
    useEffect(() => {
        const GetTeacher: ITeacherDropdownBody = {

            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            asShowHomeworkToClassTeacher: asShowHomeworkToClassTeacher,
            aTeacherId: (GetScreenPermission()=="Y"?0:SelectTeacher)
        }
        dispatch(TeacherNameList(GetTeacher))
    }, []);
    // useEffect(()=>{
    //     if(TeacherList.length >= 0)
    //     setSelectTeacher(TeacherList[0].Value)
    //     },[TeacherList])

    //class
    useEffect(() => {
        const GetClassD: IClassDropDownBody = {

            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            aTeacherId: SelectTeacher
        }

        dispatch(ClassName(GetClassD))
    }, [SelectTeacher]);

    useEffect(() => {
        if (ClassList.length > 0)
            setSelectClass(ClassList[1].Id)
    }, [ClassList]);

    useEffect(() => {
        const fullClassTeacherBody: IClassTeacherDropdownBody = {
    
            asSchoolId:asSchoolId ,
            asAcademicYearID:asAcademicYearId 
        }
        dispatch(FullTeacherName(fullClassTeacherBody))
      }, []);


    const HeaderOfTable = [
        { Id: 1, Header: "Class" },
        { Id: 2, Header: "Subject" },
        { Id: 3, Header: "Assign" }


    ]



    //subjectList
    useEffect(() => {
        const TeacherSubject: IGetTeacherSubjectDetailsBody = {

            asSchoolId: asSchoolId,
            aTeacherId: SelectTeacher,
            asAcademicYearId: asAcademicYearId,
            asStandardDivisionId: SelectClass

        }
        dispatch(SubjectDetails(TeacherSubject))
    }, [SelectTeacher, SelectClass]);

 

    const clickTeacherDropdown = (value) => {
        setSelectTeacher(value)
    }

    const clickClass = (value) => {
        setSelectClass(value)
    }

    const getClassName = () => {
        let className = ""
        ClassList.map((item)=>{
            if(item.Value == SelectClass)
            className = item.Name
        })
        
    return className;
    }
    const getClassTeacherName = () => {
        let classTeacherName = ""
        TeacherList.map((item)=>{
            if(item.Value == SelectTeacher)
            classTeacherName = item.Name
        })
        
    return classTeacherName;
    }
    const getSubjectName = () => {
        let getSubjectName = ""
        SubjectDetailLists.map((item)=>{
            if(item.Value == Id)
            getSubjectName = item.Text2
        })
        
    return getSubjectName;
    }

    const clickItem1 = (value) => {
        navigate('/extended-sidebar/Teacher/AddHomework'+'/'+SelectClass+'/'+getClassName()+'/'+SelectTeacher+'/'+getClassTeacherName()+'/'+getSubjectName())
        
    }

    const clickItem = (value) => {
        navigate('/extended-sidebar/Teacher/TExamschedule')
        // value.map((item) => {
        //     if (item.IsActive) {
        //         alert(item.Id)
        //     }
        // })
    }

    const onClick = () => {
        navigate('/extended-sidebar/Teacher/AddDailyLog/'+SelectClass+'/'+getClassName())
    }
    console.log(asStandardDivisionId, "--", SelectClass)

    
    return (
        <>
        <Container maxWidth={'xl'}>
           <PageHeader heading={"Assign Homework"}/>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>

            <Grid container spacing={2} justifyContent="center" alignItems="center">
  <Grid item xs={1}>
    <Typography margin={'5px'}>
      <b>Select Teacher:</b>
    </Typography>
  </Grid>
  <Grid item xs={2} >
    {/* {GetScreenPermission()=="Y"?
    <DropDown itemList={FullAccessTeacher} ClickItem={clickTeacherDropdown} DefaultValue={SelectTeacher} Label={"Select Teacher:"}/>:
    sessionStorage.getItem("StudentName")
    } */}
      <DropDown itemList={TeacherList} ClickItem={clickTeacherDropdown} DefaultValue={SelectTeacher} Label={"Select Teacher:"}/> 
   <br></br>
    <br></br>
  </Grid>
  <Grid item xs={1}>
    <Typography >
    <b>Select Class :</b>
    </Typography>
  </Grid>
  
  <Grid item xs={2}>
  <DropDown itemList={ClassList} ClickItem={clickClass} DefaultValue={SelectClass} Label={"Select Class:"} />

    <br></br>
  </Grid>
 
</Grid>
 
<br></br>
                <br></br>
                <Stack spacing={2} direction="row">
                    <DotLegend text="My Subject" color="secondary"  /><br></br>
                    <DotLegend text="My Class Subject" color="info" /><br></br>
                </Stack>
                <br></br>


    <h3>Subject List</h3>

                <Grid item xs={4}>
                    <Box sx={{ paddingBottom: "3px", }}>
                        <Box style={{ textAlign: 'left', paddingBottom: "40px", width: '400px' }}>

                            <Assignhomeworklist ItemList={subjectDetailList} clickAssign={clickItem1} HeaderArray={HeaderOfTable} />

                        </Box>
                    </Box>
                </Grid>

                {(asStandardDivisionId == SelectClass) && (
                <div>
                    <ButtonPrimary onClick={onClick} variant="contained">
                        ADD DAILY LOG
                    </ButtonPrimary>
                </div>)
            }
            </div>

           
            </Container>
        </>
    )
}

export default AssignHomework