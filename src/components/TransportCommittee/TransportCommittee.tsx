import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionTrc from 'src/libraries/accordion/AccordionTrc';
import PageHeader from 'src/libraries/heading/PageHeader';
import DotLegend from 'src/libraries/summary/DotLegend';
import { getTransportCommittee } from 'src/requests/TransportCommittee/RequestTransportcommittee';
import { RootState } from 'src/store';

function TransportCommittee() {
  const dispatch = useDispatch();

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');

  const TeacherCommitteeList = useSelector(
    (state: RootState) => state.TransportCommittee.TeachersCommittee
  );
  const ParentCommitteeList: any = useSelector(
    (state: RootState) => state.TransportCommittee.ParentCommittee
  );

  const data3 = {
    PTA_Member: 'Executive Committee (School)',
    PTA: 'Executive Committee (Parent)'
  };

  const TransportCommitteeDetailsBody = {
    aiUserId: asUserId,
    aiAcademicYearId: asAcademicYearId,
    aiSchoolId: asSchoolId
  };

  useEffect(() => {
    dispatch(getTransportCommittee(TransportCommitteeDetailsBody));
  }, []);

  return (
    <Container>
      <PageHeader heading={'Transport Committee'} subheading={''} />

      <Grid container></Grid>
      <Grid item xs={12}>
        <DotLegend
          color="info"
          text="Committee member associated with the section and standard divison"
        />
      </Grid>
      <br />

      {ParentCommitteeList !== undefined &&
        TeacherCommitteeList !== undefined && (
          <AccordionTrc
            Parent={ParentCommitteeList}
            Teacher={TeacherCommitteeList}
            headingg={data3}
          />
        )}
    </Container>
  );
}

export default TransportCommittee;
