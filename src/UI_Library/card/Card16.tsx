import React, { useEffect, useState } from 'react';
import { useTheme, Grid, Checkbox, Stack, List, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import Tooltip from '@mui/material/Tooltip';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { ClickAwayListener } from '@mui/material';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import { GetFeeDetailsResult } from 'src/Interface/Student/Fees';
import { Link as RouterLink } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';

Card16.propTypes = {
  Fee: PropTypes.array,
  Heading: PropTypes.object,
  Note: PropTypes.string
};

export interface Iprops {
  text: string;
  color: string;
  fontWeight: string;
  pointerEvents: string;
}

function Card16({ Note, Fee, Heading }) {

  let arr = [];

  // const ArrayOFPayGroup = Fee.map((item,i) => {
  //     // return item.PaymentGroup

  //     if((i < item.length-1) &&  item[i].PaymentGroup == item[i + 1].PaymentGroup){
  //       var sameAmount = item[i].AmountPayable + item[i + 1].AmountPayable
  //       arr.push(sameAmount);
  //     }
  //     else{
  //       arr.push(item.AmountPayable);
  //     }
  //     // return(arr);
  // })


  const GetFeeDetails: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
  );


  const classes = Styles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [pointerEvents, setpointerEvents] = useState<string>('none');
  const [date, setDate] = useState<any>([]);
  const [disable, setDisable] = useState(false);
  const [selected, setSelected] = useState<any>([]);
  const [Data1, setData1] = useState<any>([]);
  const [countFees, setCount] = useState<any>([]);

  // console.log(Data1);

  const mystyle = {
    pointerEvents: pointerEvents as 'none',
    textDecoration: 'none' as 'none'
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    if (event.target.checked) {
      setDisable(false);
      setpointerEvents('auto');
      setDate([...date, event.target._wrapperState.initialValue]);
      setSelected([...selected, event.target.value]);
      const selectedId = event.target.id;

      {
        Fee.filter((item) => {
          if ([selectedId].find((val) => val.includes(item.PaymentGroup))) {
            Data1.push(parseInt(item.Amount));
          }
        });
      }

      let data = Data1.reduce((pre, curr) => pre + curr, 0);
      setCount(data);
    }

    if (!event.target.checked) {
      setDisable(true);
      setpointerEvents('none');
      const updatedList = selected.filter((item) => item != event.target.value);
      setSelected(updatedList);
      const updatedData = date.filter(
        (item) => item != event.target._wrapperState.initialValue
      );
      setDate(updatedData);

      const selectedId = event.target.id;
      {
        Fee.filter((item) => {
          if ([selectedId].find((val) => val.includes(item.PaymentGroup))) {
            Data1.pop(parseInt(item.Amount));
            let count = Data1.reduce((pre, curr) => pre + curr, 0);
            console.log('deduct', count);
            setCount(count);
          }
        });
      }
    }
  };

  const getSelected = () => {
    if (selected.length > 1 || selected.length > 0) {
      setDisable(false);
    } else if (selected.length === 0) {
      setDisable(true);
    }
  };

  useEffect(() => {
    getSelected();
  }, [handleChange]);

  const Receipt = () => {
    saveAs(
      'http://riteschool_old.aaditechnology.com' +
        '\\RITeSchool\\OtherDownloads\\ReceiptDownloads\\Receipt_84202216516894.pdf'
    );
  };

  return (
    <div>
      <Container>
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
          Total: {countFees}
        </Button>

        {Fee === undefined ? null : (
          <>
            {Fee.map((item: GetFeeDetailsResult, i) => {

              return (
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
                            value={item.DueDateFormat}
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
              <Button variant="contained"> Pay Caution Money Online</Button>
            ) : null}
          </Stack>
        </>
      </Container>
    </div>
  );
}

export default Card16;
