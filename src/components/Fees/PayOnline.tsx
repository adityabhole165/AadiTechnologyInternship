import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { IPayOnline } from 'src/interfaces/Student/Fees';
import PageHeader from 'src/libraries/heading/PageHeader';
import { payOnline } from 'src/requests/Fees/Fees';
import Card26 from 'src/libraries/card/card26';
import { useParams } from 'react-router';
import { sitePath } from '../Common/Util';
function PayOnline() {
  const {SelectedDueDate, feeId,currentYear,IsForCurrentyear,OldYearwiseStudentId,
    ApplicableFee,TotalLateFee,advanceFeelist} = useParams();
  
  const dispatch = useDispatch();
  const paymentPageLink: any = useSelector(
    (state: RootState) => state.Fees.paymentUrl
  );
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const studentId = sessionStorage.getItem('StudentId');
  const authData = JSON.parse(localStorage.getItem("auth"));
  const userLoginId = authData.data.AuthenticateUserResult.UserLogin
  const schoolId = localStorage.getItem('localSchoolId');
  const AdvanceFeelist = schoolId == '122'? advanceFeelist : ''

const getQueryString = () => {
  // console.log("currentYear == asAcademicYearId--",currentYear, asAcademicYearId)
    let returnString = ""
    let IsForNextYear = "N"
    if(currentYear == "0"){
      IsForNextYear = "Y"
    }
    // if(currentYear > asAcademicYearId){
      if(currentYear == "0"){
      returnString = 'StudentId='+ studentId +'&DueDates='+ SelectedDueDate +
      '&Remarks=&SchoolwiseStudentFeeId='+feeId + '&AcadmicYearId='+currentYear+
      '&StanardID='+'&TotalAmount='+ApplicableFee+'&LateFeeAmount='+TotalLateFee+'&IsForNextYear=Y'+ 
       '&ConcessionAmount='+AdvanceFeelist+'&FeeType='
    }
    if(currentYear == asAcademicYearId ){
      returnString = 'StudentId='+ studentId +'&DueDates='+ SelectedDueDate +
      '&Remarks=&SchoolwiseStudentFeeId='+feeId+'&IsOnlineCautionMoneyPayment=0'
    }
   if(currentYear < asAcademicYearId){
    returnString = 'StudentId='+ OldYearwiseStudentId +'&DueDates='+ SelectedDueDate +
    '&Remarks=&SchoolwiseStudentFeeId='+feeId+'&IsOnlineCautionMoneyPayment=0' + '&AcadmicYearId='+currentYear+
    '&IsOldAcademicYearPayment='+ IsForCurrentyear
   }
   if(currentYear){ //internal
    returnString = 'StudentId='+ studentId + '&InternalFeeDetailsId=0' + '&IsOnlineInternalFeePayment=1'
  + '&IsForNextYear=' + IsForNextYear + '&AcadmicYearId=' + currentYear + '&TotalAmount=0'+'&IsForInternalFee=1'
   }
   return returnString
  }
  console.log("getQueryString",getQueryString())
  const body: IPayOnline = {
    asSchoolId: schoolId,
    asUserLogin: userLoginId,
    asQueryString: getQueryString(),
    // 'StudentId='+ studentId +'&DueDates='+ SelectedDueDate +
    // '&Remarks=&SchoolwiseStudentFeeId='+feeId+'&IsOnlineCautionMoneyPayment=0',
    asSchoolSiteUrl:
      localStorage.getItem('SiteURL') + '/RITeSchool/SingleSignOnPage.aspx?',
    asRedirectPageUrl:
      localStorage.getItem('SiteURL') + '/RITeSchool/Accountant/PayFeeOnline.aspx?'
  };
  // useEffect(() => {
  //   dispatch(payOnline(body));
  // }, []);

  // Temporary fix to fee payment popup. Update code later
  return (
    <div> <PageHeader heading={'Online Payment'} subheading={''} />
      {localStorage.getItem("paymentPopUpCount") === '0' ? localStorage.setItem("paymentPopUpCount", '1') :
      <Card26 paymentPageLink={paymentPageLink} />}</div>
  );
}

export default PayOnline;
