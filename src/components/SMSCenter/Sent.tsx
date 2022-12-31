import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSentListt } from 'src/requests/AdminSMSCenter/Sent';
import { GetScheduledSMSResult } from 'src/interfaces/AdminSMSCenter/AScheduledSMS';
import ISentMsg from 'src/interfaces/AdminSMSCenter/Sent';
import { RootState } from 'src/store';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import List19 from 'src/libraries/list/List19';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Card1 from 'src/libraries/mainCard/Card1';
import { Container } from '@mui/material';

function Sent() {
  const dispatch = useDispatch();
  const Sent: any = useSelector((state: RootState) => state.Sent.Sent);
  const location = useLocation();

  const body: ISentMsg = {
    asUserId: sessionStorage.getItem('Id'),
    asAcademicYearId: sessionStorage.getItem('AcademicYearId'),
    asUserRoleId: sessionStorage.getItem('RoleId'),
    asSchoolId: localStorage.getItem('localSchoolId'),
    abIsSMSCenter: 'true',
    asPageIndex: '1',
    asFilter: '',
    asMonthId: '0'
  };

  useEffect(() => {
    dispatch(getSentListt(body));
  }, []);
  return (
    <Container>
      {Sent == undefined ? null : Sent.length === 0 ? (
        <ErrorMessages Error={'No message has been sent'} />
      ) : (
        Sent.map((item: GetScheduledSMSResult, i) => {
          return (
            <RouterLink
              key={i}
              to={
                `/${location.pathname.split('/')[1]}/SMSCenter/ViewSent/` +
                item.DetailsId + '/Sent'
              }
              color="primary"
              style={{ textDecoration: 'none' }}
            >
              
                <Card1
                    header={item.Subject}
                    text1={item.UserName.slice(0, 20) + ' ...'} text2={item.Time + " " + item.Date   } text3={''} text4={''} text5={''} text6={''}
                    Color={''}
                    margin={''}
                    FileName={''}
                    key={i}
                  />
            </RouterLink>
          );
        })
      )}
    </Container>
  );
}

export default Sent;
