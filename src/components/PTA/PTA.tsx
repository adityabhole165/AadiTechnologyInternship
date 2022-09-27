import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPtaList } from 'src/requests/PTA/PTA';
import Accordion1 from 'src/libraries/accordion/accordion1';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Container } from '@mui/material';
import IPta from '../../interfaces/Common/PTA';
import PageHeader from 'src/libraries/heading/PageHeader';
import DotLegend from 'src/libraries/summary/DotLegend';
import Grid from '@mui/material/Grid';

function pta() {
  const dispatch = useDispatch();
  
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');


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

  const body: IPta = {
    asUserId: asUserId,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  useEffect(() => {
    dispatch(getPtaList(body));
  }, []);


  return (
    <Container>
      <PageHeader heading={'PTA'} subheading={''} />
      <div>
        <Grid container>
          <Grid item xs={12}>
            <DotLegend color='secondary' text='PTA members' />
          </Grid><Grid item xs={12}>
            <DotLegend color='warning' text='PTA members associated with section and class' />
          </Grid>
        </Grid>

      </div>{' '}
      <br />
      <Accordion1 Parent={ParentCommitteeList} Teacher={TeacherCommitteeList} headingg={data3} />
    </Container>
  );
}

export default pta;
