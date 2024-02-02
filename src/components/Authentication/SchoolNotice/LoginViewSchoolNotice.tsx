import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import school5 from 'src/assets/img/school5.jpg';
import { Styles } from 'src/assets/style/student-style';
import Card6 from 'src/libraries/card/card6';
import { getLoginViewSchoolNotice } from 'src/requests/LoginSchoolNotice/LoginSchoolNotice';
import { RootState } from 'src/store';
import { GetSchoolNoticesResult } from '../../../interfaces/Student/LoginSchoolNotice';
import IViewschoolnotice from '../../../interfaces/Student/LoginViewSchoolNotice';

function LoginViewSchoolNotice() {
  const styleroot = Styles();
  const styles = {
    paperContainer: {
      backgroundImage: `url(${school5})`,
      backgroundColor: '#2c171738',
      height: '100%'
    }
  };

  const dispatch = useDispatch();

  const LoginViewSchoolNotice = useSelector(
    (state: RootState) => state.LoginList.LoginViewSchoolNoticeData
  );

  const asSchoolId = localStorage.getItem('localSchoolId');
  const userId = localStorage.getItem('UserId');

  const { ID } = useParams();
  const body: IViewschoolnotice = {
    asSchoolId: asSchoolId,
    asNoticeId: `${ID}`,
    asUserId: userId
  };

  useEffect(() => {
    dispatch(getLoginViewSchoolNotice(body));
  }, []);

  return (
    <div style={styles.paperContainer}>
      {LoginViewSchoolNotice.map((items: GetSchoolNoticesResult, i) => (
        <Card6
          FileName={items.FileName}
          Content={items.Content}
          Name={items.Name}
          key={i}
        />
      ))}
    </div>
  );
}

export default LoginViewSchoolNotice;
