import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFees } from 'src/requests/Fees/Fees';
import Card27 from 'src/libraries/card/Card27';
import { Styles } from 'src/assets/style/student-style';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Card, styled } from '@mui/material';
import IFees from 'src/interfaces/Student/Fees';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material';
// import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { CardDetail1, ListStyle } from 'src/libraries/styled/CardStyle';
import Note from 'src/libraries/Note/Note';

function Fees() {

  const dispatch = useDispatch();
  const FeesList = useSelector((state: RootState) => state.Fees.FeesData);
  const FeesList2: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
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
  const Note2: string = '*RITE student (100% Consession on school fees)';
 
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');

  const body: IFees = { 
    asSchoolId: asSchoolId,
    asStudentId: asStudentId
  };

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getFees(body));
  }, []);

  const theme = useTheme();

  const DotLegend = styled('span')(
    ({ theme }) => `
        border-radius: 22px;
        width: ${theme.spacing(1.5)};
        height: ${theme.spacing(1.5)};
        display: inline-block;
        margin-right: ${theme.spacing(1)};
        margin-top: -${theme.spacing(0.1)};
    `
  );
  const classes = Styles();
  const note1 = [
    '1) *RITE student (100% Consession on school fees)',
   
  ];
  return (
    <>
      <PageHeader heading={'Fee Details'} subheading={''} />

      <Container sx={{ mb: '-10px' }}>
        
        <DotLegend
          className={classes.border}
          style={{ background: 'red', display: 'inline-block',marginLeft:1 }}
        />
        <small>
          <b>Bounced cheque Transaction </b>
        </small>
        <DotLegend
          className={classes.border}
          sx={{ background: '#64b5f6', display: 'inline-block', ml: '5px' }}
        />
        <small>
          <b>Refunded Fees </b>
        </small>
        <br />
        <br />

        <ListStyle sx={{mb:2}}>
          
          <CardDetail1  sx={{textAlign: 'center'}}> <b>Applicable Fees</b>  : &nbsp;
          &nbsp;    
          {/* <CurrencyRupeeRoundedIcon  sx={{fontSize:'18px',position:'relative',top:'5px',fontWeight:'bold'}}/>  */}
           {FeesList2.TotalFee}
           </CardDetail1>
     
        </ListStyle>
      </Container>

      <Card27
        FeesType={'Paid Fees'}
        Fee={FeesList}
        Heading={Feedata}
        Note={Note2}
      />
      <Card27
        FeesType={'Payable Fees'}
        Fee={FeesList}
        Heading={Feedata}
        Note={Note2}
      />
      <Container sx={{ mb: '-10px'}}>
     
        <Note NoteDetail={note1} />
      </Container>
    </>
  );
}

export default Fees;
