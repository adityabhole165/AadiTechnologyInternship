import React, { useEffect, useState } from 'react'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle'
import SelectSequenceList from './SelectSequenceList';
import { useDispatch } from 'react-redux';
import IFees, { IPayOnline } from 'src/interfaces/Student/Fees';
import { getFees } from 'src/requests/Fees/Fees';
import { RootState, useSelector } from 'src/store';
import { Grid } from '@mui/material';
import FeesCard from './FeesCard';
import { IGetSettingValueBody } from 'src/interfaces/SchoolSetting/schoolSettings';


import { Browser } from '@capacitor/browser';
import { GetEnableOnlinePaymentForInternalFee } from 'src/requests/SchoolSetting/schoolSetting';
const PaidFeesDetails = ({ currentYear, IsForCurrentyear, OldYearwiseStudentId, internalFees, FeesObject,
  ApplicableFee, TotalLateFee, SchoolwiseStudentId, NextYearID, IsOnlinePaymetCautionMoney, clickPayOnline,
  OldInternalstudent }) => {
  const dispatch = useDispatch();

  const asSchoolId = localStorage.getItem('localSchoolId')
  const StandardId = sessionStorage.getItem('StandardId');
  const sStudentId = sessionStorage.getItem('StudentId')
  const aiAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'))
  
  const [FeesTotal, setFeesTotal] = useState(0); // Sum of Fees
  const [itemList, setItemList] = useState([]); // Sum of Fees
  
  const [IsSequenceSelect, setIsSequenceSelect] = useState(false);
  const [isSingleSelect, setisSingleSelect] = useState(false);

  const userLoginId = sessionStorage.getItem("Userlogin") 
  const asStudentId = currentYear == NextYearID ? SchoolwiseStudentId : sStudentId
  const totalamountt = FeesTotal - TotalLateFee;
  const IntFeeDetailsId = itemList.filter((item) => item.IsActive === true).map((obj, i) => {
    return obj.StudentFeeId
  });
  
  const OldInternalstudentId = currentYear < aiAcademicYearId ? OldInternalstudent : asStudentId
  const IsForCurrentYear = IsForCurrentyear ? 1 : 0;
  const FeesList = useSelector((state: RootState) => state.Fees.FeesData);
  const FeeType = FeesList.map((item, i) => { return item.FeeType })
  let ConcessionAmount = 0;
  FeesList.map((item, i) => { ConcessionAmount = item.ConcessionAmount })

  const OnlinePaymentForInternalFee: any = useSelector((state: RootState) => state.getSchoolSettings.EnableOnlinePaymentForInternalFee);

  const GetSettingValueBody: IGetSettingValueBody = {
    asSchoolId: parseInt(asSchoolId),
    aiAcademicYearId: aiAcademicYearId,
    asKey: "",
  };

  const body: IFees = {
    asSchoolId: asSchoolId,
    asStudentId: asStudentId,
    aiAcademicYearId: aiAcademicYearId,
    abIsForCurrentYear: true
  };
  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getFees(body));
    dispatch(GetEnableOnlinePaymentForInternalFee(GetSettingValueBody))
  }, []);

  useEffect(() => {
    if (FeesList.length > 0) {
      let prevGroup = 0;
      let prevFeeId = "0";
      //SNS
      if (FeesList[0].ShowOptionButtonForAllEntry !== undefined && FeesList[0].ShowOptionButtonForAllEntry) {
          setIsSequenceSelect(false)
          if (Number(currentYear) === NextYearID)
            setisSingleSelect(false)
          else
            setisSingleSelect(true)
      }
      //Non SNS
      else {

        setisSingleSelect(false)
        if (Number(currentYear) === NextYearID || internalFees == "internalFees") {
          setIsSequenceSelect(false)
        }
        else {
          setIsSequenceSelect(true)
        }
      }

      setItemList(FeesList
        .filter((obj) => {
          return ((internalFees == "internalFees" && obj.FeeDetailsId == 0) || obj.AmountPayable !== "0")
        })
        .map((item, index) => {
          const lateFeeLabel = item.LateFeeAmount === "0" ? "Amount :" : "Amount + Late Fees : ";

          if (!(internalFees === "internalFees" || Number(currentYear) === NextYearID)) {
            if (prevGroup !== item.PaymentGroup) {
              prevGroup = item.PaymentGroup;
              prevFeeId = (index+1).toString() ;
            }
          }
          return {
            Id:(index+1).toString(),
            Name: item.FeeId,
            Value: item.FeeId,
            IsActive: false,
            Text1: item.FeeType + "(" + item.PayableFor + ")",
            Text2: lateFeeLabel,
            Text3: internalFees == "internalFees" ? (item.LateFeeAmount == "0" ? item.Amount : item.Amount + " + " + item.LateFeeAmount) : (item.LateFeeAmount == "0" ? item.AmountPayable : item.AmountPayable + " + " + item.LateFeeAmount),
            Text4: "Due On : " + item.DueDateFormat,
            ParentId: (index+1).toString() === prevFeeId ? "0" : prevFeeId,
            AmountPayable: item.AmountPayable,
            LateFeeAmount: item.LateFeeAmount,
            DueDate: item.DueDateString,
            FeeType: item.FeeType,
            StudentFeeId:(internalFees == "internalFees" ? item.InternalFeeDetailsId: 
            (FeesList[0].ShowOptionButtonForAllEntry !== undefined && FeesList[0].ShowOptionButtonForAllEntry)?item.StudentFeeId:"0"
            // StudentFeeId: ((internalFees && item.InternalFeeDetailsId) || 
            // (FeesList[0].ShowOptionButtonForAllEntry !== undefined && FeesList[0].ShowOptionButtonForAllEntry)?item.StudentFeeId:"0"
            )
          }
        }))
    }
  }, [FeesList]);
  const getQueryString = (StudentFeeId, DueDate, FeeType) => {
    let returnString = ""
    let IsForNextYear = Number(currentYear) == NextYearID ? "Y" : "N"
    let OPaymentForInternalFee = OnlinePaymentForInternalFee ? 1 : 0
    if (Number(currentYear) == NextYearID) {
      returnString = 'StudentId=' + asStudentId + '&DueDates=' + DueDate +
        '&Remarks=&SchoolwiseStudentFeeId=' + StudentFeeId + '&AcadmicYearId=' + currentYear +
        '&StanardID=' + StandardId + '&TotalAmount=' + FeesTotal + '&LateFeeAmount=' + TotalLateFee + '&IsForNextYear=Y' +
        '&ConcessionAmount=' + ConcessionAmount + '&FeeType=' + FeeType
    }
    if (Number(currentYear) == aiAcademicYearId) {
      returnString = 'StudentId=' + asStudentId + '&DueDates=' + DueDate +
        '&Remarks=&SchoolwiseStudentFeeId=' + StudentFeeId + '&IsOnlineCautionMoneyPayment=0'
    }
    if (Number(currentYear) < aiAcademicYearId) {
      returnString = 'StudentId=' + OldInternalstudentId + '&DueDates=' + DueDate +
        '&Remarks=&SchoolwiseStudentFeeId=' + StudentFeeId + '&IsOnlineCautionMoneyPayment=0' + '&AcadmicYearId=' + currentYear +
        '&IsOldAcademicYearPayment=' + IsForCurrentYear
    }
    if (internalFees == "internalFees") { //internal
      returnString = 'StudentId=' + OldInternalstudentId + '&InternalFeeDetailsId=' + IntFeeDetailsId.toString() + '&IsOnlineInternalFeePayment=' + OPaymentForInternalFee
        + '&IsForNextYear=' + IsForNextYear + '&AcadmicYearId=' + currentYear + '&TotalAmount=' + FeesTotal + '&IsForInternalFee=1'
    }
    return returnString
  }
  const clickPayOnlineLocal = () => {
    let DueDate="", StudentFeeId = "0", FeeType = ""
    
    itemList.map((item) => {
      if (item.IsActive) {
        DueDate = DueDate + item.DueDate + ','
        StudentFeeId = item.StudentFeeId 
        FeeType = item.FeeType
      }
    })
    const body: IPayOnline = {
      asSchoolId: localStorage.getItem('localSchoolId'),
      asUserLogin: userLoginId,
      asQueryString: getQueryString(StudentFeeId, DueDate, FeeType),
      asSchoolSiteUrl:
        localStorage.getItem('SiteURL') + '/RITeSchool/SingleSignOnPage.aspx?',
      asRedirectPageUrl:
        localStorage.getItem('SiteURL') + '/RITeSchool/Accountant/PayFeeOnline.aspx?'
    };
    clickPayOnline(body);
  }
  const RefreshData = (value) => {
    setItemList(value)
    let Total = 0;
    value.map((item) => {
      const amount = internalFees = "internalFees" ? item.Text3 : item.AmountPayable
      if (item.IsActive)
        Total += parseInt(amount) + parseInt(item.LateFeeAmount)
    })
    setFeesTotal(Total)
  }
  return (
    <div>
      <Grid container>
        <Grid item xs={3}>
          Total: {FeesTotal}
        </Grid><Grid item xs={9}>
          <ButtonPrimary sx={{ float: 'right' }} onClick={clickPayOnlineLocal}
            color={itemList.some((obj) => obj.IsActive === true) ? "primary" : "warning"} >
            Pay Online
          </ButtonPrimary>
        </Grid><Grid item xs={12} sx={{ mt: 2 }}>
          {itemList.length > 0 &&
            <SelectSequenceList Itemlist={itemList} RefreshData={RefreshData}
              FeesCard={FeesCard}
              IsSequenceSelect={IsSequenceSelect}
              isSingleSelect={isSingleSelect} />
          }
        </Grid>
      </Grid>
    </div>
  )
}

export default PaidFeesDetails