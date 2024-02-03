import { Grid } from '@mui/material';
import CardAttendance from '../card/CardAttendance';

const CardAtt = ({ data }) => {
  console.log(data, 'feuhfbd');
  let xsWidth =
    data.length === 0 ? 12 : data[0].isAttendanceTopper == true ? 6 : 12;
  return (
    <>
      <Grid container>
        <>
          {data.map((Detail, index) => (
            <Grid xs={xsWidth} key={index}>
              <CardAttendance Name={Detail.Name} Text1={Detail.Text1} />
            </Grid>
          ))}
        </>
      </Grid>
    </>
  );
};
export default CardAtt;
