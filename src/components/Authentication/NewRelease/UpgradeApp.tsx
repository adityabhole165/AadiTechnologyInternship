import { Box, Grid, Typography } from '@mui/material';
import { ListStyle, NewCard, NewStyle } from 'src/libraries/styled/CardStyle';

const UpgradeApp = ({
  IsForceUpdate = 'True',
  AppStoreUrl = '',
  ReleaseNotes = ''
}) => {
  let latestVersionDetails = null;
  if (ReleaseNotes === '') {
    latestVersionDetails = JSON.parse(
      localStorage.getItem('NewVersionDetails')
    );
    IsForceUpdate = latestVersionDetails.IsForceUpdate;
    AppStoreUrl = latestVersionDetails.AppStoreUrl;
    ReleaseNotes = latestVersionDetails.ReleaseNotes;
  }
  return (
    <Box sx={{ px: 2 }}>
      <>
        <Grid textAlign="center">
          <a href="http://riteschool.com" target="_blank" rel="noreferrer">
            {/* <img src={school2} height={70} /> */}
            <img src={'/imges/RITLOGO2.png'} height={70} />
          </a>
        </Grid>
        <ListStyle sx={{ textAlign: 'center', backgroundColor: '#80cbc4' }}>
          <NewCard>
            <b>A new version of app is available.</b>
            <br />
          </NewCard>
          <a href={AppStoreUrl}>
            <NewCard>Click here to upgrade.</NewCard>
          </a>
        </ListStyle>
        {IsForceUpdate === 'True' && (
          <NewStyle sx={{ backgroundColor: '#e0f2f1' }}>
            <Typography sx={{ ml: '10px', mt: '10px' }}>
              <b>What's New?</b>
            </Typography>
            <NewCard dangerouslySetInnerHTML={{ __html: ReleaseNotes }} />
          </NewStyle>
        )}
      </>
    </Box>
  );
};

export default UpgradeApp;
