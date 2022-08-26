import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IPayOnline } from 'src/interfaces/Student/Fees';
import PageHeader from 'src/libraries/heading/PageHeader';
import { payOnline } from 'src/requests/Fees/Fees';
import Card26 from 'src/libraries/card/card26';

function PayOnline() {
  const dispatch = useDispatch();
  const paymentPageLink: any = useSelector(
    (state: RootState) => state.Fees.paymentUrl
  );
  console.log(paymentPageLink)

  const body: IPayOnline = {
    asSchoolId: '120',
    asUserLogin: '10125',
    asQueryString:
      'StudentId=12771&DueDates=09/30/2022 12:00 AM&Remarks=&SchoolwiseStudentFeeId=0&IsOnlineCautionMoneyPayment=0',
    asSchoolSiteUrl:
      'https://192.168.1.80/RITeSchool/SingleSignOnPage.aspx?',
    asRedirectPageUrl:
      'https://192.168.1.80/RITeSchool/Accountant/PayFeeOnline.aspx?'
  };

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
