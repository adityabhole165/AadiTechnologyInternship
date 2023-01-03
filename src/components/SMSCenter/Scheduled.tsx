import { useEffect } from 'react';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import AScheduledSMSListInterface from "src/interfaces/AdminSMSCenter/AScheduledSMS";
import { getScheduledSMSList } from "src/requests/AdminSMSCenter/AScheduledSMS";
import { GetScheduledSMSResult } from 'src/interfaces/AdminSMSCenter/AScheduledSMS';
import List18 from 'src/libraries/list/List18';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import {Container, styled,useTheme} from '@mui/material';
import {Styles} from 'src/assets/style/student-style';
import { DotLegend1, DotLegendStyled1 } from 'src/libraries/styled/DotLegendStyled';
import { CardDetail7 } from 'src/libraries/styled/CardStyle';

function Scheduled() {   

    const classes = Styles();
    const dispatch = useDispatch();
    const ScheduledSMSList : any = useSelector((state: RootState) => state.AScheduledSMS.AScheduledSMSList);
    const list = ScheduledSMSList.GetScheduledSMSResult;
    const location = useLocation();

    // BODY FOR API
    const body: AScheduledSMSListInterface = {
        asUserId:sessionStorage.getItem('Id'),
        asAcademicYearId:sessionStorage.getItem('AcademicYearId'),
        asUserRoleId:sessionStorage.getItem('RoleId'),
        asSchoolId:localStorage.getItem('localSchoolId')
    };

    // CALL FOR API 
    useEffect(()=>{
        dispatch(getScheduledSMSList(body));
    },[])

   

    return(
        <>
        <Container>
        <br />
           <DotLegend1>
            <DotLegendStyled1
              className={classes.border}
              style={{ background: '#e9a69a' }}
            />
                   

            <CardDetail7>Upcoming Scheduled Messages</CardDetail7>
          </DotLegend1>
          </Container>
        
            {
                (list == undefined ) 
                ?
                null
                :
                (list.length == 0)
                ?
                <ErrorMessages Error={'No Message Has Been Scheduled'} />	
                :   
                list.map((item:GetScheduledSMSResult,i) =>{
                    return(
                        <RouterLink key={i} to={
                            `/${location.pathname.split('/')[1]
                            }/SMSCenter/ViewScheduledSMS/` + item.DetailsId + `/Scheduled`
                          }
                            color="primary"
                            style={{ textDecoration: 'none' }}>
                            <List18  Subject={item.Subject} ScheduledSMSList={ScheduledSMSList} key={i} Index={i} DisplayText={item.DisplayText.slice(0,20)+" ..."} Date={item.Date} Time={item.Time} />
                        </RouterLink>
                    )
                })
                
            }
        </>
    )
}
export default Scheduled;

