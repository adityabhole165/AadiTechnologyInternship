
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

const MessageList = () => {
    const dispatch = useDispatch();

    const SchoolId = localStorage.getItem('localSchoolId');
    const AcademicYearId = sessionStorage.getItem('AcademicYearId');

    const [activeTab, setActiveTab] = useState('')
    const [searchText, setSearchText] = useState('')
    const [academicYear, setAcademicYear] = useState('')
    const [monthYear, setMonthYear] = useState('')
    const [isSearchClicked, setIsSearchClicked] = useState(false)

    const AcademicYearList = useSelector(
        (state: RootState) => state.MessageCenter.YearsList
    );
    const MonthYearList = useSelector(
        (state: RootState) => state.MessageCenter.AllMonthList
    );
    const InboxList = useSelector(
        (state: RootState) => state.InboxMessage.InboxList
    );

    useEffect(() => {

        const body: Iyears = {
            asSchoolId: SchoolId
        };
        dispatch(getAcademicYearList(body));
        setActiveTab('Inbox')
        setAcademicYear(AcademicYearId)

    }, [])

    useEffect(() => {
        const Mbody: IGetAllMonths = {
            asAcademicYearId: academicYear,
            asSchoolId: SchoolId
        };
        dispatch(getMonthYearList(Mbody));
    }, [academicYear])

    useEffect(() => {
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
        dispatch(getInboxList1(getList, activeTab));
        console.log("body",getList)
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

    const clickSearch = (searchText, academicYear, monthYear, isSearchClicked) => {
        setSearchText(searchText)
        setAcademicYear(academicYear)
        setMonthYear(monthYear)
        setIsSearchClicked(isSearchClicked)
        console.log(searchText, academicYear, monthYear, isSearchClicked)
    }

    const refreshData = () => {

    }
    return (
        <div>
            <PageHeader heading='Message Center' subheading=''></PageHeader>
            <MCButtons activeTab={activeTab} clickTab={clickTab}></MCButtons>
            <MCForm AcademicYearList={AcademicYearList} MonthYearList={MonthYearList} clickSearch={clickSearch}
                academicYear={academicYear} monthYear={monthYear}
                clickAcademicYear={clickAcademicYear} clickMonthYear={clickMonthYear}
                isSearchClicked={isSearchClicked}
            />
            <SelectList3Col Itemlist={InboxList} refreshData={refreshData} />
        </div>
    )
}

export default MessageList