import { Button, Checkbox, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeleteEventImageBody, IAllClassesAndDivisionsBody, IEventDetailsBody, IUpdateEventBody } from 'src/interfaces/EventManegment/IEventManegment';
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
import { getCalendarDateFormatDate, getCalendarDateFormatDateNew, getDateFormattedDash, isGreaterThanDate } from '../Common/Util';

const EventManagementForm = ({ EventId, SelectedDate, AddNewEventClicked, SaveClicked }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asFolderName = localStorage.getItem('FolderName');
    const TeacherId = Number(sessionStorage.getItem('Id'));
    const UserId = localStorage.getItem('TeacherId');

    const ValidFileTypes = ['JPG', 'PNG', 'BMP', 'JPEG'];
    const MaxfileSize = 1000000;

    const [EventTitle, setEventTitle] = useState('');
    const [EventDescription, setEventDescription] = useState('');
    const [EventStartDate, setEventStartDate] = useState(getCalendarDateFormatDateNew(SelectedDate));
    const [EventEndDate, setEventEndDate] = useState(getCalendarDateFormatDateNew(SelectedDate));
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
            ClickSave();
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
            navigate('/extended-sidebar/Common/AnnualPlanner');
        }
    }, [SaveUpdateEventt]);
    useEffect(() => {
        if (DeleteeEventImage != "") {
            toast.success(DeleteeEventImage)
            dispatch(resetDeleteEventImagee())
            dispatch(GetEventdetail(EDetails));
        }
    }, [DeleteeEventImage])
    useEffect(() => {

        if (isGreaterThanDate(EventStartDate, EventEndDate)) {
            setErrorEventStartDate('Start Date should be greater than end date')
        } else
            if (isGreaterThanDate(sessionStorage.getItem("StartDate"), EventStartDate)) {
                setErrorEventStartDate('Event End date must be within current academic year ' +
                    '(i.e between ' + getDateFormattedDash(sessionStorage.getItem("StartDate")) +
                    ' and ' + getDateFormattedDash(sessionStorage.getItem("EndDate")) + ')')
            } else setErrorEventStartDate('')
        if (isGreaterThanDate(EventEndDate, sessionStorage.getItem("EndDate"))
        ) {
            setErrorEventEndDate('Event End date must be within current academic year ' +
                '(i.e between ' + getDateFormattedDash(sessionStorage.getItem("StartDate")) +
                ' and ' + getDateFormattedDash(sessionStorage.getItem("EndDate")) + ')')
        } else setErrorEventEndDate('')


    }, [EventStartDate, EventEndDate])

    const resetForm = () => {
        dispatch(resetEventdetail())
        EventId = 0;
        setEventTitle('');
        setEventDescription('');
        setEventStartDate(getCalendarDateFormatDate(SelectedDate));
        setEventEndDate(getCalendarDateFormatDateNew(SelectedDate));
        setShowRiseAndShine(false);
        setitemList(ItemList.map((Item) => {
            return { ...Item, IsActive: false }
        }))
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
            SetErrorEventTitle('Event Ttile should not be blank.');
            isError = true;
        } else SetErrorEventTitle('')
        if (EventDescription == '') {
            setErrorEventDescription('Event Discription should not be blank.');
            isError = true;
        } else setErrorEventDescription('')
        if (EventStartDate == '') {
            setErrorEventStartDate('Event start date should not be blank.');
            isError = true;
        } else if (ErrorEventStartDate != '') {
            isError = true;
        } else setErrorEventStartDate('')
        if (EventEndDate == '') {
            setErrorEventEndDate('Event End date should not be blank.');
            isError = true;
        } if (ErrorEventEndDate != '') {
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

            dispatch(GetupdateEvent(UpdateEventBody));
        }
    };
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

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={6} md={6} item>
                    <TextField
                        label={
                            <span>
                                Event Title <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        multiline
                        rows={3}
                        value={EventTitle}
                        onChange={(e) => {
                            setEventTitle(e.target.value);
                        }}
                        error={errorEventTitle !== ''}
                        helperText={errorEventTitle}
                        fullWidth
                        sx={{
                            resize: 'both'
                        }}
                    />
                </Grid>
                <Grid xs={6} md={6} item>
                    <TextField
                        label={
                            <span>
                                Description <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        multiline
                        rows={3}
                        value={EventDescription}
                        onChange={(e) => {
                            setEventDescription(e.target.value);
                        }}
                        error={ErrorEventDescription !== ''}
                        helperText={ErrorEventDescription}
                        fullWidth
                        sx={{
                            resize: 'both'
                        }}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        label={
                            <span>
                                Event Start Date <span style={{ color: 'red' }}>*</span>
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
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        inputProps={{ type: 'date' }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={EventEndDate}
                        label={
                            <span>
                                Event End Date <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        onChange={(e) => {
                            setEventEndDate(e.target.value);
                            // console.log('EventEndDate :', e.target.value);
                        }}
                        error={ErrorEventEndDate !== ''}
                        helperText={ErrorEventEndDate}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <SelectListHierarchy
                        ItemList={ItemList}
                        ParentList={ClassesAndDivisionss1}
                        ClickChild={ClickChild}
                    ></SelectListHierarchy>
                    <ErrorMessage1 Error={ErrorClass}></ErrorMessage1>
                </Grid>
                <Grid item xs={12} md={12}>
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
                </Grid>
                <Grid item xs={6} md={6}>
                    <Typography fontSize={'10px'}>Select Photo:</Typography>
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
                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} gap={2} alignItems={"center"}>
                        <Button variant={'contained'} color="error" onClick={resetForm}>
                            Cancel
                        </Button>
                        <Button variant={'contained'} color="success" onClick={ClickSave}>
                            Save
                        </Button>
                    </Stack>
                </Grid>
            </Grid>

        </>
    )
}

export default EventManagementForm