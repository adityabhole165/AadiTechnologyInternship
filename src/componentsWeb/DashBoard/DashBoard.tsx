import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SchoolNoticeBoard from 'src/components/SchoolNoticeBoard/SchoolNoticeBoard';
import { IGetSchoolNoticePopupBody } from 'src/interfaces/SchoolNoticePopup/ISchoolNoticePopup';
import CardDahContainer from 'src/librariesWeb/CardDashContainer';
import CardDashContainer3 from 'src/librariesWeb/CardDashContainer3';
import CardDashContainer2 from 'src/librariesWeb/CardDashContanier2';
import { SchoolNoticePopup } from 'src/requests/SchoolNoticePopup/RequestSchoolNoticePopup';
import { RootState } from 'src/store';
import SchoolNoticePopupCom from 'src/components/SchoolNoticePopup/SchoolNoticePopup';

function DashBoard() {
  const dispatch = useDispatch();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const [SchoolNoticeDialog, setSchoolNoticeDialog] = useState(false);
  const SchoolNoticePopupDashBoard = useSelector(
    (state: RootState) => state.SchoolNoticePopup.SchoolNoticePopUP
  );

  const handleSchoolNoticePopupDialogClose = () => {
    setSchoolNoticeDialog(false);
    sessionStorage.setItem('hasShownPopup', 'true');
  };
  const SchoolNoticePopupBody: IGetSchoolNoticePopupBody = {
    asSchoolId: Number(asSchoolId),
    asDisplayLocation: 'B, C',
    asShowAllNotices: Number(0),
    asSortExpression: '',
    asStartIndex: 0,
    asEndIndex: 40,
    asLoginUserRoleId: Number(RoleId),
  };
  useEffect(() => {
    dispatch(SchoolNoticePopup(SchoolNoticePopupBody));
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem('hasShownPopup') && SchoolNoticePopupDashBoard.length > 0) {
      setSchoolNoticeDialog(true);
    } else {
      setSchoolNoticeDialog(false);
    }
  }, []);


  return (
    <Box sx={{ px: 2 }}>
      <SchoolNoticeBoard />
      <Grid container spacing={2} mt={-1}>
        <Grid item md={12} lg={8}>
          <CardDahContainer />
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <CardDashContainer3 />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <CardDashContainer2 />
        </Grid>
       
        {SchoolNoticeDialog && (
          <SchoolNoticePopupCom
            open={SchoolNoticeDialog}
            setOpen={handleSchoolNoticePopupDialogClose}
          />
        )}
      </Grid>
    </Box>
  );
}

export default DashBoard;
