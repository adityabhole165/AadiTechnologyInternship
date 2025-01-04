import Close from '@mui/icons-material/Close';
import CloudUpload from '@mui/icons-material/CloudUpload';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import HomeworkSubjectList from 'src/components/AssignHomework/HomeworkSubjectList';
import {
  IAllPublishUnpublishAddHomeworkBody,
  IGetHomeworkDetailBody,
  IGetSubjectListForTeacherBody,
  IGetTeacherSubjectAndClassSubjectBody,
  ISaveHomeworkBody
} from 'src/interfaces/AssignHomework/IAddHomework';
import SingleFile from 'src/libraries/File/SingleFile';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import SubjectList1 from 'src/libraries/ResuableComponents/SubjectList1';
import {
  GetTeacherSubjectList,
  HomeworkSave,
  PublishUnpublishAllHomework,
  SubjectListforTeacherDropdown
} from 'src/requests/AssignHomework/requestAddHomework';
import { GetHomeworkDetailss } from 'src/requests/AssignHomework/requestHomeworkSubjetList';
import { RootState } from 'src/store';
import { decodeURL, encodeURL } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import AddUnpublish1 from './AddUnpublish1';
import UploadMultipleDialog from './UploadMultipleDialog';
const AddHomework = () => {
  let {
    ClassId,
    ClassName,
    TeacherId,
    TeacherName,
    SubjectName,
    subjectId,
    Id
  } = useParams();

  // Decode in-place
  ClassId = decodeURL(ClassId);
  ClassName = decodeURL(ClassName);
  TeacherId = decodeURL(TeacherId);
  TeacherName = decodeURL(TeacherName);
  SubjectName = decodeURL(SubjectName);
  subjectId = decodeURL(subjectId);
  Id = decodeURL(Id);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [HomeworkS, setHomeworkS] = useState('0');
  const [AssignHomeworkList, setAssignHomeworkList] = useState([]);
  const [Status, setStatus] = useState('');
  const [Subject, setSubjectName] = useState('');
  const [SubjectId, setSubjectId] = useState(subjectId);
  const [ErrorSubjectlist, ErrorsetSubjectlist] = useState('');
  const [ErrorTitle, setErrorTitle] = useState('');
  const [SearchText, setSearchText] = useState('');
  const [AssignedDate, setAssignedDate]: any = useState(new Date().toISOString().split('T')[0]);
  const [Title, setTitle] = useState(SubjectName + ' : ' + new Date().toISOString().split('T')[0]);
  const [ErrorAssignedDate, setErrorAssignedDate]: any = useState('');
  const [CompleteDate, setCompleteDate] = useState('');
  const [ErrorCompleteDate, setErrorCompleteDate] = useState('');
  const [Attachment, setAttechment] = useState('');
  const [Details, setDetails] = useState('');
  const [File, setFile] = useState('');
  const [ErrorFile, ErrorsetFile] = useState('');
  const [File1, setFile1] = useState('');
  const [MultipleFiles, setMultipleFiles] = useState([]);
  const [ErrorFile1, ErrorsetFile1] = useState('');
  const [HomeworkId, setHomeworkId] = useState('');
  const [ErrorDetails, setErrorDetails] = useState('');
  const [Id1, setId] = useState('');
  const [base64URL, setbase64URL] = useState('');
  const [Errorbase64URL, setErrorbase64URL] = useState('');
  const [base64URL1, setbase64URL1] = useState('');
  const [base64URLError1, setErrorbase64URL1] = useState('');
  const [itemPublish, setitemPublish] = useState([]);
  const [Open, setOpen] = useState(false);
  const [openUploadMultipleDialog, setOpenUploadMultipleDialog] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileName1, setFileName1] = useState('');

  const HeaderPublish1 = [
    { Id: 1, Header: ' 	' },
    { Id: 2, Header: 'SR.No 	' },
    { Id: 3, Header: 'Subject' },
    { Id: 4, Header: 'Title' },
    { Id: 5, Header: 'Is Published? ', align: 'center' },
    { Id: 6, Header: 'Complete By Date' }
  ];
  const ClickOpenDialogbox = () => {
    setOpen(true);
  };
  const ClickCloseDialogbox = () => {
    setOpen(false);
  };
  const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
  const ValidFileTypes1 = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];

  const MaxfileSize = 3000000;
  const MaxfileSize1 = 3000000;

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const asUpdatedById = localStorage.getItem('Id');
  const asTeacherId = sessionStorage.getItem('TeacherId');
  // const SiteURL = localStorage.getItem('SiteURL');
  const [SubjectList, setSubjectList] = useState([]);
  // const asFolderName = localStorage.getItem('FolderName');
  // let asFolderName = SiteURL.split('/')[SiteURL.split('/').length-1]
  const SiteURL = localStorage.getItem('SiteURL');
  let asFolderName = SiteURL.split('/')[SiteURL.split('/').length - 1];

  const SaveHomework = useSelector(
    (state: RootState) => state.AddHomework.ISSaveHomework
  );
  //console.log(SaveHomework, "SaveHomework....")
  const ClassSubject = useSelector(
    (state: RootState) => state.AddHomework.Subjectlist
  );
  //console.log(ClassSubject, "ClassSubject....")
  const AllPublishUnPublishHomework = useSelector(
    (state: RootState) => state.AddHomework.AllPublishUnpublishHomework
  );
  const HomeworkDetail: any = useSelector(
    (state: RootState) => state.AddHomework.GetHomeworkDetail
  );
  // console.log(HomeworkDetail, "HomeworkDetail..ssss..")
  const Subjectlistsforteacher = useSelector(
    (state: RootState) => state.AddHomework.SubjectListTeacher
  );
  // console.log(Subjectlistsforteacher, "Subjectlistsforteacher....")


  useEffect(() => {
    setSubjectList(Subjectlistsforteacher);
  }, [Subjectlistsforteacher]);
  const GetTeacherSubjectAndClassSubjectBody: IGetTeacherSubjectAndClassSubjectBody =
  {
    asSchoolId: asSchoolId,
    aTeacherId: Number(asTeacherId),
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: StandardDivisionId
  };

  useEffect(() => {
    if (AllPublishUnPublishHomework != '') {
      toast.success(AllPublishUnPublishHomework);
    }

    setOpen(false);
  }, [AllPublishUnPublishHomework]);

  const GetSubjectListForTeacherBody: IGetSubjectListForTeacherBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: StandardDivisionId,
    asHomeWorkStatus: 'All',
    asHomeworkTitle: '',
    asAssignedDate: '2023-04-18 00:00:00'
  };
  // useEffect(() => {
  //   const today = new Date().toISOString().split('T')[0];
  //   setAssignedDate(today);
  // }, []);
  useEffect(() => {
    dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));
  }, []);
  //dropdown
  useEffect(() => {
    dispatch(SubjectListforTeacherDropdown(GetTeacherSubjectAndClassSubjectBody));
  }, []);
  // useEffect(() => {
  //     dispatch(PublishUnpublishAllHomework(AllPublishUnpublishAddHomeworkBody))
  // }, []);
  const clickSubjectList = (value) => {
    setSubjectId(value);
  };
  const ChangeFile = (value) => {
    setFile(value.Name);
    setbase64URL(value.Value);
    setFileName(value.Name);
  };
  const ChangeFile1 = (value) => {
    setFile1(value.Name);
    setbase64URL1(value.Value);
    setFileName1(value.Name);
  };

  const HomeworkSaveBody: ISaveHomeworkBody = {
    asTitle: Title,
    asSubjectId: Number(subjectId),
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
    additionalAttachmentFile: [{ FileName: File1, Base64URL: base64URL1 }],
    AsId: 0
  };


  const SaveFile = () => {
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
    else if (base64URL1 == '') {
      setErrorbase64URL1('Field should not be blank')
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
      toast.success(SaveHomework);
    }
  }, [SaveHomework]);

  const getIsPublish = (Id) => {
    let IsPublish = false;

    SubjectList.forEach((item) => {
      if (item.Id.toString() === Id.toString()) {
        IsPublish = item.Text4 === 'False' ? false : true;
      }
    });

    return IsPublish;
  };

  const clickPublishUnpublish = (IsPublish) => {

    const AllPublishUnpublishAddHomeworkBody: IAllPublishUnpublishAddHomeworkBody =
    {
      asSchoolId: asSchoolId.toString(),
      asAcademicYearId: asAcademicYearId.toString(),
      asHomeWorkLogId: getSelectedSubject(),
      asUnpublishReason: 'Yesss',
      asUpdatedById: TeacherId,
      IsPublished: IsPublish,
      IsSMSSent: 1
    };

    dispatch(PublishUnpublishAllHomework(AllPublishUnpublishAddHomeworkBody));
    // dispatch(Publishallreset());
    // dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));

    // }
  };

  const Back = () => {
    navigate('/RITeSchool/Teacher/AssignHomework', { state: { fromInternal: true } });
  };
  const clickTitle1 = (Id) => {
    navigate('/RITeSchool/Teacher/ViewHomework/' + encodeURL(Id), { state: { fromInternal: true } });
  };
  const Back1 = () => {
    navigate('/RITeSchool/Teacher/AddUnpublish1/' + encodeURL(Id), { state: { fromInternal: true } });
  };
  const Changevalue = (value) => {
    // setitemPublish(value);
    setSubjectList(value);
  };

  const getSelectedSubject = () => {
    let selectedValue = '';
    SubjectList.map((item) => {
      if (item.IsActive) selectedValue = selectedValue + ',' + item.Id;
    });
    //console.log(selectedValue, 'selectedValue');
    return selectedValue;
  };
  const ResetForm = () => {
    setSubjectId('');
    setTitle('');
    setAssignedDate('');
    setCompleteDate('');
    setFile('');
    setFile1('');
    setDetails('');
  };
  const onClickCancel = () => {
    ResetForm();
  };



  const clickEdit1 = (Id) => {
    const GetHomeworkDetailBody: IGetHomeworkDetailBody = {
      asSchoolId: asSchoolId,
      asAcademicyearId: asAcademicYearId,
      asHomeworkId: Number(Id),
    };
    dispatch(GetHomeworkDetailss(GetHomeworkDetailBody));
  };

  useEffect(() => {
    const GetHomeworkDetailBody: IGetHomeworkDetailBody = {
      asSchoolId: asSchoolId,
      asAcademicyearId: asAcademicYearId,
      asHomeworkId: Number(Id),
    };
    dispatch(GetHomeworkDetailss(GetHomeworkDetailBody));
  }, []);

  useEffect(() => {
    if (HomeworkDetail && HomeworkDetail.length > 0) {
      setHomeworkId(HomeworkDetail.Id.toString);
      setAttechment(HomeworkDetail[0].AttachmentPath);
      setAssignedDate(HomeworkDetail[0].AssignedDate);
      setCompleteDate(HomeworkDetail[0].CompleteByDate);
      setTitle(HomeworkDetail[0].Title);
      setDetails(HomeworkDetail[0].Details);
    }
  }, [HomeworkDetail]);

  const filteredSubjectList = SubjectList.filter((item) => item.Text1 !== SubjectId);

  useEffect(() => {
  }, [SubjectId, SubjectList]);
  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Assign Homework',
              path: '/RITeSchool/Teacher/AssignHomework'
            },
            { title: 'Add Homework', path: '/RITeSchool/Teacher/AddHomework' },
          ]}
          rightActions={
            <>
              <Box>
                <Tooltip
                  title={`Users can Add,Edit,Delete,Publish and Unpublish homework. And displays homework added by other teachers.`}
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
              {/* <Box>
              <Tooltip title={`Unpublish all changes`}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: red[700] }
                  }}
                  onClick={ClickOpenDialogbox}
                >
                  <UnpublishedIcon />
                </IconButton>
              </Tooltip>
            </Box> */}
              <Box>
                <Tooltip title={`Cancel`}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: grey[500],
                      height: '36px !important',
                      ':hover': { backgroundColor: red[600] }
                    }}
                    onClick={() => onClickCancel}
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
                    <SaveIcon onClick={SaveFile} />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          }
        />
        <Box sx={{ background: 'white', p: 2 }}>
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
              {/* <DropDown
                width={'100%'}
                itemList={ClassSubject}
                ClickItem={clickSubjectList}
                DefaultValue={SubjectId}
                Label={'Select Subject'}
                variant={'outlined'}
                size={'medium'}
              /> */}
              <SearchableDropdown
                ItemList={ClassSubject}
                onChange={clickSubjectList}
                defaultValue={SubjectId}
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
                  // console.log('StartDate :', e.target.value);
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
              // error={ErrorCompleteDate !== ''}
              // helperText={ErrorCompleteDate}
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
              {/* <SingleFile
                ValidFileTypes={ValidFileTypes1}
                MaxfileSize={MaxfileSize1}
                FileName={fileName1}
                ChangeFile={ChangeFile1}
                FileLabel={'Attachments'}
                width={'100%'}
                height={"52px"}
                isMandatory={false}
              /> */}
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
                value={Details}
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
                error={ErrorDetails !== ''}
                helperText={ErrorDetails}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ background: 'white', p: 2, mt: 2 }}>

          <HomeworkSubjectList selectedSubjectId={SubjectId} clickEdit1={clickEdit1} />

          {/* Subjectlistsforteacher={SubjectList
            .filter((item) => {
              return item.Text1 == SubjectId;
            })} */}
          <Box my={2}>
            <SubjectList1
              ItemList={filteredSubjectList}
              HeaderArray={HeaderPublish1}
              onChange={Changevalue}
              clickchange={''}
              clickTitle={clickTitle1}
            />
          </Box>
          <Box mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Button color={"primary"} variant={"contained"} onClick={() => clickPublishUnpublish(1)}>
              PUBLISH ALL
            </Button>
            <Button color={"primary"} variant={"contained"} onClick={ClickOpenDialogbox}>
              UNPUBLISH ALL
            </Button>
          </Box>
          {Open && (
            <AddUnpublish1
              open={Open}
              setOpen={setOpen}
              ClickCloseDialogbox={ClickCloseDialogbox}
              clickPublishUnpublish={clickPublishUnpublish}
            />
          )}
          {openUploadMultipleDialog && (
            <UploadMultipleDialog
              open={openUploadMultipleDialog}
              MultipleFiles={MultipleFiles}
              setOpen={setOpenUploadMultipleDialog}
              setMultipleFiles={setMultipleFiles}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default AddHomework;
