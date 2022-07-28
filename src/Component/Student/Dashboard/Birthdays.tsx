import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBirthdayList } from 'src/Client_Api/Student/Dashboard';
import { IBirthdays } from 'src/Interface/Student/dashboard';
import { RootState } from 'src/store';
import Card12 from 'src/UI_Library/card/Card12';

function Birthdays() {
  const dispatch = useDispatch();
  const Birthdays: any = useSelector(
    (state: RootState) => state.Dashboard.BirthdayList
  );
  const [View, setView] = useState('T');

  const viewToday = (data) => {
    setView(data);
  };
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = sessionStorage.getItem('SchoolId');
  const RoleId = sessionStorage.getItem('RoleId');

  const BirthdayBody: IBirthdays = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiUserRoleId: RoleId,
    asView: View
  };

  useEffect(() => {
    dispatch(getBirthdayList(BirthdayBody));
  }, [View]);
  return (
    <>
      <Card12 data={Birthdays} viewToday={viewToday} />
    </>
  );
}

export default Birthdays;
