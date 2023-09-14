import React,{useEffect} from 'react'
import Note from 'src/libraries/Note/Note';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { GetInternalFeeReceipt, resetInternalReciept } from 'src/requests/Fees/Fees';
import { GetCautionMoneyReceipt ,  } from 'src/requests/Fees/Fees';
import{IGetCautionMoneyReceiptBody} from 'src/interfaces/Student/Fees';

function PayCautionMoney({ ShowCaution, note, IspaidCautionMoney, clickCaution, IsOnlinePaymetCautionMoney }) {
  const dispatch = useDispatch()
    const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const UserId = sessionStorage.getItem('Id');
  const asAcademicYear = sessionStorage.getItem('AcademicYearId');
  const SchoolwiseStudentId =sessionStorage.getItem('SchoolwiseStudentId');
  const CautionMoneyReceipt: any = useSelector((state: RootState) => state.Fees.CautionMoneyReceipt);
  
  const Toaster =()=>{
    toast.success('This feature is coming soon. Please download receipt form web app.')
  }
  const clickIcon=()=>{
    const CautionMoneyReciptBody : IGetCautionMoneyReceiptBody = {

      "aiSchoolId":asSchoolId,
       "aiAcademicYearId":asAcademicYear,
       "aiStudentId":SchoolwiseStudentId  
   }
    dispatch(GetCautionMoneyReceipt(CautionMoneyReciptBody))
    }
         
  useEffect(() => {

    if (CautionMoneyReceipt !== "") {
      window.open(localStorage.getItem('SiteURL') + CautionMoneyReceipt.replace(/\\/g, '/'));
      dispatch(resetInternalReciept());
    }
  }, [CautionMoneyReceipt])

  return (
    <div>
    {IsOnlinePaymetCautionMoney &&  <>
      {ShowCaution === "SchoolFees" &&
        <>
          {IspaidCautionMoney ?
            <>
              <ButtonPrimary fullWidth sx={{mb:0.5}}onClick={clickIcon}>Show Caution Money Receipt</ButtonPrimary>
            </>
            :
            <ButtonPrimary fullWidth onClick={()=>clickCaution(true)} sx={{mb:0.5}}>Pay caution Money</ButtonPrimary>
          }
        </>
      }
      </>}
    </div>
  )
}

export default PayCautionMoney
