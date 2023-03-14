import { useEffect ,useState} from 'react';
import { useDispatch } from 'react-redux';
import { getFees,getYearList  } from 'src/requests/Fees/Fees';
import IFees, { GetAllAcademicYearsApiBody } from 'src/interfaces/Student/Fees';
import Card27 from 'src/libraries/card/Card27';
import { Styles } from 'src/assets/style/student-style';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Card, styled, TextField ,ToggleButton, ToggleButtonGroup, Typography,} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Container, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material';
import {
  CardDetail1,
  CardDetail7,
  CardDetail8,
  ListStyle
} from 'src/libraries/styled/CardStyle';
import Note from 'src/libraries/Note/Note';
import { DotLegend1 } from 'src/libraries/styled/DotLegendStyled';
import {DotLegendStyled1} from 'src/libraries/styled/DotLegendStyled';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';

function Fees() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const FeesList = useSelector((state: RootState) => state.Fees.FeesData); 
  const FeesList2: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
  );
  const AcadamicYear: any = useSelector(
    (state: RootState) => state.Fees.YearList
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

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const body1: GetAllAcademicYearsApiBody = {
    aiSchoolId: asSchoolId,
    aiYearwiseStudentId: asStudentId
  };
  const [currentYear, setCurrentyear] = useState(sessionStorage.getItem("AcademicYearId"));
  const body: IFees = {
    asSchoolId: asSchoolId,
    asStudentId: asStudentId
  };

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getFees(body));
  }, []);
  useEffect(() => {
    dispatch(getYearList(body1));
    }, []);

    const clickYear = (value) => {
      setCurrentyear(value);
    };
    const [view, setView] = useState('S');
    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newView: string,
    ) => {
      if (newView != null)
      setView(newView);
    };

  const theme = useTheme();

 
  const classes = Styles();
  const note1 = ['1) *RTE student (100% concession on school fees)'];
  const PayInternalFees =()=>{
    navigate('PayinternalFees')
  };
  return (
    <Container>
      <PageHeader heading={'Fee Details'} subheading={''} />
      <Dropdown
        Array={ AcadamicYear}
        handleChange={clickYear}
        label={'Select Year'}
        defaultValue={currentYear} 
      />
     
  
      <br></br>
      <br></br>
      <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleChange}
     
            >
            <ToggleButton value="S">School Fees</ToggleButton>
            <ToggleButton value="I">Internal Fees</ToggleButton>
          </ToggleButtonGroup>
         
          <br></br>
          <br></br>
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
      </Grid>
      <br></br>
         
    
     
      <ListStyle sx={{ mb: 2 }} color="info">
        <CardDetail1 sx={{ textAlign: 'center' }}>
          {' '}
          <b>Applicable Fees:</b> {FeesList2.TotalFee}
        </CardDetail1>
      </ListStyle>
     
      <Card27 FeesType={'Paid Fees'} Fee={FeesList} Heading={Feedata} Note={Note2} />
      
      {FeesList2.IsRTEstudent == true && <Note NoteDetail={note1} />} 
    { view === "I" && 
    <ButtonPrimary fullWidth>Pay caution Money</ButtonPrimary>}
         
      
     
    </Container>
  );
}

export default Fees;
