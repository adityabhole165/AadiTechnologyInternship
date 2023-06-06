import React, { useEffect, useState } from 'react'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle'
import SelectSequenceList from './SelectSequenceList';
import { useDispatch } from 'react-redux';
import IFees, { IPayOnline } from 'src/interfaces/Student/Fees';
import { getFees, payOnline } from 'src/requests/Fees/Fees';
import { RootState, useSelector } from 'src/store';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import FeesCard from './FeesCard';
import { IGetSettingValueBody } from 'src/interfaces/SchoolSetting/schoolSettings';


import { Browser } from '@capacitor/browser';
import { GetEnableOnlinePaymentForInternalFee } from 'src/requests/SchoolSetting/schoolSetting';
const PaidFeesDetails = ({ currentYear, IsForCurrentyear, OldYearwiseStudentId, internalFees, FeesObject,
   ApplicableFee, TotalLateFee, SchoolwiseStudentId, NextYearID }) => {
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const navigate = useNavigate()
  const [FeesTotal, setFeesTotal] = useState(0); // Sum of Fees
  const [itemList, setItemList] = useState([]); // Sum of Fees
  const dispatch = useDispatch();
  const authData = JSON.parse(localStorage.getItem("auth"));
  const userLoginId = authData.data.AuthenticateUserResult.UserLogin
  const asSchoolId = localStorage.getItem('localSchoolId')
  const StandardId = sessionStorage.getItem('StandardId');
  const sStudentId = sessionStorage.getItem('StudentId')
  const aiAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'))
  const asStudentId = currentYear == NextYearID ? SchoolwiseStudentId : sStudentId 
   const totalamountt = FeesTotal - TotalLateFee;   
  const paymentPageLink: any = useSelector(
    (state: RootState) => state.Fees.paymentUrl
  );
  const FeesList = useSelector((state: RootState) => state.Fees.FeesData);
  
  const OnlinePaymentForInternalFee: any = useSelector(
    (state: RootState) => state.getSchoolSettings.EnableOnlinePaymentForInternalFee
  );
  const GetSettingValueBody: IGetSettingValueBody = {
    asSchoolId: parseInt(asSchoolId),
    aiAcademicYearId: aiAcademicYearId,
    asKey: "",
  };
  useEffect(() => {
    dispatch(GetEnableOnlinePaymentForInternalFee(GetSettingValueBody))
  }, []);
  const RefreshData = (value) => {
    setItemList(value)
    let Total = 0;
    value.map((item) => {
    const amount = internalFees = "internalFees" ? item.Text3 : item.AmountPayable
      if (item.IsActive) {
        Total += parseInt(amount) + parseInt(item.LateFeeAmount)
      }
    })
    setFeesTotal(Total)
  }
  const body: IFees = {
    asSchoolId: asSchoolId,
    asStudentId: asStudentId,
    aiAcademicYearId: aiAcademicYearId,
    abIsForCurrentYear: true
  };

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getFees(body));
  }, []);
  useEffect(() => {
    if (paymentPageLink !== "") {
      const openCapacitorSite = async (url) => {
        await Browser.open({ url: url });
      };
      openCapacitorSite(paymentPageLink)
    }
  }, [paymentPageLink]);

  useEffect(() => {
    setItemList(FeesList
      .filter((obj) => {       
         return ((internalFees == "internalFees" && obj.FeeDetailsId  == 0) || obj.AmountPayable !== "0") })
      .map((item, index) => {
        
        const lateFeeLabel = item.LateFeeAmount === "0" ? "Amount :" : "Amount + Late Fees : ";
        return {
          Id: item.FeeId,
          Name: item.FeeId,
          Value: item.FeeId,
          IsActive: false,
          Text1: item.FeeType + "(" + item.PayableFor + ")",
          Text2: lateFeeLabel,
          Text3: internalFees == "internalFees" ? (item.LateFeeAmount == "0" ? item.Amount :item.Amount + " + " + item.LateFeeAmount) : (item.LateFeeAmount == "0" ? item.AmountPayable :item.AmountPayable + " + " + item.LateFeeAmount) ,
          Text4: "Due On : " + item.DueDateFormat,
          ParentId: item.FeeId === '11' ? '0' : '0',
          AmountPayable: item.AmountPayable,
          LateFeeAmount: item.LateFeeAmount,
          DueDate: item.DueDateString,
          StudentFeeId: ((internalFees && item.InternalFeeDetailsId) || item.StudentFeeId)
        }
      }))
  }, [FeesList]);
  let ConcessionAmount = 0;
  FeesList.map((item, i) => {
    ConcessionAmount = item.ConcessionAmount
  })
 const IntFeeDetailsId= FeesList.map((item,i)=>{ 
    return item.InternalFeeDetailsId
  })
  const FeeType = FeesList.map((item,i)=>{ 
    return item.FeeType
  })
  
  const IsForCurrentYear = IsForCurrentyear ? 1 : 0;
  const getQueryString = (StudentFeeId, DueDate) => {
    let returnString = ""
    let IsForNextYear = Number(currentYear) == 0?"Y":"N"
    let OPaymentForInternalFee = OnlinePaymentForInternalFee ? 1 : 0
    if (Number(currentYear) == NextYearID) {
      returnString = 'StudentId=' + asStudentId + '&DueDates=' + DueDate +
        '&Remarks=&SchoolwiseStudentFeeId=' + StudentFeeId + '&AcadmicYearId=' + currentYear +
        '&StanardID='+StandardId + '&TotalAmount=' + FeesTotal + '&LateFeeAmount=' + TotalLateFee + '&IsForNextYear=Y' +
        '&ConcessionAmount=' + ConcessionAmount + '&FeeType='
    }
    if (Number(currentYear) == aiAcademicYearId) {
      returnString = 'StudentId=' + asStudentId + '&DueDates=' + DueDate +
        '&Remarks=&SchoolwiseStudentFeeId=' + StudentFeeId + '&IsOnlineCautionMoneyPayment=0'
    }
    if (Number(currentYear) < aiAcademicYearId) {
      returnString = 'StudentId=' + OldYearwiseStudentId + '&DueDates=' + DueDate +
        '&Remarks=&SchoolwiseStudentFeeId=' + StudentFeeId + '&IsOnlineCautionMoneyPayment=0' + '&AcadmicYearId=' + currentYear +
        '&IsOldAcademicYearPayment=' + IsForCurrentyear
    }
    if (internalFees == "internalFees") { //internal
      returnString = 'StudentId=' + asStudentId + '&InternalFeeDetailsId=' + IntFeeDetailsId.toString() + '&IsOnlineInternalFeePayment='+OPaymentForInternalFee
        + '&IsForNextYear=' + IsForNextYear + '&AcadmicYearId=' + currentYear + '&TotalAmount='+FeesTotal + '&IsForInternalFee=1'
    }
    return returnString
  } 
  const clickPayOnline = () => {
    let DueDate, StudentFeeId = "", naviGate = ""
    itemList.map((item) => {
      if (item.IsActive) {
        DueDate = item.DueDate
        StudentFeeId = item.StudentFeeId
      }
    })
    const body: IPayOnline = {
      asSchoolId: localStorage.getItem('localSchoolId'),
      asUserLogin: userLoginId,
      asQueryString: getQueryString(StudentFeeId, DueDate),
      asSchoolSiteUrl:
        localStorage.getItem('SiteURL') + '/RITeSchool/SingleSignOnPage.aspx?',
      asRedirectPageUrl:
        localStorage.getItem('SiteURL') + '/RITeSchool/Accountant/PayFeeOnline.aspx?'
    };
    dispatch(payOnline(body));

  }

  return (
    <div>
      <Grid container>
        <Grid item xs={3}>
          Total: {FeesTotal}
        </Grid><Grid item xs={9}>
          <ButtonPrimary sx={{ float: 'right' }} onClick={clickPayOnline}
            color={itemList.some((obj) => obj.IsActive === true) ? "primary" : "warning"} >
            Pay Online
          </ButtonPrimary>
        </Grid><Grid item xs={12} sx={{ mt: 2 }}>
          {itemList.length > 0 &&
            <SelectSequenceList Itemlist={itemList} RefreshData={RefreshData}
              FeesCard={FeesCard}
              IsSequenceSelect={true} />
          }
        </Grid>
      </Grid>
    </div>
  )
}

export default PaidFeesDetails