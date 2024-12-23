import { Browser } from '@capacitor/browser';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import {
  Box,
  ClickAwayListener,
  Grid,
  Link,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import { IGetSettingValueBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import IFees, {
  GetAllAcademicYearsApiBody,
  IIsPendingFeesForStudentBody,
  IPayOnline
} from 'src/interfaces/Student/Fees';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';
import Note from 'src/libraries/Note/Note';
import SpecialNote from 'src/libraries/Note/SpecialNote';
import Card27 from 'src/libraries/card/Card27';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  CardDetail1,
  CardDetail7,
  ListStyle,
  Wordbreak
} from 'src/libraries/styled/CardStyle';
import {
  DotLegend1,
  DotLegendStyled1
} from 'src/libraries/styled/DotLegendStyled';
import { NoteStyle } from 'src/libraries/styled/NoteStyle';
import {
  getFeeStructureLink,
  getFees,
  getInternalFeeDetails,
  getInternalYearList,
  getIsPendingFeesForStudent,
  getNextYearDetails,
  getNextYearFeeDetails,
  getOldstudentDetails,
  getYearList,
  payOnline,
  resetPaymentUrl
} from 'src/requests/Fees/Fees';
import {
  EnableAdvancefeePayment,
  GetEnableOnlinePaymentForInternalFee,
  ShowFeeStructureOfNextYear,
  getEnableOnlinePaymentForLastYearfee,
  getEnableadvanceFeepayment,
  getEnabledOnlineFeePayment,
  getOnlinePaymentForCautionMoney,
  getRestrictNewPaymentIfOldPaymentIsPending,
  getallowNextYearInternalFeePaymentForStudent
} from 'src/requests/SchoolSetting/schoolSetting';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';
import PayCautionMoney from './PayCautionMoney';

const note = [
  '1) Caution Money paid by Cheque on date 14 Dec 2017. Cheque Details (Date: 14 Dec 2017, Number: 0099998, Bank Name: ICICI BANK), Receipt No. : 30057.'
];
const NoMoneyDeducted =
  'If amount is deducted from your bank account and not reflected on fee screen then please wait for 1 hour and then if required send transaction details to Software Coordinator with Message Center facility.';
function Fees() {
  const theme = useTheme();
  const classes = Styles();
  let {
    ActiveYear,
    InternalOrSchool
  } = useParams();

  // Decode in-place
  ActiveYear = decodeURL(ActiveYear);
  InternalOrSchool = decodeURL(InternalOrSchool);

  const schoolFees = 'SchoolFees';
  const internalFees = 'internalFees';
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const [currentYear, setCurrentyear] = useState(
    ActiveYear === undefined ? asAcademicYearId : ActiveYear
  );
  const [showCaution, setShowCaution] = useState(
    InternalOrSchool === undefined ? schoolFees : InternalOrSchool
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
  const UserId = sessionStorage.getItem('Id');

  const [YearType, setYearType] = useState('C');
  const [ispaidCautionMoney, setIspaidCautionMoney] = useState('false');
  const [IsCautionClick, setIsCautionClick] = useState(false);
  const [newAcadamicYear, setNewAcadamicYear] = useState([]);
  const [originalAcadamicYear, setOriginalAcadamicYear] = useState([]);
  const [payNote, setPayNote] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedYear, setselectedYear] = useState(null);

  const FeesList = useSelector((state: RootState) => state.Fees.FeesData);
  const Loading = useSelector((state: RootState) => state.Fees.Loading);
  const FeesList2: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
  );
  const PendingFeesForStudent = useSelector(
    (state: RootState) => state.Fees.IsPendingFeesForStudent
  );

  const AcadamicYear: any = useSelector(
    (state: RootState) => state.Fees.YearList
  );

  const FeesDetailsOfOldAcademic: any = useSelector(
    (state: RootState) => state.Fees.GetFeesDetailsOfOldAcademic
  );
  const InternalFeeDetails: any = useSelector(
    (state: RootState) => state.Fees.InternalFeeDetails
  );
  const OnlinePaymentForInternalFee: any = useSelector(
    (state: RootState) =>
      state.getSchoolSettings.EnableOnlinePaymentForInternalFee
  );
  const paymentPageLink: any = useSelector(
    (state: RootState) => state.Fees.paymentUrl
  );
  const NextYearDetails: any = useSelector(
    (state: RootState) => state.Fees.GetNextYearDetails
  );
  const OldstudentDetails: any = useSelector(
    (state: RootState) => state.Fees.GetOldStudentDetails
  );
  const GetNextYearFeeDetails: any = useSelector(
    (state: RootState) => state.Fees.GetNextYearFeeDetails
  );
  const IsOnlinePaymetCautionMoney: any = useSelector(
    (state: RootState) => state.getSchoolSettings.OnlinePaymentForCautionMoney
  );
  const AllowAdvancePaymentforStudent: any = useSelector(
    (state: RootState) =>
      state.getSchoolSettings.EnableAdvanceFeePaymentForStudent
  );
  const AllowAdvancePayment: any = useSelector(
    (state: RootState) =>
      state.getSchoolSettings.EnableAdvanceFeePaymentForStudent
  );
  const AllowNextYearInternal: any = useSelector(
    (state: RootState) =>
      state.getSchoolSettings.AllowNextYearInternalFeePaymentForStudent
  );
  const ShowFeeStructureOfNextYr: any = useSelector(
    (state: RootState) => state.getSchoolSettings.ShowFeeStructureOfNextYear
  );
  const FeeStructureLink = useSelector(
    (state: RootState) => state.Fees.FeeStructureLinks
  );
  const InternalFeeReceipt: any = useSelector(
    (state: RootState) => state.Fees.InternalFeeReceipt
  );
  const CautionMoneyReceipt: any = useSelector(
    (state: RootState) => state.Fees.CautionMoneyReceipt
  );
  const RestrictNewPayment: any = useSelector(
    (state: RootState) =>
      state.getSchoolSettings.RestrictNewPaymentIfOldPaymentIsPending
  );

  let OldInternalstudent =
    OldstudentDetails == null ? 0 : OldstudentDetails.StudentId;
  let NextYrId =
    NextYearDetails == null ? 0 : NextYearDetails.NextAcademicYearId;
  let NextYrSchoolId =
    NextYearDetails == null ? 0 : NextYearDetails.SchoolwiseStudentId;
  const NeXtStandardId =
    NextYearDetails == null ? 0 : NextYearDetails.NextStandardId;
  const IsForCurrentyear = currentYear == asAcademicYearId ? true : false;
  const ApplicableFee =
    showCaution == 'SchoolFees'
      ? FeesList2.TotalFee
      : FeesList2.TotalFee + FeesList2.TotalFeesPaid;
  const IsOldAcademicYearPayment = IsForCurrentyear ? '0' : '1';
  const ConsessionNote = FeesList2.ConcessionRule;

  const Feedata = {
    Fee1: 'Fee Type',
    Fee2: 'Amount + Late Fees : ',
    Fee3: 'Receipt'
  };
  const FeeAmount = {
    Sum1: 'Paid Fees',
    Sum2: 'Payable Fees',
    Sum3: 'Late Fee',
    Sum4: 'Applicable Fees'
  };
  const note1 = ['1) *RTE student (100% concession on school fees)'];
  const Note2: string = '*RITE student (100%  Concession on school fees)';

  const body1: GetAllAcademicYearsApiBody = {
    aiSchoolId: asSchoolId,
    aiYearwiseStudentId: asStudentId
  };
  const InternalYrList: GetAllAcademicYearsApiBody = {
    aiSchoolId: asSchoolId,
    aiYearwiseStudentId: asStudentId
  };
  const body: IFees = {
    asSchoolId: asSchoolId,
    asStudentId: asStudentId,
    aiAcademicYearId: Number(currentYear),
    abIsForCurrentYear: IsForCurrentyear
  };

  const IGetFeeDetailsOfOldAcademicBody = {
    asSchoolId: asSchoolId,
    asStudentId: asStudentId,
    aiAcademicYearId: Number(asAcademicYearId),
    abIsForCurrentYear: true
  };
  const IGetInternalFeeDetailsBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: currentYear,
    aiStudentId: asStudentId,
    abIsNextYearFeePayment: Number(currentYear) == NextYrId ? true : false
  };

  const IGetNextYearDetailsBody = {
    aiSchoolId: asSchoolId,
    aiStudentId: asStudentId
  };
  const IOldStudentDetails = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: currentYear,
    aiStudentId: asStudentId
  };

  const IFeeStructure = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: currentYear,
    aiUserId: UserId,
    abShowFeeStructureForNextYear: ShowFeeStructureOfNextYr
  };

  const IGetNextYearFeeDetailsBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId:
      NextYearDetails == null ? 0 : NextYearDetails.NextAcademicYearId,
    aiSchoolwiseStudentId:
      NextYearDetails == null ? 0 : NextYearDetails.SchoolwiseStudentId,
    aiStandardId: NeXtStandardId
  };
  const GetSettingValueBody: IGetSettingValueBody = {
    asSchoolId: parseInt(asSchoolId),
    aiAcademicYearId: parseInt(asAcademicYearId),
    asKey: ''
  };
  const IsPendingFeesBody: IIsPendingFeesForStudentBody = {
    asStudentId: asStudentId,
    asAcademicYearId: currentYear,
    asSchoolId: asSchoolId
  };
  // useEffect(() => {
  //   if (FeesList2.PaymentNotes !== undefined) {
  //     let arrNote = FeesList2.PaymentNotes;
  //     let arrNote2 = {
  //       Note: 'If amount is deducted from your bank account and not reflected on fee screen then please wait for 1 hour and then if required send transaction details to Software Coordinator with Message Center facility.',
  //       SrNo: '3',
  //       Title:'Amount not deducted from bank account'
  //     }
  //     setPayNote([...arrNote, arrNote2])
  //   }
  // }, [FeesList2])

  useEffect(() => {
    if (showCaution === 'internalFees') {
      dispatch(getInternalYearList(InternalYrList));
    } else dispatch(getYearList(body1));
  }, [showCaution, currentYear]);

  useEffect(() => {
    let arr = AcadamicYear;
    if (
      (AllowAdvancePaymentforStudent &&
        AllowAdvancePayment &&
        showCaution == 'SchoolFees') ||
      (AllowNextYearInternal && showCaution == 'internalFees')
    ) {
      if (AcadamicYear.length > 0 && NextYearDetails !== undefined) {
        let arr2 = {
          id: NextYearDetails == null ? 0 : NextYearDetails.NextAcademicYearId,
          Name: 'Advance Academic Year',
          Value:
            NextYearDetails == null ? 0 : NextYearDetails.NextAcademicYearId,
          YearType: ''
        };
        // setNewAcadamicYear([arr2, ...arr])
        setOriginalAcadamicYear([arr2, ...arr]);
      }
    } else {
      if (AcadamicYear.length > 0) {
        // setNewAcadamicYear(arr)
        setOriginalAcadamicYear(arr);
      }
    }
  }, [
    AcadamicYear,
    NextYearDetails,
    AllowAdvancePaymentforStudent,
    AllowAdvancePayment,
    showCaution,
    AllowNextYearInternal
  ]);
  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);

    // dispatch(getYearList(body1));
    dispatch(ShowFeeStructureOfNextYear(GetSettingValueBody));
    dispatch(getOnlinePaymentForCautionMoney(GetSettingValueBody));
    dispatch(getNextYearDetails(IGetNextYearDetailsBody));
    dispatch(getEnableadvanceFeepayment(GetSettingValueBody));
    dispatch(EnableAdvancefeePayment(GetSettingValueBody));
    dispatch(GetEnableOnlinePaymentForInternalFee(GetSettingValueBody));
    dispatch(getallowNextYearInternalFeePaymentForStudent(GetSettingValueBody));
    dispatch(getRestrictNewPaymentIfOldPaymentIsPending(GetSettingValueBody));
    dispatch(getEnableOnlinePaymentForLastYearfee(GetSettingValueBody));
    dispatch(getEnabledOnlineFeePayment(GetSettingValueBody));
    dispatch(getIsPendingFeesForStudent(IsPendingFeesBody));

    if (InternalOrSchool !== undefined && ActiveYear !== undefined) {
      setShowCaution(InternalOrSchool);
      setCurrentyear(ActiveYear);
    }
  }, []);

  useEffect(() => {
    if (ActiveYear == undefined) {
      if (showCaution == 'SchoolFees' || showCaution == 'internalFees') {
        setCurrentyear(asAcademicYearId);
      }
    }
  }, [showCaution]);
  useEffect(() => {
    dispatch(getOldstudentDetails(IOldStudentDetails));
  }, [currentYear]);
  useEffect(() => {
    dispatch(getFeeStructureLink(IFeeStructure));
  }, [ShowFeeStructureOfNextYr]);

  useEffect(() => {
    if (showCaution == internalFees) {
      dispatch(getInternalFeeDetails(IGetInternalFeeDetailsBody));
    } else if (
      currentYear ==
      (NextYearDetails == null ? 0 : NextYearDetails.NextAcademicYearId)
    ) {
      dispatch(getNextYearFeeDetails(IGetNextYearFeeDetailsBody));
    } else dispatch(getFees(body));
  }, [showCaution, currentYear]);

  useEffect(() => {
    if (paymentPageLink !== '') {
      const openCapacitorSite = async (url) => {
        await Browser.open({ url: url });
      };
      openCapacitorSite(paymentPageLink);
      navigate(
        '/RITeSchool/Student/PayOnline/' + currentYear + '/' + showCaution
      );
      dispatch(resetPaymentUrl());
    }
  }, [paymentPageLink]);

  const clickCaution = (value) => {
    const userLoginId = sessionStorage.getItem('Userlogin');
    let returnString =
      'StudentId=' +
      asStudentId +
      '&DueDates=' +
      '&Remarks=&SchoolwiseStudentFeeId=0' +
      '&IsOnlineCautionMoneyPayment=1';

    const body: IPayOnline = {
      asSchoolId: localStorage.getItem('localSchoolId'),
      asUserLogin: userLoginId,
      asQueryString: returnString,
      asSchoolSiteUrl:
        localStorage.getItem('SiteURL') + '/RITeSchool/SingleSignOnPage.aspx?',
      asRedirectPageUrl:
        localStorage.getItem('SiteURL') +
        '/RITeSchool/Accountant/PayFeeOnline.aspx?'
    };
    dispatch(payOnline(body));
  };
  const clickPayOnline = (value) => {
    dispatch(payOnline(value));
  };
  const clickYear = (value) => {
    AcadamicYear.map((item) => {
      if (item === value) {
        setYearType(item.YearType);
      }
    });
    setCurrentyear(value);
    AcadamicYear.map((obj) => {
      if (obj.Value === value) {
        setselectedYear(obj.Name);
      }
    });
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newShowCaution: string
  ) => {
    if (newShowCaution != null) setShowCaution(newShowCaution);
  };

  // let ConcessionAmount = 0;
  // FeesList.map((item, i) => { ConcessionAmount = item.ConcessionAmount })
  let IsOldPendingFee = '';

  let arr: string[] = [];
  const [showOldPendingMsg, setshowOldPendingMsg] = useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const getIsInclude = (item, arr) => {
    let returnVal = false;
    let item1 = '',
      item2 = '';
    if (
      !item.Name.includes('Advance') &&
      item.Value !== sessionStorage.getItem('AcademicYearId')
    ) {
      arr.map((obj) => {
        item1 = obj.split('-')[1];
        item2 = item.Name.split(' ')[4];
        if (item1 === item2) returnVal = true;
      });
    }
    return returnVal;
  };
  useEffect(() => {
    if (
      FeesList2.PendingFeeAcademicYears !== undefined &&
      currentYear == sessionStorage.getItem('AcademicYearId')
    ) {
      arr = FeesList2.PendingFeeAcademicYears.split(',').map((item: string) =>
        item.trim()
      );
      // setshowOldPendingMsg(arr.length > 0)
      let arr1 = newAcadamicYear;
      let arr2 = originalAcadamicYear.map((item) => {
        let IsInclude = getIsInclude(item, arr);
        return { ...item, Name: item.Name + (IsInclude ? ' (Pending)' : '') };
      });
      setNewAcadamicYear(arr2);
    }
  }, [FeesList2]);
  useEffect(() => {
    if (PendingFeesForStudent !== null) {
      if (PendingFeesForStudent.Message !== '') {
        setshowOldPendingMsg(true);
      }
    }
  }, [PendingFeesForStudent]);

  const curr =
    FeeStructureLink !== null && FeeStructureLink.CurrentYearFeeStructure;
  const nxt = FeeStructureLink !== null && FeeStructureLink.MidYearFeeStructure;

  const CurrentDownload = () => {
    const pdfUrl = localStorage.getItem('SiteURL') + curr;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.click();
  };
  const NextDownload = () => {
    const pdfUrl = nxt;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.click();
  };

  const ClickNavigateChallan = () => {
    navigate('ChallanSNSForFees');
  };

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Fee Details'} subheading={''} />
      {curr && (
        <span
          onClick={CurrentDownload}
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: 'brown'
          }}
        >
          Current Year Fee Structure
        </span>
      )}{' '}
      &nbsp;&nbsp;
      {ShowFeeStructureOfNextYr && (
        <span
          onClick={NextDownload}
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: 'brown'
          }}
        >
          Next Year Fee Structure
        </span>
      )}
      <br />
      <ToggleButtonGroup
        value={showCaution}
        exclusive
        onChange={handleChange}
        sx={{ my: 1 }}
      >
        <ToggleButton value={schoolFees}>School Fees</ToggleButton>
        {OnlinePaymentForInternalFee && (
          <ToggleButton value={internalFees}>Internal Fees</ToggleButton>
        )}
      </ToggleButtonGroup>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Tooltip
          PopperProps={{
            disablePortal: true
          }}
          onClose={handleClickAway}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          arrow
          open={open}
          title={NoMoneyDeducted}
          placement="left"
          componentsProps={{
            tooltip: {
              sx: {
                marginLeft: '1px',
                mt: 0.5,
                transform: 'translate3d(17px, 0.5px, 0px) !important'
              }
            }
          }}
        >
          <InfoTwoToneIcon
            type="button"
            onClick={handleClick}
            sx={{ color: 'navy', fontSize: '17px', mt: '8px', float: 'right' }}
          />
        </Tooltip>
      </ClickAwayListener>
      <Link
        href={FeesList2.OnlineFeePaymentGuidePath}
        rel="noreferrer"
        target="_blank"
      >
        {/* <ButtonPrimary sx={{float:"right",mt:"10px",height:"27px"}}>PaymentVideo</ButtonPrimary> */}
      </Link>
      <Box sx={{ mb: '8px' }}>
        <Dropdown
          Array={newAcadamicYear}
          handleChange={clickYear}
          label={'Select Year'}
          defaultValue={currentYear}
        />
      </Box>
      {
        currentYear < asAcademicYearId && (
          // <> {selectedYear ?
          <Box mt={2} mb={1}>
            <Errormessage Error={'You are Viewing data of old academic year'} />
          </Box>
        )
        // : ""}</>
      }
      {currentYear != NextYrId && (
        <>
          {/* {PendingFeesForStudent !== null &&
           <> */}
          {FeesList2.PendingFeeAcademicYears !== '' && (
            <>
              {showOldPendingMsg && (
                <ErrorMessages
                  Error={
                    'Pending fees for :' + FeesList2.PendingFeeAcademicYears
                  }
                />
              )}
            </>
          )}
          {/* </>
          } */}
        </>
      )}
      {currentYear == NextYrId && showCaution == 'SchoolFees' && (
        <>
          {RestrictNewPayment && (
            <ErrorMessages
              Error={
                'You cannot pay next year fee till the complete payment of last year fee.'
              }
            />
          )}
        </>
      )}
      {showCaution === schoolFees && (
        <Grid container sx={{ mb: 0.3 }}>
          <Grid item xs={7.5}>
            <DotLegend1>
              <DotLegendStyled1
                className={classes.border}
                style={{ background: 'red' }}
              />
              <CardDetail7>Bounced Cheque Transaction</CardDetail7>
            </DotLegend1>
          </Grid>

          <Grid item xs={4.5}>
            <DotLegend1>
              <DotLegendStyled1
                className={classes.border}
                sx={{ background: '#64b5f6' }}
              />
              <CardDetail7>Refunded Fees</CardDetail7>
            </DotLegend1>
          </Grid>
        </Grid>
      )}
      <ListStyle sx={{ mb: 1 }} color="error">
        <CardDetail1 sx={{ textAlign: 'center' }}>
          {' '}
          <b>Applicable Fees:</b> Rs. {ApplicableFee}
        </CardDetail1>
      </ListStyle>
      <Typography sx={{ textAlign: 'center' }} my={1}>
        {' '}
        <b>{ConsessionNote}</b>
      </Typography>
      {Loading ? (
        <SuspenseLoader />
      ) : (
        <>
          <Card27
            FeesType={'Paid Fees'}
            Fee={FeesList}
            Heading={Feedata}
            Note={Note2}
            currentYear={currentYear}
            IsForCurrentyear={IsOldAcademicYearPayment}
            OldYearwiseStudentId={FeesList2.OldYearwiseStudentId}
            internalFees={showCaution}
            ApplicableFee={ApplicableFee}
            TotalLateFee={FeesList2.TotalLateFee}
            NextYearID={
              NextYearDetails == null ? 0 : NextYearDetails.NextAcademicYearId
            }
            SchoolwiseStudentId={
              NextYearDetails == null ? 0 : NextYearDetails.SchoolwiseStudentId
            }
            IsOnlinePaymetCautionMoney={IsOnlinePaymetCautionMoney}
            clickPayOnline={clickPayOnline}
            OldInternalstudent={OldInternalstudent}
            IsPending={FeesList2.PendingFeeAcademicYears}
            RestrictNewPayment={RestrictNewPayment}
          />

          {FeesList2.IsRTEstudent == true && <Note NoteDetail={note1} />}

          <PayCautionMoney
            ShowCaution={showCaution}
            IspaidCautionMoney={FeesList2.IsCautionMoneyPaid}
            note={note}
            clickCaution={clickCaution}
            IsOnlinePaymetCautionMoney={IsOnlinePaymetCautionMoney}
          />
        </>
      )}
      {Object.keys(FeesList2).length > 0 &&
        FeesList2.PaymentNotes !== undefined && (
          <NoteStyle>
            <b>Note :</b>
            {FeesList2.PaymentNotes?.map((note, i) => {
              return (
                <Box key={i} sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography> {note.SrNo}. </Typography>
                  <Wordbreak dangerouslySetInnerHTML={{ __html: note.Note }} />
                </Box>
              );
            })}
            {/* <Typography>{Paymentnote}</Typography> */}
          </NoteStyle>
        )}
      {asSchoolId == '11' && (
        <>
          <SpecialNote />
        </>
      )}
      {asSchoolId == '122' && (
        <ButtonPrimary onClick={ClickNavigateChallan}>
          Generate challan
        </ButtonPrimary>
      )}
    </Box>
  );
}

export default Fees;
