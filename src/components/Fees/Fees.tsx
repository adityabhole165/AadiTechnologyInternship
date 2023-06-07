import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFees, getYearList } from 'src/requests/Fees/Fees';
import IFees, { GetAllAcademicYearsApiBody, IGetFeeDetailsOfOldAcademicBody, IGetNextYearDetailsResult, IPayOnline } from 'src/interfaces/Student/Fees';
import Card27 from 'src/libraries/card/Card27';
import { Styles } from 'src/assets/style/student-style';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Card, styled, TextField, ToggleButton, ToggleButtonGroup, Typography, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Container, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material';
import { CardDetail2, Wordbreak } from 'src/libraries/styled/CardStyle';
import { NoteStyle } from 'src/libraries/styled/NoteStyle'
import { CardDetail1, CardDetail7, CardDetail8, ListStyle } from 'src/libraries/styled/CardStyle';
import Note from 'src/libraries/Note/Note';
import { DotLegend1 } from 'src/libraries/styled/DotLegendStyled';
import { DotLegendStyled1 } from 'src/libraries/styled/DotLegendStyled';
import { getFeesDetailsOfOldAcademic, getInternalFeeDetails, getNextYearDetails, getNextYearFeeDetails } from 'src/requests/Fees/Fees'
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import PayCautionMoney from './PayCautionMoney';
import SpecialNote from 'src/libraries/Note/SpecialNote';
import { string } from 'prop-types';
import { getOnlinePaymentForCautionMoney } from 'src/requests/SchoolSetting/schoolSetting';
import { IGetSettingValueBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import { payOnline } from 'src/requests/Fees/Fees';

import { Browser } from '@capacitor/browser';

const note = [
  '1) Caution Money paid by Cheque on date 14 Dec 2017. Cheque Details (Date: 14 Dec 2017, Number: 0099998, Bank Name: ICICI BANK), Receipt No. : 30057.',


];
function Fees() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ispaidCautionMoney, setIspaidCautionMoney] = useState('false')

  const FeesList = useSelector((state: RootState) => state.Fees.FeesData);
  const [IsCautionClick,setIsCautionClick] = useState(false)
  
  const [YearType, setYearType] = useState("C")
  const [newAcadamicYear,setNewAcadamicYear]= useState([])
  // const [internalFees, setInternalFees] = useState("")
  const schoolFees = "SchoolFees";
  const internalFees = "internalFees";

  const FeesList2: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
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

  const paymentPageLink: any = useSelector((state: RootState) => state.Fees.paymentUrl);

  // console.log("InternalFeeDetails",InternalFeeDetails);


  const NextYearDetails: any = useSelector(
    (state: RootState) => state.Fees.GetNextYearDetails
  );
  const GetNextYearFeeDetails: any = useSelector(
    (state: RootState) => state.Fees.GetNextYearFeeDetails
  );
const IsOnlinePaymetCautionMoney: any = useSelector(
  (state:RootState) => state.getSchoolSettings.OnlinePaymentForCautionMoney
)
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
  const Note2: string = '*RITE student (100%  Concession on school fees)';
  const [showCaution, setShowCaution] = useState(schoolFees);
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardId = sessionStorage.getItem('StandardId');

  const body1: GetAllAcademicYearsApiBody = {
    aiSchoolId: asSchoolId,
    aiYearwiseStudentId: asStudentId
  };
  const [currentYear, setCurrentyear] = useState(sessionStorage.getItem("AcademicYearId"));
  const IsForCurrentyear = currentYear == asAcademicYearId ? true : false;
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
  }
  const IGetInternalFeeDetailsBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: currentYear,
    aiStudentId: asStudentId,
    abIsNextYearFeePayment:Number(currentYear) == 0 ?"0":"1"
  }

  const IGetNextYearDetailsBody = {
    aiSchoolId: asSchoolId,
    aiStudentId: asStudentId
  }

  const IGetNextYearFeeDetailsBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: NextYearDetails==null?0:NextYearDetails.NextAcademicYearId,
    aiSchoolwiseStudentId: NextYearDetails==null?0:NextYearDetails.SchoolwiseStudentId,
    aiStandardId: asStandardId

  }
  const NextYrId = NextYearDetails ==null?0:NextYearDetails.NextAcademicYearId
  const GetSettingValueBody: IGetSettingValueBody = {
    asSchoolId: parseInt(asSchoolId),
    aiAcademicYearId: parseInt(asAcademicYearId),
    asKey: "",
  };
  
  useEffect(() => {
    if(AcadamicYear.length>0){
    let arr = AcadamicYear;
      let arr2 = {id:NextYrId,
        Name: 'Advance Academic Year',
        Value: NextYrId,
        YearType:''}
      setNewAcadamicYear([arr2,...arr])
    }
  }, [AcadamicYear]);
  useEffect(() => {
    localStorage.setItem("paymentPopUpCount", '0'); // Temporary fix to fee payment popup. Update code later
    localStorage.setItem('url', window.location.pathname);
  }, []);

  useEffect(() => {
    dispatch(getYearList(body1));
    dispatch(getOnlinePaymentForCautionMoney(GetSettingValueBody));
    dispatch(getNextYearDetails(IGetNextYearDetailsBody));
    // dispatch(getNextYearFeeDetails(IGetNextYearFeeDetailsBody));
  }, []);
  useEffect(() => {
    
      if (showCaution == internalFees) {
        dispatch(getInternalFeeDetails(IGetInternalFeeDetailsBody));
      } else  if (currentYear == (NextYearDetails==null?0:NextYearDetails.NextAcademicYearId)) {
        dispatch(getNextYearFeeDetails(IGetNextYearFeeDetailsBody));
      } else
        dispatch(getFees(body));
    
  }, [showCaution, currentYear]);


  useEffect(() => {
    if (paymentPageLink !== "") {
      const openCapacitorSite = async (url) => {
        await Browser.open({ url: url });
      };
      openCapacitorSite(paymentPageLink)
      navigate('/extended-sidebar/Student/PayOnline')
    }
   
  }, [paymentPageLink]);
const clickCaution = (value)=>{;

  const authData = JSON.parse(localStorage.getItem("auth"));
  const userLoginId = authData.data.AuthenticateUserResult.UserLogin
  let returnString ='StudentId='+asStudentId+ '&DueDates=' +'&Remarks=&SchoolwiseStudentFeeId=0'+ '&IsOnlineCautionMoneyPayment=1'
  const body: IPayOnline = {
    asSchoolId: localStorage.getItem('localSchoolId'),
    asUserLogin: userLoginId,
    asQueryString: returnString,
    asSchoolSiteUrl:
      localStorage.getItem('SiteURL') + '/RITeSchool/SingleSignOnPage.aspx?',
    asRedirectPageUrl:
      localStorage.getItem('SiteURL') + '/RITeSchool/Accountant/PayFeeOnline.aspx?'
  };
  dispatch(payOnline(body));
}
const clickPayOnline = (value)=>{
  
  dispatch(payOnline(value));
}
  const clickYear = (value) => {
    AcadamicYear.map((item) => {
      if (item === value) {
        setYearType(item.YearType)
      }
    })
    setCurrentyear(value);
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newShowCaution: string,
  ) => {
    if (newShowCaution != null)
      setShowCaution(newShowCaution);
  };

  const theme = useTheme();


  const classes = Styles();
  const note1 = ['1) *RTE student (100% concession on school fees)'];
  const PayInternalFees = () => {
    navigate('PayinternalFees')
  };
  const ApplicableFee = FeesList2.TotalFee - FeesList2.TotalLateFee  
  const IsOldAcademicYearPayment = IsForCurrentyear ? '0' : '1';
  return (
    <Container>
      <PageHeader heading={'Fee Details'} subheading={''} />
      <Dropdown
        Array={newAcadamicYear}
        handleChange={clickYear}
        label={'Select Year'}
        defaultValue={currentYear}
      />
      <br></br>
      <br></br>
      <ToggleButtonGroup
        value={showCaution}
        exclusive
        onChange={handleChange}>
        <ToggleButton value={schoolFees} >School Fees</ToggleButton>
        <ToggleButton value={internalFees}>Internal Fees</ToggleButton>
      </ToggleButtonGroup>
      <br></br>
      <br></br>
      {
        showCaution === schoolFees &&

        <Grid container>
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
        </Grid>}

      <br></br>
      <ListStyle sx={{ mb: 2 }} color="info">
        <CardDetail1 sx={{ textAlign: 'center' }}>
          {' '}
          <b>Applicable Fees:</b> {ApplicableFee}
        </CardDetail1>
      </ListStyle>
      <Card27 FeesType={'Paid Fees'} Fee={FeesList}
        Heading={Feedata} Note={Note2} currentYear={currentYear}
        IsForCurrentyear={IsOldAcademicYearPayment}
        OldYearwiseStudentId={FeesList2.OldYearwiseStudentId}
        internalFees={showCaution} ApplicableFee={ApplicableFee}
        TotalLateFee={FeesList2.TotalLateFee}
        NextYearID={NextYearDetails==null?0:NextYearDetails.NextAcademicYearId}
        SchoolwiseStudentId={NextYearDetails==null?0:NextYearDetails.SchoolwiseStudentId}
        IsOnlinePaymetCautionMoney={IsOnlinePaymetCautionMoney} clickPayOnline={clickPayOnline}
        />
      {FeesList2.IsRTEstudent == true && <Note NoteDetail={note1} />}
      <PayCautionMoney ShowCaution={showCaution} IspaidCautionMoney={FeesList2.IsCautionMoneyPaid} note={note} clickCaution={clickCaution}/>
      {/* {FeesList2.PaymentNotes !== 0 &&  */}
      <NoteStyle >
        <b>Note :</b>
        {FeesList2.PaymentNotes?.map((note, i) => {
          return<Box key={i} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography> {note.SrNo}. </Typography><Wordbreak dangerouslySetInnerHTML={{ __html: note.Note }} />
            </Box>

        })}
      </NoteStyle>
      {asSchoolId == "11" && <>
        <SpecialNote />
      </>
      }
    </Container>
  );
}

export default Fees;
