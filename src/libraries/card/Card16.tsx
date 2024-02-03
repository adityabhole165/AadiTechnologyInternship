import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import {
  Checkbox,
  ClickAwayListener,
  Grid,
  Stack,
  useTheme
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import IFees, { GetFeeDetailsResult } from 'src/interfaces/Student/Fees';
import { RootState } from 'src/store';
import { ButtonPrimary } from '../styled/ButtonStyle';
import {
  BoxDetail,
  BoxDetail1,
  BoxDetail2,
  CardStyle1
} from '../styled/CardStyle';
import { NoteStyle } from '../styled/NoteStyle';

Card16.propTypes = {
  Fee: PropTypes?.array,
  Heading: PropTypes.object,
  Note: PropTypes.string,
  FeesTypes: PropTypes?.string
};

export interface Iprops {
  text: string;
  color: string;
  fontWeight: string;
  pointerEvents: string;
}

function Card16({ FeesList, Note, Heading, currentYear, IsForCurrentyear }) {
  const dispatch = useDispatch();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const GetFeeDetails: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
  );
  // const FeesList: any = useSelector((state: RootState) => state.Fees.FeesData);
  const LengthOfFeesList = FeesList?.length; // For splicing operation
  const [ArrayOfPaymentGroup, setArrayOfPaymentGroup] = useState([]); // Check value and Background Color
  const [ArrayOfFees, setArrayOfFees] = useState<any>([]); // Fees group
  const [open, setOpen] = useState(false);
  const [CheckBoxPaymentGroup, setCheckBoxPaymentGroup] = useState<any>(['1']); // First Payment Group
  const [change, setChange] = useState(true); // Unselect check box and change disability of checkboxes
  const [FeesTotal, setFeesTotal] = useState(0); // Sum of Fees
  const [newArrayOfFess, setnewArrayOfFess] = useState([]); // Associated Array
  const theme = useTheme();
  const [dueDateArrayObj, setDueDateArrayObj] = useState([]);
  const selectedDueDate = dueDateArrayObj.toString();
  const [feeId, setFeeId] = useState(0);
  const mystyle = {
    pointerEvents: `${FeesTotal > 0 ? 'auto' : 'none'}` as 'none', // For Payonline Pointer
    textDecoration: 'none' as 'none'
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleChange = (event, FeeId, ShowOptionButtonForAllEntry) => {
    let ArrayOfFees_To_Number;
    let valueOfCheckBox = event.target.value;
    let indexOfComma = valueOfCheckBox.indexOf(':');
    let newValue = valueOfCheckBox.slice(indexOfComma);
    let newValue2 = valueOfCheckBox.slice(0, indexOfComma);
    if (event.target.checked) {
      setFeeId(FeeId);
      if (ShowOptionButtonForAllEntry) {
        setArrayOfPaymentGroup([event.target.name]);
        setnewArrayOfFess([event.target.value]);
        setArrayOfFees([newValue2]);
        setDueDateArrayObj([event.target.id]);
        ArrayOfFees_To_Number = [Number(newValue2)];
      } else {
        ArrayOfPaymentGroup.push(event.target.name);
        newArrayOfFess.push(event.target.value);
        ArrayOfFees.push(newValue2); // Payment Group
        dueDateArrayObj.push(event.target.id);
        ArrayOfFees_To_Number = ArrayOfFees.map(Number); // String to Number
      }
      let NextPaymentGroup = parseInt(event.target.name) + 1; // Next payment group
      let NextPaymentGroup_ToString = NextPaymentGroup.toString(); // Type conversion as value != name
      setCheckBoxPaymentGroup([
        ...CheckBoxPaymentGroup,
        NextPaymentGroup_ToString
      ]);
      setChange(true); // For Useeffect call
    }
    if (!event.target.checked) {
      setFeeId(0);
      let indexOfArrayOfPaymentGroup = ArrayOfPaymentGroup.indexOf(
        event.target.name
      );
      let NewSplicedArrayOfPG = ArrayOfPaymentGroup.splice(
        indexOfArrayOfPaymentGroup,
        LengthOfFeesList
      );
      setArrayOfPaymentGroup([...ArrayOfPaymentGroup]);
      let indexOfUnChecked_Box = newArrayOfFess.indexOf(valueOfCheckBox);
      let SplicedArray = ArrayOfFees.splice(
        indexOfUnChecked_Box,
        LengthOfFeesList
      );

      ArrayOfFees_To_Number = ArrayOfFees.map(Number); // String to Number
      let indexOF_NextPaymentGroup =
        CheckBoxPaymentGroup.indexOf(event.target.name) + 1; // index of current payment group
      let removedPaymentGroup = CheckBoxPaymentGroup.splice(
        // Payment group not required
        indexOF_NextPaymentGroup
      );

      let indexOfDueDate = dueDateArrayObj.indexOf(event.target.id);
      let splicedArrayOfDueDate = dueDateArrayObj.splice(
        indexOfDueDate,
        LengthOfFeesList
      );
      setDueDateArrayObj([...dueDateArrayObj]);
      setCheckBoxPaymentGroup(CheckBoxPaymentGroup);
      setChange(false); // For Useeffect call
    }
    setFeesTotal(ArrayOfFees_To_Number.reduce((pre, cur) => pre + cur, 0)); // Sum of the Fees
  };

  // Body and Dispatch
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');

  const body: IFees = {
    asSchoolId: asSchoolId,
    asStudentId: asStudentId,
    aiAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
    abIsForCurrentYear: true
  };

  // useEffect(() => {
  //   dispatch(getFees(body));
  // }, [CheckBoxPaymentGroup, change, ArrayOfPaymentGroup]);
  const getURL = () => {
    let url = ``;
    if (
      Number(currentYear) === Number(sessionStorage.getItem('AcademicYearId'))
    ) {
      url =
        `/${location.pathname.split('/')[1]}/Student/PayOnline/` +
        selectedDueDate.replaceAll('/', '-') +
        `/` +
        feeId; //  + currentYear + IsForCurrentyear
    } else {
      url =
        `/${location.pathname.split('/')[1]}/Student/PayOnline/` +
        selectedDueDate.replaceAll('/', '-') +
        `/` +
        feeId +
        `/` +
        currentYear +
        `/` +
        IsForCurrentyear;
    }
    return url;
  };
  console.log('getURL-', getURL());
  return (
    <div>
      {GetFeeDetails.IsRTEstudent ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Tooltip
            PopperProps={{
              disablePortal: true
            }}
            onClose={handleClick}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={Note}
            arrow
            placement="left"
            componentsProps={{
              tooltip: {
                sx: {
                  marginLeft: '70px',
                  trFeesTotalform: 'trFeesTotallate3d(5px, 0px, 0px) !important'
                }
              }
            }}
          >
            <InfoTwoToneIcon
              type="button"
              onClick={handleClick}
              sx={{
                color: 'navy',
                mt: '-4rem',
                fontSize: 20,
                float: 'right',
                borderRadius: '50%'
              }}
            />
          </Tooltip>
        </ClickAwayListener>
      ) : null}

      <div style={{ marginTop: '10px', marginBottom: '20px' }}>
        <div
          style={{
            display: 'inline-block',
            marginTop: '10px',
            fontWeight: 'bold'
          }}
        >
          Total: {FeesTotal}
        </div>

        <RouterLink to={getURL()} style={mystyle}>
          {FeesList.AmountPayable != 0 ? (
            FeesTotal > 0 ? (
              <ButtonPrimary color="primary" sx={{ float: 'right' }}>
                Pay Online
              </ButtonPrimary>
            ) : (
              <ButtonPrimary color="warning" sx={{ float: 'right' }}>
                Pay Online
              </ButtonPrimary>
            )
          ) : null}
        </RouterLink>
      </div>

      {FeesList === undefined ? null : (
        <>
          {FeesList.map((item: GetFeeDetailsResult, i) => {
            // Checked Box Disability
            const disabledStateCheckBox =
              FeesList.filter(
                (item) =>
                  item.FeesPaid === '0' && parseInt(item.PaymentGroup) > 0
              ).length === 0
                ? false
                : !CheckBoxPaymentGroup.includes(item.PaymentGroup.toString());
            // Checked Value Boolean
            const FeesCheckBoxBoolean = ArrayOfPaymentGroup.includes(
              item.PaymentGroup.toString()
            );
            return item.AmountPayable == '0' ? null : (
              <CardStyle1
                key={i}
                sx={{
                  background: ArrayOfPaymentGroup.includes(
                    item.PaymentGroup.toString()
                  )
                    ? `${theme.colors.gradients.selectedlistColor}`
                    : `${theme.colors.gradients.pink1}`
                }}
              >
                <Grid container>
                  <Grid item xs={1}>
                    {(item.AmountPayable != '0' && item.RowNumber == '1') ||
                    FeesList[i].ShowOptionButtonForAllEntry ? (
                      <Checkbox
                        sx={{ ml: '-5px' }}
                        disabled={disabledStateCheckBox}
                        name={item.PaymentGroup}
                        value={
                          // Payable Fees
                          i < FeesList.length - 1 &&
                          FeesList[i].PaymentGroup ==
                            FeesList[i + 1].PaymentGroup
                            ? parseInt(FeesList[i].AmountPayable) +
                              parseInt(FeesList[i + 1].AmountPayable) +
                              ':' +
                              FeesList[i].PaymentGroup
                            : i < FeesList.length - 1 &&
                              FeesList[i].PaymentGroup !==
                                FeesList[i + 1].PaymentGroup
                            ? parseInt(FeesList[i].AmountPayable) +
                              parseInt(FeesList[i].LateFeeAmount) +
                              ':' +
                              FeesList[i].PaymentGroup
                            : i == FeesList.length - 1
                            ? parseInt(
                                FeesList[FeesList.length - 1].AmountPayable
                              ) +
                              (FeesList[i].ShowOptionButtonForAllEntry
                                ? parseInt(FeesList[i].LateFeeAmount)
                                : 0) +
                              ':' +
                              FeesList[FeesList.length - 1].PaymentGroup
                            : null
                        }
                        checked={FeesCheckBoxBoolean}
                        className="check serial"
                        size="small"
                        id={item.DueDateString}
                        onChange={(event) => {
                          handleChange(
                            event,
                            FeesList[i].ShowOptionButtonForAllEntry
                              ? FeesList[i].StudentFeeId
                              : 0,
                            FeesList[i].ShowOptionButtonForAllEntry
                          );
                        }}
                      />
                    ) : null}
                  </Grid>
                  <BoxDetail>
                    <BoxDetail2>
                      {item.FeeType} ({item.PayableFor})
                    </BoxDetail2>

                    <Grid item xs={1} />

                    <BoxDetail1>
                      {Heading.Fee2}
                      <b>{item.AmountPayable}</b>
                      {item.LateFeeAmount != '0' ? (
                        <b>+{item.LateFeeAmount}</b>
                      ) : null}
                    </BoxDetail1>

                    <Grid item xs={1} />

                    <BoxDetail1>Due On : {item.DueDateFormat}</BoxDetail1>
                  </BoxDetail>
                </Grid>
              </CardStyle1>
            );
          })}
        </>
      )}

      <>
        <Stack direction="row" spacing={2}>
          {GetFeeDetails.AllowCautionMoneyOnlinePayment ? (
            <>
              {!GetFeeDetails.IsCautionMoneyPaid ? (
                <RouterLink
                  to={`/${
                    location.pathname.split('/')[1]
                  }/Student/Fees_cautionmoney`}
                  style={{ textDecoration: 'none' }}
                >
                  <ButtonPrimary color="secondary">
                    Pay Caution Money
                  </ButtonPrimary>
                </RouterLink>
              ) : GetFeeDetails.IsCautionMoneyPaid &&
                GetFeeDetails.TPSLTransactionID != '' ? (
                <NoteStyle>
                  Please collect caution money receipt from school account
                  department. Transaction No. :{' '}
                  {GetFeeDetails.TPSLTransactionID}
                </NoteStyle>
              ) : null}
            </>
          ) : null}

          <RouterLink
            to={`/${location.pathname.split('/')[1]}/Student/PayOnline`}
            style={{ textDecoration: 'none' }}
          >
            {/* {FeesList.AmountPayable != 0 ? (
              <ButtonPrimary color="secondary">Pay Internal Fees</ButtonPrimary>
            ) : null} */}
          </RouterLink>
        </Stack>
      </>
    </div>
  );
}

export default Card16;
