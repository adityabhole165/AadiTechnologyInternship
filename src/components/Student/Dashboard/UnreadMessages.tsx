import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUnreadMessages } from 'src/interfaces/Student/dashboard';
import Card9 from 'src/libraries/card/card9';
import { getUnreadMessages } from 'src/requests/Dashboard/Dashboard';
import { RootState } from 'src/store';

function UnreadMessages() {
  const dispatch = useDispatch();
  const UnreadMessages: any = useSelector(
    (state: RootState) => state.Dashboard.UnreadMessage
  );

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = sessionStorage.getItem('SchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const unreadMessageBody: IUnreadMessages = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiReceiverId: UserId,
    aiReceiverRoleId: RoleId,
    asProfilePicUpdDt: ''
  };

  useEffect(() => {
    dispatch(getUnreadMessages(unreadMessageBody));
  }, []);

  return (
    <>
      <Card9
        Count={UnreadMessages.UnreadMessageCount}
        UnreadMessage={UnreadMessages.UnreadMessages}
        SenderPhoto={UnreadMessages.SenderPhoto}
      />
    </>
  );
}

export default UnreadMessages;
