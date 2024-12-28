import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IGetCautionMoneyReceiptBody } from 'src/interfaces/Student/Fees';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  GetCautionMoneyReceipt,
  resetCatutionMoney
} from 'src/requests/Fees/Fees';
import { RootState } from 'src/store';

function PayCautionMoney({
  ShowCaution,
  note,
  IspaidCautionMoney,
  clickCaution,
  IsOnlinePaymetCautionMoney
}) {
  const dispatch = useDispatch();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const UserId = sessionStorage.getItem('Id');
  const asAcademicYear = sessionStorage.getItem('AcademicYearId');
  const SchoolwiseStudentId = sessionStorage.getItem('SchoolwiseStudentId');
  const CautionMoneyReceipt: any = useSelector(
    (state: RootState) => state.Fees.CautionMoneyReceipt
  );

  const Toaster = () => {
    toast.success(
      'This feature is coming soon. Please download receipt form web app.'
    );
  };
  const clickIcon = () => {
    const CautionMoneyReciptBody: IGetCautionMoneyReceiptBody = {
      aiSchoolId: asSchoolId,
      aiAcademicYearId: asAcademicYear,
      aiStudentId: SchoolwiseStudentId
    };
    dispatch(GetCautionMoneyReceipt(CautionMoneyReciptBody));
  };
  //console.log('CautionMoneyReceipt', CautionMoneyReceipt);

  useEffect(() => {
    if (CautionMoneyReceipt !== '') {
      window.open(
        localStorage.getItem('SiteURL') +
        CautionMoneyReceipt.replace(/\\/g, '/')
      );
      dispatch(resetCatutionMoney());
    }
  }, [CautionMoneyReceipt]);

  return (
    <div>
      {IsOnlinePaymetCautionMoney && (
        <>
          {ShowCaution === 'SchoolFees' && (
            <>
              {IspaidCautionMoney ? (
                <>
                  <ButtonPrimary fullWidth sx={{ mb: 0.5 }} onClick={clickIcon}>
                    Show Caution Money Receipt
                  </ButtonPrimary>
                </>
              ) : (
                <ButtonPrimary
                  fullWidth
                  onClick={() => clickCaution(true)}
                  sx={{ mb: 0.5 }}
                >
                  Pay caution Money
                </ButtonPrimary>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default PayCautionMoney;
