import React, { useEffect, useState } from 'react'
import { ITeacherDropdownBody, IClassDropDownBody, IGetTeacherSubjectDetailsBody } from 'src/interfaces/AssignHomework/IAssignHomework';
import { TeacherNameList, ClassName, SubjectDetails } from 'src/requests/AssignHomework/RequestAssignHomework';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store';
import DropDown from 'src/libraries/list/DropDown';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Box, Card, Grid, Stack, TextField, InputLabel, selectClasses } from '@mui/material';
import ListCard from 'src/libraries/list/ListCard';
import Card1 from 'src/libraries/mainCard/Card1';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import List2 from 'src/libraries/mainCard/List2';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { Navigate, useNavigate } from 'react-router';
import DotLegend from 'src/libraries/summary/DotLegend';
import { green } from '@mui/material/colors';
import ListEditIcon1 from 'src/libraries/ResuableComponents/ListEditIcon1';
import Assignhomeworklist from 'src/libraries/ResuableComponents/Assignhomeworklist';
const AssignHomework = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [SelectTeacher, setSelectTeacher] = useState(Number(sessionStorage.getItem('TeacherId')));
    const [SelectClass, setSelectClass] = useState(0);
    const [subjectDetailList, setSubjectDetailList] = useState([]);
    const [MySubject, setMySubject] = useState();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asShowHomeworkToClassTeacher = Number(sessionStorage.getItem('ShowHomeworkToClassTeacher'));
    const TeacherId = Number(sessionStorage.getItem('TeacherId'));
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));


    const TeacherList = useSelector((state: RootState) => state.TeacherNameList.TeacherList)
    console.log("TeacherList", TeacherList)
    const ClassList = useSelector((State: RootState) => State.TeacherNameList.ClassList)
    console.log("ClassList", ClassList)
    const SubjectDetailLists: any = useSelector((State: RootState) => State.TeacherNameList.SubjectList)
    console.log("SubjectDetailList", subjectDetailList)

    useEffect(() => {
        setSubjectDetailList(SubjectDetailLists.map((item) => { return { ...item, Icon: <AssignmentTurnedInIcon /> } }))
    }, [SubjectDetailLists])

    //Select Teacher
    useEffect(() => {
        const GetTeacher: ITeacherDropdownBody = {

            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            asShowHomeworkToClassTeacher: asShowHomeworkToClassTeacher,
            aTeacherId: SelectTeacher
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
            setSelectClass(ClassList[0].Id)
    }, [ClassList]);


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

    const clickItem = (value) => {
        navigate('/extended-sidebar/Teacher/TExamschedule')
        value.map((item) => {
            if (item.IsActive) {
                alert(item.Id)
            }
        })
    }

    const onClick = () => {
        navigate('/extended-sidebar/Teacher/TExamschedule')
    }
    console.log(asStandardDivisionId, "--", SelectClass)

    
    return (
        <>
            <h1 style={{ color: 'Black', left: '1%' }}> Assign HomeWork </h1>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                <Grid item xs={12}>
                    {/* <Box style={{ textAlign: 'center', paddingBottom: "40px", position: 'absolute', top: '40%', left: '34%', width: '400px' }}> */}
                    <Box style={{ textAlign: 'center', margin: "10px", display: 'flex',minWidth: '100px' }}>
                        <label style={{ margin: '10px',minWidth: '100px' }}>Select Teacher : </label>
                        <DropDown itemList={TeacherList} ClickItem={clickTeacherDropdown} DefaultValue={SelectTeacher} Label={"Select Teacher:"} /><br></br>

                    </Box>
                </Grid>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                <Grid item xs={12}>

                    <Box style={{ textAlign: 'center', display: 'flex',minWidth: '100px' }}>
                        <label style={{ margin: '12px',minWidth: '100px' }}>Select Class : </label>

                        <DropDown itemList={ClassList} ClickItem={clickClass} DefaultValue={SelectClass} Label={"Select Class:"} />
                    </Box>
                </Grid>
                <br></br>
                <Stack spacing={2} direction="row">
                    <DotLegend text="My Subject" color="secondary" /><br></br>
                    <DotLegend text="My Class Subject" color="info" /><br></br>
                </Stack>
                <br></br>


                <Grid item xs={4}>
                    <Box sx={{ paddingBottom: "3px", }}>
                        <Box style={{ textAlign: 'left', paddingBottom: "40px", width: '400px' }}>

                            <Assignhomeworklist ItemList={subjectDetailList} clickEdit={clickItem} HeaderArray={HeaderOfTable} />

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

           

        </>
    )
}

export default AssignHomework