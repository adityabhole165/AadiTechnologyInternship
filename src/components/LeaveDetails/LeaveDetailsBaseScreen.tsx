
import Add from '@mui/icons-material/Add';
import Delete from "@mui/icons-material/Delete";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { IGetDeleteLeaveBody, IGetLeaveDetailsListBody } from 'src/interfaces/LeaveDetails/ILeaveDetails';
import LeaveList from 'src/libraries/ResuableComponents/LeaveDetailsList';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CategoryDropdown, DeleteLeaveDetails, getLeaveDetailList, resetDeleteHolidayDetails } from 'src/requests/LeaveDetails/RequestLeaveDetails';
import { RootState, useDispatch, useSelector } from 'src/store';
import { GetScreenPermission, getDateMonthYearDayDash } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import { Column } from '../DataTable';

const LeaveDetailsBaseScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectCategory, setCategory] = useState("0");
    const HolidayFullAccess = GetScreenPermission('Holidays');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));

    const GetCategoryDropdownList = useSelector(
        (state: RootState) => state.LeaveDetails.CategoryDropdownList
    );
    const GetLeaveList = useSelector(
        (state: RootState) => state.LeaveDetails.LeaveDetailsList
    );


    const deleteLeavedetailsMsg = useSelector(
        (state: RootState) => state.LeaveDetails.DeleteLeaveMsg
    );

    const CategoryDropdownBody = {
        asSchoolId: asSchoolId,
        asId: asUserId
    };

    useEffect(() => {
        dispatch(CategoryDropdown(CategoryDropdownBody));
    }, []);


    const body: IGetLeaveDetailsListBody = {
        asSchoolId: Number(asSchoolId),
        asUserId: Number(asUserId),
        asCategoryId: Number(1),
        asSortExpression: "StartDate Desc, EndDate asc, DesignationId asc ,FirstName  asc, MiddleName asc, LastName asc",
        asStartIndex: Number(0),
        asEndIndex: Number(20),
        asShowOnlyNonUpdated: false
    };

    useEffect(() => {
        dispatch(getLeaveDetailList(body));
    }, []);


    const deleteRow = (Id) => {
        console.log(Id, 'asdfghjklqwertyuioasdfghjk');

        if (
            confirm('Are you sure you want to delete this leave?')
        ) {
            const DeleteLeaveBody: IGetDeleteLeaveBody = {
                asSchoolId: Number(asSchoolId),
                asUserId: Number(asUserId),
                asUpdatedById: Number(Id),
            };
            dispatch(DeleteLeaveDetails(DeleteLeaveBody));
        }
    };


    useEffect(() => {
        if (deleteLeavedetailsMsg != '') {
            toast.success(deleteLeavedetailsMsg)
            dispatch(resetDeleteHolidayDetails());
            dispatch(getLeaveDetailList(body));
        }
    }, [DeleteLeaveDetails])

    const getLeaveDetailsColumns = () => {
        let columns: Column[] = [
            {
                id: 'senderName',
                label: 'Sender Name',
                renderCell: (rowData: any) => rowData.Text1
            },
            {
                id: 'startDate',
                label: 'Start Date',
                renderCell: (rowData: any) => (
                    <div style={{ textAlign: 'center' }}>
                        {getDateMonthYearDayDash(rowData.Text2)}
                    </div>
                )
            },
            {
                id: 'endDate',
                label: 'End Date',
                renderCell: (rowData: any) => (
                    <div style={{ textAlign: 'left' }}>
                        {getDateMonthYearDayDash(rowData.Text3)}
                    </div>
                )
            },
            {
                id: 'totalDays',
                label: 'Total Days',
                renderCell: (rowData: any) => rowData.Text4,
                cellProps: {
                    align: 'center'
                },
                headerCellProps: {
                    align: 'center'
                }
            },
            {
                id: 'leaveType',
                label: 'Leave Type',
                renderCell: (rowData: any) => rowData.Text5,
            },
            {
                id: 'leaveBalance',
                label: 'Leave balance',
                renderCell: (rowData: any) => rowData.Text6,
                cellProps: {
                    align: 'left'
                },
                headerCellProps: {
                    align: 'left'
                }
            },
            {
                id: 'view',
                label: 'View',
                cellProps: {
                    align: 'center'
                },
                headerCellProps: {
                    align: 'center'
                },
                renderCell: (row) => (
                    <VisibilityIcon onClick={() => {
                        navigate("../AddLeaveDetails" + "/" + row.Id)
                    }} />
                )
            },
        ];

        if (HolidayFullAccess === 'Y') {
            columns.push({
                id: 'delete',
                label: 'Delete',
                renderCell: (rowData: any) => (
                    <Box>
                        <Tooltip title="Delete">
                            <IconButton sx={{ p: 0 }} color="error" onClick={() => deleteRow(rowData.Id)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
                cellProps: {
                    align: 'center'
                },
                headerCellProps: {
                    align: 'center'
                }
            });
        }

        return columns;
    };


    const HeaderLeave = [
        { Id: 1, Header: 'Sender Name' },
        { Id: 2, Header: 'Start Date 	' },
        { Id: 3, Header: ' 	End Date' },
        { Id: 4, Header: ' Total Days' },
        { Id: 5, Header: ' Leave Name ' },
        { Id: 6, Header: ' Leave Balance' },
        { Id: 7, Header: 'View' },
        { Id: 8, Header: 'Delete' }
    ];

    const [holidayColumns, setHolidayColumns] = useState<Column[]>(getLeaveDetailsColumns());

    const AddLeave = () => {
        navigate("../AddLeaveDetails");
    };

    const ViewLeave = (Id) => {
        console.log(Id, "value");

        navigate("../AddLeaveDetails" + "/" + Id)
    };

    const clickCategoryDropdown = (value) => {
        setCategory(value);
    };

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Leave Details',
                        path: ' '
                    }
                ]}
                rightActions={
                    <Box sx={{ display: 'flex', gap: 1 }}>

                        <SearchableDropdown
                            sx={{ pl: 0, minWidth: '20vw', pr:'52px' }}
                            ItemList={GetCategoryDropdownList}
                            defaultValue={selectCategory}
                            onChange={clickCategoryDropdown}
                            size={"small"}
                            label='Category'
                        />

                        <Tooltip title="Use this page to manage your leave.">
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': {
                                        backgroundColor: grey[600]
                                    }
                                }}
                            >
                                <QuestionMarkIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add New Leave">
                            <IconButton
                                sx={{
                                    bgcolor: 'grey.500',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'grey.600'
                                    }
                                }}
                                onClick={AddLeave}
                            >
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </Box>
                }
            />


            <LeaveList
                HeaderArray={HeaderLeave}
                ItemList={GetLeaveList}
                clickDelete={deleteRow}
                clickView={ViewLeave} />

        </Box>
    );
};

export default LeaveDetailsBaseScreen;
