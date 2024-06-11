

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import QuestionMark from "@mui/icons-material/QuestionMark";
import { Box, Button, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { getDateFormattedDash, isGreaterThanDate } from "src/components/Common/Util";
import CommonPageHeader from "src/components/CommonPageHeader";
import { IAllClassesAndDivisionsBody, SaveHolidayDetailsBody } from "src/interfaces/Common/Holidays";
import Datepicker from "src/libraries/DateSelector/Datepicker";
import ErrorMessage1 from "src/libraries/ErrorMessages/ErrorMessage1";
import SelectListHierarchy from "src/libraries/SelectList/SelectListHierarchy";
import { GetAllClassAndDivision, getSaveHolidays } from "src/requests/Holiday/Holiday";
import { RootState } from "src/store";

const AddHoliday = ({ }) => {
    const navigate = useNavigate();

    const getFormattedDate = (date) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const day = String(date.getDate()).padStart(2, '0');
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        const monthName = monthNames[monthIndex];

        return `${day}-${monthName}-${year}`;
    };


    const dispatch = useDispatch();
    const [ItemList, setitemList] = useState([]);
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const [StartDate, setStartDate] = useState(getFormattedDate(new Date()));
    const [ErrorStartDate, setErrorStartDate] = useState('');
    const [EndDate, setEndDate] = useState(getFormattedDate(new Date()));
    const [ErrorEndDate, setErrorEndDate] = useState('');
    console.log(StartDate, "StartDate");
    const [HolidayTitle, setHolidayTitle] = useState('');
    const [errorHolidayTitle, SetErrorHolidayTitle] = useState('');
    // const [HolidayStartDate, setHolidayStartDate] = useState(getCurrentDate);
    // const [HolidayEndDate, setHolidayEndDate] = useState(getCurrentDate);
    const [ErrorHolidayStartDate, setErrorHolidayStartDate] = useState('');
    const [ErrorHolidayEndDate, setErrorHolidayEndDate] = useState('');
    const [TotalDays, setTotalDays] = useState(1);
    const [Reamrk, setRemark] = useState('');
    const [ErrorClass, setErrorClass] = useState('');

    // const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    // const asSchoolId = localStorage.getItem('localSchoolId');
    const asUserId = Number(localStorage.getItem('UserId'));
    const [asHoliday_Id, setasHoliday_Id] = useState();
    // const [asHolidayName, setasHolidayName] = useState('');
    // const [asRemarks, setasRemarks] = useState('');

    const [asAssociatedStandard, setasAssociatedStandard] = useState('');




    const ClassesAndDivisionss = useSelector(
        (state: RootState) => state.Holidays.AllClassesAndDivisionss
    );
    console.log("ClassesAndDivisionss", ClassesAndDivisionss)

    const ClassesAndDivisionss1 = useSelector(
        (state: RootState) => state.Holidays.AllClassesAndDivisionss1
    );

    console.log("ClassesAndDivisionss1", ClassesAndDivisionss1)

    const SaveHolidays = useSelector(
        (state: RootState) => state.Holidays.SaveHoliday
    )

    console.log("SaveHolidays", SaveHolidays);



    useEffect(() => {
        const start = new Date(StartDate);
        const end = new Date(EndDate);
        const timeDiff = end.getTime() - start.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24) + 1);
        setTotalDays(daysDiff);
    }, [StartDate, EndDate]);

    useEffect(() => {

        const AllClassesAndDivisionBody: IAllClassesAndDivisionsBody = {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId
        };
        dispatch(GetAllClassAndDivision(AllClassesAndDivisionBody));

    }, []);




    const isClassSelected = () => {
        let arr = []
        ItemList.map(item => {
            if (item.IsActive)
                arr.push(item.Id)

        })
        return arr.toString()
    }

    const ClassSelected = isClassSelected()


    // const toUTC = (dateString) => {
    //     const date = new Date(dateString);
    //     return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    // };


    const SaveHolidayBody: SaveHolidayDetailsBody = {

        asHolidayName: HolidayTitle,
        asRemarks: Reamrk,
        asStartDate: StartDate,
        asEndDate: EndDate,
        asSchoolId: asSchoolId,
        asAcademicYearID: asAcademicYearId,
        asInsertedById: asUserId,
        asAssociatedStandard: ClassSelected,
        asHoliday_Id: 0

    }



    useEffect(() => {
        setitemList(ClassesAndDivisionss);
    }, [ClassesAndDivisionss]);

    const ClickChild = (value) => {
        setitemList(value);
    };

    const handleTodayButtonClick = () => {
        onSelectStartDate(new Date());

    };

    const handleClearButtonClick = (value) => {
        setStartDate(value || '');
    };

    const handleTodayButtonClick1 = () => {
        onSelectEndDate(new Date());
    };

    const handleClearButtonClick1 = (value) => {
        setEndDate(value || '');
    };


    const onSelectStartDate = (value) => {
        setStartDate(value);
    };

    const onSelectEndDate = (value) => {
        setEndDate(value);
    };

    const ClickSave = () => {
        let isError = false;
        if (HolidayTitle == '') {
            SetErrorHolidayTitle('Holiday name should not be blank.');
            isError = true;
        } else SetErrorHolidayTitle('')

        if (!isClassSelected()) {
            setErrorClass('At least one class should be associated.');
            isError = true;
        } else setErrorClass('')

        if (StartDate === 'DD MMMM YYYY' || StartDate === '') {
            setErrorStartDate('Please choose a valid start date');
            isError = true;
        } else if (ErrorStartDate != '') {
            isError = true;
        } else setErrorStartDate('')


        if (EndDate == '') {
            setErrorEndDate('Please choose a valid End date.');
            isError = true;
        } else if (ErrorEndDate != '') {
            isError = true;
        } else setErrorEndDate('')

        if (isGreaterThanDate(StartDate, EndDate)) {
            setErrorStartDate('Start Date should be less than end date');
            isError = true;
        } else {
            setErrorStartDate('')
        }

        if (isGreaterThanDate(sessionStorage.getItem("StartDate"), StartDate)) {
            setErrorStartDate('Holiday start date must be within current academic year ' +
                '(i.e between ' + getDateFormattedDash(sessionStorage.getItem("StartDate")) +
                ' and ' + getDateFormattedDash(sessionStorage.getItem("EndDate")) + ')');
            isError = true;
        } else {
            setErrorStartDate('');


            if (isGreaterThanDate(EndDate, sessionStorage.getItem("EndDate"))) {
                setErrorEndDate('Holiday end date must be within current academic year ' +
                    '(i.e between ' + getDateFormattedDash(sessionStorage.getItem("StartDate")) +
                    ' and ' + getDateFormattedDash(sessionStorage.getItem("EndDate")) + ')');
                isError = true;
            } else {
                setErrorEndDate('');
            }


            if (!isError) {
                return; // Prevent form submission if there are validation errors
            }

            if (!isError) {
                dispatch(getSaveHolidays(SaveHolidayBody))

            }

            if (!isError) {
                navigate('/extended-sidebar/Admin/SchoolConfiguration/Holidays');
            }




        }
    }

    const resetForm = () => {



    }

    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'Holidays',
                            path: '/extended-sidebar/Admin/SchoolConfiguration/Holidays',
                        },
                        {
                            title: 'Add Holiday',
                            path: '/extended-sidebar/Admin/SchoolConfiguration/AddHoliday',
                        },
                    ]}
                    rightActions={
                        <Box>
                            <Tooltip title={'Declare a new classwise holiday for your school'}>
                                <IconButton
                                    sx={{
                                        bgcolor: 'grey.500',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'grey.600',
                                        },
                                    }}
                                >
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }
                />
            </Box>
            <Grid container spacing={2}>
                {/* <Grid item xs={6} md={6}>

                    <TextField
                        label={
                            <span>
                                Start Date <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        inputProps={{ type: 'date' }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={StartDate}
                        onChange={(e) => {
                            setStartDate(e.target.value);
                            // console.log('EventStartDate :', e.target.value);
                        }}
                        error={ErrorHolidayStartDate !== ''}
                        helperText={ErrorHolidayStartDate}
                        fullWidth

                    />
                </Grid> */}


                <Grid item xs={6} md={6}>
                    <Datepicker
                        DateValue={StartDate}
                        onDateChange={onSelectStartDate}
                        label={'Start Date'}
                        size={"medium"}
                    />
                    <ErrorMessage1 Error={ErrorStartDate}></ErrorMessage1>

                    <Grid item xs={1}>
                        <IconButton onClick={handleTodayButtonClick}>
                            <CalendarTodayIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={handleClearButtonClick}>
                            <ClearIcon />
                        </IconButton>
                    </Grid>

                </Grid>
                {/* <Grid item xs={6} md={6}>
                    <TextField
                        label={
                            <span>
                                End Date <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        type="text"
                        value={HolidayEndDate}
                        onChange={(e) => {
                            setHolidayEndDate(e.target.value);
                            // console.log('EventEndDate :', e.target.value);
                        }}
                        InputProps={{
                            endAdornment: <CalendarTodayIcon />,

                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        error={ErrorHolidayEndDate !== ''}
                        helperText={ErrorHolidayEndDate}
                        fullWidth
                    />
                </Grid> */}
                <Grid item xs={6} md={6}>
                    <Datepicker
                        DateValue={EndDate}
                        onDateChange={onSelectEndDate}
                        label={'End Date'}
                        size={"medium"}
                    />
                    <ErrorMessage1 Error={ErrorEndDate}></ErrorMessage1>

                    <Grid item xs={1}>
                        <IconButton onClick={handleTodayButtonClick1}>
                            <CalendarTodayIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={handleClearButtonClick1}>
                            <ClearIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12}>
                    <TextField
                        label="Total Days"
                        value={TotalDays}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>


                <Grid xs={6} md={6} item>
                    <TextField
                        label={
                            <span>
                                Name <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        multiline
                        rows={3}
                        value={HolidayTitle}
                        onChange={(e) => {
                            setHolidayTitle(e.target.value);
                        }}
                        error={errorHolidayTitle !== ''}
                        helperText={errorHolidayTitle}
                        fullWidth
                        inputProps={{ maxLength: 50 }}
                        sx={{
                            resize: 'both'
                        }}
                    >
                    </TextField>
                </Grid>


                <Grid xs={6} md={6} item>
                    <TextField
                        label={
                            <span>
                                Remark
                            </span>
                        }
                        multiline
                        rows={3}
                        value={Reamrk}
                        onChange={(e) => {
                            setRemark(e.target.value);
                        }}
                        fullWidth
                    >

                    </TextField>



                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant="h6">
                        Associated Classes <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <SelectListHierarchy
                        ItemList={ItemList}
                        ParentList={ClassesAndDivisionss1}
                        ClickChild={ClickChild}
                    ></SelectListHierarchy>
                    <ErrorMessage1 Error={ErrorClass}></ErrorMessage1>

                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} gap={2} alignItems={"center"}>
                        <Button variant={'contained'} color="success" onClick={ClickSave}>
                            SAVE
                        </Button>
                        <Button variant={'contained'} color="error" onClick={resetForm}>
                            CANCEL
                        </Button>
                    </Stack>
                </Grid>
            </Grid >
        </>
    )
};


export default AddHoliday;


