import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getviewSchoolNotice } from 'src/requests/Schoolnotice/Schoolnotice';
import { GetSchoolNoticeListResult } from '../../interfaces/Common/SchoolNotice';
import IViewschoolnotice from '../../interfaces/Student/ViewSchoolNotice';
import { useParams } from 'react-router';
import Card5 from 'src/libraries/card/card5';
import PageHeader from 'src/libraries/heading/PageHeader';
import BackButton from 'src/libraries/button/BackButton';


function Viewschoolnotice() {
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');

  const dispatch = useDispatch();

  const ViewSchoolnotice = useSelector(
    (state: RootState) => state.Schoolnotice.ViewSchoolNotice
  );
  const { ID } = useParams();
  const body: IViewschoolnotice = {
    asSchoolId: asSchoolId,
    asNoticeId: `${ID}`,
    asUserId: asUserId
  };

  useEffect(() => {
    dispatch(getviewSchoolNotice(body));
  }, []);

  return (
    <>
      <PageHeader heading={'Notice Details'} subheading={''} />
        <BackButton FromRoute={"/Common/schoolnotice"}/>
      <div>
      {ViewSchoolnotice.map((items: GetSchoolNoticeListResult, i) => (
        <Card5
          FileName={items.FileName}
          Content={items.Content}
          Name={items.Name}
          key={i}
        />
      ))}
    </div>
    </>
    
  );
}
export default Viewschoolnotice;
