import Card10 from 'src/libraries/card/card10';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEventsList } from 'src/requests/Student/Dashboard';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IUpcomingEventsList } from 'src/interfaces/Student/dashboard';
import { useTheme } from '@mui/material';

function UpcomingEvents() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const GetUpcomingEventsList: any = useSelector(
    (state: RootState) => state.UpcomingEventss.UpcomingEventsList
  );
  console.log('okbyeeee', GetUpcomingEventsList);
  const data3 = { Standard: 'Standard(s):' };

  const SchoolId = sessionStorage.getItem('SchoolId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const upcoming_body: IUpcomingEventsList = {
    aiSchoolId: SchoolId,
    aiAcademicYrId: AcademicYearId,
    asUserRoleId: RoleId,
    aiUserId: asUserId,
    aiUserRoleId: RoleId,
    isScreenFullAccess: 'false'
  };
  useEffect(() => {
    dispatch(getEventsList(upcoming_body));
  }, []);
  return (
    <>
      <Card10 Sub={GetUpcomingEventsList} headd={data3} index />
    </>
  );
}

export default UpcomingEvents;
