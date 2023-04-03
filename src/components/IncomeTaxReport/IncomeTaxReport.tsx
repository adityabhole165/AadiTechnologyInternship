import { FormControl, Grid, InputLabel, TextField, Paper, Box,Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import Note from 'src/libraries/Note/Note';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import { getIncomeTaxReport, getAllAcademicYears,resetReciept } from 'src/requests/IncomeTaxReport/RequestIncomeTax';
import { RootState } from 'src/store';
import { GetAllAcademicYearsApiBody } from 'src/interfaces/Student/IIncomeTaxReport';
import { IGetITRFileNameBody } from 'src/interfaces/Student/IIncomeTaxReport'
// import { getYearList } from 'src/requests/Fees/Fees';
// import 'src/assets/style/BdayCard.css';


const note = ['1) Gives income tax statement for paid fees'];

function IncomeTaxReport() {
    const dispatch = useDispatch();
  
    const [financialYear, setFinancialYear] = useState('0');
    const [parentName, setParentName] = useState('0');


    const IncomeTaxReport: any = useSelector(
        (state: RootState) => state.IncomeTaxReport.GetIncomeTaxReport);
    const AcadamicYear: any = useSelector(
        (state: RootState) => state.IncomeTaxReport.YearList
    );
    const AcadamicYear1: any = useSelector(
        (state: RootState) => state.IncomeTaxReport.YearList
    );
    const StudentName = sessionStorage.getItem("StudentName");
    const Standard = sessionStorage.getItem('Class');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asStudentId = (sessionStorage.getItem('StudentId'));
    const asUserId = sessionStorage.getItem('Id');
    const RoleId = sessionStorage.getItem('RoleId');
    const filePath = IncomeTaxReport.replace(/\\/g, '/');
    let sitePathURL = localStorage.getItem('SiteURL');
    let downloadPathOfReceipt = sitePathURL + filePath;

    const [acadamicYear, setAcadamicYear] = useState(asAcademicYearId);
    const GetITRFileNameBody: IGetITRFileNameBody = {
        "aiSchoolId": asSchoolId,
        "aiAcademicYearId": asAcademicYearId,
        "aiStudentId": asStudentId,
        "aiFinancialYearId": financialYear,
        "SelectAcademicYearId": acadamicYear,
        "ITRCategoryId": parentName,
        "aiLoginUserId": asUserId,
    }
    const body1: GetAllAcademicYearsApiBody = {
        aiSchoolId: asSchoolId,
        aiYearwiseStudentId: asStudentId
    };
    useEffect(() => {
        console.log(downloadPathOfReceipt,"downloadPathOfReceipt")
        if (IncomeTaxReport !== "")
          window.open(downloadPathOfReceipt);
        dispatch(resetReciept());
    
      }, [IncomeTaxReport])

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        dispatch(getAllAcademicYears(body1));
    }, []);

    const UserArray2 = [
        {
            Name: "All",
            Id: "0",
            Value: "0"
        },
        {
            Name: "Father",
            Id: "2",
            Value: "2"
        },
        {
            Name: "Mother",
            Id: "3",
            Value: "3"
        },
    ];

    const clickAcadamicYear = (value) => {
        setAcadamicYear(value);
        setFinancialYear("All")
    };


    const clickFinacialYear = (value) => {
        setFinancialYear(value);
        setAcadamicYear("All")
    };

    const clickParentName = (value) => {
        alert(value)
        setParentName(value);

    };

const ClickDisplay=()=>{
    dispatch(getIncomeTaxReport(GetITRFileNameBody));
}








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
                    />

                    <Typography> Select Academic Year</Typography>
                    <FormControl fullWidth>

                        <Dropdown
                            Array={AcadamicYear}
                            handleChange={clickAcadamicYear}
                            defaultValue={acadamicYear}
                        />
                    </FormControl>

                    <Typography> Select Financial Year</Typography>
                    <FormControl fullWidth sx={{ mt: "2px" }}>
                        <Dropdown
                            Array={AcadamicYear1}
                            handleChange={clickFinacialYear}
                            defaultValue={financialYear}
                        />
                    </FormControl>

                    <Typography> Select Category</Typography>
                    <FormControl fullWidth sx={{ mt: "2px" }}>
                        {/* <InputLabel variant="standard">Select Category</InputLabel> */}
                        <Dropdown
                            Array={UserArray2}
                            handleChange={clickParentName}
                            defaultValue={parentName}
                        />
                    </FormControl>
                    <br /><br />
                    <ButtonPrimary fullWidth onClick={ClickDisplay}>Display Report</ButtonPrimary>
                </ListStyle>


            </Container>
        </>
    )
}

export default IncomeTaxReport