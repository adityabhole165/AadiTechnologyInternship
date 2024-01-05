import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { IGetClassDropdownBody, IGetexamDropdownBody, IGetClassSubjectDropdownBody, IGetClassToppersListBOdy } from 'src/interfaces/FinalResult/IFinalResultToppers'
import { ClassdropdownList, ClassExamList, ClassSubjectList, ClassTopperList } from 'src/requests/FinalResult/RequestFinalResultToppers'
import { RootState, useDispatch } from 'src/store';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import DynamicList from 'src/libraries/list/DynamicList';
import PageHeader from 'src/libraries/heading/PageHeader';
import TableAttendace from 'src/libraries/ResuableComponents/TableAttendance';

const FinalResultToppers = () => {
    const dispatch = useDispatch();
    const [SelectClass, setClass] = useState();
    const [SelectExam, setExam] = useState("0");
    const [SelectSubject, setSubject] = useState("0");
    const [radioBtn, setRadioBtn] = useState("1");


const RadioList = [{ Value: "1", Name: "Class Toppers" },
  { Value: "2", Name: "Standard Toppers" }]

    const HeaderList = ["Rank","Roll No.", "Student Name","Marks"];

    const HeaderList1 = ["Roll No.", "Student Name"];


    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const StandardDivisionId=Number(sessionStorage.getItem('StandardDivisionId'));
    const GetClassdropdown = useSelector((state: RootState) => state.FinalResultToppers.ClassDropdownList);
    console.log("GetClassdropdown", GetClassdropdown)

    const GetExamdropdown = useSelector((state: RootState) => state.FinalResultToppers.ExamDropdownList);
    console.log("GetExamdropdown", GetExamdropdown)

    const GetSubjectdropdown = useSelector((state: RootState) => state.FinalResultToppers.SubjectDropdownList);
    console.log("GetSubjectdropdown", GetSubjectdropdown)

    const GetToppersList = useSelector((state: RootState) => state.FinalResultToppers.ClassToppers);
    console.log("GetToppersList", GetToppersList)

    const GetSubjectToppersList = useSelector((state: RootState) => state.FinalResultToppers.SubjectToppers);
    console.log("GetToppersList", GetToppersList)


    useEffect(() => {
        dispatch(ClassdropdownList(ClassDropdownBody))
    }, [])
    useEffect(() => {
        dispatch(ClassExamList(ExamDropdownBody))
    }, [SelectClass])
    useEffect(() => {
        dispatch(ClassSubjectList(SujectDropdownBody))
    }, [])
    useEffect(() => {
        dispatch(ClassTopperList(ToppersListBody))
    }, [])
    const ClassDropdownBody: IGetClassDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId
    }
    const ExamDropdownBody: IGetexamDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: SelectClass
    }
    const SujectDropdownBody: IGetClassSubjectDropdownBody = {
        asSchoolId:18,
        asAcademicYearId: 54,
        asStandardDivId: 1270,
        asExamId:609
    }
    const ToppersListBody: IGetClassToppersListBOdy = {
        asSchoolId:18,
        asAcademicYearId: 54,
        asStandardDivId: 1270,
        asExamId:609,
        asSubjectId:2324
    }
    const clickClassDropdown = (value) => {
        setClass(value)
    }
    const clickExamDropdown = (value) => {
        setExam(value)
    }
    const clickSubjectDropdown = (value) => {
        setSubject(value)
    }
    const ClickRadio = (value) => {
        setRadioBtn(value);
        console.log(value)
      }
     
    const ClickItem = () => {
    
    }
    return (
        
        <Container>
            <br></br>
            <br></br>
            <br></br>
            <PageHeader heading='Toppers' />

            <RadioButton1
        Array={RadioList}
        ClickRadio={ClickRadio}
        defaultValue={radioBtn}
        Label={""} />
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                    <Typography margin={'1px'}>
                        <b>Select Class:</b>
                    </Typography>
                </Grid>
        <Grid item xs={6} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown
                            Array={GetClassdropdown}
                            handleChange={clickClassDropdown}
                            defaultValue={SelectClass}
                            label={SelectClass}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography margin={'1px'}>
                        <b>Select Exam:</b>
                    </Typography>
                </Grid>
        <Grid item xs={6} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown
                            Array={GetExamdropdown}
                            handleChange={clickExamDropdown}
                            defaultValue={SelectExam}
                            label={SelectExam}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography margin={'1px'}>
                        <b>Subject:</b>
                    </Typography>
                </Grid>
        <Grid item xs={6} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown
                            Array={GetSubjectdropdown}
                            handleChange={clickSubjectDropdown}
                            defaultValue={SelectSubject}
                            label={SelectSubject}
                        />
                    </Box>
                </Grid>
                
                  <DynamicList2 HeaderList={HeaderList} ItemList={GetToppersList}
                        IconList={[]} ClickItem={ClickItem} />
                        
                        <Container>
                        <TableAttendace ItemList={GetSubjectToppersList} HeaderArray={HeaderList1} />
                        </Container>
                 
                 {/* <DynamicList HeaderList={HeaderList1} ItemList={GetToppersList}
                        IconList={[]} ClickItem={ClickItem} /> */}

                </Grid>
                </Container>
    )
}

export default FinalResultToppers
