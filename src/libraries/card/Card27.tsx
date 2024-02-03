import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from 'src/assets/style/student-style';
import { RootState } from 'src/store';
import FeeAccordion from '../accordion/FeeAccordion';

Card27.propTypes = {
  FeesType: PropTypes.string,
  Fee: PropTypes?.array,
  Heading: PropTypes?.object,
  Note: PropTypes?.string
};

function Card27({
  FeesType,
  Fee,
  Heading,
  Note,
  currentYear,
  IsForCurrentyear,
  OldYearwiseStudentId,
  internalFees,
  ApplicableFee,
  TotalLateFee,
  SchoolwiseStudentId,
  NextYearID,
  IsOnlinePaymetCautionMoney,
  clickPayOnline,
  OldInternalstudent,
  IsPending,
  RestrictNewPayment
}) {
  const theme = useTheme();
  const classes = Styles();
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState<string | false>(false);
  const FeesObject: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <FeeAccordion
      FeesType={FeesType}
      Fee={Fee}
      FeesObject={FeesObject}
      expanded={expanded}
      handleChange={handleChange}
      currentYear={currentYear}
      IsForCurrentyear={IsForCurrentyear}
      OldYearwiseStudentId={OldYearwiseStudentId}
      internalFees={internalFees}
      ApplicableFee={ApplicableFee}
      TotalLateFee={TotalLateFee}
      SchoolwiseStudentId={SchoolwiseStudentId}
      NextYearID={NextYearID}
      IsOnlinePaymetCautionMoney={IsOnlinePaymetCautionMoney}
      clickPayOnline={clickPayOnline}
      OldInternalstudent={OldInternalstudent}
      IsPending={IsPending}
      RestrictNewPayment={RestrictNewPayment}
    />
  );
}

export default Card27;
