import Add from '@mui/icons-material/Add';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { green, grey, red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import {
  DeleteEventImageBody,
  IAllClassesAndDivisionsBody,
  IDeleteEventBody,
  IEventDetailsBody,
  IEventListBody,
  ISelectedStandardAndDivisionCheckBoxBody,
  IUpdateEventBody
} from 'src/interfaces/EventManegment/IEventManegment';
import SingleFile from 'src/libraries/File/SingleFile';
import TabulerList from 'src/libraries/ResuableComponents/TabularList';
import SelectListHierarchy from 'src/libraries/SelectList/SelectListHierarchy';
import {
  GetAllClassAndDivision,
  GetDeleteEvent,
  GetDeleteEventImagee,
  GetEventdetail,
  GetEventtList,
  GetSelectedStandardAndDivisionCheckBoxx,
  GetupdateEvent,
  ResetDeletedLog,
  resetMessage
} from 'src/requests/EventManegment/RequestEventManegment';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import { encodeURL } from '../Common/Util';

const EventsManagement = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { Id, Event_Id, Name } = useParams();

  const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
  const MaxfileSize = 3000000;

  const [FileData, setFileData] = useState('');
  const [EventTitle, setEventTitle] = useState('');
  const [errorEventTitle, SetErrorEventTitle] = useState('');
  const [EventStartDate, setEventStartDate] = useState('');
  const [ErrorEventStartDate, setErrorEventStartDate] = useState('');

  const [EventDescription, setEventDescription] = useState('');
  const [ErrorEventDescription, setErrorEventDescription] = useState('');

  const [FileName, setFileName] = useState('');
  const [FileError, setFileError] = useState('');
  //const[Event_Id, SetEvent_Id] = useState('')

  const [StandardDivisionXML, setStandardDivisionXML] = useState([]);
  const [base64URL, setbase64URL] = useState('');

  const [ErrorEventTitle, setErrorEventTitle] = useState('');
  const [EventEndDate, setEventEndDate] = useState('');
  const [ErrorEventEndDate, setErrorEventEndDate] = useState('');
  const [HomeworkId, setHomeworkId] = useState('');
  const { showAlert, closeAlert } = useContext(AlertContext);
  const [ItemList, setitemList] = useState([]);
  const [ErrorIteamList, setErrorIteamList] = useState('');
  const [EList, setEList] = useState(0);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [showRiseAndShine, setShowRiseAndShine] = useState(false);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asStandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const asStandardId = sessionStorage.getItem('StandardId');
  const asDivisionId = sessionStorage.getItem('DivisionId');
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));

  const EventLisst = useSelector(
    (state: RootState) => state.EventsManagement.EventListt
  );
  // console.log('EventLisst', EventLisst);
  const EventDetaill: any = useSelector(
    (state: RootState) => state.EventsManagement.EventDetailss
  );

  const ClassesAndDivisionss = useSelector(
    (state: RootState) => state.EventsManagement.AllClassesAndDivisionss
  );

  const ClassesAndDivisionss1 = useSelector(
    (state: RootState) => state.EventsManagement.AllClassesAndDivisionss1
  );

  const StandardAndDivisionCheckBoxx = useSelector(
    (state: RootState) =>
      state.EventsManagement.SelectedStandardAndDivisionCheckBoxx
  );

  const SvaeUpdateeEvent: any = useSelector(
    (state: RootState) => state.EventsManagement.SaveUpdateEventt
  );

  const DeleteeEvent = useSelector(
    (state: RootState) => state.EventsManagement.DeleteEventt
  );

  const DeleteeEventImage = useSelector(
    (state: RootState) => state.EventsManagement.DeleteEventImagee
  );

  //1.EventList
  useEffect(() => {
    const EventListBody: IEventListBody = {
      asEventDate: '2024-02-07',
      asSchoolId: 18,
      asAcademicYearId: 54,
      asStandardId: 1059,
      asDivisionId: 1288
    };
    dispatch(GetEventtList(EventListBody));
  }, []);

  //2.EventDetails
  useEffect(() => {
    const EDetails: IEventDetailsBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asEventId: Number(Id)
    };
    dispatch(GetEventdetail(EDetails));
  }, []);
  useEffect(() => {
    if (EventDetaill !== null) {
      console.log(' after edit:', EventDetaill);
      // setHomeworkId(EventDetaill.Id.toString);
      setEventTitle(EventDetaill.EventTitle);
      // setBirthDate(getCalendarFormat(EventDetaill.BirthDate))
      setEventDescription(EventDetaill.EventDescription);
      setEventStartDate(EventDetaill.EventStartDate);
      setShowRiseAndShine(EventDetaill.showRiseAndShine);
    }
  }, [EventDetaill]);

  useEffect(() => {
    setitemList(ClassesAndDivisionss);
  }, [ClassesAndDivisionss]);

  //3.GetAllClassesAndDivisions
  useEffect(() => {
    const AllClassesAndDivisionBody: IAllClassesAndDivisionsBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId
    };
    dispatch(GetAllClassAndDivision(AllClassesAndDivisionBody));
  }, []);

  //4.GetSelectedStandardAndDivisionCheckBox
  useEffect(() => {
    const StandardAndDivisionBody: ISelectedStandardAndDivisionCheckBoxBody = {
      asSchoolId: asSchoolId,
      asEventId: Number(Id)
    };
    dispatch(GetSelectedStandardAndDivisionCheckBoxx(StandardAndDivisionBody));
  }, []);

  //6.SaveUpadateEvent
  useEffect(() => {
    if (SvaeUpdateeEvent !== '') {
      toast.success(SvaeUpdateeEvent, { toastId: 'success1' });
      dispatch(resetMessage());
    }
  }, [SvaeUpdateeEvent]);

  //7.DeleteEvent
  const DeleteEventBody: IDeleteEventBody = {
    asSchoolId: asSchoolId,
    asEventId: Number(Id),
    asUserId: Number(TeacherId)
  };
  useEffect(() => {
    if (DeleteeEvent !== '') {
      toast.success(DeleteeEvent, { toastId: 'success1' });
      dispatch(ResetDeletedLog());
      dispatch(GetDeleteEvent(DeleteEventBody));
    }
  }, [DeleteeEvent]);

  //8.DeletEventIamge
  useEffect(() => {
    const DeleteEventImageBody: DeleteEventImageBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asEventId: Number(Id),
      asUserId: Number(TeacherId)
    };
    dispatch(GetDeleteEventImagee(DeleteEventImageBody));
  }, []);

  const [EventList, SetEventList] = useState([]);
  useEffect(() => {
    SetEventList(SvaeUpdateeEvent);
  }, [SvaeUpdateeEvent]);

  const getEventString = () => {
    // console.log(ItemList, ' -- ', EventList);
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
      SetErrorEventTitle('Title should not be blank.');
      isError = true;
    }
    if (EventDescription == '') {
      setErrorEventDescription('Description should not be blank.');
      isError = true;
    }
    if (EventStartDate == '') {
      setErrorEventStartDate('Start date should not be blank.');
      isError = true;
    }
    if (EventEndDate == '') {
      setErrorEventEndDate('End date should not be blank.');
      isError = true;
    }
    if (FileName == '' && base64URL == '') {
      setFileError('Please Choose a file');
      isError = true;
    } else {
    }
    const UpdateEventBody: IUpdateEventBody = {
      asEventName: EventTitle,
      asEventDescription: EventDescription,
      asEventStartDate: EventStartDate,
      asEventEndDate: EventEndDate,
      asDisplayOnHomepage: showRiseAndShine,
      asEventImageName: FileName,
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asInsertedById: TeacherId.toString(),
      asUpdatedById: '754',
      asStandardDivisions: getEventString(),
      asSaveFeature: 'Event Planner',
      asFolderName: 'PPSN Website',
      asBase64String: base64URL,
      asEventId: 0
    };

    dispatch(GetupdateEvent(UpdateEventBody));
  };

  const ResetForm = () => {
    setEventTitle('');
    setEventDescription('');
    setEventStartDate('');
    setEventEndDate('');
    setFileName('');
    setitemList([]);
  };

  const ChangeFile = (value) => {
    setFileName(value.Name);
    setbase64URL(value.Value);
  };

  const CancelEvent = () => {
    ResetForm();
    setFileError('');
    SetErrorEventTitle('');
    setErrorEventDescription('');
    setErrorEventStartDate('');
    setErrorEventEndDate('');
    setErrorIteamList('');
  };

  const clickItem = (value) => {
    Navigate('/RITeSchool/Common/EventOverview');
  };

  const clickList = (value) => {
    setStandardDivisionXML(value);
  };

  const clickEventEdit = (Id) => {
    Navigate('/RITeSchool/Teacher/EventManegement/' + '/' +  encodeURL(Id));
  };

  // const clickeventDelete = (Id) => {
  //   alert(Id);
  //   if (confirm('Are You Sure you want to delete The List')) {
  //     const DeleteEventBody: IDeleteEventBody = {
  //       asSchoolId: asSchoolId,
  //       asEventId: Number(Id),
  //       asUserId: Number(TeacherId)
  //     };
  //     dispatch(GetDeleteEvent(DeleteEventBody));
  //   }
  // };
  const clickeventDelete = (Id) => {
    const DeleteEventBody: IDeleteEventBody = {
      asSchoolId: asSchoolId,
      asEventId: Number(Id),
      asUserId: Number(TeacherId)
    };
    showAlert({
      title: 'Please Confirm',
      message:
        'Are You Sure you want to delete the List?  ',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(GetDeleteEvent(DeleteEventBody));
        closeAlert();
      }
    });
  };
  const ClickChild = (value) => {
    setitemList(value);
  };

  const handleCheckboxChange = (value) => {
    setShowRiseAndShine(value);
  };

  const filePath =
    localStorage.getItem('SiteURL') +
    '/RITeSchool/' +
    '/DOWNLOADS/Event Planner/' +
    FileName;

  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Annual Planner',
              path: '/RITeSchool/Common/AnnualPlanner'
            },
            {
              title: 'Event(s) Management',
              path: ''
            }
          ]}
          rightActions={
            <>
              <Tooltip title={'Add or Update Events'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: grey[600] }
                  }}
                >
                  <QuestionMarkIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Add new Event'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: green[600] }
                  }}
                >
                  <Add />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Save Event'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: green[600],
                    height: '36px !important',
                    ':hover': { backgroundColor: green[600] }
                  }}
                >
                  <Save />
                </IconButton>
              </Tooltip>
            </>
          }
        />
        <Box sx={{ background: 'white', p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant={'h4'}>Event(s) as of today.</Typography>
            </Grid>
            <Grid item xs={12}>
              <TabulerList
                ItemList={EventLisst}
                clickEdit={clickEventEdit}
                clickDelete={clickeventDelete}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'h4'}>Add a new Event.</Typography>
            </Grid>
            <Grid item xs={6}>
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
                error={errorEventTitle !== ''}
                helperText={errorEventTitle}
                fullWidth
                sx={{
                  resize: 'both'
                }}
              />
            </Grid>
            <Grid item xs={6}>
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
                error={ErrorEventDescription !== ''}
                helperText={ErrorEventDescription}
                fullWidth
                sx={{
                  resize: 'both'
                }}
              />
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <TextField
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
              />
            </Grid>
            <Grid item xs={12}>
              <SelectListHierarchy
                ItemList={ItemList}
                ParentList={ClassesAndDivisionss1}
                ClickChild={ClickChild}
              ></SelectListHierarchy>
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={6}>
              <Typography fontSize={'10px'}>Attachment:</Typography>
              <SingleFile
                ValidFileTypes={ValidFileTypes}
                MaxfileSize={MaxfileSize}
                ChangeFile={ChangeFile}
                errorMessage={FileError}
                FilePath={filePath}
                FileName={FileName}
                viewIcon={true}
                deleteIcon={true}
              ></SingleFile>
            </Grid>
          </Grid>

          <Stack spacing={2} direction="row" justifyContent={'center'}>
            <Button
              // variant={'contained'}
              //  color="primary" 
              onClick={CancelEvent}>
              sx={{
                // backgroundColor: green[100],
                color: 'red',
                ':hover': { backgroundColor: red[100] }
              }}

              Cancel
            </Button>
            <Button
              // variant={'contained'} color="success" 
              onClick={ClickSave}
              sx={{
                // backgroundColor: green[100],
                color: 'green',
                ':hover': { backgroundColor: green[100] }
              }} >
              Save
            </Button>
            {/* <Button
              variant={'contained'}
              color="error"
              onClick={clickeventDelete}
            >
              Delete
            </Button> */}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default EventsManagement;
