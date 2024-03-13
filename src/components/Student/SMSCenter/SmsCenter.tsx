import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import InfoTwoTone from '@mui/icons-material/InfoTwoTone';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Alert,
  Box,
  Breadcrumbs,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
      linkPath: '/Student/viewsms/1'
    }
  ];

  const scrollToEnd = () => {
    setpage(page + 1);
  };

  return (
    <Container maxWidth={'xl'}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          pt: 4
        }}
      >
        <Box>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<ChevronRightTwoTone />}
          >
            <Link
              to={'/extended-sidebar/landing/landing'}
              color="inherit"
              style={{ textDecoration: 'none' }}
            >
              <IconButton
                sx={{
                  background: (theme) => theme.palette.common.white,
                  border: (theme) => `1px solid ${theme.palette.grey[400]}`
                }}
              >
                <HomeTwoTone color="primary" />
              </IconButton>
            </Link>
            <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
              Received SMS
            </Typography>
          </Breadcrumbs>
        </Box>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Box>
            <Tooltip title={`Displays Received SMS List.`}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: 'gray',
                  height: '36px !important',
                  ':hover': { backgroundColor: 'gray' }
                }}
              >
                <QuestionMarkIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ background: 'white', mt: 2, p: 2 }}>
        <Typography variant={'h4'}>
          Mobile Number(s) : {MobileNumber.replace(';', ', ')}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Alert
            variant="filled"
            color={'info'}
            icon={<InfoTwoTone />}
            sx={{ boxShadow: 'none' }}
          >
            {Note}
          </Alert>
        </Box>
        <Box sx={{ mt: 2 }}>
          {/* {loading ? <SuspenseLoader /> : <List1 items={Data} />} */}
          {/* sms center new UI */}
          {Data.map((item, index) => (
            <Box key={index} sx={{ p: 1, border: (theme) => `1px solid ${theme.palette.grey[500]}`, borderRadius: (theme) => theme.general.borderRadius }}>
              <Typography variant={"h4"} sx={{ display: 'flex', gap: 1 }}>
                <span style={{ color: grey[500] }}>From: </span> {item.header}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant={"subtitle2"} sx={{ display: 'flex', gap: 1 }}>
                  <Link to={item.linkPath} style={{ textDecoration: 'none' }}>
                    <span style={{ color: grey[500] }}>SMS Text: </span> {item.text1}
                  </Link>
                </Typography>
                <Typography variant={"subtitle2"} sx={{ display: 'flex', gap: 1, cursor: 'pointer' }} >
                  <span style={{ color: grey[500] }}>Received Date: </span> {item.text2}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default SmsCenter;
