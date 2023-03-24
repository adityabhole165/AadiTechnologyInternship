import { FormControl, Grid, InputLabel, TextField, Paper, Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import Note from 'src/libraries/Note/Note';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import { getIncomeTaxReport } from 'src/requests/IncomeTaxReport/RequestIncomeTax';
import { RootState } from 'src/store';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';
import { getYearList } from 'src/requests/PhotoGallery/PhotoGallery';
import 'src/assets/style/BdayCard.css';


const note = ['1) Gives income tax statement for paid fees'];

function IncomeTaxReport() {
    const dispatch = useDispatch();
    const [acadamicYear, setAcadamicYear] = useState('');
    const [financialYear, setFinancialYear] = useState('');
    const [parentName, setParentName] = useState('');


    const IncomeTaxReport: any = useSelector(
        (state: RootState) => state.IncomeTaxReport.GetIncomeTaxReport);
    console.log("IncomeTaxReport", IncomeTaxReport)

    const YearList: any = useSelector(
        (state: RootState) => state.PhotoGalllary.YearList
    );
    
 
    const StudentName = sessionStorage.getItem("StudentName");
    const Standard = sessionStorage.getItem('Class');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asStudentId = (sessionStorage.getItem('StudentId'));
    const asUserId = sessionStorage.getItem('Id');
    const RoleId = sessionStorage.getItem('RoleId');

    const IncomeTaxBody = {
        "aiSchoolId": Number(asSchoolId),
        "aiAcademicYearId": Number(asAcademicYearId),
        "aiStudentId": Number(asStudentId),
        "aiFinancialYearId": Number(financialYear),
        "aiSelectAcademicYearId": Number(acadamicYear),
        "aiCategoryId": Number(parentName)
    }
  

    useEffect(() => {
        dispatch(getIncomeTaxReport(IncomeTaxBody));
    }, []);


    useEffect(() => {
        const YearBody: IYearList = {
            asSchoolId: asSchoolId,
            asUserId: asUserId,
            asUserRoleId: RoleId
        };
        setAcadamicYear(asAcademicYearId)
        dispatch(getYearList(YearBody));

    }, []);

    const clickAcadamicYear = (value) => {
        setAcadamicYear(value);
        // setFinancialYear("All")
    };


    // const clickFinacialYear = (value) => {
    //     setFinancialYear(value);
    //     setAcadamicYear("All")
    // };

    // const clickParentName = (value) => {
    //     setParentName(value);

    // };
    // useEffect(() => {
    //     new Date().getFullYear();
    //     setFinancialYear("Apr 2022 - Apr 2023");
    //     setAcadamicYear("All");
    //     setParentName("All")
    // }, []);



    // const handleChange = (event) => {
    //     setAcadamicYear(event.target.value);
    // }





    return (
        <>
            <Container>
                <PageHeader heading={'Income Tax Report'} subheading={''} />
                <Note NoteDetail={note} />
                <ListStyle>

                    <TextField 
                        fullWidth
                        variant='standard'
                        size="small"
                        value={StudentName + ' ' + '(' + Standard + ')'}
                        margin="dense" />


                    <FormControl fullWidth>
                        <InputLabel variant="standard">Select Academic Year</InputLabel>
                        <Dropdown
                            Array={YearList}
                            handleChange={clickAcadamicYear}
                            defaultValue={acadamicYear}
                        />
                    </FormControl>

{/* 
                    <FormControl fullWidth sx={{ mt: "2px" }}>
                        <InputLabel variant="standard">Select Financial Year</InputLabel>
                        <Dropdown
                            Array={''}
                            handleChange={''}
                            defaultValue={financialYear}
                        /> */}
                    {/* </FormControl> */}

                    {/* <FormControl fullWidth sx={{ mt: "2px" }}>
                        <InputLabel variant="standard">Select Category</InputLabel>
                        <Dropdown
                            Array={''}
                            handleChange={''}
                            defaultValue={parentName}
                        />
                    </FormControl> */}
                    <br /><br />
                    <ButtonPrimary fullWidth>Display Report</ButtonPrimary>
                </ListStyle>


            </Container>
        </>
    )
}

export default IncomeTaxReport