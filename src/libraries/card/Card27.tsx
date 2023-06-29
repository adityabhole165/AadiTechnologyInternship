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
import Card37 from './Card37';
import Card38 from './Card38';
import FeeAccordion from '../accordion/FeeAccordion';

Card27.propTypes = {
  FeesType: PropTypes.string,
  Fee: PropTypes?.array,
  Heading: PropTypes?.object,
  Note: PropTypes?.string
};

function Card27({ FeesType, Fee, Heading, Note, currentYear, IsForCurrentyear, OldYearwiseStudentId,internalFees,
  ApplicableFee, TotalLateFee, SchoolwiseStudentId, NextYearID, IsOnlinePaymetCautionMoney, clickPayOnline,
  OldInternalstudent,IsPending }) {
  const theme = useTheme();
  const classes = Styles();
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState<string | false>(false);
  const FeesObject: any = useSelector((state: RootState) => state.Fees.FeesData2);
 
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    
      <FeeAccordion FeesType={FeesType} Fee={Fee} FeesObject={FeesObject} expanded={expanded}
       handleChange={handleChange} currentYear={currentYear} IsForCurrentyear={IsForCurrentyear}
        OldYearwiseStudentId={OldYearwiseStudentId} internalFees={internalFees} ApplicableFee={ApplicableFee}
        TotalLateFee={TotalLateFee} SchoolwiseStudentId={SchoolwiseStudentId} NextYearID={NextYearID}
        IsOnlinePaymetCautionMoney={IsOnlinePaymetCautionMoney} clickPayOnline={clickPayOnline} 
        OldInternalstudent={OldInternalstudent} IsPending={IsPending}/>
  
  );
}

export default Card27;
