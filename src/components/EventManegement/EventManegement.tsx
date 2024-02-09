import {
  Box,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
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
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
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

const EventsManagement = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { Id,Event_Id } = useParams();

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
  console.log('EventLisst', EventLisst);
  const EventDetaill = useSelector(
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
      asEventDate: '2008-06-19',
      asSchoolId: asSchoolId,
      asAcademicYearId: 39,
      asStandardId: 871,
      asDivisionId: 1199
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
    asEventId: Number(Id)
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
      asEventId: Number(Id)
    };
    dispatch(GetDeleteEventImagee(DeleteEventImageBody));
  }, []);

  const [EventList, SetEventList] = useState([]);
  useEffect(() => {
    SetEventList(SvaeUpdateeEvent);
  }, [SvaeUpdateeEvent]);

  const getEventString = () => {
    console.log(ItemList, ' -- ', EventList);
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
      asBase64String: base64URL
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
    Navigate('/extended-sidebar/Common/EventOverview');
  };

  const clickList = (value) => {
    setStandardDivisionXML(value);
  };

  const clickEventEdit = (Id) => {
    Navigate('/extended-sidebar/Teacher/EventManegement/' + '/' + Id);
  };

  const clickeventDelete = (Id) => {
    alert(Id);
    if (confirm('Are You Sure you want to delete The List')) {
      const DeleteEventBody: IDeleteEventBody = {
        asSchoolId: asSchoolId,
        asEventId: Number(Id)
      };
      dispatch(GetDeleteEvent(DeleteEventBody));
    }
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
    <div>
      <PageHeader heading={'Event(s) Management'} subheading={''} /> <br></br>
      <br></br>
      <Container maxWidth="md">
        <TabulerList
          ItemList={EventLisst}
          clickEdit={clickEventEdit}
          clickDelete={clickeventDelete}
        />
        <br></br>

        <TextField
          label="Event Title"
          value={EventTitle}
          onChange={(e) => {
            setEventTitle(e.target.value);
          }}
          error={errorEventTitle !== ''}
          helperText={errorEventTitle}
        />
        <br></br>
        <br></br>

        <TextField
          label={'Description'}
          value={EventDescription}
          onChange={(e) => {
            setEventDescription(e.target.value);
          }}
          error={ErrorEventDescription !== ''}
          helperText={ErrorEventDescription}
        />
        <br></br>
        <br></br>

        <Grid container spacing={2} mb={0.1}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid #000',
                paddingBottom: '10px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)'
              }}
            >
              <Typography fontSize={'20px'}> Event Start Date :</Typography>
              <TextField
                sx={{
                  width: '50%',
                  margin: '2px 0',
                  border: '1px solid #000',
                  boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)'
                }}
                inputProps={{ type: 'date' }}
                value={EventStartDate}
                onChange={(e) => {
                  setEventStartDate(e.target.value);
                  console.log('EventStartDate :', e.target.value);
                }}
                variant="standard"
                error={ErrorEventStartDate !== ''}
                helperText={ErrorEventStartDate}
              />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid #000',
                paddingBottom: '10px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)'
              }}
            >
              <Typography fontSize={'20px'}> Event End Date :</Typography>
              <TextField
                sx={{
                  width: '50%',
                  margin: '2px 0',
                  border: '1px solid #000',
                  boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)'
                }}
                inputProps={{ type: 'date' }}
                value={EventEndDate}
                onChange={(e) => {
                  setEventEndDate(e.target.value);
                  console.log('EventEndDate :', e.target.value);
                }}
                variant="standard"
                error={ErrorEventEndDate !== ''}
                helperText={ErrorEventEndDate}
              />
            </Box>
          </Grid>
        </Grid>
        <br></br>
        <br></br>

        <SelectListHierarchy
          ItemList={ItemList}
          ParentList={ClassesAndDivisionss1}
          ClickChild={ClickChild}
        ></SelectListHierarchy>

        <Typography margin={'1px'}>
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

        <Grid item xs={6}>
          <Typography fontSize={'10px'}>Attechment :</Typography>
        </Grid>

        <SingleFile
          ValidFileTypes={ValidFileTypes}
          MaxfileSize={MaxfileSize}
          ChangeFile={ChangeFile}
          errorMessage={FileError}
          filePath={filePath}
          FileName={FileName}
        ></SingleFile>

        <Stack spacing={2} direction="row">
          <ButtonPrimary
            onClick={CancelEvent}
            style={{ marginRight: '8px', backgroundColor: 'green' }}
          >
            New
          </ButtonPrimary>
          <ButtonPrimary
            onClick={ClickSave}
            style={{ marginRight: '8px', backgroundColor: 'green' }}
          >
            Save
          </ButtonPrimary>
          <ButtonPrimary
            onClick={clickItem}
            style={{ marginRight: '8px', backgroundColor: 'red' }}
          >
            Close
          </ButtonPrimary>
        </Stack>
      </Container>
    </div>
  );
};

export default EventsManagement;
