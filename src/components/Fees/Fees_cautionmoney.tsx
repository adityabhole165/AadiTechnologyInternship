import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IPayOnline } from 'src/interfaces/Student/Fees';
import PageHeader from 'src/libraries/heading/PageHeader';
import { payOnline } from 'src/requests/Fees/Fees';
import Card26 from 'src/libraries/card/card26';
import { sitePath } from '../Common/Util';


function Fees_cautionmoney() {
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
    asQueryString: 'StudentId='+ studentId +'&DueDates=M&Remarks=&SchoolwiseStudentFeeId=0&IsOnlineCautionMoneyPayment=1',
    asSchoolSiteUrl:
      sitePath+'/RITeSchool/SingleSignOnPage.aspx?',
    asRedirectPageUrl:
      sitePath+'/RITeSchool/Accountant/PayFeeOnline.aspx?'
  };

  useEffect(() => {
    dispatch(payOnline(body));
  }, []);

  return (
    <div>
      <PageHeader heading={'Caution Money Deposite'} subheading={''} />
      <Card26 paymentPageLink={paymentPageLink} />
    </div>
  );
}
export default Fees_cautionmoney;
