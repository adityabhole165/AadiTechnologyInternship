import { useEffect, useState } from 'react';
import MCButtons from 'src/libraries/button/MCButtons';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Iyears, IGetAllMonths } from 'src/interfaces/MessageCenter/Search';
import {
  getAcademicYearList,
  getMonthYearList
} from 'src/requests/MessageCenter/MessaageCenter';
import MCForm from 'src/libraries/form/MCForm';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import { getListOfMessages } from 'src/requests/Student/InboxMessage';
import SelectList3Col from '../../libraries/list/SelectList3Col';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Card, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { toast } from 'react-toastify';
import MoveToTrashApi from 'src/api/MessageCenter/MoveToTrash';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { Avatar } from '@mui/material';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '61px',
  color:'black',
  boxShadow:
  '0px 8px 15px rgba(0, 0, 0, 0.1)',

}));

const NextPageIndex = 2; // Initial page index

const MessageList = () => {
  const dispatch = useDispatch();

  const SchoolId = localStorage.getItem('localSchoolId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');

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

  const getMsgBody = (searchtext,monthyear) => {
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
    setActiveTab('Inbox');
    setAcademicYear(AcademicYearId);
  }, []);

  useEffect(() => {
    setInboxListData(InboxList);
  }, [InboxList]);

  useEffect(() => {
    if (academicYear !== '') {
      dispatch(getMonthYearList(Mbody));
    }
  }, [academicYear]);

  useEffect(() => {
    if (academicYear !== '') {
      dispatch(getListOfMessages(getListBody, activeTab, false));
    }
  }, [activeTab, isSearchClicked]);

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
      asMessageRecieverDetailsId: (activeTab == 'Inbox' ||activeTab == 'Trash') ? arrReciever.join(';') : arrDetails.join(';'),
      asIsArchive: 'Y',
      asIsCompeteDelete: (activeTab == 'Inbox' || activeTab == 'Sent'? 0 : 1),
      asFlag: activeTab
    };
    MoveToTrashApi.MoveToTrash(trashbody)
      .then((data) => {
        if(activeTab == 'Inbox' || activeTab == 'Sent'){
          toast.success('Message has been moved to the trash.');
        }
        else{
          toast.success('Message deleted successfully');
        }
        dispatch(getListOfMessages(getListBody, activeTab, false));
      })
      .catch((err) => {
        alert('error network');
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
    dispatch(getListOfMessages(getMsgBody('',''), activeTab, false));
  };

  const MoveToTop = (e) => {
    scrollableDivRefference.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setdisplayMoveToTop('none');
    }, 10);
  };
  return (
    <>
      <Container>
        <PageHeader heading="Message Center" subheading=""></PageHeader>
        <Grid container>
          {!showSearch ? (
            <>
              <Grid item xs={11}>
                <MCButtons
                  activeTab={activeTab}
                  clickTab={clickTab}
                ></MCButtons>
              </Grid>
              <Grid item xs={1}>
                <SearchIcon
                  sx={{
                    fontSize: '40px',
                    marginTop: '10px',
                    cursor: 'pointer',
                    marginLeft: '-5px'
                  }}
                  onClick={clickSearchIcon}
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
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
          )}
          {inboxListData.some((obj) => obj.isActive === true) && (
          
            <Grid container spacing={1} sx={{mb:"10px"}}>
              <Grid item xs={4}/>
              <Grid item xs={4}>
                <ButtonPrimary
                  onClick={() => clickDelete()}
                  endIcon={<DeleteIcon />} fullWidth
                >
                  Delete
                </ButtonPrimary>
              </Grid>
              <Grid item xs={4}>
                <ButtonPrimary
                  onClick={clickReset}
                  endIcon={<ReplayIcon />}
                  color="secondary" fullWidth
                >
                  Reset
                </ButtonPrimary>
              </Grid>
            </Grid>
          )}
        </Grid>
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
          >
            <SelectList3Col
              Itemlist={inboxListData}
              ActiveTab={activeTab}
              refreshData={refreshData}
            />
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
            <Item sx={{ fontSize: '10px', marginLeft: '-7px' }}>
              <AddCircleIcon />
              <br />
              <b>Compose</b>
            </Item>
          </RouterLink>
        </span>
      </Container>
    </>
  );
};

export default MessageList;
