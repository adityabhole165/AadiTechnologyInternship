
import Add from '@mui/icons-material/Add';
import Delete from "@mui/icons-material/Delete";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import { green, grey } from "@mui/material/colors";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { AlertContext } from 'src/contexts/AlertContext';
import { IGetAllReportingUsersBody, IGetDeleteLeaveBody, IGetLeaveDetailsListBody, IGetStatusDropdownBody } from 'src/interfaces/LeaveDetails/ILeaveDetails';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import LeaveList from 'src/libraries/ResuableComponents/LeaveDetailsList';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { AcademicYearDropdown, CategoryDropdown, DeleteLeaveDetails, StatusDropdown, getAllReportingUsers, getLeaveDetailList, resetDeleteHolidayDetails } from 'src/requests/LeaveDetails/RequestLeaveDetails';
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
    const [showNonupdatedrecords, setshowNonupdatedrecords] = useState(true);
    const HolidayFullAccess = GetScreenPermission('Holidays');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const [asUpdatedById, setasUpdatedById] = useState('0');
    const [PagedLeave, setPagedLeave] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const [page, setPage] = useState(1);
    const { showAlert, closeAlert } = useContext(AlertContext);

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
    const AllReportingUser = useSelector(
        (state: RootState) => state.LeaveDetails.AllReportingUsers
    );
    const deleteLeavedetailsMsg = useSelector(
        (state: RootState) => state.LeaveDetails.DeleteLeaveMsg
    );
    const filteredList = GetLeaveList.filter((item) => item.TotalRows !== undefined);
    const TotalCount = filteredList.map((item) => item.TotalRows);
    const uniqueTotalCount = [...new Set(TotalCount)];
    const singleTotalCount = uniqueTotalCount[0];

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
        asCategoryId: Number(selectCategory),
        asShowOnlyNonUpdated: false
    };
    useEffect(() => {
        dispatch(AcademicYearDropdown(AcademicYearBody));
    }, []);
    useEffect(() => {
        dispatch(getAllReportingUsers(AllReportingUsersbody));
    }, []);
    // useEffect(() => {
    //     if (GetAcademicYear.length > 0) {
    //         setAcademicYear(GetAcademicYear.slice(0, 4)[1].Value);
    //     }
    // }, [GetAcademicYear])
    useEffect(() => {
        if (GetAcademicYear.length > 0) {
            const initialYears = GetAcademicYear.slice(0, 4);
            const currentYear = initialYears.find(year => year.Is_Current_Year === 'Y') || initialYears[1];
            setAcademicYear(currentYear.Value);
        }
    }, [GetAcademicYear]);
    useEffect(() => {
        dispatch(CategoryDropdown(CategoryDropdownBody));
    }, [selectAcademicYear]);
    useEffect(() => {
        if (GetCategoryDropdownList.length > 0) {
            setCategory(GetCategoryDropdownList.slice(0, 3)[0].Value);
        }
    }, [GetCategoryDropdownList]);

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
    }, [page, rowsPerPage, selectAcademicYear, selectCategory, selectStatus]);
    const AllReportingUsersbody: IGetAllReportingUsersBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(selectAcademicYear)
    }
    const body: IGetLeaveDetailsListBody = {
        asSchoolId: Number(asSchoolId),
        asUserId: Number(asUserId),
        asCategoryId: Number(selectCategory),
        asStatusId: Number(selectStatus),
        asSortExpression: "StartDate Desc, EndDate asc, DesignationId asc ,FirstName  asc, MiddleName asc, LastName asc",
        asStartIndex: (page - 1) * rowsPerPage,
        asEndIndex: page * rowsPerPage,
        asShowOnlyNonUpdated: false,
        asAcademicYearId: Number(selectAcademicYear)
    };
    const deleteRow = (Id) => {
        const DeleteLeaveBody: IGetDeleteLeaveBody = {
            asSchoolId: Number(asSchoolId),
            asId: Number(Id),
            asUpdatedById: Number(asUserId), // userId for delete 
        };
        showAlert({
            title: 'Please Confirm',
            message:
                'Are you sure you want to delete this leave?  ',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(DeleteLeaveDetails(DeleteLeaveBody));
                closeAlert();
            }
        });
    };
    useEffect(() => {
        if (deleteLeavedetailsMsg != '') {
            toast.success(deleteLeavedetailsMsg)
            dispatch(resetDeleteHolidayDetails());
            dispatch(getLeaveDetailList(body));
        }
    }, [deleteLeavedetailsMsg])
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
        if (selectCategory === '1') {
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
    const [HeaderLeave, setHeaderLeave] = useState([
        { Id: 1, Header: 'Sender Name' },
        { Id: 2, Header: 'Start Date' },
        { Id: 3, Header: 'End Date' },
        { Id: 5, Header: 'Total Days' },
        { Id: 6, Header: 'Leave Type' },
        { Id: 7, Header: 'Leave Balance' },
        { Id: 8, Header: 'View' },
    ]);
    useEffect(() => {
        if (selectCategory === '1') {
            if (!HeaderLeave.find(header => header.Id === 9)) {
                setHeaderLeave(prevHeaders => [
                    ...prevHeaders,
                    { Id: 9, Header: 'Delete' }
                ]);
            }
        } else {
            setHeaderLeave(prevHeaders => prevHeaders.filter(header => header.Id !== 9));
        }
    }, [selectCategory]);

    const [holidayColumns, setHolidayColumns] = useState<Column[]>(getLeaveDetailsColumns());
    const AddLeave = () => {
        navigate("../AddLeaveDetails");
    };
    const PageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset to the first page when changing rows per page
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
    const handleCheckboxChange = (value) => {
        setshowNonupdatedrecords(value);
    };

    useEffect(() => {
        if (GetLeaveList) {
            setPagedLeave(GetLeaveList);
        }
    }, [GetLeaveList]);

    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
    const pagecount = Math.ceil(singleTotalCount / rowsPerPage);
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
                            sx={{ minWidth: '20vw' }}
                            ItemList={GetAcademicYear.slice(0, 4)}
                            defaultValue={selectAcademicYear}
                            mandatory
                            onChange={clickAcademicYearDropdown}
                            size={"small"}
                            label='Academic Year'
                        />
                        <SearchableDropdown
                            sx={{ minWidth: '20vw' }}
                            ItemList={GetCategoryDropdownList.slice(0, 3)}
                            defaultValue={selectCategory}
                            mandatory
                            onChange={clickCategoryDropdown}
                            size={"small"}
                            label={'Category '}
                        />
                        <SearchableDropdown
                            sx={{ minWidth: '20vw' }}
                            ItemList={GetStatusDropdown}
                            defaultValue={selectStatus}
                            mandatory
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
                        {selectCategory == '1' ? (
                            <Tooltip title="Add New Leave">
                                <IconButton sx={{
                                    bgcolor: green[500],
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: green[600]
                                    }
                                }}
                                    onClick={AddLeave}
                                >
                                    <Add />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                    </Box>
                }
            />

            <Box sx={{ background: 'white', p: 2 }}>
                {singleTotalCount > rowsPerPage ? <div style={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                        <Box component="span" fontWeight="fontWeightBold">
                            {startRecord} to {endRecord}
                        </Box>
                        {' '}out of{' '}
                        <Box component="span" fontWeight="fontWeightBold">
                            {singleTotalCount}
                        </Box>{' '}
                        {singleTotalCount === 1 ? 'record' : 'records'}
                    </Typography>
                </div> : <span> </span>}

                <LeaveList
                    HeaderArray={HeaderLeave}
                    ItemList={GetLeaveList}
                    clickDelete={deleteRow}
                    clickView={ViewLeave} />
                <br />
                {
                    PagedLeave.length > 19 ? (
                        <ButtonGroupComponent
                            PageChange={PageChange}
                            numberOfButtons={pagecount}
                            rowsPerPage={rowsPerPage}
                            ChangeRowsPerPage={ChangeRowsPerPage}
                            rowsPerPageOptions={rowsPerPageOptions}
                        />

                    ) : (
                        <span></span>

                    )
                }
            </Box>
        </Box>
    );
};

export default LeaveDetailsBaseScreen;
