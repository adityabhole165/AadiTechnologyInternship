
import QuestionMark from '@mui/icons-material/QuestionMark';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CommonPageHeader from 'src/components/CommonPageHeader';
import { IGetSentItemsBody } from 'src/interfaces/SentSms/Sentsms';
import { CDAGetSentItems } from 'src/requests/SentSms/ReqSentsms';
import { RootState } from 'src/store';
import SentsmsList from './SentsmsList';


const Sentsms = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const [regNoOrName, setRegNoOrName] = useState('');
    const [sortExpression, setSortExpression] = useState('ORDER BY Insert_Date DESC');
    const [SmsList, setSmsList] = useState([]);
    const [SmsListID, setSmsListID] = useState([]);

    
    console.log(SmsListID,"SmsListID");
    
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

    useEffect(() => {
        setSmsList(USGetSentItems);
    }, [USGetSentItems]);
    console.log(USGetSentItems, "USGetSentItems");


    const handleRegNoOrNameChange = (value) => {
        setRegNoOrName(value);
    };



    const clickSearch = () => {
        // if (regNoOrName === '') {
        //   setPagedRequisition(GetPagedRequisition);
        // } else {
        //   setPagedRequisition(
        //     GetPagedRequisition.filter((item) => {
        //       const text1Match = item.RequisitionCode.toLowerCase().includes(
        //         regNoOrName.toLowerCase()
        //       );
        //       const text2Match = item.RequisitionName.toLowerCase().includes(
        //         regNoOrName.toLowerCase()
        //       );
        //       return text1Match || text2Match;
        //     })
        //   );
        // }
    };

    const GetSentItemsBody: IGetSentItemsBody = {
        "asSchoolId": 18,
        "asUser_Id": 5902,
        "asReceiver_User_Role_Id": 2,
        "asAcademic_Year_Id": 55,
        "asSortExp": "ORDER BY Insert_Date DESC",
        "asprm_StartIndex": 0,
        "asPageSize": 100000,
        "asName": "",
        "asContent": "",
        "asViewAllSMS": 0
    };


     const handleClickEdit = () => {

     }


     const Changevalue = (value) => {
       
        // setSmsListID(value);
        
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
                ItemList={USGetSentItems}
                ClickHeader={handleHeaderClick}
                clickEdit={handleClickEdit}
              
            />




        </Box>
    );
};

export default Sentsms;


