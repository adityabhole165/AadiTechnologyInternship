
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Box,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommonPageHeader from 'src/components/CommonPageHeader';
import { IMobileNumber, ISmsList } from 'src/interfaces/Student/SMSCenter';
import { getMobileNumber, getSmsList } from 'src/requests/Student/SMSCenter';
import { RootState } from 'src/store';

const PageNumber = 1;

function SmsCenter() {
  const [state, setstate] = useState([]);
  const [page, setpage] = useState(PageNumber);

  const dispatch = useDispatch();
  const SmsList = useSelector((state: RootState) => state.SmsCenter.SmsList);
  const loading = useSelector((state: RootState) => state.SmsCenter.Loading);
  const MobileNumber = useSelector(
    (state: RootState) => state.SmsCenter.MobileNumber
  );
  const Note: string =
    'School SMS will be sent to these number(s). To add/update the number, please send the information to Admin Staff via Message Center.';

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const SmsList_body: ISmsList = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asUserId: UserId,
    asReceiverUserRoleId: RoleId
  };

  const MobileNumber_body: IMobileNumber = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asUserId: UserId,
    asUserRoleId: RoleId
  };

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getSmsList(SmsList_body));
    dispatch(getMobileNumber(MobileNumber_body));
  }, [page]);

  // const Data = SmsList.map((item, index) => {
  //   return {
  //     id: index,
  //     header: item.Subject,
  //     text1: item.RecieverMobileNumber,
  //     text2: item.Date,
  //     linkPath: '/Student/viewsms/' + item.ID
  //   };
  // });

  const Data = [
    {
      id: 0,
      header: 'PPSchl',
      text1: 'Welcome to Aadi Technology!',
      text2: '2022-01-01',
      linkPath: '/extended-sidebar/Student/viewsms/1'
    }
  ];

  const scrollToEnd = () => {
    setpage(page + 1);
  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Received SMS',
            path: '/extended-sidebar/Student/SmsCenter'
          }
        ]}
        rightActions={
          <>
            <Box>
              <Tooltip title={'School SMS will be sent to below listed number(s). To add/update the number, please send the information to admin staff via message center.'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: grey[600] }
                  }}
                >
                  <PriorityHighIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={`Displays received SMS list.`}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: grey[600] }
                  }}
                >
                  <QuestionMarkIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        }
      />

      <Box sx={{ background: 'white', p: 2 }}>
        <Typography variant={'h4'}>
          Mobile Number(s) : {MobileNumber.replace(';', ', ')}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {loading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            SmsList.length > 0 ? (
              SmsList.map((item, index) => (
                <Box key={index} sx={{ p: 1, border: (theme) => `1px solid ${theme.palette.grey[500]}`, borderRadius: (theme) => theme.general.borderRadius }}>
                  <Typography variant={"h4"} sx={{ display: 'flex', gap: 1 }}>
                    <span style={{ color: grey[500] }}>From: </span> {item.UserName}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant={"subtitle2"} sx={{ display: 'flex', gap: 1 }}>
                      <Link to={'/extended-sidebar/Student/viewsms/' + item.ID} style={{ textDecoration: 'none' }}>
                        <span style={{ color: grey[500] }}>SMS Text: </span> {item.Subject}
                      </Link>
                    </Typography>
                    <Typography variant={"subtitle2"} sx={{ display: 'flex', gap: 1, cursor: 'pointer' }} >
                      <span style={{ color: grey[500] }}>Received Date: </span> {item.Date}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="h6">No record found</Typography>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SmsCenter;