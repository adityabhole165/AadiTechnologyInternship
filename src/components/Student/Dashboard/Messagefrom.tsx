import List7 from 'src/libraries/list/List7';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IMsgfrom } from 'src/interfaces/Student/dashboard';
import { getmsgfrom } from 'src/requests/Student/Dashboard';

function Messagefrom() {
  const dispatch = useDispatch();

  const GetmsgFrom: any = useSelector(
    (state: RootState) => state.Dashboard.Msgfrom
  );
  console.log('Today', GetmsgFrom);

  const MsgfroM_body: IMsgfrom = {
    aiSchoolId: 120
  };

  useEffect(() => {
    dispatch(getmsgfrom(MsgfroM_body));
  }, []);
  return (
    <>
      <List7 title={GetmsgFrom.ConfigureMenuContent} GetMsg={GetmsgFrom} />
    </>
  );
}
export default Messagefrom;
