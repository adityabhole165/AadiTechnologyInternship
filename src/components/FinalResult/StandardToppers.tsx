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
import { IGetStandardExamDropdownBodyST, IGetSubjectDropdownBodyST, IGetStandardToppersListBOdyST, IGetStandardDropdownBodyST } from 'src/interfaces/FinalResult/IStandardToppers';
import { StandardDropdownListST, StandardExamListST, StandardSubjectListST, StandardTopperListST } from 'src/requests/FinalResult/RqstandardToppers';

const StandardToppers = () => {
    const RadioList = [{ Value: "1", Name: "Class Toppers" },
    { Value: "2", Name: "Standard Toppers" }]

    const HeaderListST = ["Rank", "Class", "Roll No.", "Student Name", "Marks"];
    const HeaderList1ST = ["Roll No.", "Student Name"];

    const dispatch = useDispatch();
    const { TeacherId } = useParams();
    const [SelectStandardST, setStandardST] = useState(TeacherId);
    const [SelectExamST, setExamST] = useState("0");
    const [SelectSubjectST, setSubjectST] = useState("0");
    const [radioBtnST, setRadioBtnST] = useState();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

    const GetStandarddropdownST = useSelector((state: RootState) => state.StandardToppers.StandardDropdownST);

    const GetExamdropdownST = useSelector((state: RootState) => state.StandardToppers.ExamDropdownListST);

    const GetSubjectdropdownST = useSelector((state: RootState) => state.StandardToppers.SubjectDropdownListST);

    const GetStandardToppersListST = useSelector((state: RootState) => state.StandardToppers.StandardSubjectToppersST);

    const GetSubjectToppersListST = useSelector((state: RootState) => state.StandardToppers.StandardSubjectToppersST);

    useEffect(() => {
        dispatch(StandardDropdownListST(StandardDropdownBodyST))
    }, [TeacherId])
    useEffect(() => {
        dispatch(StandardExamListST(ExamDropdownBodyST))
    }, [SelectStandardST])
    useEffect(() => {
        dispatch(StandardSubjectListST(SujectDropdownBodyST))
    }, [SelectStandardST,SelectExamST])
    useEffect(() => {
        dispatch(StandardTopperListST(StandardToppersBodyST))
    }, [SelectStandardST,SelectExamST, SelectSubjectST])

     useEffect(() => {
        if (GetStandarddropdownST.length > 0)
        setStandardST(GetStandarddropdownST[0].Id)
    }, [GetStandarddropdownST]);

    useEffect(() => {
        if (GetExamdropdownST.length > 0)
        setExamST(GetExamdropdownST[0].Id)
    }, [GetExamdropdownST]);
    
    useEffect(() => {
        if (GetSubjectdropdownST.length > 0)
        setSubjectST(GetSubjectdropdownST[0].Id)
    }, [GetSubjectdropdownST]);

    const StandardDropdownBodyST: IGetStandardDropdownBodyST = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asTeacherId:Number(TeacherId)
    }
    const ExamDropdownBodyST: IGetStandardExamDropdownBodyST = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId:Number(SelectStandardST)
    }
    const SujectDropdownBodyST: IGetSubjectDropdownBodyST = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId:Number(SelectStandardST),
        asExamId:Number(SelectExamST)
    }
    const StandardToppersBodyST: IGetStandardToppersListBOdyST = {
        asSchoolId:asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId:Number(SelectStandardST),
        asExamId:Number(SelectExamST),
        asSubjectId:Number(SelectSubjectST)
    }
    const clickStandardDropdownST = (value) => {
        setStandardST(value)
    }
    const clickExamDropdownST = (value) => {
        setExamST(value)
    }
    const clickSubjectDropdownST = (value) => {
        setSubjectST(value)
    }
    const ClickItemST = () => {

    }

    //

    
    const ClickRadioST = (value) => {
        setRadioBtnST(value);
    }
    return (
        <Container>
            <PageHeader heading='StandardToppers' />
            <RadioButton1 Array={RadioList} ClickRadio={ClickRadioST} defaultValue={radioBtnST} Label={""} />
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                    <Typography margin={'1px'}>
                        <b>Select Standard:</b>
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown Array={GetStandarddropdownST} handleChange={clickStandardDropdownST} defaultValue={SelectStandardST} label={SelectStandardST} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography margin={'1px'}>
                        <b>Select Exam:</b>
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown Array={GetExamdropdownST} handleChange={clickExamDropdownST} defaultValue={SelectExamST} label={SelectExamST} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography margin={'1px'}>
                        <b>Subject:</b>
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Box sx={{ marginRight: "0px", width: '110%', padding: "0.9px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)', border: "1px solid black" }}>
                        <Dropdown Array={GetSubjectdropdownST} handleChange={clickSubjectDropdownST} defaultValue={SelectSubjectST} label={"All"} />
                    </Box>
                </Grid>
                <DynamicList2 HeaderList={HeaderListST} ItemList={GetStandardToppersListST}
                    IconList={[]} ClickItem={ClickItemST} />

                <PageHeader heading=' Subject Toppers' />
                <Grid container>
                    {
                        GetSubjectToppersListST.map((item, i) => {
                            return (<>
                                {!(i % 3) && (
                                    <Grid container item xs={12} justifyContent="center">

                                        {/* <Grid item xl={12} xs={12} key={i} sx={{ flexGrow: 1 }}> */}
                                        {/* <Container> */}
                                        {item.Subject}
                                        {/* </Container> */}
                                    </Grid>
                                )}

                                <Grid item xs={4} xl={4} justifyContent="center">
                                    <Container>
                                        <img src={item.Rank_Image} /> MarKs:{item.Marks}
                                    </Container>
                                    <br></br>
                                    <ToppersList headers={HeaderList1ST}
                                        data={item.Students} />
                                </Grid>

                            </>)
                        })
                    }
                </Grid>

            </Grid>
        </Container>
    )
}
export default StandardToppers