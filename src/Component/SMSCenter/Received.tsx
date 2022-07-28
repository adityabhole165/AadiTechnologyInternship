import { useEffect } from 'react';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import AReceiveSMSListInterface from "src/Interface/AdminSMSCenter/AReceiveSMS";
import { getReceiveSMSList } from "src/Client_Api/AdminSMSCenter/AReceiveSMS";
import { GetMessagesResult } from 'src/Interface/AdminSMSCenter/AReceiveSMS';
import List20 from 'src/UI_Library/list/List20';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ErrorMessages from 'src/UI_Library/ErrorMessages/ErrorMessages';


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
        <>
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
                        <List20 UserName={item.UserName} Subject={item.Subject} Date={item.Date} Time={item.Time}  key={i} />
                        </RouterLink>
                     </>
                    )
                })
            }
        </>
    )
}
export default Received;