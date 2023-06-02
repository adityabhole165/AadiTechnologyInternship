import React, { useEffect, useState } from 'react'
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle'
import SelectSequenceList from './SelectSequenceList';
import { useDispatch } from 'react-redux';
import IFees from 'src/interfaces/Student/Fees';
import { getFees } from 'src/requests/Fees/Fees';
import { RootState, useSelector } from 'src/store';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import FeesCard from './FeesCard';

const PaidFeesDetails = ({currentYear, IsForCurrentyear, OldYearwiseStudentId,internalFees,FeesObject,ApplicableFee,TotalLateFee}) => {
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const navigate = useNavigate()
  const [FeesTotal, setFeesTotal] = useState(0); // Sum of Fees
  const [itemList, setItemList] = useState([]); // Sum of Fees
  const dispatch = useDispatch();

  const FeesList = useSelector((state: RootState) => state.Fees.FeesData);

  const RefreshData = (value) => {
    setItemList(value)
    let Total = 0;
    value.map((item) => {
      if (item.IsActive) {
        Total += parseInt(item.AmountPayable) + parseInt(item.LateFeeAmount)
      }
    })
    setFeesTotal(Total)
  }
  const body: IFees = {
    asSchoolId: localStorage.getItem('localSchoolId'),
    asStudentId: sessionStorage.getItem('StudentId'),
    aiAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
    abIsForCurrentYear: true
  };

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getFees(body));
  }, []);

  useEffect(() => {
    setItemList(FeesList
      .filter((obj) => { return ((internalFees && obj.FeeDetailsId == 0) || obj.AmountPayable !== "0") })
      .map((item, index) => {
        const lateFeeLabel = item.LateFeeAmount === "0" ? "Amount :" : "Amount + Late Fees : ";
        return {
          Id: item.FeeId,
          Name: item.FeeId,
          Value: item.FeeId,
          IsActive: false,
          Text1: item.FeeType + "(" + item.PayableFor + ")",
          Text2: lateFeeLabel,
          Text3: item.LateFeeAmount == "0" ? item.AmountPayable : item.AmountPayable + " + " + item.LateFeeAmount,
          Text4: "Due On : " + item.DueDateFormat,
          ParentId: item.FeeId === '11' ? '0' : '0',
          AmountPayable: item.AmountPayable,
          LateFeeAmount : item.LateFeeAmount,
          DueDate: item.DueDateString,
          StudentFeeId: item.StudentFeeId
        }
      }))
  }, [FeesList]);
  let advanceFeelist = 0;
  FeesList.map((item,i)=>{
  advanceFeelist =  item.ConcessionAmount
})
// const navi = () => {
//   let naviGate = ""
//   if(currentYear == AcademicYearId){
//     naviGate = `/${location.pathname.split('/')[1]}/Student/PayOnline/`+DueDate.replaceAll("/", "-") + `/` + StudentFeeId + `/` + currentYear
//   }
//   return naviGate
// }
// const navi = ()=>{
//   let naviGate = ""
//   if(currentYear == AcademicYearId){
//     naviGate = StudentFeeId + `/` + currentYear
//   }
//   if(currentYear < AcademicYearId){

//   }

// }
const IsForCurrentYear = IsForCurrentyear ? 1: 0 ;
 const clickPayOnline = () => {
    let DueDate, StudentFeeId = "", naviGate = ""
    itemList.map((item) => {
      if (item.IsActive) {
        DueDate = item.DueDate
        StudentFeeId = item.StudentFeeId
      }
    })
    // navigate(`/${location.pathname.split('/')[1]}/Student/PayOnline/12-10-2022` +
    const nav=()=>{
      if(currentYear == "0"){
        navigate(`/${location.pathname.split('/')[1]}/Student/PayOnline/` +
        DueDate.replaceAll("/", "-") + `/` +  StudentFeeId + `/` + currentYear + `/` + ApplicableFee + `/` +TotalLateFee+`/`+advanceFeelist)
          }
      if(currentYear == AcademicYearId){
        // naviGate = StudentFeeId + `/` + currentYear
        navigate(`/${location.pathname.split('/')[1]}/Student/PayOnline/` +
        DueDate.replaceAll("/", "-") + `/` +  StudentFeeId + `/` + currentYear)
          }
          if(currentYear < AcademicYearId){
            navigate(`/${location.pathname.split('/')[1]}/Student/PayOnline/` +
        DueDate.replaceAll("/", "-") + `/` +  StudentFeeId + `/` + currentYear + `/` + IsForCurrentYear+ `/`+ OldYearwiseStudentId)
          }
          if(internalFees){
            navigate(`/${location.pathname.split('/')[1]}/Student/PayOnline/` +
        DueDate.replaceAll("/", "-") + `/` +  StudentFeeId + `/` + currentYear + `/` + IsForCurrentYear+ `/`+ OldYearwiseStudentId)
          }
          else{

          }
    }
    nav()
    // navigate(`/${location.pathname.split('/')[1]}/Student/PayOnline/` +
    //   DueDate.replaceAll("/", "-") + `/` + nav())
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
            FeesCard ={FeesCard}
              IsSequenceSelect={true}/>
          }
        </Grid>
      </Grid>
    </div>
  )
}

export default PaidFeesDetails