import { Accordion, AccordionDetails } from "@mui/material"
import Note from "../Note/Note"
import { Accordionsummary, Header1 } from "../styled/AccordianStyled"
import { useEffect, useState } from "react";
import { useTheme, Grid } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import Card5Fees from "./Card5Fees";
import { getReceiptFileName, resetReciept ,GetInternalFeeReceipt} from "src/requests/Fees/Fees";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import {IGetInternalFeeReceiptBody}  from 'src/interfaces/Student/Fees';
import Card27 from 'src/libraries/card/Card27';
const Card38 = ({ FeesType, Fee, FeesObject, expanded, handleChange, internalFees, currentYear }) => {
  const theme = useTheme();
  const classes = Styles();
  const dispatch = useDispatch();
  const receiptFileName: any = useSelector((state: RootState) => state.Fees.ReceiptFileName);
  const GetOldStudentDetails: any = useSelector((state: RootState) => state.Fees.GetOldStudentDetails);
  const InternalFeeReceipt: any = useSelector((state: RootState) => state.Fees.InternalFeeReceipt);



  const schoolId = localStorage.getItem('localSchoolId');
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const studentId = sessionStorage.getItem('StudentId');
  const userLoginId = sessionStorage.getItem('Userlogin');
  const downloadReceiptFile = (ReceiptNo, AccountHeaderId) => {

    const getReceiptFileName_body: any = {
      asSchoolId: schoolId,
      asReceiptNo: ReceiptNo,
      asAcademicYearId: currentYear,
      asAccountHeaderId: AccountHeaderId,
      asIsRefundFee: '0',
      asStudentId: GetOldStudentDetails.StudentId,
      asSerialNo: '0',
      asLoginUserId: userLoginId
    };
    dispatch(getReceiptFileName(getReceiptFileName_body));
  };

  useEffect(() => {

    if (receiptFileName !== "") {
      window.open(localStorage.getItem('SiteURL') + receiptFileName.replace(/\\/g, '/'));
      dispatch(resetReciept());
    }
  }, [receiptFileName])

  const clickIcon=()=>{
    const InternalFeeReciptBody : IGetInternalFeeReceiptBody = {

      "aiSchoolId":"71",
      "aiAcademicYearId":"11",
      "aiSchoolwiseStudentId":"2686",
      "asReceiptNo":"30328",
      "aiInternalFeeDetailsId":"298261",
      "abIsNextYearPayment":"false",
      "aiSerialNumber":"449729"
  }
    dispatch(GetInternalFeeReceipt(InternalFeeReciptBody))
    }

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
            background: `${theme.colors.gradients.pink1}`, mb: 1
          }}
        >
          <Header1
            color={expanded === 'panel' ? 'secondary' : ''}
          >
            <b>{FeesType}</b> &nbsp;:&nbsp;<b>Rs. {FeesObject.TotalFeesPaid}</b>
          </Header1>
        </Accordionsummary>
        {
          <AccordionDetails>
            {FeesObject == undefined ? null : FeesObject.TotalFeesPaid ==
              0 ? (
              <ErrorMessages Error={'No fees has been paid'} />
            ) : Fee == undefined ? null : (
              Fee.map((item, i) => {
                const paid = internalFees == "internalFees" ? item.FeeDetailsId !== 0 : item.AmountPayable == 0
                return paid ? (
                  <Card5Fees item={item} Content={''} Name={''} key={i} internalFees={internalFees}
                    FileName={internalFees ? item.FeeType + ":" + " " +"Rs. "+item.Amount : item.FeeType +
                      ":" + " " +"Rs. "+ item.FeesPaid}
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
  )
}
export default Card38