import { useTheme, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Container, Card } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card16 from 'src/libraries/card/Card16';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import React, { useState } from 'react';
// import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { getReceiptFileName } from 'src/requests/Fees/Fees';
import { ListStyle } from '../styled/CardStyle';
import Card5 from 'src/libraries/mainCard/Card5';
import {
  CardDetail,
  CardDetail1,
  CardDetail2,
  CardDetail3
} from '../styled/CardStyle';

Card27.propTypes = {
  FeesType: PropTypes.string,
  Fee: PropTypes?.array,
  Heading: PropTypes?.object,
  Note: PropTypes?.string
};

function Card27({ FeesType, Fee, Heading, Note }) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const theme = useTheme();
  const classes = Styles();
  const dispatch = useDispatch();

  const FeesObject: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
  );
  const receiptFileName: any = useSelector(
    (state: RootState) => state.Fees.ReceiptFileName
  );

  const schoolId = localStorage.getItem('localSchoolId');
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const studentId = sessionStorage.getItem('StudentId');
  const authData = JSON.parse(localStorage.getItem('auth'));
  const userLoginId = authData.data.AuthenticateUserResult.UserLogin;
  const filePath = receiptFileName.replace(/\\/g, '/');
  let sitePath = 'https://192.168.1.80';
  let downloadPathOfReceipt = sitePath + filePath;

  const downloadReceiptFile = (receiptNo) => {
    console.log('ii -- ', receiptNo);
    const getReceiptFileName_body: any = {
      asSchoolId: schoolId,
      asReceiptNo: receiptNo,
      asAcademicYearId: academicYearId,
      asAccountHeaderId: '0',
      asIsRefundFee: '0',
      asStudentId: studentId,
      asSerialNo: '0',
      asLoginUserId: userLoginId
    };
    dispatch(getReceiptFileName(getReceiptFileName_body));
    setTimeout(() => {
      window.open(downloadPathOfReceipt);
    }, 1000);
  };

  return (
    <>
      <Container>
        <Accordion
          className={classes.background}
          expanded={expanded === 'panel'}
          onChange={handleChange('panel')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              background: `${theme.colors.gradients.pink1}`,
              boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
              mb: 1
            }}
          >
            <Typography
              sx={{
                color:
                  expanded === 'panel'
                    ? `${theme.colors.gradients.accordianHeadercolor}`
                    : ''
              }}
            >
              <b>{FeesType}</b> &nbsp;:&nbsp;
              <b>{FeesObject.TotalFeesPaid}</b>
            </Typography>
          </AccordionSummary>
          {
            <AccordionDetails
              sx={{
                borderRadius: 1,
                mb: -1
              }}
            >
              {FeesObject == undefined ? null : FeesObject.TotalFeesPaid ==
                0 ? (
                <ErrorMessages Error={'No fees has been paid'} />
              ) : Fee == undefined ? null : (
                Fee.map((item, i) => {
                  return item.AmountPayable == 0 ? (
                    <Card5
                      key={i}
                      text1={item.OriginalFeeType}
                      text2={item.Amount}
                      clickIcon={() => {
                        downloadReceiptFile(item.ReceiptNo);
                      }}
                    />
                  ) : null;
                })
              )}
            </AccordionDetails>
          }
        </Accordion>
        <Accordion
          className={classes.background}
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              background: `${theme.colors.gradients.pink1}`,
              boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
              mb: 1
            }}
          >
            <Typography sx={{
                color:
                  expanded === 'panel1'
                    ? `${theme.colors.gradients.accordianHeadercolor}`
                    : ''
              }}> 
            <b>{'Payable Fees'}</b> &nbsp;:&nbsp;<b>{FeesObject.FeesTobePaid}</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderRadius: 1,
              mb: 1
            }}
          >
            <Card16
              Fee={Fee}
              Heading={Heading}
              Note={Note}
              FeesTypes={FeesType}
            />
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
}

export default Card27;
