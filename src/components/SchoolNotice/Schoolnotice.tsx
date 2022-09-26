import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getSchoolNotice } from 'src/requests/Schoolnotice/Schoolnotice';
import ISchoolnotice from '../../interfaces/Common/SchoolNotice';
import List1 from 'src/libraries/mainCard/List1';
import { Container } from '@mui/material';

function Schoolnotice() {
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');

  const dispatch = useDispatch();
  const SchoolnoticeList = useSelector(
    (state: RootState) => state.Schoolnotice.SchoolNoticeData
  );

  const body: ISchoolnotice = {
    asSchoolId: asSchoolId,
    asNoticeId: 0,
    asUserId: asUserId
  };

  useEffect(() => {
    localStorage.setItem("url",window.location.pathname)
    dispatch(getSchoolNotice(body));
  }, []);

  const Data = SchoolnoticeList.map((item, index) => {
    return {
      id: index,
      header: item.Name,
      text1: item.Date,
      text2: '',
      linkPath: '/Common/Viewschoolnotice/' + item.Id,
      FileName: item.FileName
    };
  });

  return (
    <Container>
      <PageHeader heading={'School Notices'} subheading={''} />
      <List1 items={Data} />
    </Container>
  );
}
export default Schoolnotice;
