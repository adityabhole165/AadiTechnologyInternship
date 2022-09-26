import { TextField, Grid } from '@mui/material'
import Dropdown from '../dropdown/Dropdown'
// import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { useState } from 'react';

const MCForm = ({ AcademicYearList, MonthYearList, clickSearch,
    academicYear, monthYear, clickAcademicYear, clickMonthYear, isSearchClicked }) => {
    const [searchText, setSearchText] = useState('')
    const textOnChange = (e) => {
        setSearchText(e.target.value);
    }
    const clickAY = (value) => {
        academicYear = value
        clickAcademicYear(value)
    }
    const clickMY = (value) => {
        monthYear = value
        clickMonthYear(value)
    }
    const onClick = () => {
        clickSearch(searchText, academicYear, monthYear, !isSearchClicked)
    }
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <TextField id="standard-basic" label="Name / Subject / Message Body :"
                        variant="standard" fullWidth onChange={textOnChange} sx={{ mx: '10px' }}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Dropdown Array={AcademicYearList} handleChange={clickAY}  />
                </Grid>
                <Grid item xs={5}>
                    <Dropdown Array={MonthYearList} handleChange={clickMY}  />
                </Grid>
                <Grid item xs={2}>
                    {/* <ArrowCircleRightRoundedIcon onClick={onClick}></ArrowCircleRightRoundedIcon> */}
                </Grid>
            </Grid>
        </>
    )
}

export default MCForm