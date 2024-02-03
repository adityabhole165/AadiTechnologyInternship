import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMsgfrom } from 'src/interfaces/Student/dashboard';
import List7 from 'src/libraries/list/List7';
import { getmsgfrom } from 'src/requests/Dashboard/Dashboard';
import { RootState } from 'src/store';

function Messagefrom() {
  const dispatch = useDispatch();

  const GetmsgFrom: any = useSelector(
    (state: RootState) => state.Dashboard.Msgfrom
  );

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
