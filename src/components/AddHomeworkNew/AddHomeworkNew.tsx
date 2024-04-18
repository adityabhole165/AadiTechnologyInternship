import Close from '@mui/icons-material/Close';
import CloudUpload from '@mui/icons-material/CloudUpload';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IDeleteHomeworkBody, IGetSubjectListForTeacherBody, IGetTeacherSubjectAndClassSubjectBody, IPublishUnPublishHomeworkBody, ISaveHomeworkBody } from 'src/interfaces/AssignHomework/IAddHomework';
import SingleFile from 'src/libraries/File/SingleFile';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import SubjectList1 from 'src/libraries/ResuableComponents/SubjectList1';
import { GetPublishUnpublishHomework, GetTeacherSubjectList, HomeworkDelete, HomeworkSave, SubjectListforTeacherDropdown, resetDeleteHomework, resetHomework } from 'src/requests/AssignHomework/requestAddHomework';
import { PublishresetMessage } from 'src/requests/AssignHomework/requestHomeworkSubjetList';
import { RootState } from 'src/store';
import UploadMultipleDialog from '../AssignHomework/UploadMultipleDialog';
import CommonPageHeader from '../CommonPageHeader';
import SelectedsubjectList from './SelectedsubjectList';

const AddHomeworkNew = () => {
  const { TeacherName, ClassName, SubjectName, SubjectId } =
    useParams();
  const navigate = useNavigate();
  const [Subject, setSubject] = useState(SubjectId);
  const [Title, setTitle] = useState(SubjectName + ' : ' + new Date().toISOString().split('T')[0]);
  const [AssignedDate, setAssignedDate]: any = useState(new Date().toISOString().split('T')[0]);
  const [ErrorAssignedDate, setErrorAssignedDate]: any = useState('');
  const [ErrorTitle, setErrorTitle] = useState('');
  const [CompleteDate, setCompleteDate] = useState('');
  const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
  const MaxfileSize = 3000000;
  const [fileName, setFileName] = useState('');
  const [File, setFile] = useState('');
  const [base64URL, setbase64URL] = useState('');
  const [openUploadMultipleDialog, setOpenUploadMultipleDialog] = useState(false);
  const [MultipleFiles, setMultipleFiles] = useState([]);
  const [Details, setDetails] = useState('');
  const [ErrorDetails, setErrorDetails] = useState('');
  const [Errorbase64URL, setErrorbase64URL] = useState('');
  const [ErrorCompleteDate, setErrorCompleteDate] = useState('');
  const [SubjectCheckID, setSubjectCheckID] = useState(SubjectId);
  const [HomeworkS, setHomeworkS] = useState('0');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredHomeworkList, setFilteredHomeworkList] = useState([]);
  const [publishId, setPublishId] = useState();
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [Details1, setDetails1] = useState('');
  const [text, setText] = useState('');


  const HeaderPublish = [
    { Id: 1, Header: 'Subject 	' },
    { Id: 2, Header: ' 	Title' },
    { Id: 3, Header: 'Assigned Date' },
    { Id: 4, Header: ' 	Complete By Date' },
    { Id: 5, Header: ' Attachment' },
    { Id: 6, Header: 'View' },
    { Id: 7, Header: 'Publish/Unpublish' },
    { Id: 8, Header: 'Edit' },
    { Id: 9, Header: 'Delete' }
  ];

  const HeaderPublish1 = [
    { Id: 1, Header: ' 	' },
    { Id: 2, Header: 'SR.No 	' },
    { Id: 3, Header: 'Subject' },
    { Id: 4, Header: 'Title' },
    { Id: 5, Header: 'Is Published? ', align: 'center' },
    { Id: 6, Header: 'Complete By Date' }
  ];

  const HomeworkStatus = [
    { Id: '1', Name: 'All', Value: 'All' },
    { Id: '2', Name: 'Assigned Date', Value: 'AssignedDate' },
    { Id: '3', Name: 'Complete By Date', Value: 'CompleteByDate' }
  ];

  const dispatch = useDispatch();
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const asUpdatedById = localStorage.getItem('Id');
  const asTeacherId = sessionStorage.getItem('TeacherId');

  const [SubjectList, setSubjectList] = useState([]);

  const SiteURL = localStorage.getItem('SiteURL');
  let asFolderName = SiteURL.split('/')[SiteURL.split('/').length - 1];

  const SaveHomework = useSelector(
    (state: RootState) => state.AddHomework.ISSaveHomework
  );

  const ClassSubject: any = useSelector(
    (state: RootState) => state.AddHomework.Subjectlist
  );

  const Subjectlistsforteacher: any = useSelector(
    (state: RootState) => state.AddHomework.SubjectListTeacher
  );
  console.log(Subjectlistsforteacher, "Subjectlistsforteacher....")

  const DeleteHomework = useSelector(
    (state: RootState) => state.AddHomework.DeleteHomework
  );

  const USPublishUnpublishHomework = useSelector(
    (state: RootState) => state.AddHomework.PublishUnPublishHomework
  );

  const GetTeacherSubjectAndClassSubjectBody: IGetTeacherSubjectAndClassSubjectBody =
  {
    asSchoolId: asSchoolId,
    aTeacherId: Number(asTeacherId),
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: StandardDivisionId
  };

  const HomeworkSaveBody: ISaveHomeworkBody = {
    asTitle: Title,
    asSubjectId: Number(SubjectCheckID),
    asStandardDivisionId: StandardDivisionId,
    asAttachmentPath: File,
    asDetails: Details,
    asAssignDate: AssignedDate,
    asCompleteByDate: CompleteDate,
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asInsertedById: Number(asTeacherId),
    asSaveFeature: 'Homework',
    asFolderName: 'PPSN Website',
    asBase64String: base64URL,
    additionalAttachmentFile: MultipleFiles
  };
  const GetSubjectListForTeacherBody: IGetSubjectListForTeacherBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: StandardDivisionId,
    asHomeWorkStatus: HomeworkS,
    asHomeworkTitle: '',
    asAssignedDate: AssignedDate
  }


  const ResetForm = () => {
    setSubjectCheckID('');
    setTitle('');
    setAssignedDate('');
    setCompleteDate('');
    setFile('');
    setFileName('');
    setDetails('');
    setMultipleFiles(['']);
  };



  const ClickSaveHomework = () => {
    let isError = false;
    if (AssignedDate == '') {
      setErrorAssignedDate('Field should not be blank')
      isError = true

    } else if (CompleteDate == '') {
      setErrorCompleteDate('Field should not be blank')
      isError = true
    }
    else if (base64URL == '') {
      setErrorbase64URL('Field should not be blank')
      isError = true
    }

    else if (Details == '') {
      setErrorDetails('Field should not be blank')
      isError = true
    }

    if (!isError) {
      dispatch(HomeworkSave(HomeworkSaveBody))

    }

    if (!isError) {
      ResetForm()
    }
  }
  useEffect(() => {
    if (SaveHomework != '') {
      dispatch(resetHomework());
      toast.success(SaveHomework);
      dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));

    }
  }, [SaveHomework]);

  const clickSubjectList = (value) => {
    setSubject(value);
  };

  const Changevalue = (value) => {
    // setitemPublish(value);
    setSubjectList(value);
  };

  const ChangeFile = (value) => {
    setFile(value.Name);
    setbase64URL(value.Value);
    setFileName(value.Name);
  };

  const clickTitle = (Id) => {
    navigate('/extended-sidebar/Teacher/ViewHomework/' + Id);
  };

  const clickView = (Id) => {
    navigate('/extended-sidebar/Teacher/HomeworkDocuments/' + Id);
  };

  const clickDelete = (Id) => {
    // alert(Id)
    if (confirm('Are You Sure you want to delete The List')) {
      const DeleteHomeworkBody: IDeleteHomeworkBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asHomeworkId: Id,
        asUpdatedById: Number(asUpdatedById)
      };
      dispatch(HomeworkDelete(DeleteHomeworkBody));
    }
  };

  const handleEditClick = (Id) => {

  };

  useEffect(() => {
    if (DeleteHomework != '') {
      toast.success(DeleteHomework);
      dispatch(resetDeleteHomework());
      dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));
    }
  }, [DeleteHomework]);


  const getIsPublish = (Id) => {
    let IsPublish = true;
    Subjectlistsforteacher.map((item) => {
      if (item.Id.toString() == Id.toString()) {
        IsPublish = item.IsPublished == 'False' ? true : false;
        return IsPublish;
      }
    });
    return IsPublish;
  };

  const PublishUnpublish = (Id) => {
    let IsPublish = getIsPublish(Id);
    const PublishUnPublishHomeworkBody: IPublishUnPublishHomeworkBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asHomeworkId: Id,
      asReason: text,
      asUpdatedById: asTeacherId,
      asIsPublish: IsPublish,
      asIsSMSSent: true
    };

    dispatch(GetPublishUnpublishHomework(PublishUnPublishHomeworkBody));
    dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));
  }


  const clickPublishUnpublish = (Id) => {
    let IsPublish = getIsPublish(Id);
    if (IsPublish == true) {
      PublishUnpublish(Id);

    } else {
      setOpenPublishDialog(true);
      setPublishId(Id);
    }
  };


  const Detailschnage = (event) =>{
    setText(event.target.value)
  }


  useEffect(() => {
    if (USPublishUnpublishHomework !== '') {
      toast.success(USPublishUnpublishHomework);
      dispatch(PublishresetMessage());
      dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));
    }
  }, [USPublishUnpublishHomework]);

 
 

  const ClickOk = () => {
    if (text !== '') {
      setOpenPublishDialog(false);
      setText('');
      PublishUnpublish(publishId);
    } else {
      toast.error('Please provide a reason for unpublishing.');
    }
  };


  const clickFileName = (value) => {
    if (value !== '') {
      window.open(
        localStorage.getItem('SiteURL') +
        '/RITeSchool/DOWNLOADS/Homework/' +
        value
      );
    }
  };
  const clickTitle1 = (Id) => {
    navigate('/extended-sidebar/Teacher/ViewHomework/' + Id);
  };


  //dropdown
  useEffect(() => {
    dispatch(SubjectListforTeacherDropdown(GetTeacherSubjectAndClassSubjectBody));
  }, []);

  useEffect(() => {
    dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));

  }, []);


  const Assigned_homework_for_selected_subject = Subjectlistsforteacher.filter((item) => item.SubjectId == Subject);
  const Homework_assigned_for_other_subjects = Subjectlistsforteacher.filter((item) => item.SubjectId != Subject);


  const clickHomeworkStatus = (value) => {
    setHomeworkS(value);
    setAssignedDate(value);
    dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));

  };


  const [SearchText, setSearchText] = useState('');
  const [SearchTittle, setSearchTittle] = useState([
    Subjectlistsforteacher
  ]);

  // const changeSearchText = () => {
  //   if (SearchText === '') {
  //     setSearchTittle(Subjectlistsforteacher);
  //   } else {
  //     setSearchTittle(
  //       Subjectlistsforteacher.filter((item) => {

  //         return item.Text2 && item.Text2.toLowerCase().includes(SearchText.toLowerCase());
  //       })
  //     );
  //   }
  // };



  const SearchNameChange = (value) => {
    setSearchText(value);
  };


  const changeSearchText = (value) => {
    if (typeof value === 'string' && value.trim() !== '') {
      setAssignedDate(value);
      setSearchText(value);
    }

    if (Subjectlistsforteacher && Subjectlistsforteacher.length === 0) {
      toast.success('No Records Found');
    }
    dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));

  };

  return (
    <>

      <Box>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Assign Homework',
              path: '/extended-sidebar/Teacher/AssignHomework'
            },
            { title: 'Add Homework', path: '/extended-sidebar/Teacher/AddHomework' },
          ]}
          rightActions={
            <>
              <Box>
                <Tooltip
                  title={`Users can Add/Edit/Delete/Publish and Unpublish homework. And displays homework added by other teachers.`}
                >
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
              </Box>

              <Box>
                <Tooltip title={`Cancel`}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: grey[500],
                      height: '36px !important',
                      ':hover': { backgroundColor: red[600] }
                    }}
                    onClick={ResetForm}
                  >
                    <Close />
                  </IconButton>
                </Tooltip>


              </Box>
              <Box>
                <Tooltip title={`Save HomeWork`}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: green[500],
                      height: '36px !important',
                      ':hover': { backgroundColor: green[600] }
                    }}

                  >
                    <SaveIcon onClick={ClickSaveHomework} />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          }
        />


        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField fullWidth label={'Class'} value={ClassName} />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label={'Class Teacher'}
              value={TeacherName}
            />
          </Grid>
          <Grid item xs={3}>

            <SearchableDropdown
              ItemList={ClassSubject}
              onChange={clickSubjectList}
              defaultValue={Subject}
              sx={{ minWidth: '100%' }}
              label='Select Subject'
            />


          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              value={Title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              error={ErrorTitle !== ''}
              helperText={ErrorTitle}
              label={
                <span>
                  Title <span style={{ color: 'red' }}>*</span>
                </span>
              }
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              label={
                <span>
                  Assigned Date <span style={{ color: 'red' }}>*</span>
                </span>
              }
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ type: 'date' }}
              value={AssignedDate}
              onChange={(e) => {
                setAssignedDate(e.target.value);
              }}
              error={ErrorAssignedDate !== ''}
              helperText={ErrorAssignedDate}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              label={
                <span>
                  Complete By Date <span style={{ color: 'red' }}>*</span>
                </span>
              }
              inputProps={{ type: 'date' }}
              value={CompleteDate}
              onChange={(e) => {
                setCompleteDate(e.target.value);
              }}

            />
          </Grid>

          <Grid item xs={3}>
            <SingleFile
              ValidFileTypes={ValidFileTypes}
              MaxfileSize={MaxfileSize}
              FileName={fileName}
              ChangeFile={ChangeFile}
              FileLabel={'Attachment'}
              width={'100%'}
              height={"52px"}
              isMandatory={false}
            />
          </Grid>

          <Grid item xs={3}>
            <Button
              startIcon={<CloudUpload />}
              fullWidth
              sx={{ py: 1.6 }} variant={"outlined"}
              onClick={() => setOpenUploadMultipleDialog(true)}
            >
              Upload Multiple Attachments
            </Button>

          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={
                <span>
                  Details <span style={{ color: 'red' }}>*</span>
                </span>
              }
              multiline
              rows={3}
              value={Details1}
              onChange={(e) => {
                setDetails1(e.target.value);
              }}
              error={ErrorDetails !== ''}
              helperText={ErrorDetails}
            />
          </Grid>

        </Grid>


        <br />
        <br />

        <Grid container spacing={2} justifyContent={'flex-end'} pb={1}>
          <Grid item xs={3}>
            <SearchableDropdown
              sx={{ minWidth: '100%' }}
              ItemList={HomeworkStatus}
              onChange={clickHomeworkStatus}
              defaultValue={HomeworkS}
              label={'Select Homework Status'}
            />
          </Grid>


          <Grid item xs={3}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              label={'Date'}
              inputProps={{ type: 'date' }}
              value={AssignedDate}
              onChange={(e) => {
                setAssignedDate(e.target.value);
                console.log('EventEndDate :', e.target.value);
              }}
              variant="standard"

            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Title"
              value={SearchText}
              variant={'standard'}
              onChange={(e) => {
                SearchNameChange(e.target.value);
              }}
            />

          </Grid>
          <Grid item xs={1}>
            <Button onClick={changeSearchText} variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>


        <Dialog open={openPublishDialog} onClose={() => setOpenPublishDialog(false)} fullWidth
          maxWidth={'sm'}>
          <DialogTitle
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              py: 1
            }}
          ></DialogTitle>
          <DialogContent dividers sx={{ px: 4 }}>
            <Typography variant={"h4"} sx={{ mb: 1 }}>
              Unpublish Reason
            </Typography>
            <TextField
              multiline
              rows={3}
              type="text"
              value={text}
              onChange={Detailschnage}
              sx={{ width: '100%' }}
            />
          </DialogContent>
          <DialogActions sx={{ py: 2, px: 3 }}>
            <Button onClick={() => {
              setOpenPublishDialog(false)
            }} color={'error'}>
              Cancel
            </Button>
            <Button onClick={ClickOk} variant={'contained'}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>




        <SelectedsubjectList
          ItemList={Assigned_homework_for_selected_subject}
          clickView={clickTitle}
          clickDelete={clickDelete}
          clickEdit={handleEditClick}
          clickVisibilityIcon={clickView}
          clickpublish={clickPublishUnpublish}
          HeaderArray={HeaderPublish}
          clickAttachment={clickFileName}
        />



        <Box my={2}>
          <SubjectList1
            ItemList={Homework_assigned_for_other_subjects}
            HeaderArray={HeaderPublish1}
            onChange={Changevalue}
            clickchange={''}
            clickTitle={clickTitle1}
          />
        </Box>


        {openUploadMultipleDialog && (
          <UploadMultipleDialog
            open={openUploadMultipleDialog}
            MultipleFiles={MultipleFiles}
            setOpen={setOpenUploadMultipleDialog}
            setMultipleFiles={setMultipleFiles}
          />
        )}

      </Box>

    </>

  )
}

export default AddHomeworkNew