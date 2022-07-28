import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUnreadMessages } from 'src/Client_Api/Student/Dashboard';
import { IUnreadMessages } from 'src/Interface/Student/dashboard';
import { RootState } from 'src/store';
import Card9 from 'src/UI_Library/card/card9';

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
