import Add from "@mui/icons-material/Add"
import Delete from "@mui/icons-material/Delete"
import Edit from "@mui/icons-material/Edit"
import QuestionMark from "@mui/icons-material/QuestionMark"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { green } from "@mui/material/colors"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { GetScreenPermission, encodeURL, getSchoolConfigurations } from "src/components/Common/Util"
import CommonPageHeader from "src/components/CommonPageHeader"
import { Column } from "src/components/DataTable"
import { AlertContext } from 'src/contexts/AlertContext'
import { IGetHolidayBody, IHolidaysFA } from "src/interfaces/Common/Holidays"
import SuspenseLoader from "src/layouts/components/SuspenseLoader"
import ButtonGroupComponent from "src/libraries/ResuableComponents/ButtonGroupComponent"
import HolidaysList from "src/libraries/ResuableComponents/HolidaysList"
import { DeleteHolidayDetails, getHolidaysF, resetDeleteHolidayDetails } from "src/requests/Holiday/Holiday"
import { RootState } from "src/store"
type Props = {}

const Holidays = (props: Props) => {
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('SchoolId');
    const asStandardId = sessionStorage.getItem('StandardId');
    const asDivisionId = sessionStorage.getItem('DivisionId');
    const [asHoliday_Id, setAsHoliday_Id] = useState();
    let CanAdd = getSchoolConfigurations(14)
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const { showAlert, closeAlert } = useContext(AlertContext);

    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const HolidayFullAccess = GetScreenPermission('Holidays')
    //console.log(HolidayFullAccess, 'ScreenPermission');

    const holidaysList = useSelector(
        (state: RootState) => state.Holidays.HolidaysDataF
    );
    const filteredList = holidaysList.filter((item) => item.TotalRows !== undefined);
    const TotalCount = filteredList.map((item) => item.TotalRows);
    const uniqueTotalCount = [...new Set(TotalCount)];
    const singleTotalCount = uniqueTotalCount[0];


    const deleteHolidaydetailsMsg = useSelector(
        (state: RootState) => state.Holidays.DeleteHolidayMsg
    );

    const Loading: any = useSelector((state: RootState) => state.Holidays.Loading);


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
                        <Tooltip title="Delete">
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
        { Id: 1, Header: 'Start Date 	' },
        { Id: 2, Header: ' 	End Date' },
        { Id: 3, Header: 'Name' },
        { Id: 4, Header: ' Associated Class(es)' },
        { Id: 5, Header: ' Total Days' },
        { Id: 6, Header: 'Edit' },
        { Id: 7, Header: 'Delete' }
    ];

    const [holidayColumns, setHolidayColumns] = useState<Column[]>(getHolidayColumns());

    const body: IHolidaysFA = {
        asAcademicYrId: Number(asAcademicYearId),
        asSchoolId: Number(asSchoolId),
        asStandardId: Number(0),
        asDivisionId: Number(0),
        asSortExp: "ORDER BY Holiday_Start_Date ASC",
        asStartIndex: (page - 1) * rowsPerPage,
        asPageSize: page * rowsPerPage,
    };



    // const deleteRow = (Holiday_Id) => {
    //     if (
    //         confirm('Are you sure you want to delete this holiday?')
    //     ) {
    //         console.log(Holiday_Id, "1234567890");
    //         const DeleteHolidayBody: IGetHolidayBody = {
    //             asSchoolId: Number(asSchoolId),
    //             asAcademicYearID: Number(asAcademicYearId),
    //             asHoliday_Id: Number(Holiday_Id),
    //         };
    //         dispatch(DeleteHolidayDetails(DeleteHolidayBody));
    //     }
    // };


    const deleteRow = (Holiday_Id) => {
        const DeleteHolidayBody: IGetHolidayBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearID: Number(asAcademicYearId),
            asHoliday_Id: Number(Holiday_Id),
        };

        showAlert({
            title: 'Please Confirm',
            message:
                'Are you sure you want to delete this holiday?  ',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(DeleteHolidayDetails(DeleteHolidayBody));
                closeAlert();
            }
        });


    };

    useEffect(() => {
        if (deleteHolidaydetailsMsg != '') {
            toast.success(deleteHolidaydetailsMsg)
            dispatch(resetDeleteHolidayDetails());
            dispatch(getHolidaysF(body));
        }
    }, [deleteHolidaydetailsMsg])

    const editRow = (Holiday_Id) => {
        navigate("../AddHoliday/" + encodeURL(Holiday_Id), { state: { fromInternal: true } });
    };

    const AddHoliday = () => {
        navigate("../AddHoliday", { state: { fromInternal: true } });
    };
    const PageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset to the first page when changing rows per page
    };
    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
    const pagecount = Math.ceil(singleTotalCount / rowsPerPage);
    useEffect(() => {
        dispatch(getHolidaysF(body));
    }, [page, rowsPerPage]);

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    // {
                    //     title: 'School Configuration',
                    //     path: '/RITeSchool/Admin/SchoolConfiguration'
                    // },
                    {
                        title: 'Holidays',
                        path: ''
                    }
                ]}
                rightActions={<>
                    <Box>
                        <Tooltip title={"Holiday list for the current year declared by your school."}>
                            <IconButton sx={{
                                bgcolor: 'grey.500',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'grey.600'
                                }
                            }}>
                                <QuestionMark />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    {CanAdd === 'Y' ? (
                        <Box>
                            <Tooltip title={"Add New Holiday"}>
                                <IconButton sx={{
                                    bgcolor: green[500],
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: green[600]
                                    }
                                }} onClick={() => AddHoliday()}>
                                    <Add />
                                </IconButton>
                            </Tooltip>
                        </Box>

                    ) : null}
                </>}
            />
            {Loading &&
                <SuspenseLoader />
            }
            {/* Content */}
            <Box sx={{ background: 'white', pt: 1 }}>
                {/* <DataTable
                    columns={holidayColumns}
                    data={holidaysList}
                    isLoading={false}
                /> */}

                {singleTotalCount > 0 ? <div style={{ flex: 1, textAlign: 'center' }}>
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


                <Box px={2} pb={2}>
                    <HolidaysList
                        ItemList={holidaysList}
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

                    /> : <span> </span>}


                </Box>
            </Box>
        </Box>
    )
}

export default Holidays;