import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import CallReceived from '@mui/icons-material/CallReceived';
import History from '@mui/icons-material/History';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SmsOutlined from '@mui/icons-material/SmsOutlined';
import { Box, Divider, Grid, IconButton, Tooltip, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonPageHeader from 'src/components/CommonPageHeader';
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
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Received SMS',
              path: '/extended-sidebar/Teacher/SmsCenter'
            },
            { title: 'View SMS', path: '/extended-sidebar/Teacher/SmsCenter' },
          ]}
          rightActions={
            <>
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

            </>
          }
        />
        <Box sx={{ p: 2, background: 'white' }}>
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
      </Box>
    </>
  );
}

export default ViewSms;
