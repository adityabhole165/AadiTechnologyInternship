import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, useTheme } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';
import PaidFeesDetails from 'src/components/FeesNew/PaidFeesDetails';
import { Accordionsummary, Header1 } from '../styled/AccordianStyled';

const Card37 = ({
  expanded,
  handleChange,
  FeesObject,
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
}) => {
  const theme = useTheme();
  const classes = Styles();
  return (
    <>
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
          <Header1 color={expanded === 'panel1' ? 'secondary' : ''}>
            <b>{'Payable Fees'}</b> :&nbsp;&nbsp;
            <b>Rs. {FeesObject.FeesTobePaid}</b>
            <br />
            <b>{'Late Fee'}</b> :&nbsp;&nbsp;
            <b>Rs. {FeesObject.TotalLateFee}</b>
          </Header1>
        </Accordionsummary>
        <AccordionDetails>
          <PaidFeesDetails
            currentYear={currentYear}
            IsForCurrentyear={IsForCurrentyear}
            OldYearwiseStudentId={OldYearwiseStudentId}
            internalFees={internalFees}
            FeesObject={FeesObject}
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
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default Card37;
