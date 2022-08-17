import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFees } from 'src/requests/Student/Fees';
import Card27 from 'src/libraries/card/Card27';
import { Styles } from 'src/assets/style/student-style';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Card, styled } from '@mui/material';
import IFees from 'src/interfaces/Student/Fees';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material';

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
  const Note: string = '*RTE student (100% Consession on school fees)';

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

        <Card square
          sx={{
            textAlign: 'center',
            background: `${theme.colors.gradients.pink1}`,
            mb: 3,
            boxShadow: '6px 6px 8px  gray !important',
            p: 0.5,
            fontWeight:'bold'
          }}
        >
          Applicable Fees : {FeesList2.TotalFee}
        </Card>
      </Container>

      <Card27
        FeesType={'Paid Fees'}
        Fee={FeesList}
        Heading={Feedata}
        Note={Note}
      />
      <Card27
        FeesType={'Payable Fees'}
        Fee={FeesList}
        Heading={Feedata}
        Note={Note}
      />
      <Container sx={{ mb: '-10px'}}>
      <Card square
          sx={{
            textAlign: 'center',
            background: 'pink' ,//`${theme.colors.gradients.pink1}`,
            mb: 4,
            boxShadow: '6px 6px 8px  gray !important',
            p: 0.5,
            fontWeight:'bold'
          }}
        >
          Note : {Note}
        </Card>
      </Container>
    </>
  );
}

export default Fees;
