import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSmsList, getMobileNumber } from 'src/Client_Api/Student/SMSCenter';
import { RootState } from 'src/store';
import { ISmsList, IMobileNumber } from 'src/Interface/Student/SMSCenter';
import PageHeader from 'src/UI_Library/heading/PageHeader';
import Icon1 from 'src/UI_Library/icon/icon1';
import List1 from 'src/UI_Library/mainCard/List1';
import { Container } from '@mui/material';

function SmsCenter() {
  const dispatch = useDispatch();
  const SmsList = useSelector((state: RootState) => state.SmsCenter.SmsList);
  const MobileNumber = useSelector(
    (state: RootState) => state.SmsCenter.MobileNumber
  );
  const Note: string =
    'School SMS will be sent to these number(s). To add/update the number, please send the information to Admin Staff via Message Center.';
  const Mobilenumber: string = 'Mobile Number(s) :';

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
    dispatch(getSmsList(SmsList_body));
    dispatch(getMobileNumber(MobileNumber_body));
  }, []);

  const Data = SmsList.map((item, index) => {
    return {
      id: index,
      header: item.Subject,
      text1: item.RecieverMobileNumber,
      text2: item.Date,
      linkPath: '/Student/viewsms/' + item.ID
    };
  });

  return (
    <>
      <PageHeader heading={'Recieved SMS'} subheading={''} />
      <Container>

      <Icon1 Title={Mobilenumber} Subtitle={MobileNumber} Note={Note} />
      </Container>
      
      {<List1 items={Data} />}
    </>
  );
}

export default SmsCenter;
