import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Card,
  Grid,
  Hidden,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApiDeleteMessagePermanently from 'src/api/MessageCenter/ApiDeleteMsgPermanently';
import MoveToTrashApi from 'src/api/MessageCenter/MoveToTrash';
import { Styles } from 'src/assets/style/student-style';
import { AlertContext } from 'src/contexts/AlertContext';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import { IDeleteDraftMessageBody } from 'src/interfaces/MessageCenter/IDraftMessage';
import { IGetAllMonths, Iyears } from 'src/interfaces/MessageCenter/Search';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import MCForm from 'src/libraries/form/MCForm';
import SelectList3Col from 'src/libraries/list/SelectList3Col';
import { RootWrapper } from 'src/libraries/styled/CardStyle';
import {
  DeleteButton
} from 'src/libraries/styled/CommonStyle';
import {
  ReadUnReadstatus,
  getAcademicYearList,
  getMonthYearList,
  resetMessageReadUnReadstatus
} from 'src/requests/MessageCenter/MessaageCenter';
import { getDeleteMessagePermantely } from 'src/requests/MessageCenter/RequestDeleteMessagePermanently';
import {
  getDeleteDraftMessage,
  resetDeleteDraftMessage
} from 'src/requests/MessageCenter/RequestDraftMessage';
import { getListOfMessages } from 'src/requests/Student/InboxMessage';
import { RootState } from 'src/store';
import { getDateFormat1 } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import CardMessDeleteButtons from './CardMessDeleteButtons';
import CardMessage from './CardMessage';
import EmailSettingsDialog from './EmailSetting';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '61px',
  color: 'black',
  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
}));

const NextPageIndex = 2; // Initial page index

const MessageList = () => {
  const pathname = window.location.pathname;
  const pageName =
    pathname.indexOf('/extended-sidebar/MessageCenter/msgCenter/') === -1
      ? pathname.replace('/extended-sidebar/MessageCenter/msgCenter', '')
      : pathname.replace('/extended-sidebar/MessageCenter/msgCenter/', '');

  const dispatch = useDispatch();
  const classes = Styles();
  const SchoolId = localStorage.getItem('localSchoolId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asUserid = sessionStorage.getItem('Id');

  const [pageIndex, setpageIndex] = useState<number>(NextPageIndex); // Page index
  const [activeTab, setActiveTab] = useState('');
  // const [searchText, setSearchText] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [searchText, setSearchText] = useState('');
  const [operator, setOperator] = useState('=');
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  // const [operator, setOperator] = useState('');
  const [searchDate, setSearchDate] = useState<string>('');
  const [showSearch, setShowSearch] = useState(false);
  const [inboxListData, setInboxListData] = useState([]);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [nextPageData, setNextPageData] = useState<any>();
  const [ToolTip, setToolTip] = useState<boolean>(true);
  const [displayMoveToTop, setdisplayMoveToTop] = useState<string>('none');
  const [isRefresh, setIsRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { showAlert, closeAlert } = useContext(AlertContext);

  const AcademicYearList = useSelector(
    (state: RootState) => state.MessageCenter.YearsList
  );
  const MonthYearList = useSelector(
    (state: RootState) => state.MessageCenter.AllMonthList
  );
  const InboxList = useSelector(
    (state: RootState) => state.InboxMessage.InboxList
  );

  const MarkAsRead = useSelector(
    (state: RootState) => state.InboxMessage.UnReadMessage
  );
  const TrashMarkAsUnRead = useSelector(
    (state: RootState) => state.InboxMessage.trashUnReadMessage
  )
  const totalCountLabelInbox = useSelector(
    (state: RootState) => state.InboxMessage.TotalCountLabel
  )

  const StatusReadUnread = useSelector(
    (state: RootState) => state.MessageCenter.ReadUnReadStatus
  );

  const NextInboxList = useSelector(
    (state: RootState) => state.InboxMessage.NextPageList
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.InboxMessage.Loading
  );
  const DeletePermanently = useSelector(
    (state: RootState) =>
      state.DeleteMessagePermanetly.DeleteMessagePermanentlyList
  );
  const DeleteDraftM = useSelector(
    (state: RootState) => state.DraftMessages.DeleteDraftMessage
  );

  const IfMonthEmpty = monthYear == '' ? '0' : monthYear;



  let displayedList = [];
  let totalCountLabel = 0;

  switch (activeTab) {
    case 'Inbox':
      displayedList = inboxListData;
      totalCountLabel = totalCountLabelInbox || 0;
      break;

    case 'Sent':
      displayedList = inboxListData;
      totalCountLabel = inboxListData[0]?.TotalCountLabel || 0;
      break;

    case 'Trash':
      displayedList = inboxListData;
      totalCountLabel = inboxListData[0]?.TotalCountLabel || totalCountLabelInbox || 0;
      break;

    case 'Draft':
      displayedList = inboxListData;
      totalCountLabel = totalCountLabelInbox || 0;
      break;

    default:
      displayedList = inboxListData;
      totalCountLabel = totalCountLabelInbox || 0;
  }

  const [SortExp, setSortExp] = useState('Insert_Date')
  const [SortDirection, setSortDirection] = useState('DESC')
  const getListBody: IgetList = {
    asSchoolId: SchoolId,
    asAcademicYearId: academicYear,
    asUserId: sessionStorage.getItem('Id'),
    asUserRoleId: sessionStorage.getItem('RoleId'),
    abIsSMSCenter: '0',
    asFilter: searchText,
    asPageIndex: 1,
    asMonthId: IfMonthEmpty,
    asOperator: operator,
    asDate: searchDate,
    asSortExp: SortExp,
    asSortDirection: SortDirection
  };

  const clickSortExp = (value) => {
    setSortExp(value)
    console.log(value, "clickSortExp");

  }
  const clickSortDirection = (value) => {
    setSortDirection(value)
  }
  const getMsgBody = (searchtext, monthyear) => {
    return {
      asSchoolId: SchoolId,
      asAcademicYearId: academicYear,
      asUserId: sessionStorage.getItem('Id'),
      asUserRoleId: sessionStorage.getItem('RoleId'),
      abIsSMSCenter: '0',
      asFilter: searchtext,
      asPageIndex: 1,
      asMonthId: monthyear
    };
  };

  const getDraftMsgBody = (searchtext, monthyear) => {
    return {
      asSchoolId: SchoolId,
      asAcademicYearId: academicYear,
      asUserId: sessionStorage.getItem('Id'),
      asUserRoleId: sessionStorage.getItem('RoleId'),
      abIsSMSCenter: '0',
      asFilter: '',
      asPageIndex: 1,
      asMonthId: '0',
      asDate: ''
    };
  };

  const body: Iyears = {
    asSchoolId: SchoolId
  };

  const Mbody: IGetAllMonths = {
    asAcademicYearId: academicYear,
    asSchoolId: SchoolId
  };

  const handleResize = () => {
    // setShowSearch(true)
    if (window.innerWidth < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  window.addEventListener('resize', handleResize);

  useEffect(() => {
    handleResize();
    dispatch(getAcademicYearList(body));
    setActiveTab(pageName === '' ? 'Inbox' : pageName);
    setAcademicYear(AcademicYearId);
  }, []);

  useEffect(() => {
    if (StatusReadUnread !== null) {
      toast.success(StatusReadUnread.UpdationMessage, { toastId: 'success1' });
      dispatch(resetMessageReadUnReadstatus());
      dispatch(getListOfMessages(getListBody, activeTab, false));
    }
  }, [StatusReadUnread]);

  useEffect(() => {
    setInboxListData(InboxList);
  }, [InboxList]);

  useEffect(() => {
    if (academicYear !== '') {
      dispatch(getMonthYearList(Mbody));
      // Reset month selection when the academic year changes
      setMonthYear('0');
    }
  }, [academicYear]);

  useEffect(() => {
    if (academicYear !== '') {
      dispatch(getListOfMessages(getListBody, activeTab, false));
    }
  }, [activeTab, isSearchClicked, isRefresh, SortExp, SortDirection]);

  const clickTab = (value) => {
    setActiveTab(value);
    setpageIndex(2)
  };
  const clickAcademicYear = (value) => {
    setAcademicYear(value);
    // Reset month selection when the academic year is changed
    setMonthYear('');
  };

  const clickMonthYear = (value) => {
    setMonthYear(value);
  };

  const clickDate = (value) => {
    setSearchDate(getDateFormat1(value));
  };
  const clickOperator = (value) => {
    setOperator(value);
  };
  // const textOnChange = (e) => {
  //   setSearchText(e.target.value);
  // };
  const textOnChange = (e) => {
    if (e.target.value.length <= 50) {
      setSearchText(e.target.value);
    }
  };
  const operatorArray = [
    { Name: '=', Value: '=' },
    { Name: '<', Value: '<' },
    { Name: '<=', Value: '<=' },
    { Name: '>', Value: '>' },
    { Name: '>=', Value: '>=' }
  ];

  const clickSearchIcon = () => {
    setShowSearch(!showSearch);
  };

  const permanentDelete = () => {
    let DetailsId = [];
    inboxListData.map((obj) => {
      if (obj.isActive) {
        DetailsId.push(obj.DetailsId);
      }
    });
    const delPermanentBody = {
      asSchoolId: SchoolId,
      asAcademicYearId: AcademicYearId,
      asUserId: asUserid,
      asMessageIds: DetailsId.join(',')
    };
    ApiDeleteMessagePermanently.DeleteMessagePermanentlyapi(delPermanentBody)
      .then((data) => {
        toast.success('Message deleted successfully.');
        dispatch(getDeleteMessagePermantely(delPermanentBody));

        dispatch(getListOfMessages(getListBody, activeTab, false));
      })
      .catch((err) => {
        alert('error network');
      });
  };
  const clickReadUnread = (ReadOrUnread) => {
    let arrMessageReceiverIds = [];
    inboxListData.map((obj) => {
      if (obj.isActive) {
        arrMessageReceiverIds.push(obj.ReceiverDetailsId);
      }
    });

    const UnreadReadStatus = {
      aiSchoolId: SchoolId,
      aiAcademicYearId: AcademicYearId,
      asMessageReceiverIds: arrMessageReceiverIds.join(','),
      aiReceiverUserId: asUserid,
      abMarkAsRead: ReadOrUnread == 'Read' ? 'true' : 'false'
    };
    dispatch(ReadUnReadstatus(UnreadReadStatus));
  };
  const clickDelete = () => {
    let arrDetails = [];
    let arrReciever = [];
    inboxListData.map((obj) => {
      if (obj.isActive) {
        arrDetails.push(obj.DetailsId);
        arrReciever.push(obj.ReceiverDetailsId);
      }
    });

    const trashbody: any = {
      asSchoolId: SchoolId,
      asMessageDetailsId: arrDetails.join(';'),
      asMessageRecieverDetailsId:
        activeTab == 'Inbox' || activeTab == 'Trash'
          ? arrReciever.join(';')
          : arrDetails.join(';'),
      asIsArchive: 'Y',
      asIsCompeteDelete: activeTab == 'Inbox' || activeTab == 'Sent' ? 0 : 1,
      asFlag: activeTab
    };
    MoveToTrashApi.MoveToTrash(trashbody)
      .then((data) => {
        if (activeTab == 'Inbox' || activeTab == 'Sent') {
          toast.success('Message(s) has been moved to the trash.');
        } else {
          toast.success('Message deleted successfully.');
        }
        dispatch(getListOfMessages(getListBody, activeTab, false));
      })
      .catch((err) => {
        alert('error network');
      });
  };

  const TrashDelete = () => {
    // if (confirm('Are you sure you want to delete the message permanently?')) {
    //   clickDelete();
    // } else {
    // }
    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete the selected message(s)?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        clickDelete();

        closeAlert();
      }
    });

  };


  //Un Delete from everyone function
  const clickUnDelete = () => {
    let DetailsId = [];
    let RecieverDetailsId = [];
    inboxListData.map((obj) => {
      if (obj.isActive) {
        DetailsId.push(obj.DetailsId);
        RecieverDetailsId.push(obj.ReceiverDetailsId);
      }
    });
    const UnDeleteMessagesBody = {
      asSchoolId: SchoolId,
      asMessageRecieverDetailsIds: RecieverDetailsId.join(','),
      asMessageDetailsIds: DetailsId.join(',')
    };
    ApiDeleteMessagePermanently.UnDeleteMessagesapi(UnDeleteMessagesBody)
      .then((data) => {
        toast.success('Message(s) undeleted successfully.');
        dispatch(getListOfMessages(getListBody, activeTab, false));
      })
      .catch((err) => {
        alert('error network');
      });
  };

  const ConfirmUndelete = () => {
    // if (confirm('Are you sure you want to undelete selected message(s)')) {
    //   clickUnDelete();
    // } else {
    // }
    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to un-delete the selected message(s)?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        clickUnDelete();
        closeAlert();
      }
    });
  };
  const DeletePermanent = () => {
    showAlert({
      title: 'Please Confirm',
      message:
        'This action will permanently delete selected message(s) from the sent message list of the current user as well as from the inbox of all related recipients (if unread). If any recipient reads the message, then that message will be visible in the sent message list of the current user. Do you want to continue?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',

      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        permanentDelete();
        closeAlert();
      }
    });
  };

  const clickReset = () => {
    setInboxListData(
      inboxListData.map((obj) => {
        return { ...obj, isActive: false };
      })
    );
  };

  const clickSearch = (
    searchText,
    academicYear,
    monthYear,
    operator,
    searchDate,
    isSearchClicked
  ) => {
    setSearchText(searchText);
    setAcademicYear(academicYear);
    setMonthYear(monthYear);
    setOperator(operator);
    setSearchDate(searchDate);
    setIsSearchClicked(isSearchClicked);
  };

  const refreshData = (value) => {
    setInboxListData(value);
  };

  const handleRefresh = () => {
    setIsRefresh(!isRefresh);
    setSearchText('');
    setAcademicYear(AcademicYearId);
    setMonthYear('');
    setOperator('');
    setSearchDate('');
  };

  const scrollableDivRefference = document.getElementById('ScrollableDiv');

  const pageIndexIncrement = (): void => {
    setpageIndex((prev) => {
      return pageIndex + 1;
    });
  };

  const scrolling = (target): void => {
    if (target.scrollTop >= 400) {
      setdisplayMoveToTop('flex');
    }
    if (target.scrollTop < 400) {
      setdisplayMoveToTop('none');
    }

    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 5) {
      const getListBody: IgetList = {
        asSchoolId: SchoolId,
        asAcademicYearId: academicYear,
        asUserId: sessionStorage.getItem('Id'),
        asUserRoleId: sessionStorage.getItem('RoleId'),
        abIsSMSCenter: '0',
        asFilter: searchText,
        asPageIndex: pageIndex,
        asMonthId: monthYear,
        asOperator: operator,
        asDate: searchDate,
        asSortExp: SortExp,
        asSortDirection: SortDirection
      };

      dispatch(getListOfMessages(getListBody, activeTab, true));

      pageIndexIncrement();
    }
  };
  useEffect(() => {
    if (NextInboxList.length > 0) {
      setInboxListData((prev) => {
        return [...inboxListData, ...NextInboxList];
      });
    }
  }, [NextInboxList]);
  const closeSearchBar = () => {
    setShowSearch(false);
    setAcademicYear(AcademicYearId);
    setMonthYear('');
    setSearchText('');
    if (activeTab === 'Draft') {
      dispatch(getListOfMessages(getDraftMsgBody('', ''), activeTab, false));
    } else {
      dispatch(getListOfMessages(getMsgBody('', ''), activeTab, false));
    }
  };

  const MoveToTop = (e) => {
    scrollableDivRefference.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setdisplayMoveToTop('none');
    }, 10);
  };
  const scrollToBottom = () => {
    const div = scrollableDivRefference;
    scrollableDivRefference.scrollTo({ top: div.scrollHeight, behavior: 'smooth' });
    refreshList()
  };
  const refreshList = () => {
    const getListBody: IgetList = {
      asSchoolId: SchoolId,
      asAcademicYearId: academicYear,
      asUserId: sessionStorage.getItem('Id'),
      asUserRoleId: sessionStorage.getItem('RoleId'),
      abIsSMSCenter: '0',
      asFilter: searchText,
      asPageIndex: pageIndex,
      asMonthId: monthYear,
      asOperator: operator,
      asDate: searchDate,
      asSortExp: SortExp,
      asSortDirection: SortDirection
    };

    dispatch(getListOfMessages(getListBody, activeTab, true));

    pageIndexIncrement();
  }
  const clickClear = () => {
    localStorage.setItem('ViewMessageData', '');
  };
  let navigate = useNavigate();

  const clickSetting = () => {
    navigate('/extended-sidebar/MessageCenter/EmailSetting');
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
    setIsRefresh(true);
  };

  const DeleteDraft = (ID) => {
    const DeleteDraftBody: IDeleteDraftMessageBody = {
      aiSchoolId: SchoolId,
      aiAcademicYearId: AcademicYearId,
      aiUserId: sessionStorage.getItem('Id'),
      aiDraftId: ID
    };
    // if (confirm('Are you sure you want to delete this record?')) {
    //   dispatch(getDeleteDraftMessage(DeleteDraftBody));
    // }
    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete this record?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(getDeleteDraftMessage(DeleteDraftBody));

        closeAlert();
      }
    });
  };

  useEffect(() => {
    if (DeleteDraftM !== '') {
      toast.success(DeleteDraftM, { toastId: 'success1' });
      // toast.success("Message deleted successfully.", { toastId: 'success1' })
      dispatch(resetDeleteDraftMessage());
      dispatch(getListOfMessages(getListBody, activeTab, false));
    }
  }, [DeleteDraftM]);

  const ClickOpenDialogbox = () => {
    setOpen(true);
  };
  const ClickCloseDialogbox = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader navLinks={[
          {
            title: 'Message Center',
            path: ''
          }
        ]}
          rightActions={
            <>
              <Box>
                <Tooltip
                  title={`Inbox - List of message Received. Select message(s) and click on "Delete" to send the message to trash box. Trash - List of Trash(deleted messages) messages. Select message and click on "Un-Delete" to move the message back to inbox. To permanently delete the message click on "Delete". Sent items - List of messages which you have sent.Select message(s) and click on "Delete" to send the message to trash box.`}
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
                <Hidden>
                  <Tooltip title="Setting">
                    <IconButton
                      sx={{
                        color: 'white',
                        mr: 1,
                        backgroundColor: grey[500],
                        '&:hover': {
                          backgroundColor: grey[600]
                        }
                      }}>
                      <SettingsIcon onClick={handleClickOpen}

                        fontSize="medium" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Refresh">
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: blue[500],
                        '&:hover': {
                          backgroundColor: blue[600]
                        }
                      }}>
                      <RefreshIcon
                        onClick={handleRefresh}
                        fontSize="medium"
                      />
                    </IconButton>
                  </Tooltip>
                </Hidden>

              </Box>
            </>
          }
        />
        {/* <Hidden smUp> */}
        {/* <Box sx={{ float: 'right' }}>
          <SettingsIcon onClick={clickSetting} fontSize="medium" />
          <RefreshIcon
            onClick={() => {
              setIsRefresh(!isRefresh);
            }}
            fontSize="medium"
          />
        </Box> */}
        {/* </Hidden> */}
        <Grid container columnGap={1}>
          <Grid item sm={1.7} xs={12} spacing={1}>
            <Hidden smDown>
              <RouterLink
                style={{ textDecoration: 'none', color: '#223354' }}
                to={`/${location.pathname.split('/')[1]
                  }/MessageCenter/Compose`}
              >
                <Card
                  onClick={clickClear}
                  sx={{
                    textAlign: 'center',
                    height: '80px',
                    backgroundColor: 'white',
                    mb: '10px',
                    borderRadius: '5px',
                  }}
                >

                  <AddCircleIcon
                    sx={{ mt: '10px', color: '#38548A' }}
                    className={classes.IconSize}
                  />
                  <br />
                  <b style={{ color: '#38548A' }}>Compose</b>
                </Card>
              </RouterLink>
            </Hidden>
            <Box>
              {!showSearch && (
                <CardMessage
                  activeTab={activeTab}
                  MarkAsRead={MarkAsRead}
                  TrashReadMessage={TrashMarkAsUnRead?.UnreadMessageTotalCount}
                  clickTab={clickTab}
                  clickSearchIcon={clickSearchIcon}
                />
              )}
            </Box>
          </Grid>
          <Grid container sm={10.3} spacing={1}>
            {((showSearch && isMobile) || !isMobile) && (
              <>
                <Grid item xs={12} sm={12} md={12}>
                  <MCForm
                    activeTab={activeTab}
                    AcademicYearList={AcademicYearList}
                    MonthYearList={MonthYearList}
                    operatorArray={operatorArray}
                    clickSearch={clickSearch}
                    academicYear={academicYear}
                    monthYear={monthYear}
                    operator={operator}
                    searchDate={searchDate}
                    searchText={searchText}
                    clickAcademicYear={clickAcademicYear}
                    clickMonthYear={clickMonthYear}
                    clickOperator={clickOperator}
                    clickDate={clickDate}
                    textOnChange={textOnChange}
                    isSearchClicked={isSearchClicked}
                    CloseSearchBar={closeSearchBar}
                  />
                </Grid>
                {/* <Grid item sm={3} md={2}>
                  <Hidden smDown>
                    <Box sx={{ mt: '15px' }}>
                      <ButtonPrimary
                        fullWidth
                        onClick={handleClickOpen}
                        endIcon={<SettingsIcon />}
                        sx={{ mb: '5px', height: '40px' }}
                      >
                        Setting
                      </ButtonPrimary>
                      <ButtonPrimary
                        fullWidth
                        onClick={() => {
                          setIsRefresh(!isRefresh);
                        }}
                        endIcon={<RefreshIcon />}
                        sx={{ height: '40px' }}
                      >
                        Refresh
                      </ButtonPrimary>
                    </Box>
                    <Dialog
                      open={open}
                      onClose={handleClickClose}
                      PaperProps={{ sx: { position: 'fixed', m: 0, p: 1 } }}
                    >
                      <EmailSettings />
                    </Dialog>
                  </Hidden>
                </Grid> */}
              </>
            )}
            <Grid item xs={12} >
              {inboxListData.some((obj) => obj.isActive === true) && (
                <>
                  <Box mb={2} sx={DeleteButton} >
                    <CardMessDeleteButtons
                      activeTab={activeTab}
                      clickReset={clickReset}
                      TrashDelete={TrashDelete}
                      ConfirmUndelete={ConfirmUndelete}
                      DeletePermanent={DeletePermanent}
                      clickDelete={clickDelete}
                      clickReadUnread={clickReadUnread}
                    />
                  </Box>
                  {/* <Box >
                    {activeTab == 'Inbox' && (
                      <Grid item
                        sx={MarkAsReadMessage} bgcolor={"white"} p={1} borderRadius={"10px"}>
                        <Button
                          endIcon={<MarkunreadIcon />}
                          onClick={() => {
                            clickReadUnread('Unread');
                          }}
                          sx={{
                            color: '#38548A',
                            //  backgroundColor: grey[500],
                            '&:hover': {
                              color: '#38548A',
                              borderRadius: '5px',
                              backgroundColor: grey[200]
                            }
                          }}
                        >
                          {' '}
                          Mark as Unread{' '}
                        </Button>
                        <Button
                          endIcon={<MarkEmailReadIcon />}
                          onClick={() => {
                            clickReadUnread('Read');
                          }}
                          sx={{
                            color: '#38548A',
                            //  backgroundColor: grey[500],
                            '&:hover': {
                              color: '#38548A',
                              borderRadius: '5px',
                              backgroundColor: grey[200]
                            }
                          }}
                        >
                          {' '}
                          Mark as Read
                        </Button>
                      </Grid>
                    )}
                  </Box> */}
                </>
              )}
            </Grid>

            <Grid item xs={12}>
              <RootWrapper>
                {loading ? (
                  <SuspenseLoader />
                ) : (
                  <div
                    id="ScrollableDiv"
                    onScroll={(event) => {
                      scrolling(event.target);
                    }}
                    style={{
                      paddingBottom: '100px',
                      height: '570px',
                      overflow: 'auto'
                    }}
                  >
                    {InboxList?.length === 0 ? (
                      // <Grid item sm={9}>
                      <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
                        No record found.
                      </Typography>
                      // </Grid>
                    ) : (<Grid container>
                      <Grid xs={12} sm={12} md={12} sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', padding: 1, borderRadius: 2, backgroundColor: 'White' }} >{inboxListData.length} Out of {totalCountLabel}</Typography>
                      </Grid>
                      <Grid xs={12} sm={12} md={12}>
                        <SelectList3Col
                          Itemlist={inboxListData}
                          ActiveTab={activeTab}
                          DeleteDraft={DeleteDraft}
                          refreshData={refreshData}
                          clickSortExp={clickSortExp}
                          clickSortDirection={clickSortDirection}
                          SortDirection={SortDirection}
                          SortExp={SortExp}
                        />
                      </Grid></Grid>
                    )}
                  </div>
                )}
                <Box
                  sx={{
                    isplay: displayMoveToTop,
                    position: 'fixed',
                    bottom: '95px',
                    zIndex: '1',
                    left: '15px',
                    p: '1px',
                    width: 50,
                    height: 80,
                    backgroundColor: 'white',
                    m: 2,
                    textAlign: 'center',
                    boxShadow: '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 1) !important',
                    borderRadius: '15px'
                    // boxShadow:
                    // '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
                  }}>
                  <KeyboardArrowUpRoundedIcon onClick={MoveToTop} fontSize="large"
                    color="success" />

                  <KeyboardArrowDownIcon onClick={scrollToBottom} fontSize="large"
                    color="success" />
                </Box>
                {/* <Box
                   sx={{
                    isplay: displayMoveToTop,
                    position: 'fixed',
                    bottom: '95px',
                    zIndex: '1',
                    left: '15px',
                    p: '1px',
                    width: 50,
                    height: 80,
                    m:2,
                    textAlign:'center',
                    boxShadow:'5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 1) !important',
                    borderRadius:'15px'
                    // boxShadow:
                      // '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
                  }}>
                    
                    <KeyboardArrowUpRoundedIcon fontSize="large"
                    color="success"
                    onClick={MoveToTop} // Close function
                
                    ></KeyboardArrowUpRoundedIcon>
                    
                    <KeyboardArrowDownIcon
                     fontSize="large"
                    color="success"
                    
                    ></KeyboardArrowDownIcon>
                  
                </Box> */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
                  {open && (
                    <EmailSettingsDialog
                      open={open}
                      setOpen={setOpen}
                    />
                  )}
                </Box>
                <span
                  style={{
                    width: '95px',
                    position: 'fixed',
                    bottom: '70px',
                    right: '60px'
                  }}
                >
                  <RouterLink
                    style={{ textDecoration: 'none' }}
                    to={`/${location.pathname.split('/')[1]
                      }/MessageCenter/Compose`}
                  >
                    <Item onClick={clickClear}
                      sx={{ fontSize: '10px', mr: 1, mb: '10px', borderRadius: '15px', backgroundColor: '#38548A', color: 'white' }}
                    >
                      <AddCircleIcon />
                      <br />
                      <b>Compose</b>
                    </Item>
                  </RouterLink>
                </span>
              </RootWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MessageList;
