import Close from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Pagination,
  TextField,
  Tooltip,
  Typography,
  styled
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
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
import CommonPageHeader from '../CommonPageHeader';


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

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  const itemsPerPage = 20;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newGetAllHomeworkDailyLogsBody = { ...GetAllHomeworkDailyLogsBody, asStartIndex: startIndex, asEndIndex: endIndex };
    dispatch(getalldailylog(newGetAllHomeworkDailyLogsBody));
  }, [page]);


  const totalPages1 = Math.ceil(GetAllHomeworkDailyLogs[0]?.TotalRows / itemsPerPage);


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
        <CommonPageHeader
          navLinks={[
            { title: 'Assign Homework', path: '/extended-sidebar/Teacher/AssignHomework' },
            { title: 'Add Daily Log', path: '' }
          ]}
          rightActions={<>
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
          </>}
        />
        <Box sx={{ p: 2, backgroundColor: 'white' }}>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <TextField fullWidth label={'Class'} value={ClassName} />
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
            <Grid item xs={2} justifyContent={'center'} display={'flex'} alignItems={'center'}>
              <SingleFile
                ValidFileTypes={ValidFileTypes}
                MaxfileSize={MaxfileSize}
                ChangeFile={ChangeFile}
                FileName={fileName}
              />
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
            <Grid item xs={12}  >
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
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', mt: 2 }}>
                  {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                    Select a page:
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button value={"1"} onClick={() => handlePageChange("1")}>1</Button>
                      <Button value={"2"} onClick={() => handlePageChange("2")}>2</Button>
                      <Button value={"3"} onClick={() => handlePageChange("3")}>3</Button>
                      <Button value={"4"} onClick={() => handlePageChange("4")}>4</Button>
                    </ButtonGroup>
                  </Box> */}
                  {/* Refer this documentation to make it functional: https://mui.com/material-ui/react-pagination/ */}
                  <Pagination
                    count={5}
                    variant={"outlined"}
                    shape='rounded' showFirstButton
                    showLastButton
                    onChange={(event, value) => {
                      handlePageChange(value);
                    }}
                  />
                </Box>

              ) : (
                <b />
              )}

              <Box sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right', textAlign: 'right' }}>
                Page {page} of 5
              </Box>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </>
  );
};

export default AddDailyLog;
