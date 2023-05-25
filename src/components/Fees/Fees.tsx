import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFees, getYearList } from 'src/requests/Fees/Fees';
import IFees, { GetAllAcademicYearsApiBody, IGetFeeDetailsOfOldAcademicBody } from 'src/interfaces/Student/Fees';
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
const note = [
  '1) Caution Money paid by Cheque on date 14 Dec 2017. Cheque Details (Date: 14 Dec 2017, Number: 0099998, Bank Name: ICICI BANK), Receipt No. : 30057.',


];
function Fees() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ispaidCautionMoney, setIspaidCautionMoney] = useState('false')

  const FeesList = useSelector((state: RootState) => state.Fees.FeesData);


  const [YearType,setYearType]=useState("C")
  // const [internalFees, setInternalFees] = useState("")
  const schoolFees = "SchoolFees";
  const internalFees = "internalFees";


  const FeesList2: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
  );
  console.log("FeesList2", FeesList2);
  // console.log("FeesList", FeesList);


  const AcadamicYear: any = useSelector(
    (state: RootState) => state.Fees.YearList
  );

  const FeesDetailsOfOldAcademic: any = useSelector(
    (state: RootState) => state.Fees.GetFeesDetailsOfOldAcademic
  );

  const InternalFeeDetails: any = useSelector(
    (state: RootState) => state.Fees.InternalFeeDetails
  );
  // console.log("InternalFeeDetails",InternalFeeDetails);
  
// console.log("InternalFeeDetails",InternalFeeDetails);


  const NextYearDetails: any = useSelector(
    (state: RootState) => state.Fees.GetNextYearDetails
  );

  const GetNextYearFeeDetails: any = useSelector(
    (state: RootState) => state.Fees.GetNextYearFeeDetails
  );

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
    abIsNextYearFeePayment: "0"
  }

  const IGetNextYearDetailsBody = {
    aiSchoolId: asSchoolId,
    aiStudentId: asStudentId
  }

  const IGetNextYearFeeDetailsBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: currentYear,
    aiSchoolwiseStudentId: asStudentId,
    aiStandardId: asStandardId

  }
  useEffect(() => {
    localStorage.setItem("paymentPopUpCount", '0'); // Temporary fix to fee payment popup. Update code later
    localStorage.setItem('url', window.location.pathname);
  }, []);

  useEffect(() => {
    dispatch(getYearList(body1));
    // dispatch(getInternalFeeDetails(IGetInternalFeeDetailsBody));
    // dispatch(getNextYearDetails(IGetNextYearDetailsBody));
    // dispatch(getNextYearFeeDetails(IGetNextYearFeeDetailsBody));
    
  }, []);
  // useEffect(() => {
  //   if(showCaution == internalFees){
  //     dispatch(getInternalFeeDetails(IGetInternalFeeDetailsBody));
  //   }else
  //   dispatch(getFees(body));
  // }, [showCaution]);

  // useEffect(() => {
  //   if (currentYear === sessionStorage.getItem("AcademicYearId")) {
  //     dispatch(getFees(body));
  //   } 
  //   else
  //     dispatch(getFees(body));
  // }, [currentYear]);

  useEffect(() => {
  if(currentYear == '0'){
    dispatch(getNextYearFeeDetails(IGetNextYearFeeDetailsBody));
  }else{
    if(showCaution == internalFees){
      dispatch(getInternalFeeDetails(IGetInternalFeeDetailsBody));
    }else
    dispatch(getFees(body));
  }
  }, [showCaution,currentYear]);



  const clickYear = (value) => {
    AcadamicYear.map((item)=>{
      if(item === value){
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
        Array={AcadamicYear}
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
      <Card27 FeesType={'Paid Fees'} Fee={FeesList} Heading={Feedata} Note={Note2} currentYear={currentYear}
       IsForCurrentyear={IsOldAcademicYearPayment} OldYearwiseStudentId={FeesList2.OldYearwiseStudentId} 
       internalFees={internalFees}/>
      {FeesList2.IsRTEstudent == true && <Note NoteDetail={note1} />}
      <PayCautionMoney ShowCaution={showCaution} IspaidCautionMoney={ispaidCautionMoney} note={note} />
      {/* {FeesList2.PaymentNotes !== 0 &&  */}
      <NoteStyle >
        <b>Note :</b>
        {FeesList2.PaymentNotes?.map((note, i) => {
          return
         <Box key={i} sx={{display:'flex',flexDirection:'row'}}><Typography> {note.SrNo}. </Typography><Wordbreak dangerouslySetInnerHTML={{ __html: note.Note }} /></Box>   
        
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
