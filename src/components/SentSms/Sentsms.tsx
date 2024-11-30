
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Download from '@mui/icons-material/Download';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import CommonPageHeader from 'src/components/CommonPageHeader';
import { AlertContext } from 'src/contexts/AlertContext';
import { IDeleteSMSBody, IExportSentItemsBody, IGetSentItemsBody } from 'src/interfaces/SentSms/Sentsms';
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
    const [sortExpression, setSortExpression] = useState('ORDER BY Insert_Date DESC');
    const [SmsList, setSmsList] = useState([]);
    const [SmsListID, setSmsListID] = useState('');
    const { showAlert, closeAlert } = useContext(AlertContext);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const [headerArray, setHeaderArray] = useState([
        { Id: 1, Header: 'To', SortOrder: null, sortKey: 'RequisitionCode' },
        { Id: 2, Header: 'SMS Text', SortOrder: null, sortKey: 'RequisitionName' },
        { Id: 3, Header: 'Send Date', SortOrder: null, sortKey: 'StatusName' },
        { Id: 4, Header: 'Resend', SortOrder: null, sortKey: 'CreaterName' },
        { Id: 5, Header: 'Status', SortOrder: 'desc', sortKey: 'Created_Date' },

    ]);
    const handleHeaderClick = (updatedHeaderArray) => {
        setHeaderArray(updatedHeaderArray);
        const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
        const newSortExpression = sortField ? `${sortField.sortKey} ${sortField.SortOrder}` : 'Created_Date desc';
        setSortExpression(newSortExpression);
    };


    const USGetSentItems = useSelector(
        (state: RootState) => state.SentSms.ISGetSentItems
    );

    const DeleteSMS = useSelector(
        (state: RootState) => state.SentSms.ISDeleteSMS
    );
    const UsExportSentItems = useSelector(
        (state: RootState) => state.SentSms.ISExportSentItems
    );

    const handleRegNoOrNameChange = (value) => {
        setRegNoOrName(value);
    };

    const clickSearch = () => {
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
        "asSortExp": "ORDER BY Insert_Date DESC",
        asprm_StartIndex: startIndex,
        asPageSize: endIndex,
        asName: regNoOrName,
        "asContent": "",
        asViewAllSMS: 0
    };

    const ExportSentItemsBody: IExportSentItemsBody = {
        asSchoolId: asSchoolId,
        asUser_Id: asUserId,
        asReceiver_User_Role_Id: 2,
        asAcademic_Year_Id: asAcademicYearId,
        "asSortExp": "ORDER BY Insert_Date DESC",
        asprm_StartIndex: startIndex,
        asPageSize: endIndex,
        asName: regNoOrName,
        "asContent": "",
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

    }

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
    }, [startIndex, endIndex, regNoOrName]);

    useEffect(() => {
        dispatch(CDAGetSentItems(GetSentItemsBody));
    }, [startIndex, endIndex, regNoOrName]);
    
    useEffect(() => {
        setSmsList(USGetSentItems);
    }, [USGetSentItems]);



    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Sent Sms', path: '/extended-sidebar/Teacher/Requisition' }
                ]}
                rightActions={<>

                    <TextField
                        sx={{ width: '15vw' }}
                        fullWidth
                        label="Item Code/ Requisition"
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

                    <Box>
                        <Tooltip title={"Delete"}>
                            <IconButton
                                onClick={clickdelete}
                                sx={{
                                    color: '#223354',
                                    mt: 0.7,
                                    '&:hover': {
                                        color: 'red',
                                        backgroundColor: red[100]
                                    }
                                }}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

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




                </>}
            />
            <SentsmsList
                HeaderArray={headerArray}
                ItemList={SmsList}
                ClickHeader={handleHeaderClick}
                clickEdit={handleClickEdit}
                clickchange={Changevalue}
            />
            <ButtonGroupComponent
                rowsPerPage={rowsPerPage}
                ChangeRowsPerPage={ChangeRowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                PageChange={PageChange}
                pagecount={''}
            />





        </Box>
    );
};

export default Sentsms;



