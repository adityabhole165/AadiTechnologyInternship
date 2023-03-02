import Card31 from '../card/Card31'
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import CardAttendance from '../card/CardAttendance';
import { Grid, Typography } from '@mui/material';

const List23 = ({ data }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const onClick = (navPath) => {  
    if (navPath !== undefined) {
        navigate(navPath);
    }
  }
    let xsWidth = data.length === 0 ? 12 :
    data[0].isAttendanceTopper == true  ? 6 : 12
  return (<>
 <Grid container   >
  { data == undefined || data.length == 0 ? <ErrorMessages Error={'Timetable not yet configured'} /> :
  <>
  {
      data.map((Detail, index) => (
        <div onClick={() => onClick(Detail.navPath)} key={index}>
          <Grid xs={(data.length - 2 == index || data.length - 1 == index)? 12 : xsWidth} key={index}>
          <CardAttendance
            Name={Detail.Name}
          />
          </Grid>
         </div>

      ))
    }
  </>
}
</Grid>
  </>)
}
export default List23;