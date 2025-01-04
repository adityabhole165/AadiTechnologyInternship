
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import CallReceived from '@mui/icons-material/CallReceived';
import History from '@mui/icons-material/History';
import QuestionMark from '@mui/icons-material/QuestionMark';
import SmsOutlined from '@mui/icons-material/SmsOutlined';
import { Box, Grid, IconButton, Tooltip, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { decodeURL } from 'src/components/Common/Util';
import CommonPageHeader from 'src/components/CommonPageHeader';
import {
  GetSMSDetailsResult,
  IViewSms
} from 'src/interfaces/Student/SMSCenter';
import http from 'src/requests/SchoolService/schoolServices';
import { RootState } from 'src/store';

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
  const GetScreensAccessPermissions: any = useSelector(
    (state: RootState) =>
      state.getModulesPermissionsResult.ModulesPermissionsResult
  );
  const ScreensAccessPermission = GetScreensAccessPermissions;

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  let {
    SMS_Id
  } = useParams();

  // Decode in-place
  SMS_Id = decodeURL(SMS_Id);


  const GetViewMessageResult = () => {
    const ViewSms_body: IViewSms = {
      asSchoolId: Number(asSchoolId),
      asSMSId: Number(SMS_Id),
    };
    http
      .post('Teacher/GetSMSDetails', ViewSms_body)
      .then((resp) => {
        const data = resp.data;
        setViewSms(data);
      });
  };
  //console.log(viewSms, 'ViewDetail')
  useEffect(() => {
    GetViewMessageResult();
  }, []);

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission && ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'SMS Center') perm = item.IsFullAccess;
    });
    return perm;
  };
  const navLinks = [
    {
      title: 'SMS Center',
      path: GetScreenPermission() === 'N'
        ? '/RITeSchool/Teacher/ReceivedSMSOwn'
        : '/RITeSchool/Teacher/SmsCenter',
    },
    {
      title: 'View SMS',
      path: GetScreenPermission() === 'Y'
        ? '/RITeSchool/Teacher/SmsCenter'
        : '/RITeSchool/Teacher/ReceivedSMSOwn',
    }
  ];
  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={navLinks}
          rightActions={
            <>
              <Box>
                <Tooltip title={`View sent/received messages.`}>
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
            <Grid item xs={3}>
              <FlexedTypography mb={.5} gap={.5} variant={"h4"}>
                <CallReceived fontSize='small' />
                <Typography variant={"h4"} >From
                </Typography>
              </FlexedTypography>
              <Typography>
                {viewSms?.Sender_Name}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <FlexedTypography mb={.5} gap={.5} variant={"h4"}>
                <History fontSize={'small'} />
                <Typography variant={"h4"} > Received Date :
                </Typography>

              </FlexedTypography>
              <Typography>
                {viewSms?.Insert_Date}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <hr />
            </Grid>
            <Grid item xs={12}>
              <FlexedTypography mb={.5} gap={.5} variant={"h4"}>
                <AccountCircleOutlined fontSize={'small'} />
                <Typography variant={"h4"}  >   To:
                </Typography>
              </FlexedTypography>
              <Typography>
                {viewSms?.Display_Text}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <hr />
            </Grid>
            <Grid item xs={12}>
              <FlexedTypography mb={.5} gap={.5} variant={"h4"}>
                <SmsOutlined fontSize={'small'} />
                <Typography variant={"h4"} > SMS Text :
                </Typography>

              </FlexedTypography>
              <Typography>
                {viewSms?.SMS_Text}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default ViewSms;