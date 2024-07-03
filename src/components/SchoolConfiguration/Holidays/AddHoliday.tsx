

import QuestionMark from "@mui/icons-material/QuestionMark";
import Save from '@mui/icons-material/Save';
import { Box, Button, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { green } from '@mui/material/colors';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router';
import { toast } from "react-toastify";
import { formatDateAsDDMMMYYYY, getCalendarDateFormatDate, isLessThanDate, isOutsideAcademicYear } from 'src/components/Common/Util';
import CommonPageHeader from "src/components/CommonPageHeader";
import { EditHolidayDetailsBody, IAllClassesAndDivisionsBody, IGetNameAndStartDateEndDateValidationBody, SaveHolidayDetailsBody } from "src/interfaces/Common/Holidays";
import Datepicker from "src/libraries/DateSelector/Datepicker";
import ErrorMessage1 from "src/libraries/ErrorMessages/ErrorMessage1";
import SelectListHierarchy from "src/libraries/SelectList/SelectListHierarchy";
import { GetAllClassAndDivision, NameAndStartDateEndDateValidations, getEditHolidayDetails, getSaveHolidays, resetEditHolidayDetails } from "src/requests/Holiday/Holiday";
import { RootState } from "src/store";

const AddHoliday = ({ }) => {
    const { Holiday_Id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ItemList, setitemList] = useState([]);
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const [StartDate, setStartDate]: any = useState(new Date());
    const [ErrorStartDate, setErrorStartDate] = useState('');
    const [EndDate, setEndDate]: any = useState(new Date());
    //const [EndDate, setEndDate]: any = useState(new Date().toISOString().split('T')[0]);
    const [ErrorEndDate, setErrorEndDate] = useState('');
    const [HolidayTitle, setHolidayTitle] = useState('');
    const [errorHolidayTitle, SetErrorHolidayTitle] = useState('')
    const [errorHolidayTitle1, SetErrorHolidayTitle1] = useState('')
    const [ErrorStartDateblank, setErrorStartDateblank] = useState('');
    const [ErrorEndDateblank, setErrorEndDateblank] = useState('');
    const [TotalDays, setTotalDays] = useState(1);
    const [Reamrk, setRemark] = useState('');
    const [Reamrk1, setRemarkError] = useState('');
    const [ErrorClass, setErrorClass] = useState('');
    const [ErrorEndDate1, setErrorEndDate1] = useState('');
    const [ErrorEndDate2, setErrorEndDate2] = useState('');
    const [ErrorStartDate2, setErrorStartDate2] = useState('');
    const asUserId = Number(localStorage.getItem('UserId'));
    const [asHoliday_Id, setasHoliday_Id] = useState();
    const [associatedStandard, setAssociatedStandard] = useState("");
    const ClassesAndDivisionss = useSelector((state: RootState) => state.Holidays.AllClassesAndDivisionss);
    const ClassesAndDivisionss1 = useSelector((state: RootState) => state.Holidays.AllClassesAndDivisionss1);
    const SaveHolidays = useSelector((state: RootState) => state.Holidays.SaveHoliday)
    const DuplicateHolidayNameCount: any = useSelector((state: RootState) => state.Holidays.IHolidayDuplicateNameValidationCount)
    const Editholiday: any = useSelector((state: RootState) => state.Holidays.EditHolidayDetails);
    const PredefinedStartDateAndEndDateCount: any = useSelector((state: RootState) => state.Holidays.IHolidayStartAndEndDatePredefinedValidationCount)
    const filteredItems = DuplicateHolidayNameCount.filter(item => item.DuplicateHolidayNameCount);
    const result = filteredItems.length > 0 ? filteredItems[0] : null;
    const filteredItems1 = PredefinedStartDateAndEndDateCount.filter(item => item.PredefinedStartDateAndEndDateCount);
    const result1 = filteredItems1.length > 0 ? filteredItems1[0] : null;

    useEffect(() => {
        const start = new Date(StartDate);
        const end = new Date(EndDate);
        const timeDiff = end.getTime() - start.getTime();
        let daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24) + 1);

        if (daysDiff < 0) {
            daysDiff = 0;
        }

        setTotalDays(daysDiff);
    }, [StartDate, EndDate]);

    const isClassSelected = () => {
        let arr = []
        ItemList.map(item => {
            if (item.IsActive)
                arr.push(item.Id)


        })

        return arr.toString()
    }

    const ClassSelected = isClassSelected()

    useEffect(() => {

        if (Holiday_Id != undefined) {
            const EditHolidayBody: EditHolidayDetailsBody = {
                asHoliday_Id: Number(Holiday_Id),
                asSchoolId: Number(asSchoolId),
                asAcademicYearID: Number(asAcademicYearId)
            }
            dispatch(getEditHolidayDetails(EditHolidayBody))
        }
        else {
            dispatch(resetEditHolidayDetails())
        }

    }, [])

    useEffect(() => {
        if (Holiday_Id != undefined && Editholiday.length > 0 && Editholiday[0] != null) {
            const holiday = Editholiday[0];
            setStartDate(getCalendarDateFormatDate(holiday.Holiday_Start_Date));
            setEndDate(getCalendarDateFormatDate(holiday.Holiday_End_Date));
            setHolidayTitle(holiday.Holiday_Name);
            setRemark(holiday.Remarks);
            setAssociatedStandard(holiday.AssociatedStandard);
        }
        const AllClassesAndDivisionBody: IAllClassesAndDivisionsBody = {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            associatedStandard: (Holiday_Id == undefined || Editholiday.length == 0) ? [] : Editholiday[0].AssociatedStandard
        };
        dispatch(GetAllClassAndDivision(AllClassesAndDivisionBody));
    }, [Editholiday]);

    const SaveHolidayBody: SaveHolidayDetailsBody = {

        asHolidayName: HolidayTitle,
        asRemarks: Reamrk,
        asStartDate: StartDate,
        asEndDate: EndDate,
        asSchoolId: asSchoolId,
        asAcademicYearID: asAcademicYearId,
        asInsertedById: asUserId,
        asAssociatedStandard: ClassSelected,
        asHoliday_Id: Number(Holiday_Id ? Holiday_Id : 0),

    }

    useEffect(() => {
        const NameAndStartDateValidationBody: IGetNameAndStartDateEndDateValidationBody = {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            asStandardDivIds: ClassSelected,
            asHolidayId: Number(Holiday_Id ? Holiday_Id : 0),
            asHolidayName: HolidayTitle,
            asHolidayStartDate: StartDate,
            asHolidayEndDate: EndDate
        }
        dispatch(NameAndStartDateEndDateValidations(NameAndStartDateValidationBody));

    }, [ClassSelected, StartDate, EndDate, HolidayTitle])


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
        setTotalDays(1);
    };

    const handleClearButtonClick1 = (value) => {
        setEndDate(value || '');
        setTotalDays(0);

    };
    const onSelectStartDate = (value) => {
        setStartDate(value);
    };

    const onSelectEndDate = (value) => {
        setEndDate(value);
    };

    const ClickSave = () => {
        let isError = false;
        let dateError = false;
        if (HolidayTitle == '') {
            SetErrorHolidayTitle('Holiday name should not be blank.');
            isError = true;
        } else SetErrorHolidayTitle('')

        if (!isClassSelected()) {
            setErrorClass('At least one class should be associated.');
            isError = true;
        } else setErrorClass('')

        if (StartDate === '') {
            setErrorStartDate2('Please choose a valid start date.');
            dateError = true
            isError = true;
        } else setErrorStartDate2('')

        if (StartDate === null) {
            setErrorStartDateblank('Start Date should not be blank.');
            dateError = true
            isError = true;
        } else setErrorStartDateblank('')


        if (EndDate == '') {
            setErrorEndDate('Please choose a valid End date.');
            dateError = true
            isError = true;
        } else setErrorEndDate('')

        if (EndDate == null) {
            setErrorEndDateblank('End Date should not be blank.');
            dateError = true
            isError = true;
        } else setErrorEndDateblank('')

        if (dateError == false) {
            if (isOutsideAcademicYear(StartDate)) {
                setErrorStartDate('Holiday end date must be within current academic year (i.e between ' +
                    formatDateAsDDMMMYYYY(sessionStorage.getItem('StartDate')) + ' and ' +
                    formatDateAsDDMMMYYYY(sessionStorage.getItem('EndDate')) + ').');
                dateError = true
                isError = true;
            } else setErrorStartDate('')

            if (isOutsideAcademicYear(EndDate)) {
                setErrorEndDate('Holiday end date must be within current academic year (i.e between ' +
                    formatDateAsDDMMMYYYY(sessionStorage.getItem('StartDate')) + ' and ' +
                    formatDateAsDDMMMYYYY(sessionStorage.getItem('EndDate')) + ').');
                dateError = true
                isError = true;
            } else {
                setErrorEndDate('')
            }

        }

        if (isLessThanDate(EndDate, StartDate)) {
            setErrorEndDate1('End date should not be less than start date.');
            dateError = true
            isError = true;
        } else setErrorEndDate1('')
        if (result1.PredefinedStartDateAndEndDateCount !== "0" && dateError == false) {
            setErrorEndDate2('Holiday already defined.');
            isError = true;
        } else setErrorEndDate2('')

        if (Reamrk.length > 200) {
            setRemarkError('Remark should be less than 200 characters.');
            isError = true;
        } else setRemarkError('')
        if (result.DuplicateHolidayNameCount !== "0") {
            SetErrorHolidayTitle1('Holiday name already exists.');
            isError = true;
        } else SetErrorHolidayTitle1('')

        if (!isError) {
            dispatch(getSaveHolidays(SaveHolidayBody));
            if (Holiday_Id) {
                toast.success("Holiday details updated successfully.");
            } else {
                toast.success("Holiday details saved successfully.");
            }
            navigate('/extended-sidebar/Admin/SchoolConfiguration/Holidays');
        }

    };





    // const ClickSave = () => {
    //     let isError = false;

    //     if (HolidayTitle == '') {
    //         SetErrorHolidayTitle('Holiday name should not be blank.');
    //         isError = true;
    //     } else SetErrorHolidayTitle('')

    //     if (!isClassSelected()) {
    //         setErrorClass('At least one class should be associated.');
    //         isError = true;
    //     } else setErrorClass('')

    //     if (StartDate === 'DDMMMMYYYY' || StartDate === '') {
    //         setErrorStartDate2('Please choose a valid start date.');
    //         isError = true;
    //     } else if (ErrorStartDate2 != '') {
    //         isError = true;
    //     } else setErrorStartDate2('')


    //     if (EndDate == '') {
    //         setErrorEndDate('Please choose a valid End date.');
    //         isError = true;
    //     } else if (ErrorEndDate != '') {
    //         isError = true;
    //     } else setErrorEndDate('')


    //     if (isOutsideAcademicYear(StartDate)) {

    //         setErrorStartDate('Holiday end date must be within current academic year (i.e between ' +
    //             formatDateAsDDMMMYYYY(sessionStorage.getItem('StartDate')) + ' and ' +
    //             formatDateAsDDMMMYYYY(sessionStorage.getItem('EndDate')) + ').');
    //         isError = true;
    //     }

    //     if (isOutsideAcademicYear(EndDate)) {
    //         setErrorEndDate('Holiday end date must be within current academic year (i.e between ' +
    //             formatDateAsDDMMMYYYY(sessionStorage.getItem('StartDate')) + ' and ' +
    //             formatDateAsDDMMMYYYY(sessionStorage.getItem('EndDate')) + ').');
    //         isError = true;
    //     }
    //     if (isLessThanDate(EndDate, StartDate)) {
    //         setErrorEndDate1('End date should not be less than start date.');

    //         isError = true;
    //     }

    //     if (Reamrk.length > 200) {
    //         setRemarkError('Remark should be less than 200 characters.');
    //         isError = true;
    //     }
    //     if (result.DuplicateHolidayNameCount !== "0") {
    //         SetErrorHolidayTitle('Holiday name already exists.');
    //         isError = true;
    //     }

    //     if (result1.PredefinedStartDateAndEndDateCount !== "0") {
    //         setErrorEndDate2('Holiday already defined.');
    //         isError = true;
    //     }

    //     if (!isError) {
    //         dispatch(getSaveHolidays(SaveHolidayBody))
    //         toast.success("Holiday details saved successfully.");
    //         navigate('/extended-sidebar/Admin/SchoolConfiguration/Holidays');

    //     }
    // }



    const resetForm = () => {
        navigate('/extended-sidebar/Admin/SchoolConfiguration/Holidays')
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
                        Holiday_Id ?
                            {
                                title: 'Edit Holiday',
                                path: '/extended-sidebar/Admin/SchoolConfiguration/EditHoliday/',
                            } :
                            {
                                title: 'Add Holiday',
                                path: '/extended-sidebar/Admin/SchoolConfiguration/AddHoliday',
                            },
                    ]}
                    rightActions={
                        <>
                            <Tooltip title={'Declare a new classwise holiday for your school.'}>
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

                            <Tooltip title={'Save'}>

                                <IconButton
                                    onClick={ClickSave}
                                    sx={{
                                        background: green[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: green[600]
                                        }
                                    }}
                                >
                                    <Save />
                                </IconButton>
                            </Tooltip>

                        </>
                    }
                />

                <Grid container spacing={2}>

                    <Grid item xs={6} md={4}>
                        <Datepicker
                            DateValue={StartDate}
                            onDateChange={onSelectStartDate}
                            label={'Start Date'}
                            size={"medium"}
                        />
                        <ErrorMessage1 Error={ErrorStartDate}></ErrorMessage1>
                        <ErrorMessage1 Error={ErrorStartDate2}></ErrorMessage1>
                        <ErrorMessage1 Error={ErrorStartDateblank}></ErrorMessage1>


                    </Grid>

                    <Grid item xs={6} md={4}>
                        <Datepicker
                            DateValue={EndDate}
                            onDateChange={onSelectEndDate}
                            label={'End Date'}
                            size={"medium"}
                        />

                        <ErrorMessage1 Error={ErrorEndDate}></ErrorMessage1>
                        <ErrorMessage1 Error={ErrorEndDate1}></ErrorMessage1>
                        <ErrorMessage1 Error={ErrorEndDate2}></ErrorMessage1>
                        <ErrorMessage1 Error={ErrorEndDateblank}></ErrorMessage1>


                    </Grid>

                    <Grid item xs={6} md={4}>
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
                                const value = e.target.value;
                                if (value.length <= 50) {
                                    setHolidayTitle(value);
                                }
                            }}
                            // error={errorHolidayTitle !== ''}
                            // helperText={errorHolidayTitle}
                            fullWidth
                            sx={{
                                resize: 'both'
                            }}
                        >
                        </TextField>
                        <ErrorMessage1 Error={errorHolidayTitle}></ErrorMessage1>
                        <ErrorMessage1 Error={errorHolidayTitle1}></ErrorMessage1>

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
                            error={Reamrk1 !== ''}
                            helperText={Reamrk1}
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={12} mt={4}>
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


            </Box>
        </>
    )
};


export default AddHoliday;




