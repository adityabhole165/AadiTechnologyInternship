import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import HomeworkSubjectList from 'src/components/AssignHomework/HomeworkSubjectList';
import {
  IAllPublishUnpublishAddHomeworkBody,
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
  SubjectListforTeacher
} from 'src/requests/AssignHomework/requestAddHomework';
import { RootState } from 'src/store';
import AddUnpublish1 from './AddUnpublish1';
const AddHomework = () => {
  const { ClassId, ClassName, TeacherId, TeacherName, SubjectName, Id } =
    useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [HomeworkS, setHomeworkS] = useState('0');
  const [AssignHomeworkList, setAssignHomeworkList] = useState([]);
  const [Status, setStatus] = useState('');
  const [Title, setTitle] = useState('');
  const [Subject, setSubjectName] = useState('');
  const [SubjectId, setSubjectId] = useState('');
  const [ErrorSubjectlist, ErrorsetSubjectlist] = useState('');
  const [ErrorTitle, setErrorTitle] = useState('');
  const [SearchText, setSearchText] = useState('');
  const [AssignedDate, setAssignedDate]: any = useState('');
  const [ErrorAssignedDate, setErrorAssignedDate]: any = useState('');
  const [CompleteDate, setCompleteDate] = useState('');
  const [ErrorCompleteDate, setErrorCompleteDate] = useState('');
  const [Attachment, setAttechment] = useState('');
  const [Details, setDetails] = useState('');
  const [File, setFile] = useState('');
  const [ErrorFile, ErrorsetFile] = useState('');
  const [File1, setFile1] = useState('');
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
  const HeaderPublish1 = [
    { Id: 1, Header: ' 	' },
    { Id: 2, Header: 'SR.No 	' },
    { Id: 3, Header: 'Subject' },
    { Id: 4, Header: 'Title' },
    { Id: 5, Header: 'Is Published? ' },
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
    (state: RootState) => state.AddHomework.SaveHomework
  );
  //console.log(SaveHomework, "SaveHomework....")
  const ClassSubject = useSelector(
    (state: RootState) => state.AddHomework.Subjectlist
  );
  //console.log(ClassSubject, "ClassSubject....")
  const AllPublishUnPublishHomework = useSelector(
    (state: RootState) => state.AddHomework.AllPublishUnpublishHomeworkT
  );
  console.log(AllPublishUnPublishHomework, 'AllPublishUnPublishHomework....');
  const HomeworkDetail = useSelector(
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
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setAssignedDate(today);
  }, []);
  useEffect(() => {
    dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));
  }, []);
  useEffect(() => {
    dispatch(SubjectListforTeacher(GetTeacherSubjectAndClassSubjectBody));
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
  };
  const ChangeFile1 = (value) => {
    setFile1(value.Name);
    setbase64URL1(value.Value);
  };
  const SaveFile = () => {
    const HomeworkSaveBody: ISaveHomeworkBody = {
      asTitle: Title,
      asSubjectId: Number(SubjectId),
      asStandardDivisionId: StandardDivisionId,
      asAttachmentPath: File,
      asDetails: Details,
      asAssignDate: AssignedDate,
      asCompleteByDate: CompleteDate,
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asInsertedById: Number(asTeacherId),
      asFileName: File1,
      asSaveFeature: 'Homework',
      asFolderName: 'PPSN Website',
      asBase64String: base64URL,
      asBase64String2: base64URL1
    };
    dispatch(HomeworkSave(HomeworkSaveBody));
  };

  // const SaveFile = () => {
  //     let isError = false;
  //     if (ErrorAssignedDate == '') {
  //          setErrorAssignedDate('Field should not be blank')
  //       isError = true

  //     } else if (CompleteDate == '') {
  //         setErrorCompleteDate('Field should not be blank')
  //       isError = true
  //     }
  //    else if (base64URL == '') {
  //     setErrorbase64URL('Field should not be blank')
  //     isError = true
  //   }
  //   else if (base64URL1 == '') {
  //     setErrorbase64URL1('Field should not be blank')
  //     isError = true
  //   }
  //   else if (Details == '') {
  //     setErrorDetails('Field should not be blank')
  //     isError = true
  //   }

  //     if (!isError) {
  //     dispatch(HomeworkSave(HomeworkSaveBody))
  //     }

  //     // if (!isError) {
  //     //   ResetForm()
  //     // }
  //   }
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

    // }
  };

  const Back = () => {
    navigate('/extended-sidebar/Teacher/AssignHomework');
  };
  const clickTitle1 = (Id) => {
    navigate('/extended-sidebar/Teacher/ViewHomework/' + Id);
  };
  const Back1 = () => {
    navigate('/extended-sidebar/Teacher/AddUnpublish1/' + Id);
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
    console.log(selectedValue, 'selectedValue');
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
  // const getSelectedSubject = () => {
  //   let selectedValue = SubjectList.filter((item) => item.IsActive)
  //     .map((item) => item.Id)
  //     .join(',');

  //   return selectedValue;
  // };

  return (
    <>
      <Container maxWidth={'xl'}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{
            pt: 4,
            pb: 2
          }}
        >
          <Box>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<ChevronRightTwoTone />}
            >
              <Link
                to={'/extended-sidebar/landing/landing'}
                color="inherit"
                style={{ textDecoration: 'none' }}
              >
                <IconButton
                  sx={{
                    background: (theme) => theme.palette.common.white,
                    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)'
                  }}
                >
                  <HomeTwoTone color="primary" />
                </IconButton>
              </Link>
              <Link
                to={'/extended-sidebar/Teacher/AssignHomework'}
                style={{
                  textDecoration: 'none'
                }}
              >
                <Typography
                  variant={'h3'}
                  fontSize={'23px'}
                  fontWeight={'normal'}
                  color={'text.primary'}
                  sx={{
                    '&:hover': {
                      fontWeight: 'bold'
                    }
                  }}
                >
                  Assign Homework
                </Typography>
              </Link>
              <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
                Add Homework
              </Typography>
            </Breadcrumbs>
          </Box>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Box>
              <Tooltip
                title={`Users can Add/Edit/Delete/Publish and Unpublish homework. And displays homework added by other teachers.`}
              >
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: 'gray',
                    height: '36px !important',
                    ':hover': { backgroundColor: 'gray' }
                  }}
                >
                  <QuestionMarkIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={`Unpublish all changes`}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: 'grey',
                    height: '36px !important',
                    ':hover': { backgroundColor: red[700] }
                  }}
                  onClick={ClickOpenDialogbox}
                >
                  <UnpublishedIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={`Publish all changes`}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: green[600],
                    height: '36px !important',
                    ':hover': { backgroundColor: green[700] }
                  }}
                  onClick={() => clickPublishUnpublish(1)}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
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
                ChangeFile={ChangeFile}
                width={'100%'}
                isMandatory={false}
              />
            </Grid>
            <Grid item xs={3}>
              <SingleFile
                ValidFileTypes={ValidFileTypes1}
                MaxfileSize={MaxfileSize1}
                ChangeFile={ChangeFile1}
                width={'100%'}
                isMandatory={false}
              />
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
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <Button onClick={SaveFile} variant="contained">
                Save
              </Button>
              <Button
                color={'error'}
                onClick={onClickCancel}
                variant="contained"
              >
                Cancel
              </Button>
              {/* <Button color={'error'} onClick={Back} variant="contained">
                Back
              </Button> */}
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ background: 'white', p: 2, mt: 2 }}>
          <HomeworkSubjectList />
          <Box my={2}>
            <SubjectList1
              ItemList={SubjectList.filter((item) => {
                return item.SubjectId !== SubjectId;
              })}
              HeaderArray={HeaderPublish1}
              onChange={Changevalue}
              clickchange={''}
              clickTitle={clickTitle1}
            />
          </Box>
          <Dialog open={Open} onClose={ClickCloseDialogbox}>
            <DialogContent>
              <AddUnpublish1
                ClickCloseDialogbox={ClickCloseDialogbox}
                clickPublishUnpublish={clickPublishUnpublish}
              />
            </DialogContent>
          </Dialog>

        </Box>
      </Container>
    </>
  );
};

export default AddHomework;
