
import { AddTwoTone } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Download from '@mui/icons-material/Download';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { IDeleteSMSBody, IExportSentItemsBody, IGetSentItemsBody } from 'src/interfaces/SentSms/Sentsms';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { CDADeleteSMSApi, CDAExportSentItems, CDAGetSentItems, CDAResetDelete } from 'src/requests/SentSms/ReqSentsms';
import { RootState } from 'src/store';
import SentsmsList from './SentsmsList';
const Sentsms = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const StandardDivisionId = Number(
        sessionStorage.getItem('StandardDivisionId')
    );
    const asUpdatedById = localStorage.getItem('Id');
    const asTeacherId = sessionStorage.getItem('TeacherId');
    const asUserId = Number(localStorage.getItem('UserId'));
    const [regNoOrName, setRegNoOrName] = useState('');
    const [regNoOrName1, setRegNoOrName1] = useState('');

    const [SmsList, setSmsList] = useState([]);
    const [SmsListID, setSmsListID] = useState('');
    const { showAlert, closeAlert } = useContext(AlertContext);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const [sortExpression, setSortExpression] = useState('ORDER BY Insert_Date DESC ');

    const [headerArray, setHeaderArray] = useState([
        { Id: 1, Header: 'To', SortOrder: null, sortKey: 'ORDER BY UserName' },
        { Id: 2, Header: 'SMS Text', SortOrder: null, sortKey: 'ORDER BY SMS_Text' },
        { Id: 3, Header: 'Send Date', SortOrder: 'DESC', sortKey: 'ORDER BY Insert_Date' },
        { Id: 4, Header: 'Resend', SortOrder: null, sortKey: 'CreaterName' },
        { Id: 5, Header: 'Status', SortOrder: 'DESC', sortKey: 'Created_Date' },

    ]);
    const handleHeaderClick = (updatedHeaderArray) => {
        setHeaderArray(updatedHeaderArray);
        const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
        const newSortExpression = sortField ? `${sortField.sortKey} ${sortField.SortOrder}` : 'Created_Date desc';
        setSortExpression(newSortExpression);
    };


    const USGetSentItems: any = useSelector(
        (state: RootState) => state.SentSms.ISGetSentItems
    );

    const Loading: any = useSelector((state: RootState) => state.SentSms.Loading);


    const totalRows = USGetSentItems.length > 0 ? USGetSentItems[0].TotalRows : null;

    const DeleteSMS = useSelector(
        (state: RootState) => state.SentSms.ISDeleteSMS
    );
    const UsExportSentItems = useSelector(
        (state: RootState) => state.SentSms.ISExportSentItems
    );

    const handleRegNoOrNameChange = (value) => {
        setRegNoOrName(value);
    };

    const handleRegNoOrNameChange1 = (value) => {
        setRegNoOrName1(value);
    };

    const clickSearch1 = () => {
        if (regNoOrName1 === '') {
            setSmsList(USGetSentItems);
        } else {
            setSmsList(
                USGetSentItems.filter((item) => {
                    const text1Match = item.SenderName.toLowerCase().includes(
                        regNoOrName.toLowerCase()
                    );
                    const text2Match = item.StatusId.toLowerCase().includes(
                        regNoOrName.toLowerCase()
                    );
                    const text3Match = item.Subject.toLowerCase().includes(
                        regNoOrName.toLowerCase()
                    );
                    const text4Match = item.Insert_Date.toLowerCase().includes(
                        regNoOrName.toLowerCase()
                    );

                    return (text1Match || text2Match) || (text3Match || text4Match);
                })
            );
        }
        dispatch(CDAGetSentItems(GetSentItemsBody));
    };


    const clickSearch = () => {
        clickSearch1()
        if (regNoOrName === '') {
            setSmsList(USGetSentItems);
        } else {
            setSmsList(
                USGetSentItems.filter((item) => {
                    const text1Match = item.SenderName.toLowerCase().includes(
                        regNoOrName.toLowerCase()
                    );
                    const text2Match = item.StatusId.toLowerCase().includes(
                        regNoOrName.toLowerCase()
                    );


                    return text1Match || text2Match;
                })
            );
        }
        dispatch(CDAGetSentItems(GetSentItemsBody));
    };

    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, totalRows);
    const pagecount = Math.ceil(totalRows / rowsPerPage);
    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const PageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const GetSentItemsBody: IGetSentItemsBody = {
        asSchoolId: asSchoolId,
        asUser_Id: asUserId,
        asReceiver_User_Role_Id: 2,
        asAcademic_Year_Id: asAcademicYearId,
        asSortExp: sortExpression,
        asprm_StartIndex: startIndex,
        asPageSize: endIndex,
        asName: regNoOrName,
        asContent: regNoOrName1,
        asViewAllSMS: 0
    }

    const ExportSentItemsBody: IExportSentItemsBody = {
        asSchoolId: asSchoolId,
        asUser_Id: asUserId,
        asReceiver_User_Role_Id: 2,
        asAcademic_Year_Id: asAcademicYearId,
        asSortExp: sortExpression,
        asprm_StartIndex: startIndex,
        asPageSize: endIndex,
        asName: regNoOrName,
        asContent: regNoOrName1,
        asViewAllSMS: 0

    };

    const clickdelete = () => {
        const DeleteSMSBody: IDeleteSMSBody = {
            "asSMS_Id": SmsListID.toString(),
            "asSchoolId": asSchoolId
        };
        showAlert({
            title: 'Please Confirm',
            message:
                'Are you sure you want to delete the selected SMS(s)?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(CDADeleteSMSApi(DeleteSMSBody));
                closeAlert();
            }
        });
    };

    useEffect(() => {
        if (DeleteSMS != '') {
            dispatch(CDAResetDelete());
            toast.success(DeleteSMS);

            dispatch(CDAGetSentItems(GetSentItemsBody));

        }
    }, [DeleteSMS]);





    const handleClickEdit = () => {
        navigate('/extended-sidebar/Teacher/SMSCenter');
    };


    const NewSms = (ViewId) => {
        navigate('/extended-sidebar/Teacher/SMSCenter');
    };



    const Changevalue = (updatedList) => {
        setSmsList(updatedList);  // Update SmsList with the updated list
        const activeItems = updatedList.filter(item => item.IsActive).map(item => item.Id);
        setSmsListID(activeItems);  // Update SmsListID based on active items
    };


    const convertToCSV = () => {
        // Prepare headers
        const headers = [
            'RowID',
            'From',
            'To',
            'SMSText',
            'SendDate',
        ];

        // Prepare rows
        const rows = UsExportSentItems.map(item => {
            const row = [
                item.RowID,
                item.From,
                item.To,
                item.SMSText,
                item.SendDate,



            ];

            return row;
        });

        const csvContent = [
            headers.join(','),
            ...rows.map(row =>
                row.map(cell =>
                    `"${String(cell || '').replace(/"/g, '""')}"`
                ).join(',')
            ),
        ].join('\n');

        return csvContent;
    };

    const exportToExcel = () => {
        try {
            const csvContent = convertToCSV();
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `SentSmsDetails.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting to CSV:', error);
        }
    };

    const Exportremark = () => {
        const confirmMessage = "This Action will show only saved details. Do you want to continue?";


        showAlert({
            title: 'Please Confirm',
            message: confirmMessage,
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                exportToExcel();


                closeAlert();
            }
        });

    };


    useEffect(() => {
        dispatch(CDAExportSentItems(ExportSentItemsBody));
    }, [startIndex, endIndex, sortExpression]);

    useEffect(() => {
        dispatch(CDAGetSentItems(GetSentItemsBody));
    }, [startIndex, endIndex, sortExpression]);

    useEffect(() => {
        setSmsList(USGetSentItems);
    }, [USGetSentItems]);



    return (
        <Box sx={{ px: 2 }}>
            {(Loading) && <SuspenseLoader />}

            <Stack direction="row"
                alignItems="center"
                justifyContent="flex-end"
                gap={1}    >
                <>

                    <TextField
                        sx={{ width: '15vw' }}
                        fullWidth
                        label="Name / Reg. No. / User Name :"
                        value={regNoOrName}
                        variant={'outlined'}
                        size={"small"}
                        onChange={(e) => {
                            handleRegNoOrNameChange(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === 'Tab') {
                                clickSearch();
                            }
                        }}
                    />

                    <TextField
                        sx={{ width: '15vw' }}
                        fullWidth
                        label="Content :"
                        value={regNoOrName1}
                        variant={'outlined'}
                        size={"small"}
                        onChange={(e) => {
                            handleRegNoOrNameChange1(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === 'Tab') {
                                clickSearch();
                            }
                        }}
                    />

                    <IconButton
                        onClick={clickSearch}
                        sx={{
                            background: (theme) => theme.palette.primary.main,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.primary.dark
                            }
                        }}
                    >
                        <SearchTwoTone />
                    </IconButton>


                    {SmsList.length > 0 && <Box>
                        <Tooltip title={"Delete"}>
                            <IconButton
                                onClick={clickdelete}

                                sx={{
                                    color: 'white',
                                    backgroundColor: red[500],
                                    '&:hover': {
                                        // color: red[300],
                                        backgroundColor: red[600]
                                    }
                                }}



                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>}


                    <Box>
                        <Tooltip title={'Export'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: blue[500],
                                    '&:hover': {
                                        backgroundColor: blue[600]
                                    }
                                }}
                                onClick={Exportremark}  >
                                <Download />
                            </IconButton>
                        </Tooltip>

                    </Box>
                    <Tooltip title={'New Sms'}>
                        <IconButton
                            onClick={NewSms}
                            sx={{
                                color: 'white',
                                backgroundColor: green[500],
                                height: '36px !important',
                                ':hover': { backgroundColor: green[600] },

                            }}
                        >
                            <AddTwoTone />
                        </IconButton>
                    </Tooltip>


                    <Box>
                        <Tooltip title={'Here you can see list of existing requisition according to status.'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': {
                                        backgroundColor: grey[600]
                                    }
                                }}
                            >
                                <QuestionMark />
                            </IconButton>
                        </Tooltip>
                    </Box>




                </>
            </Stack>





            {SmsList.length > 0 && <Box mb={1} sx={{ p: 2, background: 'white' }}>
                {
                    SmsList.length > 0 ? (
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                                <Box component="span" fontWeight="fontWeightBold">
                                    {startRecord} to {endRecord}
                                </Box>
                                {' '}out of{' '}
                                <Box component="span" fontWeight="fontWeightBold">
                                    {totalRows}
                                </Box>{' '}
                                {totalRows === 1 ? 'record' : 'records'}
                            </Typography>
                        </div>

                    ) : (
                        <span></span>

                    )
                }

                <SentsmsList
                    HeaderArray={headerArray}
                    ItemList={SmsList}
                    ClickHeader={handleHeaderClick}
                    clickEdit={handleClickEdit}
                    clickchange={Changevalue}
                />

                {
                    endRecord > 19 ? (
                        <ButtonGroupComponent
                            rowsPerPage={rowsPerPage}
                            ChangeRowsPerPage={ChangeRowsPerPage}
                            rowsPerPageOptions={rowsPerPageOptions}
                            PageChange={PageChange}
                            pagecount={pagecount}
                        />

                    ) : (
                        <span></span>

                    )
                }



            </Box>


            }

            {
                SmsList.length == 0 && !Loading ? <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        marginTop: 4,
                        backgroundColor: '#324b84',
                        padding: 1,
                        borderRadius: 2,
                        color: 'white',
                    }}
                >
                    <b>No Records Found.</b>
                </Typography>
                    : (
                        <span></span>
                    )
            }






        </Box>
    );
};

export default Sentsms;



