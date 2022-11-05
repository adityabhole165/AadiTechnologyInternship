import PageHeader from 'src/libraries/heading/PageHeader';
import { Container } from '@mui/system';
import Card7 from 'src/libraries/mainCard/Card7';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {INotification} from 'src/interfaces/Notification/Notification';
import {useEffect} from 'react';
import { getNotification } from 'src/requests/Notification/Notification';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';

const Notification = () => {
  const dispatch = useDispatch();
  const NotificationList = useSelector(
    (state: RootState) => state.Notification.Notification
  );
 

  const schoolId = localStorage.getItem('localSchoolId');
  const userId = sessionStorage.getItem('Id');
  

  useEffect(() => {
    const body: INotification = {
      asSchoolId: schoolId,
      asUserId:userId
    }
   dispatch(getNotification(body))
  }, []);
  return (
    <>
      <Container>
        <PageHeader heading={'Notification'} subheading={''} />
        
       {(NotificationList.length===0)?  <ErrorMessages Error={'No records found'} />
       :   NotificationList.map((items, i) => (
          <Card7
            key={i}
            header={items.header}
            text1={items.text1}
            text2={items.text2}
          />
        ))}

      </Container>
    </>
  );
};

export default Notification;
