import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import Close from '@mui/icons-material/Close';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  IDeleteHomeworkDailyLogBody,
  IGetAllHomeworkDailyLogsBody,
  IGetHomeworkDailyLogBody,
  IPublishUnpublishHomeworkDailylogBody,
  ISaveDailyLogBody,
} from 'src/interfaces/AddDailyLog/IAddDailyLog';
import SingleFile from 'src/libraries/File/SingleFile';
import Adddailyloglist from 'src/libraries/ResuableComponents/Adddailyloglist';
import {
  PublishUnpublishHomework,
  ResetDeleteLog,
  Savedailylog,
  deletedailylog,
  getalldailylog,
  getdailylog,
  resetMessage,
  resetPublishUnpublish
} from 'src/requests/AddDailyLog/RequestAddDailyLog';
import { RootState } from 'src/store';


const DatePicker = styled(TextField)``;
const AddDailyLog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Id, ClassName } = useParams();
  const [dateState, setDateState] = useState('');
  const [dateSearch, setDateSearch] = useState('');
  const [dateSearchError, setDateSearchError] = useState('');
  const [dateError, setDateError] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileNameError, setFileNameError] = useState('');
  const [base64URL, setbase64URL] = useState('');
  const [LogId, setLogId] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const MaxfileSize = 5000000;
  const startIndex = (page - 1) * 20;
  const endIndex = startIndex + 20;
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const SiteURL = localStorage.getItem('SiteURL');
  let asFolderName = SiteURL.split('/')[SiteURL.split('/').length - 1];
  const [isPublish, setIsPublish] = useState(true);

  //useSelector
  const SaveDailyLog = useSelector(
    (state: RootState) => state.AddDailyLog.Savelog
  );
  const GetAllHomeworkDailyLogs: any = useSelector(
    (state: RootState) => state.AddDailyLog.GetAllHomework
  );
  const GetHomeworkDailyLogs: any = useSelector(
    (state: RootState) => state.AddDailyLog.GetHomeworkDailyLog
  );
  const DeleteHomeworkDailyLogs: any = useSelector(
    (state: RootState) => state.AddDailyLog.DeleteHomework
  );
  const PublishUnpublishHomeworkDailylog: any = useSelector(
    (state: RootState) => state.AddDailyLog.PublishUnpublish
  );

  const GetFileUS: any = useSelector(
    (state: RootState) => state.AddDailyLog.ISGetfile
  );



  const [HeaderPublish, setHeaderPublish] = useState([
    { Id: 1, Header: 'Date', SortOrder: " Desc" },
    { Id: 2, Header: 'Attachment' },
    { Id: 3, Header: 'Publish / UnPublish' },
    { Id: 4, Header: 'Edit', align: 'center' },
    { Id: 5, Header: 'Delete', align: 'center' }
  ]);

  const ValidFileTypes = [
    'BMP',
    'DOC',
    'DOCX',
    'JPG',
    'JPEG',
    'PNG',
    'BMP',
    'PDF',
    'XLS',
    'XLSX'
  ];

  //PaylodBody
  const SaveDailylogBody: ISaveDailyLogBody = {
    aHomeWorkLogId: LogId,
    asStdDivId: Number(Id),
    asDate: dateState,
    asAttachmentName: fileName == '' ? null : fileName,
    asSchoolId: asSchoolId,
    asAcademicYearId: Number(asAcademicYearId),
    asInsertedById: TeacherId,
    asSaveFeature: 'Assign Homework',
    asFolderName: 'PPSN Website',
    asBase64String: base64URL == '' ? null : base64URL
  };

  const GetAllHomeworkDailyLogsBody: IGetAllHomeworkDailyLogsBody = {
    asSchoolId: asSchoolId,
    asFilter: dateSearch,
    asStdDivId: Number(Id),
    asSortExpression: 'Date ' + HeaderPublish[0].SortOrder,
    asStartIndex: startIndex,
    asEndIndex: endIndex,
    asUserId: asUserId
  };

  //Pageload
  const Changestaus1 = (value, IsPublish) => {
    const PublishUnpublishHomeworkDailylogBody: IPublishUnpublishHomeworkDailylogBody =
    {
      asSchoolId: Number(asSchoolId),
      asAcademicYearId: Number(asAcademicYearId),
      asLogId: value,
      asUpdatedById: TeacherId,
      asIsPublished: IsPublish == 'False' ? true : false
    };

    dispatch(PublishUnpublishHomework(PublishUnpublishHomeworkDailylogBody));

  };

  const Changestaus = (value, isPublish) => {
    const handleAction = () => {
      const PublishUnpublishHomeworkDailylogBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asLogId: value,
        asUpdatedById: TeacherId,
        asIsPublished: isPublish === 'False' ? true : false
      };

      dispatch(PublishUnpublishHomework(PublishUnpublishHomeworkDailylogBody));
    };


    const confirmationMessage = isPublish === 'False'
      ? 'Are you sure you want to Publish Record?'
      : 'Are you sure you want to Unpublish Record?';

    if (window.confirm(confirmationMessage)) {
      handleAction();
    }
  };




  useEffect(() => {
    dispatch(getalldailylog(GetAllHomeworkDailyLogsBody));
  }, [HeaderPublish, page]);

  const handlePageChange = (event) => {
    const newPage = event.target.value;
    setPage(newPage);
    dispatch(getalldailylog(GetAllHomeworkDailyLogsBody));
  };

  useEffect(() => {
    if (GetAllHomeworkDailyLogs.length > 0) {
      const totalRows = GetAllHomeworkDailyLogs[0].TotalRows;
      const totalPages = Math.ceil(totalRows / 20);
      setTotalPages(totalPages);
    }

  }, [GetAllHomeworkDailyLogs]);

  useEffect(() => {
    if (PublishUnpublishHomeworkDailylog != '') {
      toast.success(PublishUnpublishHomeworkDailylog);
      dispatch(resetPublishUnpublish());
      dispatch(getalldailylog(GetAllHomeworkDailyLogsBody));
    }
  }, [PublishUnpublishHomeworkDailylog]);

  // useEffect(() => {
  //   if (PublishUnpublishHomeworkDailylog != 'false') {
  //     if (PublishUnpublishHomeworkDailylog == "Log published successfully.")
  //       toast.success("Log published successfully.");
  //     else
  //       toast.success('Log unpublished successfully');
  //       dispatch(resetPublishUnpublish());
  //     dispatch(getalldailylog(GetAllHomeworkDailyLogsBody));
  //   }
  // }, [PublishUnpublishHomeworkDailylog]);




  let d = '';
  useEffect(() => {
    console.log(GetHomeworkDailyLogs, 'GetStudentDetail');
    if (GetHomeworkDailyLogs.length > 0) {
      let da = GetHomeworkDailyLogs[0].Date.split(' ')[0];
      let dateFormat =
        da.split('-')[2] + '-' + da.split('-')[1] + '-' + da.split('-')[0];
      setDateState(dateFormat);
      setFileName(GetHomeworkDailyLogs[0].AttchmentName)
    }
  }, [GetHomeworkDailyLogs]);
  //functions
  const clickEdit1 = (value) => {
    setLogId(value);
    const GetHomeworkDailyLogsBody: IGetHomeworkDailyLogBody = {
      asSchoolId: Number(asSchoolId),
      asAcademicYearId: Number(asAcademicYearId),
      aId: value
    };
    dispatch(getdailylog(GetHomeworkDailyLogsBody));
  };

  const clickDelete = (value) => {
    if (confirm('Are you sure you want to delete this record?')) {
      const DeleteLog: IDeleteHomeworkDailyLogBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asId: value,
        asUpdatedById: TeacherId
      };
      dispatch(deletedailylog(DeleteLog));
    }

  };

  useEffect(() => {
    if (DeleteHomeworkDailyLogs !== '') {
      toast.success(DeleteHomeworkDailyLogs, { toastId: 'success1' });
      dispatch(ResetDeleteLog());
      dispatch(getalldailylog(GetAllHomeworkDailyLogsBody));
    }
  }, [DeleteHomeworkDailyLogs])

  const clickFileName = (value) => {
    if (GetFileUS !== '') {
      window.open(
        localStorage.getItem('SiteURL') +
        '/RITeSchool/DOWNLOADS/Homework/DailyLog/' +
        value
      );
    }
  };

  const onClickBack = () => {
    navigate('/extended-sidebar/Teacher/AssignHomework');
  };

  const handleChange = (e) => {
    const selectedDate = e.target.value;
    setDateState(selectedDate);
    if (!selectedDate) {
      setDateError('Date should not be blank.');
    } else {
      const currentDate = new Date();
      const selectedDateObj = new Date(selectedDate);

      if (selectedDateObj > currentDate) {
        setDateError('Future dates are disabled.');
      } else {
        const selectedDay = selectedDateObj.getDay();
        if (selectedDay === 0 || selectedDay === 6) {
          setDateError('Weekend dates are not allowed.');
        } else {
          setDateError('');
        }
      }
    }
  };



  const onSelectDate = (value) => {
    setDateSearch(value);

  };

  const ChangeFile = (value) => {
    setFileName(value.Name);
    setbase64URL(value.Value);
  };

  const ResetForm = () => {
    setDateState('');
    setFileName('');
    setbase64URL('');
    setLogId(0);
  };
  const onClickCancel = () => {
    ResetForm();
  };
  const onClickSave = () => {
    let isError = false;
    if (dateState === '') {
      setDateError('Date should not be blank.');
      isError = true;
    } else {
      const selectedDay = new Date(dateState).getDay();
      if (selectedDay === 0 || selectedDay === 6) {
        setDateError('Weekend dates are not allowed.');
        isError = true;
      } else {
        setDateError('');
      }
    }

    if (!isError) {
      dispatch(Savedailylog(SaveDailylogBody));
      ResetForm();
    }
  };
  useEffect(() => {
    if (SaveDailyLog != '') {
      if (SaveDailyLog == "Record for given date is already exist.")
        toast.error(SaveDailyLog);
      else
        toast.success(SaveDailyLog);
      dispatch(resetMessage());
      dispatch(getalldailylog(GetAllHomeworkDailyLogsBody));
    }
  }, [SaveDailyLog]);



  useEffect(() => {
    const getCurrentDateTime = () => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      setDateState(formattedDate);
    };

    getCurrentDateTime();
  }, []);


  const onClickSearch = () => {

    const currentDate = new Date();
    const selectedDateObj = new Date(dateSearch);

    if (selectedDateObj > currentDate) {
      setDateSearchError('Future dates are disabled.');
    } else {
      setDateSearchError('');
      dispatch(getalldailylog(GetAllHomeworkDailyLogsBody));
    }
  };

  const ClickHeader = (value) => {
    setHeaderPublish(value)
  }

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
                Add Daily Log
              </Typography>
            </Breadcrumbs>
          </Box>
          <Stack direction={'row'} gap={1}>
            <Box>
              <Tooltip
                title={
                  'Display / Add / Edit / Delete homework log of respective class.'
                }
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
              <Tooltip
                title={
                  'Cancel'
                }
              >
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: red[600] }
                  }}
                  onClick={onClickCancel}
                >
                  <Close />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip
                title={
                  LogId > 0 ? 'Update' : 'Save'
                }
              >
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: green[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: green[600] }
                  }}
                  onClick={onClickSave}
                >
                  <Save />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
        <Box sx={{ mt: 2, p: 2, backgroundColor: 'white' }}>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <TextField fullWidth label={'Class'} value={ClassName} sx={{ bgcolor: '#e3f2fd' }} />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                type="date"
                value={dateState}
                label={
                  <span>
                    Date <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                onChange={handleChange}
                error={dateError !== ''}
                helperText={dateError}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: new Date().toISOString().split('T')[0] }}
              />
            </Grid>
            <Grid item xs={2} justifyContent={'center'} display={'flex'} alignItems={'center'} sx={{ marginTop: '5px' }}>
              <SingleFile
                ValidFileTypes={ValidFileTypes}
                MaxfileSize={MaxfileSize}
                ChangeFile={ChangeFile}
                FileName={fileName}
              />
            </Grid>

            <Grid item xs={12}>

            </Grid>
          </Grid>
        </Box>
        <hr style={{ margin: '20px 0' }} />
        <Box sx={{ mt: 2, backgroundColor: 'white', p: 2 }}>
          <Grid
            container
            spacing={1}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  width: '100%',
                  justifyContent: 'flex-end'
                }}
              >

                <Box>
                  <DatePicker
                    fullWidth
                    value={dateSearch}
                    type="date"
                    onChange={(e) => {
                      onSelectDate(e.target.value);
                    }}
                    size="small"
                    sx={{
                      width: '180px',
                      backgroundColor: 'white',
                      '& .MuiInputBase-input': {
                        fontWeight: 'bold'
                      }
                    }}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ max: new Date().toISOString().split('T')[0] }}
                  />
                </Box>
                <Box>
                  <Button
                    variant={'contained'}
                    startIcon={<SearchTwoTone />}
                    onClick={onClickSearch}
                  >
                    SEARCH
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {GetAllHomeworkDailyLogs.length > 0 ? (
                <Adddailyloglist
                  ItemList={GetAllHomeworkDailyLogs}
                  clickView={clickFileName}
                  HeaderArray={HeaderPublish}
                  ClickHeader={ClickHeader}
                  clickEdit={clickEdit1}
                  clickDelete={clickDelete}
                  clickpublish={(value, isPublish) => Changestaus(value, isPublish)}
                />
              ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                  <b>No Record Found.</b>
                </Typography>

              )}
              {GetAllHomeworkDailyLogs.length > 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Select a page:
                    <TextField
                      sx={{ width: '80px' }}
                      value={page}
                      select={true}
                      size={'small'}
                      onChange={handlePageChange}
                    >
                      <MenuItem value={"1"}>
                        1
                      </MenuItem>
                      <MenuItem value={"2"}>
                        2
                      </MenuItem>
                      <MenuItem value={"3"}>
                        3
                      </MenuItem>
                      <MenuItem value={"4"}>
                        4
                      </MenuItem>
                      <MenuItem value={"5"}>
                        5
                      </MenuItem>
                    </TextField>
                  </Box>
                  <Box>
                    Page 1 of 5
                  </Box>
                </Box>
              ) : (
                <b />
              )}


            </Grid>
          </Grid>
        </Box>

      </Container>
    </>
  );
};

export default AddDailyLog;
