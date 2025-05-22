
import Add from '@mui/icons-material/Add';
import Delete from "@mui/icons-material/Delete";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from '@mui/material';
import { green, grey } from "@mui/material/colors";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { AlertContext } from 'src/contexts/AlertContext';
import { IGetDeleteLeaveBody, IGetLeaveDetailsListBody, IGetStatusDropdownBody } from 'src/interfaces/LeaveDetails/ILeaveDetails';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import LeaveList from 'src/libraries/ResuableComponents/LeaveDetailsList';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { AcademicYearDropdown, CategoryDropdown, DeleteLeaveDetails, StatusDropdown, getLeaveDetailList, resetDeleteHolidayDetails } from 'src/requests/LeaveDetails/RequestLeaveDetails';
import { RootState, useDispatch, useSelector } from 'src/store';
import { encodeURL, getDateMonthYearDayDash } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import { Column } from '../DataTable';
import LeaveDetailComp from './LeaveDetailComp';

const LeaveDetailBS = () => {
    const dispatch = useDispatch();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));

    // const [selectItem,selectedItem] = useState('');
    const [ItemList,setItemList] = useState([]);
    const GetAcademicYear = useSelector(
        (state: RootState) => state.LeaveDetails.AcademicYearDropdown
    );

    const AcademicYearBody = {
        asSchoolId: asSchoolId
    };

    useEffect ( () => {
        setItemList(GetAcademicYear);
    },[GetAcademicYear])

    const CategoryDropdownBody = {
        asSchoolId: asSchoolId,
        asId: asUserId
    };
    const  ClickItem = (value) => {
        setItemList(value);
    }

    useEffect(() => {
        dispatch(AcademicYearDropdown(AcademicYearBody));
    
    }, []);


    return (
        <Box sx={{ px: 2 }}>
        <LeaveDetailComp ItemList={ItemList} clickItem={ClickItem} />
        </Box>
    );
};

export default LeaveDetailBS;
