import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { IGetClassDropdownBody, IGetexamDropdownBody, IGetClassSubjectDropdownBody, IGetClassToppersListBOdy } from 'src/interfaces/FinalResult/IFinalResultToppers'
import { ClassdropdownList, ClassExamList, ClassSubjectList, ClassTopperList } from 'src/requests/FinalResult/RequestFinalResultToppers'
import { RootState, useDispatch } from 'src/store';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useParams } from 'react-router';
import ToppersList from 'src/libraries/list/ToppersList';

const FinalResultToppers = () => {
    const dispatch = useDispatch();
    const { TeacherId } = useParams();

    const [SelectClass, setClass] = useState();
    const [SelectExam, setExam] = useState( "0");
    const [SelectSubject, setSubject] = useState("0");
    const [radioBtn, setRadioBtn] = useState("1");


    const RadioList = [{ Value: "1", Name: "Class Toppers" },
    { Value: "2", Name: "Standard Toppers" }]

    const HeaderList = ["Rank", "Roll No.", "Student Name", "Marks"];

    const HeaderList1 = ["Roll No.", "Student Name"];


    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const StandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const GetClassdropdown = useSelector((state: RootState) => state.FinalResultToppers.ClassDropdownList);
    console.log("GetClassdropdown", GetClassdropdown)

    const GetExamdropdown = useSelector((state: RootState) => state.FinalResultToppers.ExamDropdownList);
    console.log("GetExamdropdown", GetExamdropdown)

    const GetSubjectdropdown: any = useSelector((state: RootState) => state.FinalResultToppers.SubjectDropdownList);
    console.log("GetSubjectdropdown", GetSubjectdropdown)

    const GetToppersList = useSelector((state: RootState) => state.FinalResultToppers.ClassToppers);
    console.log("GetToppersList", GetToppersList)

    const GetSubjectToppersList = useSelector((state: RootState) => state.FinalResultToppers.SubjectToppers);
    console.log("GetToppersList", GetToppersList)


    useEffect(() => {
        dispatch(ClassdropdownList(ClassDropdownBody))
    }, [TeacherId])

    useEffect(() => {
        dispatch(ClassExamList(ExamDropdownBody))
    }, [SelectClass])

    useEffect(() => {
        dispatch(ClassSubjectList(SujectDropdownBody))
    }, [SelectClass, SelectExam])

    useEffect(() => {
        dispatch(ClassTopperList(ToppersListBody))
    }, [SelectClass, SelectExam, SelectSubject])




    useEffect(() => {
        if (GetExamdropdown.length == 0 &&
            GetSubjectdropdown.length > 0) {
            setExam(GetExamdropdown[0].Value)
            setSubject(GetSubjectdropdown[0].Value)
        }
    }, [GetExamdropdown, GetSubjectdropdown]);


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
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: SelectClass,
        asExamId: Number(SelectExam)
    }
    const ToppersListBody: IGetClassToppersListBOdy = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: SelectClass,
        asExamId: Number(SelectExam),
        asSubjectId: Number(SelectSubject)
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
        if (value === "1") {
            dispatch(ClassdropdownList(ClassDropdownBody))
        }
        else if (value === "2") {
        }
    }

    const ClickItem = () => {

    }
    return (

        <Container>
            <br></br>
            <br></br>
            <br></br>
            <PageHeader heading='Toppers' />
<div>            
    
    <RadioButton1 Array={RadioList} ClickRadio={ClickRadio} defaultValue={radioBtn} Label={""} />
                </div>

            <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                    <Typography margin={'1px'}>
                        <b>Select Class:</b>
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown Array={GetClassdropdown} handleChange={clickClassDropdown}  defaultValue={SelectClass}  label={SelectClass}/>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography margin={'1px'}>
                        <b>Select Exam:</b>
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown  Array={GetExamdropdown}  handleChange={clickExamDropdown}  defaultValue={SelectExam}  label={SelectExam}/>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography margin={'1px'}>
                        <b>Subject:</b>
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown Array={GetSubjectdropdown} handleChange={clickSubjectDropdown} defaultValue={SelectSubject} label={"All"}/>
                    </Box>
                </Grid>

                <DynamicList2 HeaderList={HeaderList} ItemList={GetToppersList}
                    IconList={[]} ClickItem={ClickItem} />
                
                <PageHeader heading=' Subject Toppers' />
                <Container>
                    <ToppersList headers={HeaderList1} data={GetSubjectToppersList} />
                </Container>


            </Grid>
        </Container>
    )
}

export default FinalResultToppers
