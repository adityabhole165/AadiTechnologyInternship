import { useEffect, useState } from 'react';
import { useTheme, Grid, Checkbox, Stack, List, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
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
  Fee: PropTypes.array,
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

function Card16({ Note, Fee, Heading, FeesTypes }) {
  
  const GetFeeDetails: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
  );

  let SumOfFees;
  let ArrayOfFees = [];
  let SelectedCheckBoxes = [];

  const classes = Styles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [pointerEvents, setpointerEvents] = useState<string>('none');
  const [date, setDate] = useState<any>([]);
  const [disable, setDisable] = useState(false);
  const [countFees, setCount] = useState<any>([]);
  let CheckBoxPaymentGroup = ["1"];

  const [disabledState,setdisabledState] = useState(false)

  const mystyle = {
    textDecoration: 'none' as 'none'
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  // const handleChange = (event) => {
  //   let ArrayOfFees_To_NumberArray;
  //   if (event.target.checked) {
  //     ArrayOfFees.push(event.target.value);
  //     ArrayOfFees_To_NumberArray = ArrayOfFees.map(Number);
  //     SumOfFees = ArrayOfFees_To_NumberArray.reduce(
  //       (pre, curr) => pre + curr,0
  //     );
  //     SelectedCheckBoxes.push(event.target.name);
  //     CheckBoxPaymentGroup.push("2")
  //   }
  //   if (!event.target.checked) {
  //     let indexOfUnCheck_Box = ArrayOfFees.indexOf(event.target.value);
  //     let newArray = ArrayOfFees.splice(indexOfUnCheck_Box, 1);
  //     ArrayOfFees_To_NumberArray = ArrayOfFees.map(Number);

  //     let indexOfUnCheck_Box_Name = SelectedCheckBoxes.indexOf(
  //       event.target.name
  //     );
  //     let newArrayName = SelectedCheckBoxes.splice(indexOfUnCheck_Box_Name, 1);

  //   }
  //   console.log(SumOfFees)
  // };

  const [data,setdata] = useState(0);
  const handleChange = (event) => {
    let ArrayOfFees_To_NumberArray;
    if (event.target.checked) {
      ArrayOfFees.push(event.target.value);
      console.log(ArrayOfFees);
      ArrayOfFees_To_NumberArray = ArrayOfFees.map(Number);
    }
    if (!event.target.checked) {
      let indexOfUnCheck_Box = ArrayOfFees.indexOf(event.target.value);
      let newArray = ArrayOfFees.splice(indexOfUnCheck_Box, 1);
      ArrayOfFees_To_NumberArray = ArrayOfFees.map(Number);
    }
    setdata(ArrayOfFees_To_NumberArray.reduce((pre, curr) => pre + curr, 0));
  }
  console.log(data)


  const Receipt = () => {
    saveAs(
      'http://riteschool_old.aaditechnology.com' +
        '\\RITeSchool\\OtherDownloads\\ReceiptDownloads\\Receipt_84202216516894.pdf'
    );
  };

  const dispatch = useDispatch();
  
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');

  const body: IFees = {
    asSchoolId: asSchoolId,
    asStudentId: asStudentId
  };

  useEffect(() => {
    dispatch(getFees(body));
  }, [disabledState]);


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
                  transform: 'translate3d(5px, 0px, 0px) !important'
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

      <Button variant="contained" sx={{ mb: 2 }}>
        Total: {data}
      </Button>

      {Fee === undefined ? null : (
        <>
          {Fee.map((item: GetFeeDetailsResult, i) => {

          // setdisabledState(CheckBoxPaymentGroup.includes(item.PaymentGroup))
          // disabledState = disabledCheckBox.includes(item.PaymentGroup);

            return item.AmountPayable == '0' ? null : (
              <List
                key={i}
                className={classes.ListStyle}
                sx={{
                  background: date.find((value) =>
                    value.includes(item.DueDateFormat)
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
                          disabled= 
                          {disabledState}
                          // { (disabledCheckBox[i] == item.PaymentGroup ) ? false : true }
                          name={item.PaymentGroup}
                          value={
                            i < Fee.length - 1 &&
                            Fee[i].PaymentGroup == Fee[i + 1].PaymentGroup
                              ? parseInt(Fee[i].AmountPayable) +
                                parseInt(Fee[i + 1].AmountPayable)
                              : i < Fee.length - 1 &&
                                Fee[i].PaymentGroup !== Fee[i + 1].PaymentGroup
                              ? parseInt(Fee[i].AmountPayable)
                              : i == Fee.length - 1 &&
                                Fee[i].PaymentGroup !==
                                  Fee[Fee.length - 1].PaymentGroup
                              ? null
                              : parseInt(Fee[Fee.length - 1].AmountPayable)
                          }
                          className="check"
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
          <RouterLink
            to={`/${location.pathname.split('/')[1]}/Student/PayOnline`}
            style={mystyle}
          >
            {Fee.AmountPayable != 0 ? (
              <Button disabled={disable} variant="contained">
                Pay Online
              </Button>
            ) : null}
          </RouterLink>

          {GetFeeDetails.AllowCautionMoneyOnlinePayment === true ? (
            <Button variant="contained"> Pay Caution Money </Button>
          ) : (
            <Button variant="contained"> Caution Money Receipt </Button>
          )}
          
        </Stack>
      </>
    </div>
  );
}

export default Card16;
