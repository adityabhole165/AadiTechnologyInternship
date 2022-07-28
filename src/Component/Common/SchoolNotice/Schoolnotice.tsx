import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/UI_Library/heading/PageHeader';
import { getSchoolNotice } from 'src/Client_Api/Common/Schoolnotice';
import ISchoolnotice from '../../../Interface/Common/SchoolNotice';
import List1 from 'src/UI_Library/mainCard/List1';

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
    dispatch(getSchoolNotice(body));
  }, []);

  const Data = SchoolnoticeList.map((item, index) => {
    return {
      id: index,
      header: item.Name,
      text1: item.Date,
      text2: '',
      linkPath: '/Student/Viewschoolnotice/' + item.Id,
      FileName: item.FileName
    };
  });

  return (
    <>
      <PageHeader heading={'School Notices'} subheading={''} />
      <List1 items={Data} />
    </>
  );
}
export default Schoolnotice;
