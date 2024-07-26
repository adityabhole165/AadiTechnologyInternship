import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Avatar,
  Box,
  Card,
  Grid,
  Hidden,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApiDeleteMessagePermanently from 'src/api/MessageCenter/ApiDeleteMsgPermanently';
import MoveToTrashApi from 'src/api/MessageCenter/MoveToTrash';
import { Styles } from 'src/assets/style/student-style';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import { IDeleteDraftMessageBody } from 'src/interfaces/MessageCenter/IDraftMessage';
import { IGetAllMonths, Iyears } from 'src/interfaces/MessageCenter/Search';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import MCForm from 'src/libraries/form/MCForm';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { RootWrapper } from 'src/libraries/styled/CardStyle';
import {
  DeleteButton,
  MarkAsReadMessage
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
import SelectList3Col from '../../libraries/list/SelectList3Col';
import CommonPageHeader from '../CommonPageHeader';
import CardMessDeleteButtons from './CardMessDeleteButtons';
import CardMessage from './CardMessage';

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
  const [searchText, setSearchText] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [operator, setOperator] = useState('');
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
    asDate: searchDate
  };

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
      setMonthYear('');
    }
  }, [academicYear]);

  useEffect(() => {
    if (academicYear !== '') {
      dispatch(getListOfMessages(getListBody, activeTab, false));
    }
  }, [activeTab, isSearchClicked, isRefresh]);

  const clickTab = (value) => {
    setActiveTab(value);
  };
  const clickAcademicYear = (value) => {
    setAcademicYear(value);
    // Reset month selection when the academic year is changed
    setMonthYear('');
  };

  const clickMonthYear = (value) => {
    setMonthYear(value);
  };

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
        toast.success('Message deleted successfully');
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
          toast.success('Message has been moved to the trash.');
        } else {
          toast.success('Message deleted successfully');
        }
        dispatch(getListOfMessages(getListBody, activeTab, false));
      })
      .catch((err) => {
        alert('error network');
      });
  };

  const TrashDelete = () => {
    if (confirm('Are you sure you want to delete the message permanently?')) {
      clickDelete();
    } else {
    }
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
        toast.success('Message(s) Undeleted successfully!!');
        dispatch(getListOfMessages(getListBody, activeTab, false));
      })
      .catch((err) => {
        alert('error network');
      });
  };

  const ConfirmUndelete = () => {
    if (confirm('Are you sure you want to undelete selected message(s)')) {
      clickUnDelete();
    } else {
    }
  };
  const DeletePermanent = () => {
    if (
      confirm(
        'This action will permanently delete selected message(s) from the Sent message list of the current user as well as from the inbox of all related recipients (if unread). If any recipient reads the message, then that message will be visible in the sent message list of the current user. Do you want to continue?'
      )
    ) {
      permanentDelete();
    } else {
    }
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
        asDate: searchDate
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
    if (confirm('Are you sure you want to delete this record?')) {
      dispatch(getDeleteDraftMessage(DeleteDraftBody));
    }
  };

  useEffect(() => {
    if (DeleteDraftM !== '') {
      toast.success(DeleteDraftM, { toastId: 'success1' });
      dispatch(resetDeleteDraftMessage());
      dispatch(getListOfMessages(getListBody, activeTab, false));
    }
  }, [DeleteDraftM]);

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
              <Hidden >
                <Tooltip title="Setting"><IconButton><SettingsIcon onClick={clickSetting} fontSize="medium" />
                </IconButton>
                </Tooltip>
                <Tooltip title="Refresh"><IconButton>
                  <RefreshIcon
                    onClick={() => {
                      setIsRefresh(!isRefresh);
                    }}
                    fontSize="medium"
                  />
                </IconButton>
                </Tooltip>
              </Hidden>
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
          <Grid item sm={2} xs={12} spacing={1}>
            <Hidden smDown>
              <Card
                sx={{
                  textAlign: 'center',
                  height: '120px',
                  backgroundColor: '#599d92',
                  mb: '7px'
                }}
              >
                <RouterLink
                  style={{ textDecoration: 'none', color: '#223354' }}
                  to={`/${location.pathname.split('/')[1]
                    }/MessageCenter/Compose`}
                >
                  <AddCircleIcon
                    onClick={clickClear}
                    sx={{ mt: '30px', color: 'white' }}
                    className={classes.IconSize}
                  />
                  <br />
                  <b style={{ color: 'white' }}>Compose</b>
                </RouterLink>
              </Card>
            </Hidden>
            {!showSearch && (
              <CardMessage
                activeTab={activeTab}
                MarkAsRead={MarkAsRead}
                clickTab={clickTab}
                clickSearchIcon={clickSearchIcon}
              />
            )}
          </Grid>
          <Grid container sm={10} spacing={1}>
            {((showSearch && isMobile) || !isMobile) && (
              <>
                <Grid item xs={12} sm={9} md={10}>
                  <MCForm
                    AcademicYearList={AcademicYearList}
                    MonthYearList={MonthYearList}
                    clickSearch={clickSearch}
                    academicYear={academicYear}
                    monthYear={monthYear}
                    clickAcademicYear={clickAcademicYear}
                    clickMonthYear={clickMonthYear}
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
            <Grid item xs={12}>
              {inboxListData.some((obj) => obj.isActive === true) && (
                <>
                  <Box mb={2} sx={DeleteButton}>
                    <CardMessDeleteButtons
                      activeTab={activeTab}
                      clickReset={clickReset}
                      TrashDelete={TrashDelete}
                      ConfirmUndelete={ConfirmUndelete}
                      DeletePermanent={DeletePermanent}
                      clickDelete={clickDelete}
                    />
                  </Box>
                  {activeTab == 'Inbox' && (
                    <Grid item xs={12} mt={-1} mb={2} sx={MarkAsReadMessage}>
                      <ButtonPrimary
                        onClick={() => {
                          clickReadUnread('Unread');
                        }}
                      >
                        {' '}
                        Mark as Unread{' '}
                      </ButtonPrimary>
                      <ButtonPrimary
                        sx={{ ml: '5px' }}
                        onClick={() => {
                          clickReadUnread('Read');
                        }}
                      >
                        {' '}
                        Mark as Read
                      </ButtonPrimary>
                    </Grid>
                  )}
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
                      <Grid item sm={9.5}>
                        <ErrorMessages Error={'No records found'} />
                      </Grid>
                    ) : (
                      <SelectList3Col
                        Itemlist={inboxListData}
                        ActiveTab={activeTab}
                        DeleteDraft={DeleteDraft}
                        refreshData={refreshData}
                      />
                    )}
                  </div>
                )}

                <Avatar
                  sx={{
                    display: displayMoveToTop,
                    position: 'fixed',
                    bottom: '95px',
                    zIndex: '4',
                    left: '15px',
                    p: '2px',
                    width: 50,
                    height: 50,
                    backgroundColor: 'white',
                    boxShadow:
                      '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
                  }}
                  onClick={MoveToTop} // Close function
                >
                  <KeyboardArrowUpRoundedIcon
                    fontSize="large"
                    color="success"
                  />
                </Avatar>
                <span
                  style={{
                    width: '95px',
                    position: 'fixed',
                    bottom: '80px',
                    right: '20px'
                  }}
                >
                  <RouterLink
                    style={{ textDecoration: 'none' }}
                    to={`/${location.pathname.split('/')[1]
                      }/MessageCenter/Compose`}
                  >
                    <Item
                      sx={{ fontSize: '10px', marginLeft: '-7px', mb: '10px' }}
                    >
                      <AddCircleIcon onClick={clickClear} />
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
