import { Button, debounce, Grid, Stack, TextField, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { DeleteEventImageBody, IAllClassesAndDivisionsBody, IEventDetailsBody, IUpdateEventBody } from 'src/interfaces/EventManegment/IEventManegment';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import SingleFile from 'src/libraries/File/SingleFile';
import SelectListHierarchy from 'src/libraries/SelectList/SelectListHierarchy';

import {
    GetAllClassAndDivision,
    GetDeleteEventImagee,
    GetEventdetail,
    GetupdateEvent,
    resetDeleteEventImagee,
    resetEventdetail,
    resetMessage
} from 'src/requests/EventManegment/RequestEventManegment';
import { RootState } from 'src/store';
import { getCalendarDateFormatDate, getCalendarDateFormatDateNew, isGreaterThanDate } from '../Common/Util';

const EventManagementForm = ({ EventId, AddNewEventClicked, SaveClicked }) => {
    let {
        SelectedDate,
        StandardId,
        DivisionId
    } = useParams();

    // Decode in-place
    SelectedDate = decodeURL(SelectedDate);
    StandardId = decodeURL(StandardId);
    DivisionId = decodeURL(DivisionId);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asFolderName = localStorage.getItem('FolderName');
    const TeacherId = Number(sessionStorage.getItem('Id'));
    const UserId = localStorage.getItem('TeacherId');
    const { showAlert, closeAlert } = useContext(AlertContext);
    const ValidFileTypes = ['JPG', 'PNG', 'BMP', 'JPEG', 'PDF'];
    const MaxfileSize = 1000000;

    const [EventTitle, setEventTitle] = useState('');
    const [EventDescription, setEventDescription] = useState('');
    // const [EventStartDate, setEventStartDate] = useState(getCalendarDateFormatDateNew(SelectedDate));
    const [EventStartDate, setEventStartDate]: any = useState(null);
    //const [EventEndDate, setEventEndDate] = useState(getCalendarDateFormatDateNew(SelectedDate));
    const [EventEndDate, setEventEndDate]: any = useState(null);
    const [ItemList, setitemList] = useState([]);
    const [showRiseAndShine, setShowRiseAndShine] = useState(false);
    const [FileName, setFileName] = useState('');
    const [base64URL, setbase64URL] = useState('');
    const [errorEventTitle, SetErrorEventTitle] = useState('');
    const [ErrorEventDescription, setErrorEventDescription] = useState('');
    const [ErrorClass, setErrorClass] = useState('');
    const [ErrorEventStartDate, setErrorEventStartDate] = useState('');
    const [ErrorEventEndDate, setErrorEventEndDate] = useState('');
    const [FileError, setFileError] = useState('');

    const EDetails: IEventDetailsBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asEventId: EventId
    };
    const ClassesAndDivisionss1 = useSelector(
        (state: RootState) => state.EventsManagement.AllClassesAndDivisionss1
    );
    const ClassesAndDivisionss = useSelector(
        (state: RootState) => state.EventsManagement.AllClassesAndDivisionss
    );
    const SaveUpdateEventt: any = useSelector(
        (state: RootState) => state.EventsManagement.SaveUpdateEventt
    );
    const EventDetaill: any = useSelector(
        (state: RootState) => state.EventsManagement.EventDetailss
    );

    const DeleteeEventImage = useSelector(
        (state: RootState) => state.EventsManagement.DeleteEventImagee
    );
    const ClickChild = (value) => {
        setitemList(value);
    };
    const handleCheckboxChange = (value) => {
        setShowRiseAndShine(value);
    };
    const ChangeFile = (value) => {
        setFileName(value.Name);
        setbase64URL(value.Value);
    };

    useEffect(() => {
        resetForm();
        const AllClassesAndDivisionBody: IAllClassesAndDivisionsBody = {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId
        };
        dispatch(GetAllClassAndDivision(AllClassesAndDivisionBody));

    }, []);
    useEffect(() => {
        if (AddNewEventClicked > 0)
            resetForm()
    }, [AddNewEventClicked]);
    useEffect(() => {
        if (SaveClicked > 0)
            ClickSave1();
    }, [SaveClicked]);

    useEffect(() => {
        if (EventId != 0) {
            dispatch(GetEventdetail(EDetails));
        }
    }, [EventId]);

    useEffect(() => {
        if (EventDetaill !== null) {
            setEventTitle(EventDetaill.Event_Name);
            setEventDescription(EventDetaill.Event_Description);
            setEventStartDate(getCalendarDateFormatDate(EventDetaill.Event_Start_Date));
            setEventEndDate(getCalendarDateFormatDate(EventDetaill.Event_End_Date));
            setShowRiseAndShine(EventDetaill.Display_On_Homepage == "True" ? true : false);
        }
        else {
            EventId = 0;
            setEventTitle('');
            setEventDescription('');
            setEventStartDate(getCalendarDateFormatDateNew(SelectedDate));
            setEventEndDate(getCalendarDateFormatDateNew(SelectedDate));
            setShowRiseAndShine(false);
            setitemList(ItemList.map((Item) => {
                return { ...Item, IsActive: false }
            }))
        }
    }, [EventDetaill]);

    useEffect(() => {
        setitemList(ClassesAndDivisionss);
    }, [ClassesAndDivisionss]);

    useEffect(() => {
        if (SaveUpdateEventt !== '') {
            toast.success(SaveUpdateEventt, { toastId: 'success1' });
            dispatch(resetMessage());
            resetForm();
            // navigate('/RITeSchool/Common/AnnualPlanner');
            navigate('/RITeSchool/Common/AnnualPlanner/' +  encodeURL(SelectedDate) + '/' +  encodeURL(StandardId) + '/' +  encodeURL(DivisionId));

        }
    }, [SaveUpdateEventt]);
    useEffect(() => {
        if (DeleteeEventImage != "") {
            toast.success(DeleteeEventImage)
            dispatch(resetDeleteEventImagee())
            dispatch(GetEventdetail(EDetails));
        }
    }, [DeleteeEventImage])
    const isOutsideAcademicYear = (date) => {
        // Assuming EventStartDate and EventEndDate are Date objects
        if (!date) return false; // Handle case where date is null or undefined

        // Get the current academic year boundaries from sessionStorage
        const academicYearStart = new Date(sessionStorage.getItem("StartDate"));
        const academicYearEnd = new Date(sessionStorage.getItem("EndDate"));

        // Convert date to a Date object if it is not already
        const eventDate = new Date(date);

        // Define the valid academic year range: April 1, 2024 to March 31, 2025
        const validAcademicYearStart = new Date('2024-04-01'); // April 1, 2024
        const validAcademicYearEnd = new Date('2025-03-31');   // March 31, 2025

        // Check if the date is outside the valid academic year range
        if (eventDate < validAcademicYearStart || eventDate > validAcademicYearEnd) {
            return true; // Outside valid academic year range
        }

        return false;
    };
    useEffect(() => {
        if (EventStartDate && EventEndDate) {
            if (isGreaterThanDate(EventStartDate, EventEndDate)) {
                setErrorEventStartDate('Start date should not be greater than end date');
            } else if (isOutsideAcademicYear(EventStartDate)) {
                setErrorEventStartDate('Event Start date must be within current academic year ' +
                    '(i.e between ' + sessionStorage.getItem("StartDate") +
                    ' and ' + sessionStorage.getItem("EndDate") + ')');
            } else {
                setErrorEventStartDate('');
            }

            if (isOutsideAcademicYear(EventEndDate)) {
                setErrorEventEndDate('Event End date must be within current academic year ' +
                    '(i.e between ' + sessionStorage.getItem("StartDate") +
                    ' and ' + sessionStorage.getItem("EndDate") + ')');
            } else {
                setErrorEventEndDate('');
            }
        }
    }, [EventStartDate, EventEndDate]);



    const resetForm = () => {
        dispatch(resetEventdetail())
        EventId = 0;
        setEventTitle('');
        setEventDescription('');
        setEventStartDate(null);
        setEventEndDate(null);
        setShowRiseAndShine(false);
        setitemList(ItemList.map((Item) => {
            return { ...Item, IsActive: false }
        }))
        setErrorEventStartDate('');
        setErrorEventEndDate('');
    }
    const getEventString = () => {
        let XMLString = '<StandardDivisions>';
        if (Array.isArray(ItemList)) {
            ItemList.map((item) => {
                if (item.IsActive)
                    XMLString =
                        XMLString + ' <Division StandardDivisionId="' + item.Id + '" />';
            });
        }
        XMLString += '</StandardDivisions>';
        return XMLString;
    };
    const isClassSelected = () => {
        let returnVal = false
        ItemList.map((Item) => {
            if (Item.IsActive)
                returnVal = true

        })
        return returnVal;
    }


    const ClickSave = () => {
        let isError = false;
        if (EventTitle == '') {
            SetErrorEventTitle('Title should not be blank.');
            isError = true;
        } else SetErrorEventTitle('')
        if (EventDescription == '') {
            setErrorEventDescription('Description should not be blank.');
            isError = true;
        } else setErrorEventDescription('')
        console.log('EventStartDate:', EventStartDate);
        if (EventStartDate === '' || EventStartDate === null) {
            setErrorEventStartDate('Start date should not be blank.');
            isError = true;
        } else if (ErrorEventStartDate != '') {
            isError = true;
        } else setErrorEventEndDate('')
        if (EventEndDate === '' || EventEndDate === null) {
            setErrorEventEndDate('End date should not be blank.');
            isError = true;
        } else if (ErrorEventEndDate != '') {
            isError = true;
        } else setErrorEventEndDate('')
        if (!isClassSelected()) {
            setErrorClass('At least one class should be associated.');
            isError = true;
        } else setErrorClass('')

        if (!isError) {
            const UpdateEventBody: IUpdateEventBody = {
                asEventId: EventId,
                asEventName: EventTitle,
                asEventDescription: EventDescription,
                asEventStartDate: EventStartDate,
                asEventEndDate: EventEndDate,
                asDisplayOnHomepage: showRiseAndShine,
                asEventImageName: FileName,
                asSchoolId: asSchoolId,
                asAcademicYearId: asAcademicYearId,
                asInsertedById: TeacherId.toString(),
                asUpdatedById: UserId,
                asStandardDivisions: getEventString(),
                asSaveFeature: 'Event Planner',
                asFolderName: asFolderName,
                asBase64String: base64URL
            };
            debouncedFetch(UpdateEventBody);
            // dispatch(GetupdateEvent(UpdateEventBody));
            // navigate('/RITeSchool/Common/AnnualPlanner/' + SelectedDate + '/' + StandardId + '/' + DivisionId)
        }
    };



    const ClickSave1 = () => {
        showAlert({
            title: 'Please Confirm',
            message: 'Are you sure you want to save event ?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                ClickSave()
                closeAlert();
            }
        });

    };



    const debouncedFetch = useCallback(debounce((body) => {
        dispatch(GetupdateEvent(body));
    }, 500), [dispatch]);
    const clickDelete = () => {
        if (confirm('Are you sure you want to delete image?')) {
            const DeleteEventImageBody: DeleteEventImageBody = {
                asSchoolId: asSchoolId,
                asAcademicYearId: asAcademicYearId,
                asEventId: Number(EventId),
                asUserId: Number(TeacherId)
            };
            dispatch(GetDeleteEventImagee(DeleteEventImageBody));
        }
    }
    const clickFileName = () => {
        window.open(
            localStorage.getItem('SiteURL') +
            '/RITeSchool/' +
            '/DOWNLOADS/Event Planner/' +
            EventDetaill.Event_Image);
    }
    // const onSelectStartDate = (value) => {
    //     setEventStartDate(value);
    // };

    // const onSelectEndDate = (value) => {
    //     setEventEndDate(value);
    // };

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={6} md={6} item>
                    <TextField
                        label={
                            <span>
                                Title <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        multiline
                        rows={1}
                        value={EventTitle}
                        onChange={(e) => {
                            setEventTitle(e.target.value);
                        }}
                        // error={errorEventTitle !== ''}
                        // helperText={errorEventTitle}
                        fullWidth
                        sx={{
                            resize: 'both'
                        }}

                    />
                    {errorEventTitle && <ErrorMessage1 Error={errorEventTitle} />}
                </Grid>
                <Grid xs={6} md={6} item>
                    <TextField
                        label={
                            <span>
                                Description <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        multiline
                        rows={1}
                        value={EventDescription}
                        onChange={(e) => {
                            setEventDescription(e.target.value);
                        }}
                        // error={ErrorEventDescription !== ''}
                        // helperText={ErrorEventDescription}
                        fullWidth
                        sx={{
                            resize: 'both'
                        }}
                    />
                    {ErrorEventDescription && <ErrorMessage1 Error={ErrorEventDescription} />}
                </Grid>
                <Grid item xs={6} md={6}>
                    {/* <TextField
                        label={
                            <span>
                                Start Date <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        inputProps={{ type: 'date' }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={EventStartDate}
                        onChange={(e) => {
                            setEventStartDate(e.target.value);
                            // console.log('EventStartDate :', e.target.value);
                        }}
                        error={ErrorEventStartDate !== ''}
                        helperText={ErrorEventStartDate}
                        fullWidth
                    /> */}
                    <Datepicker
                        DateValue={EventStartDate}
                        onDateChange={setEventStartDate}
                        label={'Start Date'}
                        size={"medium"}

                    />
                    <ErrorMessage1 Error={ErrorEventStartDate}></ErrorMessage1>
                    {/* <ErrorMessage1 Error={ErrorEventStartDate}></ErrorMessage1> */}
                </Grid>
                <Grid item xs={6} md={6}>
                    <Datepicker
                        DateValue={EventEndDate}
                        onDateChange={setEventEndDate}
                        label={'End Date'}
                        size={"medium"}

                    />
                    <ErrorMessage1 Error={ErrorEventEndDate}></ErrorMessage1>
                    {/* <ErrorMessage1 Error={ErrorEventEndDate}></ErrorMessage1> */}
                    {/* <TextField
                        label={
                            <span>
                                End Date <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        inputProps={{ type: 'date' }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={EventEndDate}
                        onChange={(e) => {
                            setEventEndDate(e.target.value);
                            // console.log('EventEndDate :', e.target.value);
                        }}
                        error={ErrorEventEndDate !== ''}
                        helperText={ErrorEventEndDate}
                        fullWidth
                    /> */}
                </Grid>
                <Grid item xs={12} md={12}>
                    <SelectListHierarchy
                        ItemList={ItemList}
                        ParentList={ClassesAndDivisionss1}
                        ClickChild={ClickChild}
                    ></SelectListHierarchy>
                    <ErrorMessage1 Error={ErrorClass}></ErrorMessage1>
                </Grid>
                {/* <Grid item xs={12} md={12}>
                    <Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showRiseAndShine}
                                    onChange={(e) => {
                                        handleCheckboxChange(e.target.checked);
                                    }}
                                />
                            }
                            label="Display On Homepage"
                        />
                    </Typography>
                </Grid> */}
                <Grid container xs={6} md={6}>
                    <Typography fontSize={'10px'} pt={1} pr={3} ml={2}>Select Photo:</Typography>
                    <Grid item >
                        <SingleFile
                            ValidFileTypes={ValidFileTypes}
                            MaxfileSize={MaxfileSize}
                            ChangeFile={ChangeFile}
                            errorMessage={FileError}
                            FilePath={EventDetaill == null ? "" : EventDetaill.Event_Image}
                            FileName={FileName}
                            viewIcon={true}
                            deleteIcon={true}
                            clickFileName={clickFileName}
                            clickDelete={clickDelete}
                            isMandatory={false}
                        ></SingleFile>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} gap={2} alignItems={"center"}>
                        <Button
                            // variant={'contained'} 
                            // color="error" 
                            onClick={resetForm}
                            sx={{
                                // backgroundColor: green[100],
                                color: 'red',
                                ':hover': { backgroundColor: red[100] }
                            }}>
                            Cancel
                        </Button>
                        <Button
                            //  variant={'contained'} 
                            //  color="success" 
                            onClick={ClickSave1}
                            sx={{
                                // backgroundColor: green[100],
                                color: 'green',
                                ':hover': { backgroundColor: green[100] }
                            }} >
                            Save
                        </Button>
                    </Stack>
                </Grid>
            </Grid>

        </>
    )
}

export default EventManagementForm