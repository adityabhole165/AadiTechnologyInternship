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
import SuspenseLoader from 'src/layouts/Components/SuspenseLoader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { toast } from 'react-toastify';
import MoveToTrashApi from 'src/api/MessageCenter/MoveToTrash';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '61px',
  boxShadow:
    ' 5px 5px 10px rgba(163, 177, 198, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.2)',
  color: theme.palette.text.secondary
}));

const MessageList = () => {
  const dispatch = useDispatch();

  const SchoolId = localStorage.getItem('localSchoolId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');

  const [activeTab, setActiveTab] = useState('');
  const [searchText, setSearchText] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [inboxListData, setInboxListData] = useState([]);
  const [isDeleteActive, setIsDeleteActive] = useState(false);

  const AcademicYearList = useSelector(
    (state: RootState) => state.MessageCenter.YearsList
  );
  const MonthYearList = useSelector(
    (state: RootState) => state.MessageCenter.AllMonthList
  );
  const InboxList = useSelector(
    (state: RootState) => state.InboxMessage.InboxList
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
      dispatch(getListOfMessages(getListBody, activeTab));
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
      asMessageRecieverDetailsId: arrReciever.join(';'),
      asIsArchive: 'Y',
      asIsCompeteDelete: 0,
      asFlag: activeTab
    };
    MoveToTrashApi.MoveToTrash(trashbody)
      .then((data) => {
        toast.success('Message deleted successfully');
        dispatch(getListOfMessages(getListBody, activeTab));
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
    setShowSearch(!showSearch);
  };

  const refreshData = (value) => {
    setIsDeleteActive(value.some((obj) => obj.isActive === true));
    setInboxListData(value);
  };
  return (
    <>
      <PageHeader heading="Message Center" subheading=""></PageHeader>
      <Grid container>
        {!showSearch ? (
          <>
            <Grid item xs={11}>
              <MCButtons activeTab={activeTab} clickTab={clickTab}></MCButtons>
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
            />
          </Grid>
        )}
        {isDeleteActive && (
          <Grid item xs={10}>
            <ButtonPrimary onClick={clickDelete} endIcon={<DeleteIcon />}>
              Delete
            </ButtonPrimary>
            <ButtonPrimary onClick={clickReset} endIcon={<ReplayIcon />}>
              Reset
            </ButtonPrimary>
          </Grid>
        )}
      </Grid>
      {loading ? (
        <SuspenseLoader />
      ) : (
        <div style={{marginTop:'10px'}}>
            <SelectList3Col Itemlist={inboxListData} refreshData={refreshData} />
        </div>
      )}
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
    </>
  );
};

export default MessageList;
