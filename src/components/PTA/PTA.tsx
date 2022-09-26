import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPtaList } from 'src/requests/PTA/PTA';
import Accordion1 from 'src/libraries/accordion/accordion1';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Container, styled, useTheme } from '@mui/material';
import IPta from '../../interfaces/Common/PTA';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Styles } from 'src/assets/style/student-style';

function pta() {
  const dispatch = useDispatch();
  const ParentCommitteeList: any = useSelector(
    (state: RootState) => state.Pta.ParentCommittee
  );
  const TeacherCommitteeList = useSelector(
    (state: RootState) => state.Pta.TeacherCommittee
  );
  const data3 = {
    PTA_Member: 'Executive Committee (School)',
    PTA: 'Executive Committee (Parent)'
  };

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');

  const body: IPta = {
    asUserId: asUserId,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  useEffect(() => {
    dispatch(getPtaList(body));
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

  const theme = useTheme();
  const classes = Styles();
  return (
    <Container>
      <PageHeader heading={'PTA'} subheading={''} />
      <div>
        <DotLegend
          className={classes.border}
          sx={{
          
            marginBottom: '-2px',
            background: `${theme.colors.gradients.listColor}`
          }}
        />
        <small>
          <b> PTA members </b>
        </small>
        <br />
        <DotLegend
          className={classes.border}
          sx={{
          
            marginBottom: '-2px',
            background: `${theme.colors.gradients.HighlightedlistColor}`
          }}
        />
        <small>
          <b> PTA members associated with section and class </b>
        </small>
        <br />
      </div>{' '}
      <br />
      <Accordion1
        Parent={ParentCommitteeList}
        Teacher={TeacherCommitteeList}
        headingg={data3}
      />
    </Container>
  );
}

export default pta;
