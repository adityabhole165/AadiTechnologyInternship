import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IPayOnline } from 'src/interfaces/Student/Fees';
import PageHeader from 'src/libraries/heading/PageHeader';
import { payOnline } from 'src/requests/Fees/Fees';
import Card26 from 'src/libraries/card/card26';
import { useParams } from 'react-router';

function PayOnline() {
  const {SelectedDueDate} = useParams();
  const dispatch = useDispatch();
  const paymentPageLink: any = useSelector(
    (state: RootState) => state.Fees.paymentUrl
  );
  
  const studentId = sessionStorage.getItem('StudentId');
  const authData = JSON.parse(localStorage.getItem("auth")); 
  const userLoginId = authData.data.AuthenticateUserResult.UserLogin
  const schoolId = localStorage.getItem('localSchoolId');

  const body: IPayOnline = {
    asSchoolId: schoolId,
    asUserLogin: userLoginId,
    asQueryString:
    'StudentId='+ studentId +'&DueDates='+ SelectedDueDate +'&Remarks=&SchoolwiseStudentFeeId=0&IsOnlineCautionMoneyPayment=0',
    asSchoolSiteUrl:
      'http://localhost:65222/RITeSchool/SingleSignOnPage.aspx?',
    asRedirectPageUrl:
      'http://localhost:65222/RITeSchool/Accountant/PayFeeOnline.aspx?'
  };
  console.log("PayOnline Body",body);
  useEffect(() => {
    dispatch(payOnline(body));
  }, []);

  return (
    <div>
      <PageHeader heading={'Online Payment'} subheading={''} />
      <Card26 paymentPageLink={paymentPageLink} />
    </div>
  );
}

export default PayOnline;
