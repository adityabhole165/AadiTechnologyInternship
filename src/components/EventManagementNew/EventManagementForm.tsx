import { Button, Checkbox, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IAllClassesAndDivisionsBody, IEventDetailsBody, IEventListBody, IUpdateEventBody } from 'src/interfaces/EventManegment/IEventManegment';
import SingleFile from 'src/libraries/File/SingleFile';
import SelectListHierarchy from 'src/libraries/SelectList/SelectListHierarchy';
import {
    GetAllClassAndDivision,
    GetEventdetail,
    GetEventtList,
    GetupdateEvent,
    resetEventdetail,
    resetMessage
} from 'src/requests/EventManegment/RequestEventManegment';
import { RootState } from 'src/store';
import { getCalendarDateFormatDate, getCalendarDateFormatDateNew } from '../Common/Util';

const EventManagementForm = ({ EventId, SelectedDate, AddNewEventClicked }) => {
    const dispatch = useDispatch();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asFolderName = localStorage.getItem('FolderName');
    const TeacherId = Number(sessionStorage.getItem('Id'));
    const UserId = localStorage.getItem('TeacherId');

    const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
    const MaxfileSize = 3000000;

    const [EventTitle, setEventTitle] = useState('');
    const [EventDescription, setEventDescription] = useState('');
    const [EventStartDate, setEventStartDate] = useState(getCalendarDateFormatDateNew(SelectedDate));
    const [EventEndDate, setEventEndDate] = useState('');
    const [ItemList, setitemList] = useState([]);
    const [showRiseAndShine, setShowRiseAndShine] = useState(false);
    const [FileName, setFileName] = useState('');
    const [base64URL, setbase64URL] = useState('');
    const [errorEventTitle, SetErrorEventTitle] = useState('');
    const [ErrorEventDescription, setErrorEventDescription] = useState('');
    const [ErrorEventStartDate, setErrorEventStartDate] = useState('');
    const [ErrorEventEndDate, setErrorEventEndDate] = useState('');
    const [FileError, setFileError] = useState('');

    const filePath =
        localStorage.getItem('SiteURL') +
        '/RITeSchool/' +
        '/DOWNLOADS/Event Planner/' +
        FileName;
    const EventListBody: IEventListBody = {
        "asEventDate": "2024-02-07",
        "asSchoolId": asSchoolId,
        "asAcademicYearId": asAcademicYearId,
        "asStandardId": 1059,//StandardId,
        "asDivisionId": 1288//StandardDivisionId
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
        resetForm()
    }, [AddNewEventClicked]);
    useEffect(() => {
        if (EventId != 0) {
            const EDetails: IEventDetailsBody = {
                asSchoolId: asSchoolId,
                asAcademicYearId: asAcademicYearId,
                asEventId: EventId
            };
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
            setEventEndDate('');
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
            dispatch(GetEventtList(EventListBody));
            resetForm();
        }
    }, [SaveUpdateEventt]);

    const resetForm = () => {
        dispatch(resetEventdetail())
        EventId = 0;
        setEventTitle('');
        setEventDescription('');
        setEventStartDate(getCalendarDateFormatDate(SelectedDate));
        setEventEndDate('');
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
    const ClickSave = (value) => {
        let isError = false;
        if (EventTitle == '') {
            SetErrorEventTitle('Event Ttile should not be blank.');
            isError = true;
        }
        if (EventDescription == '') {
            setErrorEventDescription('Event Discription should not be blank.');
            isError = true;
        }
        if (EventStartDate == '') {
            setErrorEventStartDate('Event start date should not be blank.');
            isError = true;
        }
        if (EventEndDate == '') {
            setErrorEventEndDate('Event End date should not be blank.');
            isError = true;
        }
        if (FileName == '' && base64URL == '') {
            setFileError('Please Choose a file');
            isError = true;
        } else {
        }
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
    };
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
                    <Typography fontSize={'10px'}>Attachment:</Typography>
                    <SingleFile
                        ValidFileTypes={ValidFileTypes}
                        MaxfileSize={MaxfileSize}
                        ChangeFile={ChangeFile}
                        errorMessage={FileError}
                        filePath={filePath}
                        FileName={FileName}
                        viewIcon={true}
                        deleteIcon={true}
                    ></SingleFile>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} gap={2} alignItems={"center"}>
                        <Button variant={'contained'} color="error">
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