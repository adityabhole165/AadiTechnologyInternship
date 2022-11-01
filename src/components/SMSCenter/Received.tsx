import { useEffect } from 'react';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import AReceiveSMSListInterface from "src/interfaces/AdminSMSCenter/AReceiveSMS";
import { getReceiveSMSList } from "src/requests/AdminSMSCenter/AReceiveSMS";
import { GetMessagesResult } from 'src/interfaces/AdminSMSCenter/AReceiveSMS';
import List20 from 'src/libraries/list/List20';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Card1 from 'src/libraries/mainCard/Card1';
import { Container } from '@mui/material';


function Received() {
    const dispatch = useDispatch();
    const ReceiveSMSList : any = useSelector((state: RootState) => state.AReceiveSMS.AReceiveSMSList);
    
    
    // BODY FOR API
    
    const body: AReceiveSMSListInterface = {
        asUserId:"695",
        asAcademicYearId:"9",
        asUserRoleId:"6",
        asSchoolId:"120",
        abIsSMSCenter : true,
        asPageIndex: "0",
        asFilter: "",
        asMonthId: ""

    };
    // CALL FOR API 
    useEffect(()=>{
        dispatch(getReceiveSMSList(body));
    },[])
    

    return(
        <Container>
            {
                (ReceiveSMSList.length === 0  )
                ?
                <ErrorMessages Error={'No Message Has Been Received'} />
                :
                (ReceiveSMSList == undefined ) 
                ?
                null
                :
                ReceiveSMSList.map((item:GetMessagesResult,i) =>{
                    return(
                    <>
                    <RouterLink key={i} to={
                            `/${location.pathname.split('/')[1]
                            }/SMSCenter/ViewReceiveSMS/` + item.DetailsId
                          }
                            color="primary"
                            style={{ textDecoration: 'none' }}>
                        {/* <List20 UserName={item.UserName} Subject={item.Subject} Date={item.Date} Time={item.Time}  key={i} /> */}
                        <Card1
                    header={item.UserName}
                    text1={item.Subject} text2={item.Time +"  "+ item.Date} text3={''} text4={''} text5={''} text6={''}
                    Color={''}
                    margin={''}
                    FileName={''}
                    key={i}
                  />
                        
                        </RouterLink>
                     </>
                    )
                })
            }
        </Container>
    )
}
export default Received;