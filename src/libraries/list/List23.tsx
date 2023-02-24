import Card31 from '../card/Card31'
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import CardAttendance from '../card/CardAttendance';

const List23 = ({ data }) => {
  const navigate = useNavigate();
  const onClick = (navPath) => {
    if (navPath !== undefined) {
        navigate(navPath);
    }
  } 
  return (<>

  { data == undefined || data.length == 0 ? <ErrorMessages Error={'Timetable not yet configured'} /> :
  <>
  {
      data.map((Detail, index) => (
        <div onClick={() => onClick(Detail.navPath)} key={index}>
          <CardAttendance
            Name={Detail.Name}
         
          />
        </div>
      ))
    }
  </>
}
  </>)
}
export default List23;