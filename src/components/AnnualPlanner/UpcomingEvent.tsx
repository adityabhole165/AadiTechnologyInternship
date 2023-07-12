import { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import ListH from 'src/libraries/mainCard/ListH';
import { Container ,Grid ,Box} from '@mui/material';
import DotLegend from 'src/libraries/summary/DotLegend';
import IGetUpcomingEventBody from 'src/interfaces/Common/AnnualPlanner';
import { getUpcomingEvent } from 'src/requests/AnnualPlanner/AnnualPlanner';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import BackButton from 'src/libraries/button/BackButton';
import Icon1 from 'src/libraries/icon/icon1';

function UpcomingEvent() {
  const Note: string ='These events may change due to unavoidable reasons without prior notice.';
   const dispatch = useDispatch();

  const UpcomingEvents: any = useSelector((state: RootState) => state.AnnualPlanner.Event);
  const loading = useSelector((state: RootState) => state.AnnualPlanner.Loading);
  

  const SchoolId = sessionStorage.getItem('SchoolId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
console.log(SchoolId ,"SchoolId")
  const GetUpcomingeventBody: IGetUpcomingEventBody = {
    aiSchoolId: "18",
    aiAcademicYrId: AcademicYearId,
    aiUserId: asUserId,
    aiUserRoleId: RoleId,
    isScreenFullAccess: 'false'
  };
  
  useEffect(() => {
    dispatch(getUpcomingEvent(GetUpcomingeventBody));
  }, []);
  return (
    <Container>
    <PageHeader heading={'UpcomingEvent'}/>
    <BackButton FromRoute={'/Common/EventOverview'}/>
    <Grid container>
      <Grid item xs={2}>
      <DotLegend color='success' text='Exam' />
      </Grid>
      <Grid item xs={2}>
      <DotLegend color='error' text='Event' />
      </Grid>
      <Grid item xs={2}>
      <DotLegend color='secondary' text='Holiday' />
      </Grid>
      <Grid item xs={6}>
        <Box sx={{float:"right"}}>
        <Icon1 Note={Note}/>
        </Box>
     
      </Grid>
   
    </Grid>
   
    <br></br>
  
    {loading ? 
        <SuspenseLoader/>
       : 
       <>
    <ListH itemList={UpcomingEvents} ></ListH>
       </>
    }
    </Container>
  );
}

export default UpcomingEvent;
