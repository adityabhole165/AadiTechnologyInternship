
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
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CategoryDropdown } from 'src/requests/LeaveDetails/RequestLeaveDetails';
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
    const UserId = Number(localStorage.getItem('UserId'));

    const GetCategoryDropdownList = useSelector(
        (state: RootState) => state.LeaveDetails.CategoryDropdownList
    );

    const CategoryDropdownBody = {
        asSchoolId: asSchoolId,
        asId: UserId
    };

    useEffect(() => {
        dispatch(CategoryDropdown(CategoryDropdownBody));
    }, []);

    const deleteRow = (user_Id) => {
        if (window.confirm('Are you sure you want to delete this holiday?')) {
            // Handle delete logic here
        }
    };

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
                    <div style={{ textAlign: 'center' }}>
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
                        navigate('/extended-sidebar/Teacher/GenerateAll/' + row.Id + '/' + 'Y' + '/' + true)
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

    const [holidayColumns, setHolidayColumns] = useState<Column[]>(getLeaveDetailsColumns());

    const AddLeave = () => {
        navigate("../AddLeaveDetails");
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

            {/* Searchable Dropdown */}
            <Box sx={{ maxWidth: '20vw' }}>
                <SearchableDropdown
                    ItemList={GetCategoryDropdownList} // Replace with your actual dropdown options
                    defaultValue={selectCategory}
                    onChange={clickCategoryDropdown}
                    size={"small"}
                    label='Category' // Ensure the dropdown respects the maximum width
                />
            </Box>

            {/* Table Section */}
            {/* Include your table here */}
        </Box>
    );
};

export default LeaveDetailsBaseScreen;
