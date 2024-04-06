import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Accordion1 from 'src/libraries/accordion/accordion1';
import PageHeader from 'src/libraries/heading/PageHeader';
import DotLegend from 'src/libraries/summary/DotLegend';
import { getPtaList } from 'src/requests/PTA/PTA';
import { RootState } from 'src/store';
import IPta from '../../interfaces/Common/PTA';

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
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Parent Teacher Association'} subheading={''} />
      <div>
        <Grid container></Grid>
        <Grid item xs={12}>
          <DotLegend
            color="info"
            text="PTA members associated with section and class"
          />
        </Grid>
      </div>{' '}
      <br />
      <Accordion1
        Parent={ParentCommitteeList}
        Teacher={TeacherCommitteeList}
        headingg={data3}
      />
    </Box>
  );
}

export default pta;
