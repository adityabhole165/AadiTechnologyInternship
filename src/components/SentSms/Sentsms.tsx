
import QuestionMark from '@mui/icons-material/QuestionMark';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useEffect, useState,useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CommonPageHeader from 'src/components/CommonPageHeader';
import { IDeleteSMSBody, IGetSentItemsBody } from 'src/interfaces/SentSms/Sentsms';
import { CDADeleteSMSApi, CDAGetSentItems } from 'src/requests/SentSms/ReqSentsms';
import { RootState } from 'src/store';
import SentsmsList from './SentsmsList';
import { AlertContext } from 'src/contexts/AlertContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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

    console.log(SmsListID, "SmsListID");

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

    useEffect(() => {
        setSmsList(USGetSentItems);
    }, [USGetSentItems]);
    console.log(USGetSentItems, "USGetSentItems");


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

    const GetSentItemsBody: IGetSentItemsBody = {
        "asSchoolId": asSchoolId,
        "asUser_Id": asUserId,
        "asReceiver_User_Role_Id": 2,
        "asAcademic_Year_Id": asAcademicYearId,
        "asSortExp": "ORDER BY Insert_Date DESC",
        "asprm_StartIndex": 0,
        "asPageSize": 100000,
        "asName": regNoOrName,
        "asContent": "",
        "asViewAllSMS": 0
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
   


    const handleClickEdit = () => {

    }





    const Changevalue = (updatedList) => {
        setSmsList(updatedList);  // Update SmsList with the updated list
        const activeItems = updatedList.filter(item => item.IsActive).map(item => item.Id);
        setSmsListID(activeItems);  // Update SmsListID based on active items
    };

    useEffect(() => {
        dispatch(CDAGetSentItems(GetSentItemsBody));
    }, []);

  



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




        </Box>
    );
};

export default Sentsms;



