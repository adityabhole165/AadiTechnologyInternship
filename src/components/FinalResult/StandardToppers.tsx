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
import { IGetStandardExamDropdownBody, IGetSubjectDropdownBody, IGetStandardToppersListBOdy, IGetStandardDropdownBody } from 'src/interfaces/FinalResult/IStandardToppers';
import { StandardDropdownList, StandardExamList, StandardSubjectList, StandardTopperList } from 'src/requests/FinalResult/RqstandardToppers';

const StandardToppers = () => {
    const RadioList = [{ Value: "1", Name: "Class Toppers" },
    { Value: "2", Name: "Standard Toppers" }]

    const HeaderList = ["Rank", "Class", "Roll No.", "Student Name", "Marks"];
    const HeaderList1 = ["Roll No.", "Student Name"];

    const dispatch = useDispatch();
    const { TeacherId } = useParams();
    const [SelectStandard, setStandard] = useState(TeacherId);
    const [SelectExam, setExam] = useState("0");
    const [SelectSubject, setSubject] = useState("0");
    const [radioBtn, setRadioBtn] = useState("2");


    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

    const GetStandarddropdown = useSelector((state: RootState) => state.StandardToppers.StandardDropdown);
    console.log("GetStandarddropdown------", GetStandarddropdown)

    const GetExamdropdown = useSelector((state: RootState) => state.StandardToppers.ExamDropdownList);

    const GetSubjectdropdown: any = useSelector((state: RootState) => state.StandardToppers.SubjectDropdownList);

    const GetStandardToppersList = useSelector((state: RootState) => state.StandardToppers.StandardToppers);

    const GetSubjectToppersList = useSelector((state: RootState) => state.StandardToppers.StandardSubjectToppers);

    useEffect(() => {
        dispatch(StandardDropdownList(StandardDropdownBody))
    }, [TeacherId])

    useEffect(() => {
        dispatch(StandardExamList(ExamDropdownBody))
    }, [SelectStandard])

    useEffect(() => {
        dispatch(StandardSubjectList(SujectDropdownBody))
    }, [SelectExam])
    useEffect(() => {
        dispatch(StandardTopperList(StandardToppersBody))
    }, [SelectStandard,SelectExam, SelectSubject])

    useEffect(() => {
        if (
            GetStandarddropdown.length==0&&
            GetExamdropdown.length == 0 &&
            GetSubjectdropdown.length > 0) {
            setStandard(GetStandarddropdown[0].value)
            setExam(GetExamdropdown[0].Value)
            setSubject(GetSubjectdropdown[0].Value)
        }
    }, [GetStandarddropdown,GetExamdropdown, GetSubjectdropdown]);

    const StandardDropdownBody: IGetStandardDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asTeacherId:Number(TeacherId)
    }

    const ExamDropdownBody: IGetStandardExamDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId:Number(SelectStandard)
    }
    const SujectDropdownBody: IGetSubjectDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: Number(SelectStandard),
        asExamId: Number(SelectExam)
    }
    const StandardToppersBody: IGetStandardToppersListBOdy = {
        asSchoolId: 18,
        asAcademicYearId: 54,
        asStandardId: 1066,
        asExamId: 609,
        asSubjectId: 2324
    }
    const clickStandardDropdown = (value) => {
        setStandard(value)
    }
    const clickExamDropdown = (value) => {
        setExam(value)
    }
    const clickSubjectDropdown = (value) => {
        setSubject(value)
    }
    const ClickItem = () => {

    }
    const ClickRadio = (value) => {
        setRadioBtn(value);
    }
    return (
        <Container>
            <PageHeader heading='StandardToppers' />
            <RadioButton1 Array={RadioList} ClickRadio={ClickRadio} defaultValue={radioBtn} Label={""} />
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                    <Typography margin={'1px'}>
                        <b>Select Standard:</b>
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown Array={GetStandarddropdown} handleChange={clickStandardDropdown} defaultValue={SelectStandard} label={SelectStandard} />
                    </Box>
                </Grid>
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