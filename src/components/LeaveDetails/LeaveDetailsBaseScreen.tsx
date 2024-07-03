
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
import { IGetDeleteLeaveBody, IGetLeaveDetailsListBody, IGetStatusDropdownBody } from 'src/interfaces/LeaveDetails/ILeaveDetails';
import LeaveList from 'src/libraries/ResuableComponents/LeaveDetailsList';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { AcademicYearDropdown, CategoryDropdown, DeleteLeaveDetails, StatusDropdown, getLeaveDetailList, resetDeleteHolidayDetails } from 'src/requests/LeaveDetails/RequestLeaveDetails';
import { RootState, useDispatch, useSelector } from 'src/store';
import { GetScreenPermission, getDateMonthYearDayDash } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import { Column } from '../DataTable';

const LeaveDetailsBaseScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectCategory, setCategory] = useState("0");
    const [selectAcademicYear, setAcademicYear] = useState("0");
    const [selectStatus, setStatus] = useState("0");
    const HolidayFullAccess = GetScreenPermission('Holidays');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const [asUpdatedById, setasUpdatedById] = useState('0');

    const GetAcademicYear = useSelector(
        (state: RootState) => state.LeaveDetails.AcademicYearDropdown
    );
    const GetCategoryDropdownList = useSelector(
        (state: RootState) => state.LeaveDetails.CategoryDropdownList
    );
    const GetStatusDropdown = useSelector(
        (state: RootState) => state.LeaveDetails.StatusList
    );
    const GetLeaveList = useSelector(
        (state: RootState) => state.LeaveDetails.LeaveDetailsList
    );
    const deleteLeavedetailsMsg = useSelector(
        (state: RootState) => state.LeaveDetails.DeleteLeaveMsg
    );
    const AcademicYearBody = {
        asSchoolId: asSchoolId
    };
    const CategoryDropdownBody = {
        asSchoolId: asSchoolId,
        asId: asUserId
    };
    const StatusBody: IGetStatusDropdownBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(selectAcademicYear),
        asUserId: Number(asUserId),
        asCategoryId: Number(1),
        asShowOnlyNonUpdated: false
    };
    useEffect(() => {
        dispatch(AcademicYearDropdown(AcademicYearBody));
    }, []);
    useEffect(() => {
        if (GetAcademicYear.length > 0) {
            setAcademicYear(GetAcademicYear[0].Value)
        }
    }, [GetAcademicYear])
    useEffect(() => {
        dispatch(CategoryDropdown(CategoryDropdownBody));
    }, [selectAcademicYear]);
    useEffect(() => {
        if (GetCategoryDropdownList.length > 0) {
            setCategory(GetCategoryDropdownList[0].Value)
        }
    }, [GetCategoryDropdownList])
    useEffect(() => {
        dispatch(StatusDropdown(StatusBody));
    }, [selectCategory]);
    useEffect(() => {
        if (GetStatusDropdown.length > 0) {
            setStatus(GetStatusDropdown[0].Value)
        }
    }, [GetStatusDropdown])
    useEffect(() => {
        dispatch(getLeaveDetailList(body));
    }, [selectAcademicYear, selectCategory, selectStatus]);



    const body: IGetLeaveDetailsListBody = {
        asSchoolId: Number(asSchoolId),
        asUserId: Number(asUserId),
        asCategoryId: Number(1),
        asStatusId: Number(selectStatus),
        asSortExpression: "StartDate Desc, EndDate asc, DesignationId asc ,FirstName  asc, MiddleName asc, LastName asc",
        asStartIndex: Number(0),
        asEndIndex: Number(20),
        asShowOnlyNonUpdated: false,
        asAcademicYearId: Number(asAcademicYearId)
    };
    useEffect(() => {
        if (deleteLeavedetailsMsg !== '') {
            toast.success(deleteLeavedetailsMsg, { toastId: 'success1' });
        }
        dispatch(resetDeleteHolidayDetails());
    }, [deleteLeavedetailsMsg]);

    const deleteRow = (Id) => {
        console.log(Id, 'asdfghjklqwertyuioasdfghjk');
        if (confirm('Are you sure you want to delete this leave?')) {
            const DeleteLeaveBody: IGetDeleteLeaveBody = {
                asSchoolId: Number(asSchoolId),
                asId: Number(Id),
                asUpdatedById: Number(asUserId), // userId for delete 
            };
            dispatch(DeleteLeaveDetails(DeleteLeaveBody));
            dispatch(getLeaveDetailList(body));

        }
    }

    // const deleteRow = (Id) => {
    //     console.log(Id, 'asdfghjklqwertyuioasdfghjk');

    //     if (
    //         confirm('Are you sure you want to delete this leave?')
    //     ) {
    //         const DeleteLeaveBody: IGetDeleteLeaveBody = {
    //             asSchoolId: Number(asSchoolId),
    //             asId: Number(Id),
    //             asUpdatedById: Number(asUserId), // userId for delete 
    //         };
    //         dispatch(DeleteLeaveDetails(DeleteLeaveBody));
    //     }
    // };


    // useEffect(() => {
    //     if (deleteLeavedetailsMsg != '') {
    //         toast.success(deleteLeavedetailsMsg)
    //         dispatch(resetDeleteHolidayDetails());
    //         dispatch(getLeaveDetailList(body));
    //     }
    // }, [deleteLeavedetailsMsg])

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
                id: 'Description',
                label: 'Description',
                renderCell: (rowData: any) => rowData.Text4
            },
            {
                id: 'totalDays',
                label: 'Total Days',
                renderCell: (rowData: any) => rowData.Text5,
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
                renderCell: (rowData: any) => rowData.Text6,
            },
            {
                id: 'leaveBalance',
                label: 'Leave balance',
                renderCell: (rowData: any) => rowData.Text7,
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
        { Id: 5, Header: ' Total Days' },
        { Id: 6, Header: ' Leave Name ' },
        { Id: 7, Header: ' Leave Balance' },
        { Id: 8, Header: 'View' },
        { Id: 9, Header: 'Delete' }
    ];

    const [holidayColumns, setHolidayColumns] = useState<Column[]>(getLeaveDetailsColumns());
    const AddLeave = () => {
        navigate("../AddLeaveDetails");
    };
    const ViewLeave = (Id) => {
        console.log(Id, "value");

        navigate("../AddLeaveDetails" + "/" + Id)
    };
    const clickAcademicYearDropdown = (value) => {
        setAcademicYear(value);
    };
    const clickCategoryDropdown = (value) => {
        setCategory(value);
    };
    const clickStatusDropdown = (value) => {
        setStatus(value);
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
                            sx={{ pl: 0, minWidth: '20vw', pr: '16px' }}
                            ItemList={GetAcademicYear}
                            defaultValue={selectAcademicYear}
                            onChange={clickAcademicYearDropdown}
                            size={"small"}
                            label='Academic Year'
                        />
                        <SearchableDropdown
                            sx={{ pl: 0, minWidth: '20vw', pr: '16px' }}
                            ItemList={GetCategoryDropdownList}
                            defaultValue={selectCategory}
                            onChange={clickCategoryDropdown}
                            size={"small"}
                            label='Category'
                        />
                        <SearchableDropdown
                            sx={{ pl: 0, minWidth: '20vw', pr: '52px' }}
                            ItemList={GetStatusDropdown}
                            defaultValue={selectStatus}
                            onChange={clickStatusDropdown}
                            size={"small"}
                            label='Status'
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
