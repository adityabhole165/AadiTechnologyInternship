import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IPayOnline } from 'src/Interface/Student/Fees';
import PageHeader from 'src/UI_Library/heading/PageHeader';
import { payOnline } from 'src/Client_Api/Student/Fees';
import Card26 from 'src/UI_Library/card/card26';

function PayOnline() {
  const dispatch = useDispatch();
  const paymentPageLink: any = useSelector(
    (state: RootState) => state.Fees.paymentUrl
  );

  const body: IPayOnline = {
    asSchoolId: '120',
    asUserLogin: '10561',
    asQueryString:
      'StudentId=11636&DueDates=05-05-2021 12:00 AM&Remarks=&SchoolwiseStudentFeeId=0&IsOnlineCautionMoneyPayment=0',
    asSchoolSiteUrl:
      'http://riteschool_old.aaditechnology.com/RITeSchool/SingleSignOnPage.aspx?',
    asRedirectPageUrl:
      'http://riteschool_old.aaditechnology.com/RITeSchool/Accountant/PayFeeOnline.aspx?'
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
