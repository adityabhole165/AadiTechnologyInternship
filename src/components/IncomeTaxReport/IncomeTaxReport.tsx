import { FormControl, Grid, InputLabel, TextField ,Paper,Box} from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react'
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import Note from 'src/libraries/Note/Note';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';



const note = ['(Gives income tax statement for paid fees)',];
function IncomeTaxReport() {
    const StudentName = sessionStorage.getItem("StudentName");
    const Standard = sessionStorage.getItem('Class');

    const [acadamicYear, setAcadamicYear] = useState('');
    const [financialYear, setFinancialYear] = useState('');
    const [category, setCategory] = useState("");

    const ClickAcademicYear = (value) => {
        setAcadamicYear(value);
        setAcadamicYear("All")
    };
    const ClickFinancialYear = (value) => {
        setFinancialYear(value);
    };
    const ClickCategory = (value) => {
        setCategory(value);
    };

    // useEffect(() => {
    //     new Date().getFullYear();
    //     setCurrentAcadamicYear("Apr 2022 - Apr 2023")
    //   }, []);

    // const handleChange = (event) => {
    //     setAcadamicYear(event.target.value);
    // }

    const UserArray = [

        {
            Name: "Apr 2022 - Apr 2023",
            Id: "2"
        },
        {
            Name: "Apr 2020 - Apr 2021",
            Id: "3"
        },
        {
            Name: "Apr 2019 - Apr 2020",
            Id: "4"
        },
        {
            Name: "Apr 2018 - Apr 2019",
            Id: "5"
        },
        {
            Name: "Apr 2017 - Apr 2018",
            Id: "6"
        },

    ];


    const UserArray1 = [

        {
            Name: "Apr 2022 - Apr 2023",
            Id: "2"
        },
        {
            Name: "Apr 2020 - Apr 2021",
            Id: "3"
        },
        {
            Name: "Apr 2019 - Apr 2020",
            Id: "4"
        },
        {
            Name: "Apr 2018 - Apr 2019",
            Id: "5"
        },
        {
            Name: "Apr 2017 - Apr 2018",
            Id: "6"
        },

    ];

    const UserArray2 = [
        {
            Name: "Father",
            Id: "2"
        },
        {
            Name: "Mother",
            Id: "3"
        },];

    
    return (
        <>
            <Container>
                <PageHeader heading={'Income Tax Report'} subheading={''} />
                <Note NoteDetail={note} />
                <ListStyle>
                <TextField
                    fullWidth
                    variant='standard'
                    label="Name"
                    size="small"
                    value={StudentName}
                    margin="dense" />

                <TextField
                    fullWidth
                    variant='standard'
                    label="Standard"
                    size="small"
                    value={Standard}
                    margin="dense" />

                <FormControl fullWidth>
                    <InputLabel variant="standard">Select Academic Year</InputLabel>
                    <Dropdown
                        Array={UserArray}
                        handleChange={ClickAcademicYear}
                        defaultValue={acadamicYear}
                    />
                </FormControl>
             

                <FormControl fullWidth>
                    <InputLabel variant="standard">Select Financial Year</InputLabel>
                    <Dropdown
                        Array={UserArray1}
                        handleChange={ClickFinancialYear}
                        defaultValue={financialYear}
                    />
                </FormControl>
            
                <FormControl fullWidth>
                    <InputLabel variant="standard">Select Category</InputLabel>
                    <Dropdown
                        Array={UserArray2}
                        handleChange={ClickCategory}
                        defaultValue={category}
                    />
                </FormControl>
                <br /><br />
                <ButtonPrimary fullWidth>Display Report</ButtonPrimary>
                </ListStyle>
              

            </Container>
        </>
    )
}

export default IncomeTaxReport