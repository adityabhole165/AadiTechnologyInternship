import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from 'src/assets/style/student-style';
import { IGetInternalFeeReceiptBody } from 'src/interfaces/Student/Fees';
import {
  GetInternalFeeReceipt,
  getReceiptFileNames,
  resetInternalReciept,
  resetReciept
} from 'src/requests/Fees/Fees';
import { RootState } from 'src/store';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import { Accordionsummary, Header1 } from '../styled/AccordianStyled';
import Card5Fees from './Card5Fees';
const Card38 = ({
  FeesType,
  Fee,
  FeesObject,
  expanded,
  handleChange,
  internalFees,
  currentYear
}) => {
  const theme = useTheme();
  const classes = Styles();
  const dispatch = useDispatch();
  const receiptFileName: any = useSelector(
    (state: RootState) => state.Fees.ReceiptFileName
  );
  const GetOldStudentDetails: any = useSelector(
    (state: RootState) => state.Fees.GetOldStudentDetails
  );
  const InternalFeeReceipt: any = useSelector(
    (state: RootState) => state.Fees.InternalFeeReceipt
  );
  const SchoolwiseStudentId = sessionStorage.getItem('SchoolwiseStudentId');
  const schoolId = localStorage.getItem('localSchoolId');
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const studentId = sessionStorage.getItem('StudentId');
  const userLoginId = sessionStorage.getItem('Userlogin');
  const downloadReceiptFile = (ReceiptNo, AccountHeaderId) => {
    const ReceiptFileNamebody: any = {
      asSchoolId: schoolId,
      asReceiptNo: ReceiptNo,
      asAcademicYearId: currentYear,
      asAccountHeaderId: AccountHeaderId,
      asIsRefundFee: '0',
      asStudentId: GetOldStudentDetails.StudentId,
      asSerialNo: '0',
      asLoginUserId: userLoginId
    };
    dispatch(getReceiptFileNames(ReceiptFileNamebody));
  };

  const clickIcon = (ReceiptNo, InternalFeeDetailsId, SerialNumber) => {
    const InternalFeeReciptBody: IGetInternalFeeReceiptBody = {
      aiSchoolId: schoolId,
      aiAcademicYearId: currentYear,
      aiSchoolwiseStudentId: SchoolwiseStudentId,
      asReceiptNo: ReceiptNo,
      aiInternalFeeDetailsId: InternalFeeDetailsId,
      abIsNextYearPayment: 'false',
      aiSerialNumber: SerialNumber
    };
    dispatch(GetInternalFeeReceipt(InternalFeeReciptBody));
  };

  useEffect(() => {
    if (InternalFeeReceipt !== '') {
      window.open(
        localStorage.getItem('SiteURL') + InternalFeeReceipt.replace(/\\/g, '/')
      );
      dispatch(resetInternalReciept());
    }
  }, [InternalFeeReceipt]);

  useEffect(() => {
    if (receiptFileName !== '') {
      window.open(
        localStorage.getItem('SiteURL') + receiptFileName.replace(/\\/g, '/')
      );
      dispatch(resetReciept());
    }
  }, [receiptFileName]);

  return (
    <>
      <Accordion
        className={classes.background}
        expanded={expanded === 'panel'}
        onChange={handleChange('panel')}
        elevation={0}
        disableGutters
      >
        <Accordionsummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            background: `${theme.colors.gradients.pink1}`,
            mb: 1
          }}
        >
          <Header1 color={expanded === 'panel' ? 'secondary' : ''}>
            <b>{FeesType}</b>&nbsp;:&nbsp;&nbsp;
            <b>Rs. {FeesObject.TotalFeesPaid}</b>
          </Header1>
        </Accordionsummary>
        {
          <AccordionDetails>
            {FeesObject == undefined ? null : FeesObject.TotalFeesPaid == 0 ? (
              <ErrorMessages Error={'No fees has been paid'} />
            ) : Fee == undefined ? null : (
              Fee.map((item, i) => {
                const paid =
                  internalFees == 'internalFees'
                    ? item.FeeDetailsId !== 0
                    : item.AmountPayable == 0;
                return paid ? (
                  <Card5Fees
                    item={item}
                    Content={''}
                    Name={''}
                    key={i}
                    internalFees={internalFees}
                    FileName={
                      internalFees
                        ? item.FeeType +
                          '(' +
                          item.PayableFor +
                          ')' +
                          ':' +
                          ' ' +
                          'Rs. ' +
                          item.Amount
                        : item.FeeType +
                          '(' +
                          item.PayableFor +
                          ')' +
                          ':' +
                          ' ' +
                          'Rs. ' +
                          item.FeesPaid
                    }
                    downloadReceiptFile={downloadReceiptFile}
                    clickIcon={clickIcon}
                  />
                ) : null;
              })
            )}
          </AccordionDetails>
        }
      </Accordion>
    </>
  );
};
export default Card38;
