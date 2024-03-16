import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import CallReceived from '@mui/icons-material/CallReceived';
import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import History from '@mui/icons-material/History';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SmsOutlined from '@mui/icons-material/SmsOutlined';
import { Box, Breadcrumbs, Container, Divider, Grid, IconButton, Stack, Tooltip, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  GetSMSDetailsResult,
  IViewSms
} from 'src/interfaces/Student/SMSCenter';
import http from 'src/requests/SchoolService/schoolServices';

const FlexedTypography = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}))

function ViewSms() {
  const ViewDetail = {
    From: 'From',
    Received_Date: 'Received Date',
    To: 'To',
    SMS_Text: 'SMS Text'
  };
  const [viewSms, setViewSms] = useState<GetSMSDetailsResult>();

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const { ID } = useParams();

  const GetViewMessageResult = () => {
    const ViewSms_body: IViewSms = {
      asSchoolId: asSchoolId,
      asSMSId: `${ID}`,
      asUserRoleId: RoleId,
      asUserId: UserId,
      asAcademicYearId: asAcademicYearId
    };
    http
      .post('SMS/GetSMSDetails', ViewSms_body)
      .then((resp) => resp.data.GetSMSDetailsResult)
      .then((data) => {
        setViewSms(data);
      });
  };

  useEffect(() => {
    GetViewMessageResult();
  }, []);

  return (
    <>
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
              <Link
                to={'/extended-sidebar/Teacher/SmsCenter'}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  variant={'h3'}
                  fontSize={'23px'}
                  fontWeight={'normal'}
                  color={'text.primary'}
                  sx={{
                    '&:hover': {
                      fontWeight: 'bold'
                    }
                  }}
                >
                  Received SMS
                </Typography>
              </Link>
              <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
                View SMS
              </Typography>
            </Breadcrumbs>
          </Box>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Box>
              <Tooltip title={`View Sent/ Received Messages.`}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: grey[600] }
                  }}
                >
                  <QuestionMark />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
        <Box sx={{ p: 2, background: 'white', mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <FlexedTypography mb={.5} gap={.5} variant={"h4"} color={'grey.500'}>
                <CallReceived color={'primary'} fontSize='small' />
                From
              </FlexedTypography>
              <Typography variant={"h4"}>
                {viewSms?.UserName}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <FlexedTypography mb={.5} gap={.5} variant={"h4"} color={'grey.500'}>
                <History color={'primary'} fontSize={'small'} />
                Received Date :
              </FlexedTypography>
              <Typography variant={"h4"}>
                {viewSms?.Date}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <FlexedTypography mb={.5} gap={.5} variant={"h4"} color={'grey.500'}>
                <AccountCircleOutlined color={"primary"} fontSize={'small'} />
                To:
              </FlexedTypography>
              <Typography variant={"h4"}>
                {viewSms?.DisplayText}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <FlexedTypography mb={.5} gap={.5} variant={"h4"} color={'grey.500'}>
                <SmsOutlined color={"primary"} fontSize={'small'} />
                SMS Text :
              </FlexedTypography>
              <Typography variant={"h4"}>
                {viewSms?.Subject}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default ViewSms;
