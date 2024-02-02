import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IBirthdays } from 'src/interfaces/Student/dashboard';
import Card12 from 'src/libraries/card/Card12';
import { getBirthdayList } from 'src/requests/Dashboard/Dashboard';
import { RootState } from 'src/store';

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
