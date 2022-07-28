import { useEffect } from 'react';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import AScheduledSMSListInterface from "src/Interface/AdminSMSCenter/AScheduledSMS";
import { getScheduledSMSList } from "src/Client_Api/AdminSMSCenter/AScheduledSMS";
import { GetScheduledSMSResult } from 'src/Interface/AdminSMSCenter/AScheduledSMS';
import List18 from 'src/UI_Library/list/List18';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ErrorMessages from 'src/UI_Library/ErrorMessages/ErrorMessages';
import {styled,useTheme} from '@mui/material';
import {Styles} from 'src/assets/style/student-style';

function Scheduled() {   

    const classes = Styles();
    const dispatch = useDispatch();
    const ScheduledSMSList : any = useSelector((state: RootState) => state.AScheduledSMS.AScheduledSMSList);
    const list = ScheduledSMSList.GetScheduledSMSResult;
    const location = useLocation();

    // BODY FOR API
    const body: AScheduledSMSListInterface = {
        asUserId:"695",
        asAcademicYearId:"9",
        asUserRoleId:"6",
        asSchoolId:"120"
    };

    // CALL FOR API 
    useEffect(()=>{
        dispatch(getScheduledSMSList(body));
    },[])

    const DotLegend = styled('span')(
        ({ theme }) => `
          border-radius: 22px;
          width: ${theme.spacing(1.5)};
          height: ${theme.spacing(1.5)};
          display: inline-block;
          margin-right: ${theme.spacing(1)};
          margin-top: -${theme.spacing(0.1)};
      `
    );

    return(
        <>
        <DotLegend  className={classes.border}
                        style={{ background: '#e9a69a',marginLeft: '1.5rem',marginBottom:"-2px" }}
                      /><small><b style={{color:"black"}}> Upcoming Scheduled Messages </b></small><br />
                     <br/>
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
                            }/SMSCenter/ViewScheduledSMS/` + item.DetailsId
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

