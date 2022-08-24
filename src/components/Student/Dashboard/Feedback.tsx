import React, { useEffect } from 'react';
import List8 from 'src/libraries/list/List8';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IFeedbackList } from 'src/interfaces/Student/dashboard';
import { getFeedback } from 'src/requests/Dashboard/Dashboard';

function Feedback() {
  const dispatch = useDispatch();
  const GetFeedback: any = useSelector(
    (state: RootState) => state.Dashboard.FeedbackList
  );
  const SchoolId = sessionStorage.getItem('SchoolId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const aiFeedbackTypeId = sessionStorage.getItem('');

  const Feedback_body: IFeedbackList = {
    aiUserRoleId: 3,
    aiFeedbackTypeId: 0,
    asFeedBackFor: 'School',
    aiSchoolId: 120,
    sortDirection: 'desc',
    asStartDate: '',
    asEndDate: '',
    sortExpression: '',
    startRowIndex: 0,
    iEndIndex: 10,
    abIsServiceCall: true,
    asDesignationId: '0',
    abIsAccountsCumAdminOfficer: false
  };

  useEffect(() => {
    dispatch(getFeedback(Feedback_body));
  }, []);

  return (
    <>
      <List8
        name={GetFeedback.UserName}
        text={GetFeedback.Text}
        Datee={GetFeedback.Date}
      ></List8>
    </>
  );
}
export default Feedback;
