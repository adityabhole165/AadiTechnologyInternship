import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSmsList, getMobileNumber } from 'src/requests/Student/SMSCenter';
import { RootState } from 'src/store';
import { ISmsList, IMobileNumber } from 'src/interfaces/Student/SMSCenter';
import PageHeader from 'src/libraries/heading/PageHeader';
import Icon1 from 'src/libraries/icon/icon1';
import List1 from 'src/libraries/mainCard/List1';
import { Container, Typography, Box } from '@mui/material';

const PageNumber = 1;

function SmsCenter() {
  const [state, setstate] = useState([]);
  const [page, setpage] = useState(PageNumber);

  const dispatch = useDispatch();
  const SmsList = useSelector((state: RootState) => state.SmsCenter.SmsList);
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
    localStorage.setItem("url", window.location.pathname)
    dispatch(getSmsList(SmsList_body));
    dispatch(getMobileNumber(MobileNumber_body));

  }, [page]);

  const Data = SmsList.map((item, index) => {
    return {
      id: index,
      header: item.Subject,
      text1: item.RecieverMobileNumber,
      text2: item.Date,
      linkPath: '/Student/viewsms/' + item.ID
    };
  });

  const scrollToEnd = () => {
    setpage(page + 1);
  }

  return (
    <Container>
      <PageHeader heading={'Recieved SMS'} subheading={''} />

      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>

        <Typography variant="body2" fontSize='0.8rem'>
          <b>Mobile Number(s) :</b>  {MobileNumber}
        </Typography>
        <Icon1 Note={Note} />
      </Box>

      {<List1 items={Data} />}
    </Container>
  );
}

export default SmsCenter;
