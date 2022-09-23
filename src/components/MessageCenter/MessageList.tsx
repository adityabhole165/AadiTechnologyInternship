
import { useEffect, useState } from 'react';
import MCButtons from 'src/libraries/button/MCButtons';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Iyears, IGetAllMonths } from 'src/interfaces/MessageCenter/Search';
import { getAcademicYearList, getMonthYearList } from 'src/requests/MessageCenter/MessaageCenter';
import MCForm from 'src/libraries/form/MCForm';
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import { getInboxList1 } from 'src/requests/Student/InboxMessage';
import SelectList3Col from '../../libraries/list/SelectList3Col';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Card, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';
import SuspenseLoader from 'src/layouts/Components/SuspenseLoader';

const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: "61px",
    boxShadow: ' 5px 5px 10px rgba(163, 177, 198, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.2)',
    color: theme.palette.text.secondary
}));

const MessageList = () => {
    const dispatch = useDispatch();

    const SchoolId = localStorage.getItem('localSchoolId');
    const AcademicYearId = sessionStorage.getItem('AcademicYearId');

    const [activeTab, setActiveTab] = useState('')
    const [searchText, setSearchText] = useState('')
    const [academicYear, setAcademicYear] = useState('')
    const [monthYear, setMonthYear] = useState('')
    const [isSearchClicked, setIsSearchClicked] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

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

    const getList: IgetList = {
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
        setActiveTab('Inbox')
        setAcademicYear(AcademicYearId)

    }, [])

    useEffect(() => {
        if (academicYear !== '') {
            dispatch(getMonthYearList(Mbody));
        }
    }, [academicYear])

    useEffect(() => {
        if (academicYear !== '') {
            dispatch(getInboxList1(getList, activeTab));
        }
    }, [activeTab, isSearchClicked])

    const clickTab = (value) => {
        setActiveTab(value)
    }
    const clickAcademicYear = (value) => {
        setAcademicYear(value)
        setMonthYear('0')
    }
    const clickMonthYear = (value) => {
        setMonthYear(value)
    }

    const clickSearchIcon = () => {
        setShowSearch(!showSearch)
    }

    const clickSearch = (searchText, academicYear, monthYear, isSearchClicked) => {
        setSearchText(searchText)
        setAcademicYear(academicYear)
        setMonthYear(monthYear)
        setIsSearchClicked(isSearchClicked)
        setShowSearch(!showSearch)

        console.log(searchText, academicYear, monthYear, isSearchClicked)
    }

    const refreshData = () => {

    }
    return (
        <Container>
            <PageHeader heading='Message Center' subheading=''></PageHeader>
            {
                !showSearch ? <Grid container>
                    <Grid item xs={10}>
                        <MCButtons activeTab={activeTab} clickTab={clickTab}></MCButtons>
                    </Grid>
                    <Grid item xs={2}>
                        <SearchIcon
                            sx={{
                                fontSize: '40px',
                                marginTop: '10px',
                                cursor: 'pointer'
                            }}
                            onClick={clickSearchIcon}
                        />
                    </Grid>
                </Grid> :
                    <MCForm AcademicYearList={AcademicYearList} MonthYearList={MonthYearList} clickSearch={clickSearch}
                        academicYear={academicYear} monthYear={monthYear}
                        clickAcademicYear={clickAcademicYear} clickMonthYear={clickMonthYear}
                        isSearchClicked={isSearchClicked}
                    />
            }
            
        {loading ? ( <SuspenseLoader /> ):
            <SelectList3Col Itemlist={InboxList} refreshData={refreshData} />
        }
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
        </Container>
    )
}

export default MessageList