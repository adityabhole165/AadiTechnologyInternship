import { Add, Delete, Edit, QuestionMark } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { Props } from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { IDeleteHolidayDetailsBody, IGetHolidayDetailssBody } from 'src/interfaces/HolidayNew/IHolidays';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import HolidaysList from "src/libraries/ResuableComponents/HolidaysList";
import { resetDeleteHolidayDetails } from 'src/requests/Holiday/Holiday';
import { GetDeleteHolidayDetails, GetGetHolidayDetailss } from 'src/requests/HolidayNew/RequestHolidays';
import { RootState } from 'src/store';
import { getSchoolConfigurations, GetScreenPermission } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import { Column } from '../DataTable';





const Holiday = (props: Props) => {
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('SchoolId');
    const asStandardId = sessionStorage.getItem('StandardId');
    const asDivisionId = sessionStorage.getItem('DivisionID');
    const [asHoliday_Id, setAsHoliday_Id] = useState('');
    let CanAdd = getSchoolConfigurations(14);
    const [rowsPerPage, setRowsPerPage] = useState<number>(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const { showAlert, closeAlert } = useContext(AlertContext);

    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const HolidayFullAccess = GetScreenPermission('Holidays');
    console.log(HolidayFullAccess, 'ScreenPermission');

    const holidayList01 = useSelector(
        (state: RootState) => state.HolidayNew.GetHolidayDetailss //errror solved Take HolidayDetailss from request and changed the Holiday list name 
    )

    const filteredList = holidayList01.filter((item) => item.TotalRows !== undefined);
    const TotalCount = filteredList.map((item) => item.TotalRows);
    const uniqueTotalCount = [... new Set(TotalCount)];
    const singleTotalCount = Number(uniqueTotalCount[0]) || 0;

    const deleteHolidayDetailsMsg = useSelector(
        (state: RootState) => state.HolidayNew.DeleteHolidayDetails
    );

    const Loading: any = useSelector((state: RootState) => state.HolidayNew.Loading);
    //for full access to display edit and delete functionality

    const getHolidayColumns = () => {
        let HolidayColumns: Column[] = [
            {
                id: 'startDate',
                label: 'Start Date',
                renderCell: (rowData: any) => {
                    return (
                        <div style={{ textAlign: 'center' }}>
                            getDateMonthYearDayDash(rowData.Text1)
                        </div>
                    );
                }

            },

            {
                id: 'endDate',
                label: 'End Date',
                renderCell: (rowData: any) => {
                    return (
                        <div style={{ textAlign: 'center' }}>
                            getDateMonthYearDayDash(rowData.Text2)
                        </div>
                    );
                }

            },

            {
                id: 'name',
                label: 'Name',
                renderCell: (rowData: any) => rowData.Text3,

            },

            {
                id: 'associatedClasses',
                label: 'Associated Classes',
                renderCell: (rowData: any) => rowData.Text4,
                cellProps: {
                    align: 'left'
                },
                headerCellProps: {
                    align: 'left'
                }
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
            }
        ];

        if (HolidayFullAccess === 'Y') {
            HolidayColumns.push(
                {
                    id: 'edit',
                    label: 'Edit',
                    renderCell: (rowData: any) => <Box>
                        <Tooltip title={"Edit"}>
                            <IconButton sx={{ p: 0 }} color="primary" onClick={() => editRow(rowData.Id)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Box>,
                    cellProps: {
                        align: 'center'
                    },
                    headerCellProps: {
                        align: 'center'
                    }
                },

                {
                    id: 'delete',
                    label: 'Delete',
                    renderCell: (rowData: any) => <Box>
                        <Tooltip title={"Delete"}>
                            <IconButton sx={{ p: 0 }} color="error" onClick={() => deleteRow(rowData.Id)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>,
                    cellProps: {
                        align: 'center'
                    },
                    headerCellProps: {
                        align: 'center'
                    }
                }
            );
        }
        return HolidayColumns;
    };

    const HeaderPublish = [
        { Id: 1, Header: 'Start Date' },
        { Id: 2, Header: 'End Date' },
        { Id: 3, Header: 'Name' },
        { Id: 4, Header: 'Associated Class(es)' },
        { Id: 5, Header: 'Total Days' },
        { Id: 6, Header: 'Edit' },
        { Id: 7, Header: ' Delete' },
    ];
    const [holidayColumns, setHolidayColumns] = useState<Column[]>(getHolidayColumns);

    const GetHolidayDetailss: IGetHolidayDetailssBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYrId: Number(asAcademicYearId),
        asSortExp: "ORDER BY Holiday_Start_Date ASC",
        asStartIndex: (page - 1) * rowsPerPage, 
        asPageSize: rowsPerPage,
        asStandardId: Number(0),
        asDivisionId: Number(0)
    }
    useEffect(() => {
        dispatch(GetGetHolidayDetailss(GetHolidayDetailss));//request madhil get name 
    }, []);

    const GetHolidayDetailss01 = useSelector((state: RootState) => state.HolidayNew.GetAllClassAndDivnew) //HolidayNew from root reducer, MyHoliday from Request initial state
    console.log(GetHolidayDetailss01, 'GetHolidayDetailss')
    const deleteRow = (Holiday_Id) => {
        const DeleteHolidayBody: IDeleteHolidayDetailsBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicyearId: Number(asAcademicYearId),
            asHolidayId: Number(Holiday_Id),
        };

        showAlert({
            title: 'Please Confirm',
            message: 'Are you sure you want to delete this holiday?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(GetDeleteHolidayDetails(DeleteHolidayBody)); // Dispatch the delete action
                closeAlert();
            }
        });
    };

    // Detect change in `deleteHolidayDetailsMsg` and fetch updated data
    useEffect(() => {
        if (deleteHolidayDetailsMsg != '') {
            toast.success(deleteHolidayDetailsMsg); // Show success message
            dispatch(resetDeleteHolidayDetails()); // Reset delete state
            dispatch(GetGetHolidayDetailss(GetHolidayDetailss)); // Fetch updated holiday list
        }
    }, [deleteHolidayDetailsMsg]); // Runs when delete message changes





    const editRow = (Holiday_Id) => {
        navigate("../Holiday/" + Holiday_Id);
    }
    const AddHoliday = () => {
        navigate("../AddHoliday");
    }
    const PageChange = (pagenumber) => {
        setPage(pagenumber);
    };

    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    }
    const startRecord = (page - 1) * Number(rowsPerPage) + 1;
    const endRecord = Math.min(page * Number(rowsPerPage), singleTotalCount);
    const pagecount = Math.ceil(singleTotalCount / Number(rowsPerPage));

    useEffect(() => {
        dispatch(GetGetHolidayDetailss(GetHolidayDetailss));

    }, [page, rowsPerPage]);


    return (
        <>

            <Box sx={{ px: 2 }}>

                <CommonPageHeader
                    navLinks={
                        [
                            {
                                title: 'Holiday',
                                path: '/extended-sidebar/Teacher/Holiday'
                            }
                        ]
                    }
                    rightActions={<>
                        <Box>
                            <Tooltip title={"Holiday list for the current year declared by your school "} >
                                <IconButton sx={{
                                    bgcolor: 'grey.500',
                                    color: 'white',
                                    '&hover': {
                                        bgcolor: 'grey.600'
                                    }
                                }}>
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        {CanAdd === 'Y' ? (
                            <Box>
                                <Tooltip title={"Add new Holiday"} >
                                    <IconButton
                                        sx={{
                                            bgcolor: green[500],
                                            color: 'white',
                                            '&hover': {
                                                bgcolor: green[600]
                                            }

                                        }} onClick={() => AddHoliday()}
                                        >
                                        <Add />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        ) : null}
                    </>}
                />
                {
                    Loading &&
                    <SuspenseLoader />
                }

                <Box sx={{ background: 'white', pt: 1 }}>
                    {singleTotalCount > 0 ?
                        <div style={{ flex: 1, textAlign: 'center' }}>
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
                        </div> :
                        <span></span>
                    }
                    <Box px={2} pb={2}>
                        <HolidaysList
                            ItemList={holidayList01}
                            clickEdit={editRow}
                            HeaderArray={HeaderPublish}
                            clickDelete={deleteRow}
                        />
                        {singleTotalCount > 19 ? <ButtonGroupComponent
                            rowsPerPage={rowsPerPage}
                            ChangeRowsPerPage={ChangeRowsPerPage}
                            rowsPerPageOptions={rowsPerPageOptions}
                            PageChange={PageChange}
                            pagecount={pagecount}
                        /> : <span></span>

                        }
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Holiday


