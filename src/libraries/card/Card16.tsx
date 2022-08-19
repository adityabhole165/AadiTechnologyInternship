import { useEffect, useState } from 'react';
import { useTheme, Grid, Checkbox, Stack, List, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { ClickAwayListener } from '@mui/material';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetFeeDetailsResult } from 'src/interfaces/Student/Fees';
import { Link as RouterLink } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import { getFees } from 'src/requests/Student/Fees';
import IFees from 'src/interfaces/Student/Fees';

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

function Card16({ Note, Heading }) {
  const GetFeeDetails: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
  );
  const FeesList: any = useSelector((state: RootState) => state.Fees.FeesData);
  const LengthOfFeesList = FeesList.length; // For splicing operation

  const dispatch = useDispatch();
  const [ArrayOfPaymentGroup, setArrayOfPaymentGroup] = useState([]); // Check value and Background Color
  const [ArrayOfFees, setArrayOfFees] = useState<any>([]); // Fees group
  const [open, setOpen] = useState(false);
  const [CheckBoxPaymentGroup, setCheckBoxPaymentGroup] = useState<any>(['1']); // First Payment Group
  const [change, setChange] = useState(true); // Unselect check box and change disability of checkboxes
  const [FeesTotal, setFeesTotal] = useState(0); // Sum of Fees
  const classes = Styles();
  const theme = useTheme();

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
  const [sum,setsum] = useState(0);
  const handleChange = (event) => {
    let ArrayOfFees_To_Number;
    if (event.target.checked) {
      ArrayOfPaymentGroup.push(event.target.name);
      ArrayOfFees.push(event.target.value); // Payment Group
      ArrayOfFees_To_Number = ArrayOfFees.map(Number); // String to Number
      let NextPaymentGroup = parseInt(event.target.name) + 1; // Next payment group
      let NextPaymentGroup_ToString = NextPaymentGroup.toString(); // Type conversion as value != name
      setCheckBoxPaymentGroup([
        ...CheckBoxPaymentGroup,
        NextPaymentGroup_ToString
      ]);
      setChange(true); // For Useeffect call
      setsum (sum + parseInt(event.target.value));

    }
    if (!event.target.checked) {
      let indexOfArrayOfPaymentGroup = ArrayOfPaymentGroup.indexOf(
        event.target.name
      );
      let NewSplicedArrayOfPG = ArrayOfPaymentGroup.splice(
        indexOfArrayOfPaymentGroup,
        LengthOfFeesList
      );
      setArrayOfPaymentGroup([...ArrayOfPaymentGroup]);
      let indexOfUnChecked_Box = ArrayOfFees.lastIndexOf(event.target.value);
      let SplicedArray = ArrayOfFees.splice(
        indexOfUnChecked_Box,
        // 2
        // ,
        LengthOfFeesList
      );
      ArrayOfFees_To_Number = ArrayOfFees.map(Number); // String to Number
      let indexOF_NextPaymentGroup =
        CheckBoxPaymentGroup.indexOf(event.target.name) + 1; // index of current payment group
      let removedPaymentGroup = CheckBoxPaymentGroup.splice(
        // Payment group not required
        indexOF_NextPaymentGroup
      );
      setCheckBoxPaymentGroup(CheckBoxPaymentGroup);
      setChange(false); // For Useeffect call
      setsum (sum - parseInt(event.target.value));

    }

    setFeesTotal(ArrayOfFees_To_Number.reduce((pre, cur) => pre + cur, 0)); // Sum of the Fees
  };

  // Body and Dispatch
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');

  const body: IFees = {
    asSchoolId: asSchoolId,
    asStudentId: asStudentId    //"11554"
  };

  useEffect(() => {
    dispatch(getFees(body));
  }, [CheckBoxPaymentGroup, change, ArrayOfPaymentGroup]);

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

      <Button color='error' variant="contained" sx={{ mb: 2 ,borderRadius:'5px'}}>
        Total: {FeesTotal}
      </Button>

      <RouterLink
        to={`/${location.pathname.split('/')[1]}/Student/PayOnline`}
        style={mystyle}
      >
        {FeesList.AmountPayable != 0 ? (
          <Button
            disabled={FeesTotal > 0 ? false : true}
            sx={{ float: 'right', borderRadius: '5px' }}
            variant="contained"
          >
            Pay Online
          </Button>
        ) : null}
      </RouterLink>

      {FeesList === undefined ? null : (
        <>
          {FeesList.map((item: GetFeeDetailsResult, i) => {
            // Checked Box Disability
            const disabledStateCheckBox = !CheckBoxPaymentGroup.includes(
              item.PaymentGroup.toString()
            );
            // Checked Value Boolean
            const FeesCheckBoxBoolean = ArrayOfPaymentGroup.includes(
              item.PaymentGroup.toString()
            );

            return item.AmountPayable == '0' ? null : (
              <List
                key={i}
                className={classes.ListStyle}
                sx={{
                  background: ArrayOfPaymentGroup.includes(
                    item.PaymentGroup.toString()
                  )
                    ? 'coral'
                    : `${theme.colors.gradients.pink1}`,
                  mb: 1
                }}
              >
                <Box>
                  <Grid container>
                    <Grid item xs={2} md={1} sx={{ mx: 'auto' }}>
                      {item.AmountPayable != '0' && item.RowNumber == '1' ? (
                        <Checkbox
                          disabled={disabledStateCheckBox}
                          name={item.PaymentGroup}
                          value={
                            // Payable Fees
                            i < FeesList.length - 1 &&
                            FeesList[i].PaymentGroup ==
                              FeesList[i + 1].PaymentGroup

                              ? parseInt(FeesList[i].AmountPayable) +
                                parseInt(FeesList[i + 1].AmountPayable)

                              : i < FeesList.length - 1 &&
                                FeesList[i].PaymentGroup !==
                                  FeesList[i + 1].PaymentGroup

                              ? 
                              parseInt(FeesList[i].AmountPayable)

                              : 
                              i == FeesList.length - 1 
                              &&
                                FeesList[i].PaymentGroup !==
                                  FeesList[FeesList.length - 1].PaymentGroup
                              ? 
                              null
                              : 
                              parseInt(
                                  FeesList[FeesList.length - 1].AmountPayable
                                )
                          }
                          checked={FeesCheckBoxBoolean}
                          className="check serial"
                          size="small"
                          id={item.PaymentGroup}
                          onChange={(event) => {
                            handleChange(event);
                          }}
                        />
                      ) : null}
                    </Grid>

                    <Grid item xs={10}>
                      <Grid container xs={12}>
                        <Grid xs={8}>
                          <Typography
                            variant="h4"
                            sx={{
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden'
                            }}
                          >
                            {item.FeeType}
                          </Typography>
                        </Grid>
                        <Grid xs={2}></Grid>
                      </Grid>
                      <Grid container xs={12}>
                        <Grid xs={10}>
                          <Typography
                            sx={{
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden'
                            }}
                          >
                            {Heading.Fee2} <strong>{item.Amount}</strong>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container xs={12}>
                        <Grid xs={10}>Due On :{item.DueDateFormat}</Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </List>
            );
          })}
        </>
      )}

      <>
        <Stack direction="row" spacing={2}>
          {GetFeeDetails.AllowCautionMoneyOnlinePayment === true ? (
            <RouterLink
              to={`/${
                location.pathname.split('/')[1]
              }/Student/Fees_cautionmoney`}
            >
              <Button variant="contained" sx={{ pl: '10px', pr: '5px',textDecoration:'none', borderRadius: '5px' }}>
                Pay Caution Money
              </Button>
            </RouterLink>
          ) : (
            <Button variant="contained"> Caution Money Receipt </Button>
          )}

          <RouterLink
            to={`/${location.pathname.split('/')[1]}/Student/PayOnline`}
          >
            {FeesList.AmountPayable != 0 ? (
              <Button
                variant="contained"
                sx={{borderRadius: '5px'}}
              >
                Pay Internal Fees
              </Button>
            ) : null}
          </RouterLink>
        </Stack>
      </>
    </div>
  );
}

export default Card16;
