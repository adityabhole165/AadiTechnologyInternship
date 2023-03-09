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
          <Grid xs={xsWidth} onClick={() => onClick(Detail.navPath)} key={index}>
           <Card31
                  Name={Detail.Name}
                  Value={Detail.Value}
                  text1={Detail.text1}
                  text2={Detail.text2}
                  text3={Detail.text3}
                />
          </Grid>

      ))
    }
  </>
}
</Grid>
  </>)
}
export default List23;