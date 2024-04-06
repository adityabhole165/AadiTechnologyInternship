import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import AReceiveSMSListInterface, {
  GetMessagesResult
} from 'src/interfaces/AdminSMSCenter/AReceiveSMS';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Card1 from 'src/libraries/mainCard/Card1';
import { getReceiveSMSList } from 'src/requests/AdminSMSCenter/AReceiveSMS';
import { RootState } from 'src/store';

function Received() {
  const dispatch = useDispatch();
  const ReceiveSMSList: any = useSelector(
    (state: RootState) => state.AReceiveSMS.AReceiveSMSList
  );

  // BODY FOR API

  const body: AReceiveSMSListInterface = {
    asUserId: sessionStorage.getItem('Id'),
    asAcademicYearId: sessionStorage.getItem('AcademicYearId'),
    asUserRoleId: sessionStorage.getItem('RoleId'),
    asSchoolId: localStorage.getItem('localSchoolId'),
    abIsSMSCenter: true,
    asPageIndex: '0',
    asFilter: '',
    asMonthId: ''
  };
  // CALL FOR API
  useEffect(() => {
    dispatch(getReceiveSMSList(body));
  }, []);

  return (
    <Box sx={{ px: 2 }}>
      {ReceiveSMSList.length === 0 ? (
        <ErrorMessages Error={'No Message Has Been Received'} />
      ) : ReceiveSMSList == undefined ? null : (
        ReceiveSMSList.map((item: GetMessagesResult, i) => {
          return (
            <>
              <RouterLink
                key={i}
                to={
                  `/${location.pathname.split('/')[1]
                  }/SMSCenter/ViewReceiveSMS/` +
                  item.DetailsId +
                  `/Received`
                }
                color="primary"
                style={{ textDecoration: 'none' }}
              >
                {/* <List20 UserName={item.UserName} Subject={item.Subject} Date={item.Date} Time={item.Time}  key={i} /> */}
                <Card1
                  header={item.UserName}
                  text1={item.Subject}
                  text2={item.Time + '  ' + item.Date}
                  text3={''}
                  text4={''}
                  text5={''}
                  text6={''}
                  Color={''}
                  margin={''}
                  FileName={''}
                  Textcolor=""
                  key={i}
                />
              </RouterLink>
            </>
          );
        })
      )}
    </Box>
  );
}
export default Received;
