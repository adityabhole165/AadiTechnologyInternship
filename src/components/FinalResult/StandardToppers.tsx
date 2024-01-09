import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState, useDispatch } from 'src/store';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import RadioButton1 from 'src/libraries/RadioButton/RadioButton1';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useParams } from 'react-router';
import ToppersList from 'src/libraries/list/ToppersList';
import { IGetStandardExamDropdownBody, IGetSubjectDropdownBody ,IGetStandardToppersListBOdy} from 'src/interfaces/FinalResult/IStandardToppers';
import { StandardExamList, StandardSubjectList ,StandardTopperList} from 'src/requests/FinalResult/RqstandardToppers';

const StandardToppers = () => {

    const HeaderList = ["Rank","Class", "Roll No.", "Student Name", "Marks"];
    const HeaderList1 = ["Roll No.", "Student Name"];

    const dispatch = useDispatch();
    const { TeacherId } = useParams();
    const [SelectExam, setExam] = useState("0");
    const [SelectSubject, setSubject] = useState("0");

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

    const GetExamdropdown = useSelector((state: RootState) => state.StandardToppers.ExamDropdownList);
    console.log("GetExamdropdown", GetExamdropdown)

    const GetSubjectdropdown: any = useSelector((state: RootState) => state.StandardToppers.SubjectDropdownList);
    console.log("GetSubjectdropdown", GetSubjectdropdown)

    const GetStandardToppersList = useSelector((state: RootState) => state.StandardToppers.StandardToppers);
    console.log("GetStandardToppersList", GetStandardToppersList)

    const GetSubjectToppersList = useSelector((state: RootState) => state.StandardToppers.StandardSubjectToppers);
    console.log("GetSubjectToppersList", GetSubjectToppersList)


    useEffect(() => {
        dispatch(StandardExamList(ExamDropdownBody))
    }, [])

    useEffect(() => {
        dispatch(StandardSubjectList(SujectDropdownBody))
    }, [SelectExam])
    useEffect(() => {
        dispatch(StandardTopperList(StandardToppersBody))
    }, [SelectExam,SelectSubject])

    useEffect(() => {
        if (
            GetExamdropdown.length == 0 &&
            GetSubjectdropdown.length > 0) {
            setExam(GetExamdropdown[0].Value)
            setSubject(GetSubjectdropdown[0].Value)
        }
    }, [ GetExamdropdown, GetSubjectdropdown]);


    const ExamDropdownBody: IGetStandardExamDropdownBody = {
        asSchoolId: 18,
        asAcademicYearId: 41,
        asStandardId: 902
    }
    const SujectDropdownBody: IGetSubjectDropdownBody = {
        asSchoolId: 18,
        asAcademicYearId: 54,
        asStandardDivId: 1270,
        asExamId: 609
    }
const StandardToppersBody:IGetStandardToppersListBOdy={
    asSchoolId:18,
    asAcademicYearId:54,
    asStandardId:1066,
    asExamId:609,
    asSubjectId:2324
}

    const clickExamDropdown = (value) => {
        setExam(value)
    }
    const clickSubjectDropdown = (value) => {
        setSubject(value)
    }
    const ClickItem = () => {

    }
    return (
        <Container>
            <PageHeader heading='StandardToppers' />
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                    <Typography margin={'1px'}>
                        <b>Select Exam:</b>
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown Array={GetExamdropdown} handleChange={clickExamDropdown} defaultValue={SelectExam} label={SelectExam} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography margin={'1px'}>
                        <b>Subject:</b>
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown Array={GetSubjectdropdown} handleChange={clickSubjectDropdown} defaultValue={SelectSubject} label={"All"} />
                    </Box>
                </Grid>
                <DynamicList2 HeaderList={HeaderList} ItemList={GetStandardToppersList}
                    IconList={[]} ClickItem={ClickItem} />
                
                <PageHeader heading=' Subject Toppers' />
                <Container>
                    <ToppersList headers={HeaderList1} data={GetSubjectToppersList} />
                </Container>

            </Grid>
        </Container>
    )
}
export default StandardToppers