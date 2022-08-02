import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFees } from 'src/requests/Student/Fees';
import Card16 from 'src/libraries/card/Card16';
import Card15 from 'src/libraries/card/Card15';
import { Styles } from 'src/assets/style/student-style';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { styled } from '@mui/material';
import IFees from 'src/interfaces/Student/Fees';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Fees() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const FeesList = useSelector((state: RootState) => state.Fees.FeesData);
  const FeesList2 = useSelector((state: RootState) => state.Fees.FeesData2);

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
    dispatch(getFees(body));
  }, []);

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
      <Container>
        <DotLegend
          className={classes.border}
          style={{ background: '#9575cd' }}
        />
        <small>
          <b>Bouncee Cheque Transaction </b>
        </small>
        <br />
        <DotLegend
          className={classes.border}
          style={{ background: '#f48fb1' }}
        />
        <small>
          <b>Fees Payable </b>
        </small>
        <br />
        <DotLegend
          className={classes.border}
          style={{ background: '#64b5f6' }}
        />
        <small>
          <b>Refunded Fees </b>
        </small>
        <br />
        <br />
      </Container>

      <Card16 Fee={FeesList} Heading={Feedata} Note={Note} />
      {FeesList2 === undefined ? null : <Card15 FeeAmount={FeeAmount} />}
    </>
  );
}

export default Fees;
