import { useTheme, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card16 from 'src/libraries/card/Card16';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import React, { useEffect, useState } from 'react';
import { getReceiptFileName, resetReciept } from 'src/requests/Fees/Fees';
import Card5 from 'src/libraries/mainCard/Card5';
import { Accordionsummary, Header1 } from '../styled/AccordianStyled';
import { sitePath } from 'src/components/Common/Util';

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

  const FeesObject: any = useSelector((state: RootState) => state.Fees.FeesData2);
  const receiptFileName: any = useSelector((state: RootState) => state.Fees.ReceiptFileName);
  const schoolId = localStorage.getItem('localSchoolId');
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const studentId = sessionStorage.getItem('StudentId');


  const authData = JSON.parse(localStorage.getItem('auth'));
  const userLoginId = authData.data.AuthenticateUserResult.UserLogin;
  const filePath = receiptFileName.replace(/\\/g, '/');
  let sitePathURL = localStorage.getItem('SiteURL');
  let downloadPathOfReceipt = sitePathURL + filePath;

  const downloadReceiptFile = (receiptNo, accountHeaderId) => {
    const getReceiptFileName_body: any = {
      asSchoolId: schoolId,
      asReceiptNo: receiptNo,
      asAcademicYearId: academicYearId,
      asAccountHeaderId: accountHeaderId,
      asIsRefundFee: '0',
      asStudentId: studentId,
      asSerialNo: '0',
      asLoginUserId: userLoginId
    };
    dispatch(getReceiptFileName(getReceiptFileName_body));
  };
  // 
  useEffect(() => {
    if (receiptFileName !== "")
      window.open(downloadPathOfReceipt);
    dispatch(resetReciept());

  }, [receiptFileName])
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
            background: `${theme.colors.gradients.pink1}`
          }}
        >
          <Header1
            color={expanded === 'panel' ? 'secondary' : ''}
          >
            <b>{FeesType}</b> &nbsp;:&nbsp;<b>{FeesObject.TotalFeesPaid}</b>
          </Header1>
        </Accordionsummary>
        {
          <AccordionDetails>
            {FeesObject == undefined ? null : FeesObject.TotalFeesPaid ==
              0 ? (
              <ErrorMessages Error={'No fees has been paid'} />
            ) : Fee == undefined ? null : (
              Fee.map((item, i) => {
                return item.AmountPayable == 0 ? (
                  <Card5
                    key={i}
                    text1={item.FeeType + ' (' + item.PayableFor + ')'}
                    text2={item.Amount}
                    clickIcon={() => {
                      downloadReceiptFile(item.ReceiptNo, item.AccountHeaderId);
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
        elevation={0}
        disableGutters
      >
        <Accordionsummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            background: `${theme.colors.gradients.pink1}`
          }}
          color="primary"
        >
          <Header1
            color={expanded === 'panel1' ? 'secondary' : ''}
          >
            <b>{'Payable Fees'}</b> &nbsp;:&nbsp;<b>{FeesObject.FeesTobePaid}</b>
          </Header1>
        </Accordionsummary>
        <AccordionDetails>
          <Card16
            Fee={Fee}
            Heading={Heading}
            Note={Note}
            FeesTypes={FeesType}
          />
        </AccordionDetails>
      </Accordion>

    </>
  );
}

export default Card27;
