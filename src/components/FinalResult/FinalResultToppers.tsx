import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { IGetClassDropdownBody, IGetexamDropdownBody, IGetClassSubjectDropdownBody, IGetClassToppersListBOdy } from 'src/interfaces/FinalResult/IFinalResultToppers'
import { ClassdropdownList, ClassExamList, ClassSubjectList, ClassTopperList } from 'src/requests/FinalResult/RequestFinalResultToppers'
import { RootState, useDispatch } from 'src/store';
import Dropdown from 'src/libraries/dropdown/Dropdown';

const FinalResultToppers = () => {
    const dispatch = useDispatch();
    const [SelectClass, setClass] = useState();
    const [SelectExam, setExam] = useState("0");
    const [SelectSubject, setSubject] = useState("0");


    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

    const GetClassdropdown = useSelector((state: RootState) => state.FinalResultToppers.ClassDropdownList);
    console.log("GetClassdropdown", GetClassdropdown)

    const GetExamdropdown = useSelector((state: RootState) => state.FinalResultToppers.ExamDropdownList);
    console.log("GetExamdropdown", GetExamdropdown)

    const GetSubjectdropdown = useSelector((state: RootState) => state.FinalResultToppers.SubjectDropdownList);
    console.log("GetSubjectdropdown", GetSubjectdropdown)

    const GetToppersList = useSelector((state: RootState) => state.FinalResultToppers.ClassToppers);
    console.log("GetToppersList", GetToppersList)

    useEffect(() => {
        dispatch(ClassdropdownList(ClassDropdownBody))
    }, [])
    useEffect(() => {
        dispatch(ClassExamList(ExamDropdownBody))
    }, [])
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
        asStandardDivisionId: 1266
    }
    const SujectDropdownBody: IGetClassSubjectDropdownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: 1270,
        asExamId: 609
    }
    const ToppersListBody: IGetClassToppersListBOdy = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: 1270,
        asExamId: 609,
        asSubjectId: 2324
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
    return (
        <Container>
            <br></br>
            <br></br>
            <br></br>
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
                </Grid>
                </Container>
    )
}

export default FinalResultToppers
