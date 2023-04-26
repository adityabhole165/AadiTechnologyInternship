import { useEffect, useState } from 'react';
import MCButtons from 'src/libraries/button/MCButtons';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Iyears, IGetAllMonths } from 'src/interfaces/MessageCenter/Search';
import {
    getAcademicYearList,
    getMonthYearList,
    ReadReceiptDetail
} from 'src/requests/MessageCenter/MessaageCenter';
import MCForm from 'src/libraries/form/MCForm';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import { getListOfMessages } from 'src/requests/Student/InboxMessage';
import SelectList3Col from '../../libraries/list/SelectList3Col';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Card, Container, Box, Hidden ,Dialog} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { toast } from 'react-toastify';
import MoveToTrashApi from 'src/api/MessageCenter/MoveToTrash';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RestoreIcon from '@mui/icons-material/Restore';
import ReplayIcon from '@mui/icons-material/Replay';
import { Avatar } from '@mui/material';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getDeleteMessagePermantely } from 'src/requests/MessageCenter/RequestDeleteMessagePermanently';
import ApiDeleteMessagePermanently from 'src/api/MessageCenter/ApiDeleteMsgPermanently';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import CardMessage from './CardMessage';
import CardMessDeleteButtons from './CardMessDeleteButtons';

import { Styles } from 'src/assets/style/student-style';
import { RootWrapper } from 'src/libraries/styled/CardStyle';
import EmailSettings from './EmailSetting';
const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '61px',
    color: 'black',
    boxShadow:
        '0px 8px 15px rgba(0, 0, 0, 0.1)',

}));

const NextPageIndex = 2; // Initial page index

const MessageList = () => {
    const pathname = window.location.pathname;
    const pageName =
        pathname.indexOf('/extended-sidebar/MessageCenter/msgCenter/') === -1 ?
            pathname.replace('/extended-sidebar/MessageCenter/msgCenter', '') :
            pathname.replace('/extended-sidebar/MessageCenter/msgCenter/', '');

    const dispatch = useDispatch();
    const classes = Styles();
    const SchoolId = localStorage.getItem('localSchoolId');
    const AcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asUserid = sessionStorage.getItem("Id");

    const [pageIndex, setpageIndex] = useState<number>(NextPageIndex); // Page index
    const [activeTab, setActiveTab] = useState('');
    const [searchText, setSearchText] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [monthYear, setMonthYear] = useState('');
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [inboxListData, setInboxListData] = useState([]);
    const [isDeleteActive, setIsDeleteActive] = useState(false);
    const [nextPageData, setNextPageData] = useState<any>();
    const [ToolTip, setToolTip] = useState<boolean>(true);
    const [displayMoveToTop, setdisplayMoveToTop] = useState<string>('none');
    const [isRefresh, setIsRefresh] = useState(false)

    const AcademicYearList = useSelector(
        (state: RootState) => state.MessageCenter.YearsList
    );
    const MonthYearList = useSelector(
        (state: RootState) => state.MessageCenter.AllMonthList
    );
    const InboxList = useSelector(
        (state: RootState) => state.InboxMessage.InboxList
    );
    const NextInboxList = useSelector(
        (state: RootState) => state.InboxMessage.NextPageList
    );
    const loading: boolean = useSelector(
        (state: RootState) => state.InboxMessage.Loading
    );
    const DeletePermanently = useSelector(
        (state: RootState) => state.DeleteMessagePermanetly.DeleteMessagePermanentlyList
    );

    const getListBody: IgetList = {
        asSchoolId: SchoolId,
        asAcademicYearId: academicYear,
        asUserId: sessionStorage.getItem('Id'),
        asUserRoleId: sessionStorage.getItem('RoleId'),
        abIsSMSCenter: '0',
        asFilter: searchText,
        asPageIndex: 1,
        asMonthId: monthYear
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
    }

    const body: Iyears = {
        asSchoolId: SchoolId
    };

    const Mbody: IGetAllMonths = {
        asAcademicYearId: academicYear,
        asSchoolId: SchoolId
    };

    useEffect(() => {
        dispatch(getAcademicYearList(body));
        setActiveTab(pageName === '' ? 'Inbox' : pageName);
        setAcademicYear(AcademicYearId);
    }, []);

    useEffect(() => {
        setInboxListData(InboxList);
    }, [InboxList]);
    // useEffect(()=>{
    // dispatch(ReadReceiptDetail(ReadReceipts))
    // })
    useEffect(() => {
        if (academicYear !== '') {
            dispatch(getMonthYearList(Mbody));
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
        setMonthYear('0');
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
        const delPermanentBody =
        {
            asSchoolId: SchoolId,
            asAcademicYearId: AcademicYearId,
            asUserId: asUserid,
            asMessageIds: DetailsId.join(',')
        }
        ApiDeleteMessagePermanently.DeleteMessagePermanentlyapi(delPermanentBody)
            .then((data) => {
                toast.success('Message deleted successfully');
                dispatch(getDeleteMessagePermantely(delPermanentBody))

                dispatch(getListOfMessages(getListBody, activeTab, false));
            })
            .catch((err) => {
                alert('error network');
            });
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
            asMessageRecieverDetailsId: (activeTab == 'Inbox' || activeTab == 'Trash') ? arrReciever.join(';') : arrDetails.join(';'),
            asIsArchive: 'Y',
            asIsCompeteDelete: (activeTab == 'Inbox' || activeTab == 'Sent' ? 0 : 1),
            asFlag: activeTab
        };
        MoveToTrashApi.MoveToTrash(trashbody)
            .then((data) => {
                if (activeTab == 'Inbox' || activeTab == 'Sent') {
                    toast.success('Message has been moved to the trash.');
                }
                else {
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
            clickDelete()
        } else {

        }
    }
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
        const UnDeleteMessagesBody =
        {
            asSchoolId: SchoolId,
            asMessageRecieverDetailsIds: RecieverDetailsId.join(','),
            asMessageDetailsIds: DetailsId.join(',')
        }
        ApiDeleteMessagePermanently.UnDeleteMessagesapi(UnDeleteMessagesBody)
            .then((data) => {
                toast.success('Message(s) Undeleted successfully!!');
                dispatch(getListOfMessages(getListBody, activeTab, false));
            })
            .catch((err) => {
                alert('error network');
            });
    }

    const ConfirmUndelete = () => {
        if (confirm('Are you sure you want to undelete selected message(s)')) {
            clickUnDelete()
        } else {

        }
    }
    const DeletePermanent = () => {
        if (confirm('This action will permanently delete selected message(s) from the Sent message list of the current user as well as from the inbox of all related recipients (if unread). If any recipient reads the message, then that message will be visible in the sent message list of the current user. Do you want to continue?')) {
            permanentDelete()
        } else {

        }
    }
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
        isSearchClicked
    ) => {
        setSearchText(searchText);
        setAcademicYear(academicYear);
        setMonthYear(monthYear);
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

    const scrolling = (): void => {
        if (scrollableDivRefference.scrollTop >= 400) {
            setdisplayMoveToTop('flex');
        }
        if (scrollableDivRefference.scrollTop < 400) {
            setdisplayMoveToTop('none');
        }
        if (
            scrollableDivRefference.scrollHeight -
            scrollableDivRefference.scrollTop <=
            570
        ) {
            const getListBody: IgetList = {
                asSchoolId: SchoolId,
                asAcademicYearId: academicYear,
                asUserId: sessionStorage.getItem('Id'),
                asUserRoleId: sessionStorage.getItem('RoleId'),
                abIsSMSCenter: '0',
                asFilter: searchText,
                asPageIndex: pageIndex,
                asMonthId: monthYear
            };
            dispatch(getListOfMessages(getListBody, activeTab, true));
            setInboxListData((prev) => {
                return [...inboxListData, ...NextInboxList];
            });
            pageIndexIncrement();
        }
    };

    const closeSearchBar = () => {
        setShowSearch(false);
        setAcademicYear(AcademicYearId);
        setMonthYear('');
        setSearchText('');
        dispatch(getListOfMessages(getMsgBody('', ''), activeTab, false));
    };

    const MoveToTop = (e) => {
        scrollableDivRefference.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            setdisplayMoveToTop('none');
        }, 10);
    };
    const clickClear = () => {
        localStorage.setItem('ViewMessageData', "")
    }
    let navigate = useNavigate();

    const clickSetting = () => {
        navigate('/extended-sidebar/MessageCenter/EmailSetting')
    }
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    
    return (
        <>

            <Container maxWidth={'xl'}>
                <PageHeader heading="Message Center" subheading=""></PageHeader>
                <Hidden smUp>
        <Box sx={{ float: "right", mt: "-45px" }}>
          <SettingsIcon onClick={clickSetting} fontSize="medium" />
          <RefreshIcon onClick={() => { setIsRefresh(!isRefresh) }} fontSize="medium" />
        </Box>
        </Hidden>
                <Grid container columnGap={1}>
                    <Grid item sm={2} xs={12} spacing={1}>
                        <Hidden smDown>
                            <Card sx={{ textAlign: "center", height: "120px", backgroundColor: "#599d92", mb: "7px" }} >
                                <RouterLink
                                    style={{ textDecoration: 'none', color: "#223354" }}
                                    to={`/${location.pathname.split('/')[1]}/MessageCenter/Compose`}>
                                    <AddCircleIcon onClick={clickClear} sx={{ mt: "30px", color: "white" }} className={classes.IconSize} />
                                    <br />
                                    <b style={{ color: "white" }}>Compose</b>
                                </RouterLink>
                            </Card>
                        </Hidden>

                        <CardMessage activeTab={activeTab}
                            clickTab={clickTab} clickSearchIcon={clickSearchIcon} />
                    </Grid>
                    
                    <Grid container sm={10} spacing={1} >
                        <Grid item xs={12} sm={10}>
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
                        <Grid item sm={2}>
                            <Hidden smDown>
                                <Box sx={{ mt: "15px" }}>
                                    <ButtonPrimary fullWidth
                                        onClick={handleClickOpen}
                                        endIcon={<SettingsIcon />}
                                        sx={{ mb: "5px", height: "40px" }}
                                        
                                        >
                                        Setting
                                    </ButtonPrimary>
                                    <ButtonPrimary fullWidth
                                        onClick={() => { setIsRefresh(!isRefresh) }}
                                        endIcon={<RefreshIcon />}
                                        sx={{ height: "40px" }}>
                                        Refresh
                                    </ButtonPrimary>
                                </Box>
                                <Dialog open={open}
                               onClose={() => { setOpen(false) }}
                               PaperProps={{ sx: { position: 'fixed', m: 0, p: 1 } }}
                                >   
                           <EmailSettings/>
                
                          </Dialog>
                            </Hidden>
                        </Grid>
                        <Grid item xs={12} sm={12} >

                            {inboxListData.some((obj) => obj.isActive === true) && (
                                <Box mt={-1} mb={2}>
                                    <CardMessDeleteButtons activeTab={activeTab} clickReset={clickReset} TrashDelete={TrashDelete}
                                        ConfirmUndelete={ConfirmUndelete} DeletePermanent={DeletePermanent} clickDelete={clickDelete}
                                    />
                                </Box>
                            )}

                        </Grid>
                        <Grid item xs={12} >
                            <RootWrapper>
                            {loading ? (
                       <SuspenseLoader />
                        ) : (
                          <div
                           id="ScrollableDiv"
                          onScroll={scrolling}
                          style={{
                          paddingBottom: '100px',
                           height: '570px',
                          overflow: 'auto'
                           }}
                          >{InboxList?.length === 0 ? (
                        <ErrorMessages Error="No records found"></ErrorMessages>
                        ) : (
                         <SelectList3Col
                        Itemlist={inboxListData}
                         ActiveTab={activeTab}
                        refreshData={refreshData}/>)}
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
                                <KeyboardArrowUpRoundedIcon fontSize="large" color="success" />
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
                                    to={`/${location.pathname.split('/')[1]}/MessageCenter/Compose`}
                                >
                                    <Item sx={{ fontSize: '10px', marginLeft: '-7px', mb: "10px" }} >
                                        <AddCircleIcon onClick={clickClear} />
                                        <br />
                                        <b>Compose</b>
                                    </Item>
                                </RouterLink>
                            </span>


                        </RootWrapper></Grid>
                    </Grid>

                </Grid>
            </Container>
        </>
    );
};

export default MessageList;
