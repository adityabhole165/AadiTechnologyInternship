import Help from '@mui/icons-material/Help'
import { Box, Button, Card, CardContent, Container, Grid, List, Stack, TextField, Typography, } from '@mui/material';
import Icon1 from 'src/libraries/icon/icon1';
import Card1 from 'src/libraries/mainCard/Card1';
import { CheckFileValidation, ChangeFileIntoBase64 } from '../Common/Util';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IEventDetailsBody, IAllClassesAndDivisionsBody, ISelectedStandardAndDivisionCheckBoxBody, IUpdateEventBody, IDeleteEventBody, DeleteEventImageBody, IEventListBody } from "src/interfaces/EventManegment/IEventManegment";
import { GetEventdetail, GetAllClassAndDivision, GetSelectedStandardAndDivisionCheckBoxx, GetupdateEvent, GetDeleteEvent, GetDeleteEventImagee, GetEventtList } from 'src/requests/EventManegment/RequestEventManegment'
import { Navigate, useNavigate, useParams } from 'react-router';
import List1 from 'src/libraries/mainCard/List1';
//import CardCheckBox from '../Library/CardCheckBox'
import { BoxWrapper } from 'src/libraries/styled/CardStyle';
// import Checkbox1 from "src/libraries/card/Class2";
// import { Catalogues } from "src/libraries/card/Class1";
import Attachment from '@mui/icons-material/Attachment';
import { id } from 'date-fns/locale';
import Checkbox from '@mui/material/Checkbox';
import PageHeader from 'src/libraries/heading/PageHeader';
import SingleFile from 'src/libraries/File/SingleFile';
import { toast } from 'react-toastify';
import TabulerList from 'src/libraries/ResuableComponents/TabularList';
//import Test from '../../libraries/ResuableComponents/Test';
import { Toast } from 'react-toastify/dist/components';
import SelectListHierarchy from 'src/libraries/SelectList/SelectListHierarchy'

const EventsManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { OperationType, Id } = useParams();

    const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG']
    const MaxfileSize = 3000000

    const [FileData, setFileData] = useState('')
    const [EventTitle, setEventTitle] = useState('')
    const [errorEventTitle, SetErrorEventTitle] = useState('')
    const [EventStartDate, setEventStartDate] = useState('')
    const [ErrorEventStartDate, setErrorEventStartDate] = useState('')

    const [EventDescription, setEventDescription] = useState('')
    const [ErrorEventDescription, setErrorEventDescription] = useState('')

    const [FileName, setFileName] = useState('')
    const [FileError, setFileError] = useState('');
    const [FileBase64, setFileBase64] = useState('')

    const [StandardDivisionXML, setStandardDivisionXML] = useState("")

    const [ErrorEventTitle, setErrorEventTitle] = useState('')
    const [EventEndDate, setEventEndDate] = useState('')
    const [ErrorEventEndDate, setErrorEventEndDate] = useState('')
    const [IteamList, setitemList] = useState('')
    const [ErrorIteamList, setErrorIteamList] = useState('')
    const [EList, setEList] = useState(0)
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));

    const AllData = { EventTitle, EventDescription, EventStartDate, EventEndDate, IteamList };
  

    const EventLisst = useSelector((state: RootState) => state.EventsManagement.EventListt);

    const EventDetaill = useSelector((state: RootState) => state.EventsManagement.EventDetailss);

    const ClassesAndDivisionss = useSelector((state: RootState) => state.EventsManagement.AllClassesAndDivisionss);

    const StandardAndDivisionCheckBoxx = useSelector((state: RootState) => state.EventsManagement.SelectedStandardAndDivisionCheckBoxx);

    const SvaeUpdateeEvent = useSelector((state: RootState) => state.EventsManagement.UpdateEventt);

    const DeleteeEvent = useSelector((state: RootState) => state.EventsManagement.DeleteEventt);

    const DeleteeEventImage = useSelector((state: RootState) => state.EventsManagement.DeleteEventImagee);

    //1.EventList
    useEffect(() => {

        const EventListBody: IEventListBody = {

            "asEventDate": "2008-06-19",
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            "asStandardId": 871,
            "asDivisionId": 1199
        }
        dispatch(GetEventtList(EventListBody))
    }, []);


    //2.EventDetails
    useEffect(() => {

        const EDetails: IEventDetailsBody = {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
            "asEventId": 18
        }
        dispatch(GetEventdetail(EDetails))
    }, []);

    //3.GetAllClassesAndDivisions
    useEffect(() => {

        const AllClassesAndDivisionBody: IAllClassesAndDivisionsBody = {
            asSchoolId: asSchoolId,
            asAcademicYearId: asAcademicYearId,
        }
        dispatch(GetAllClassAndDivision(AllClassesAndDivisionBody))
    }, []);

    //4.GetSelectedStandardAndDivisionCheckBox
    useEffect(() => {

        const StandardAndDivisionBody: ISelectedStandardAndDivisionCheckBoxBody = {
            asSchoolId: asSchoolId ,
            "asEventId": 39
        }
        dispatch(GetSelectedStandardAndDivisionCheckBoxx(StandardAndDivisionBody))
    }, []);

    //6.SaveUpadateEvent
    useEffect(() => {

        const UpdateEventBody: IUpdateEventBody = {
            "asEventId": 830,
            "asEventName": "createAPIi",
            "asEventDescription": "",
            "asEventStartDate": "12-14-2023",
            "asEventEndDate": "12-15-2023",
            "asDisplayOnHomepage": false,
            "asEventImageName": "MohsinInamdar",
            "asSchoolId": 18,
            "asAcademicYearId": 45,
            "asInsertedById": "754",
            "asUpdatedById": "754",
            "asStandardDivisions": StandardDivisionXML
        }
        dispatch(GetupdateEvent(UpdateEventBody))
    }, []);

    //7.DeleteEvent
    const DeleteEventBody: IDeleteEventBody = {
        "asSchoolId": 18,
        "asEventId": 40
    }
    useEffect(() => {
        if (DeleteeEvent !== '') {
            toast.success(DeleteeEvent, { toastId: 'success1' })
            dispatch(GetDeleteEvent(DeleteEventBody))
        }

    }, []);

    //8.DeletEventIamge
    useEffect(() => {

        const DeleteEventImageBody: DeleteEventImageBody = {
            "asSchoolId": 18,
            "asAcademicYearId": 48,
            "asEventId": 830
        }
        dispatch(GetDeleteEventImagee(DeleteEventImageBody))
    }, []);

    const getEventString = (EventList) => {
        var XMLString = ""
        EventList.map((item) => {
            if (item.Status != undefined)
                XMLString = XMLString + " <Division StandardDivisionId=\"" + item.Id + "\" Division StandardDivisionId=\"" + item.Id + "\" />/>"
        })
        return XMLString
    }

    const ClickSave = () => {
        let isError = false;
        if (EventTitle == '') {
            SetErrorEventTitle('Event Ttile should not be blank.')
            isError = true
        }
        if (EventDescription == '') {
            setErrorEventDescription('Event Discription should not be blank.')
            isError = true
        }
        if (EventStartDate == '') {
            setErrorEventStartDate('Event start date should not be blank.')
            isError = true
        }
        if (EventEndDate == '') {
            setErrorEventEndDate('Event End date should not be blank.')
            isError = true
        } if (FileName == '' && FileBase64 == '') {
            setFileError('Please Choose a file')
            isError = true
        } else {

        }

        useEffect(() => {
            if (SvaeUpdateeEvent !== '') {
                toast.success("Student(s) height - weight saved successfully!!!", { toastId: 'success1' })
                // dispatch(saveEventManagement(EventManagementBody))
                //dispatch(resetMessage());
            }
        }, [SvaeUpdateeEvent])
    }


    const ResetForm = () => {
        setEventTitle('');
        setEventDescription('');
        setEventStartDate('');
        setEventEndDate('');
        setFileName('')

    };

    const ChangeFile = (value) => {
        setFileName(value.Name)
        setFileBase64(value.Value)
    }

    const CancelEvent = () => {
        ResetForm()
        setFileError('')
        SetErrorEventTitle('')
        setErrorEventDescription('')
        setErrorEventStartDate('')
        setErrorEventEndDate('')

    }

    const clickItem = (value) => {
        navigate('/extended-sidebar/Common/EventOverview')
    }

    const clickList = (value) => {
        setStandardDivisionXML(value)
    }

    const clickEventEdit = (Id) => {
        navigate('/extended-sidebar/Teacher/EvenetManegment/' + '/' + Id)
    }

    const clickeventDelete = (Id) => {
        if (confirm('Are You Sure you want to delete The List')) {
            const DeleteEventBody: IDeleteEventBody =
            {
                "asSchoolId": 18,
                "asEventId": 40
            }
            dispatch(GetDeleteEvent(DeleteEventBody))
        }
    }

    const [MyList, setMyList] = useState([
        { Id: "1", Name: "A", Value: "1", ParentId: "101", IsActive: false },
        { Id: "2", Name: "B", Value: "2", ParentId: "101", IsActive: false },
        { Id: "3", Name: "C", Value: "3", ParentId: "101", IsActive: false },
        { Id: "4", Name: "D", Value: "4", ParentId: "101", IsActive: false },
        { Id: "5", Name: "A", Value: "5", ParentId: "102", IsActive: false },
        { Id: "6", Name: "B", Value: "6", ParentId: "102", IsActive: false },
        { Id: "7", Name: "C", Value: "7", ParentId: "102", IsActive: false },
        { Id: "8", Name: "A", Value: "8", ParentId: "103", IsActive: false },
        { Id: "9", Name: "B", Value: "9", ParentId: "103", IsActive: false },
        { Id: "10", Name: "A", Value: "10", ParentId: "104", IsActive: false },
        { Id: "11", Name: "B", Value: "11", ParentId: "104", IsActive: false }
    ])


    const [ParentList, setParentList] = useState([
        { Id: "101", Name: "Nursery", Value: "101" },
        { Id: "102", Name: "Jr.Kg.", Value: "102" },
        { Id: "103", Name: "1", Value: "103" },
        { Id: "104", Name: "2", Value: "104" }
    ])

    const ClickChild = (value) => {
        setMyList(value)
    }

    return (
        <div>
            <PageHeader heading={'Event(s) Management'} subheading={''} /> <br></br><br></br>

            <Container maxWidth="md">
                {/* <TabulerList ItemList={EventLisst} clickEdit={clickEventEdit} clickDelete={clickeventDelete} /><br></br> */}

                <TextField label="Event Title"
                    value={EventTitle}
                    onChange={(e) => { setEventTitle(e.target.value) }}
                    error={errorEventTitle !== ''}
                    helperText={errorEventTitle} /><br></br><br></br>

                <TextField label={'Description'}
                    value={EventDescription}
                    onChange={(e) => { setEventDescription(e.target.value) }}
                    error={ErrorEventDescription !== ''}
                    helperText={ErrorEventDescription} /><br></br><br></br>

                <Grid container spacing={2} mb={0.1}>
                    <Grid item xs={6}>
                        <Box
                            sx={{ display: "flex", alignItems: "center", textAlign: "center", border: "1px solid #000", paddingBottom: "10px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)' }}>

                            <Typography
                                fontSize={'20px'}
                            > Event Start Date :
                            </Typography>
                            <TextField
                                sx={{ width: '50%', margin: '2px 0', border: "1px solid #000", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)' }}
                                inputProps={{ type: 'date' }} value={EventStartDate}
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
                            sx={{ display: "flex", alignItems: "center", textAlign: "center", border: "1px solid #000", paddingBottom: "10 px", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)' }}>
                            <Typography
                                fontSize={'20px'}
                            > Event End Date :
                            </Typography>
                            <TextField
                                sx={{ width: '50%', margin: '1px 0', border: "1px solid #000", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)' }}
                                inputProps={{ type: 'date' }} value={EventEndDate}
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
                </Grid><br></br><br></br>

                {/* <Test clickList={clickList} /> */}
                <SelectListHierarchy ItemList={MyList} ParentList={ParentList} ClickChild={ClickChild} >
                </SelectListHierarchy>

                <Grid item xs={6}>
                    <Typography fontSize={'10px'} >Attechment :</Typography>
                </Grid>

                <SingleFile
                    ValidFileTypes={ValidFileTypes}
                    MaxfileSize={MaxfileSize}
                    ChangeFile={ChangeFile}
                    errorMessage={FileError}></SingleFile>

                <Stack spacing={2} direction="row" >
                    <ButtonPrimary
                        onClick={CancelEvent}
                        style={{ marginRight: "8px", backgroundColor: 'green' }}>
                        New
                    </ButtonPrimary>
                    <ButtonPrimary
                        onClick={ClickSave}
                        style={{ marginRight: "8px", backgroundColor: 'green' }}>
                        Save
                    </ButtonPrimary>
                    <ButtonPrimary
                        onClick={clickItem}
                        style={{ marginRight: "8px", backgroundColor: 'red' }}>
                        Close
                    </ButtonPrimary>
                </Stack>

            </Container>
        </div>
    )
}

export default EventsManagement
