import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { INotification } from 'src/interfaces/Notification/Notification';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import PageHeader from 'src/libraries/heading/PageHeader';
import Card7 from 'src/libraries/mainCard/Card7';
import { getNotification } from 'src/requests/Notification/Notification';
import { RootState } from 'src/store';

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
      asUserId: userId
    };

    dispatch(getNotification(body));
  }, []);

  const navigate = useNavigate();
  const onClick = (value) => {
    if (value == 'MessageInbox.htm') {
      navigate('/RITeSchool/MessageCenter/msgCenter', { state: { fromInternal: true } });
    }
    if (value == 'SchoolNotices.htm') {
      navigate('/RITeSchool/Common/ActiveSchoolNotice', { state: { fromInternal: true } });
    }
    if (value == 'ProgressReport.htm') {
      navigate('/RITeSchool/Student/Progressreport', { state: { fromInternal: true } });
    }
    if (value == 'StudentFees.htm') {
      navigate('/RITeSchool/Student/Fees', { state: { fromInternal: true } });
    }
    if (value == 'Homework.htm') {
      navigate('/RITeSchool/Student/Homework', { state: { fromInternal: true } });
    }
    if (value == 'Home.htm') {
      navigate('/RITeSchool/landing/landing', { state: { fromInternal: true } });
    }
  };
  return (
    <>
      <Box sx={{ px: 2 }}>
        <PageHeader heading={'Notification'} subheading={''} />

        {NotificationList.length === 0 ? (
          <ErrorMessages Error={'No records found'} />
        ) : (
          NotificationList.map((items, i) => (
            <div
              onClick={() => {
                onClick(items.RedirectPageURL);
              }}
              key={i}
            >
              <Card7 key={i} header={items.MessageString} text1={items.Date} />
            </div>
          ))
        )}
      </Box>
    </>
  );
};

export default Notification;
