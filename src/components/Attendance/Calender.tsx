import { Box, Grow } from '@mui/material';
import { useEffect, useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/prime.css';
import 'src/assets/style/student-cal.css';
import { Styles } from 'src/assets/style/student-style';

export function Calender1({ month, year, AttendenceData }) {
  const classes = Styles();
  const [statusW, setStatusW] = useState<any>('');
  const [statusY, setStatusY] = useState<any>('');
  const [statusN, setStatusN] = useState<any>('');
  const [statusX, setStatusX] = useState<any>('');
  const [statusH, setStatusH] = useState<any>('');
  const [statusO, setStatusO] = useState<any>('');
  const [statusL, setStatusL] = useState<any>('');

  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (AttendenceData !== undefined) {
      const dataList = AttendenceData.filter((item) => item.Status == 'W').map(
        (data) => Number(data.Day)
      );
      const dataList1 = AttendenceData.filter((item) => item.Status == 'Y').map(
        (data) => Number(data.Day)
      );
      const dataList2 = AttendenceData.filter((item) => item.Status == 'N').map(
        (data) => Number(data.Day)
      );
      const dataList3 = AttendenceData.filter((item) => item.Status == 'X').map(
        (data) => Number(data.Day)
      );
      const dataList4 = AttendenceData.filter((item) => item.Status == 'H').map(
        (data) => Number(data.Day)
      );
      const dataList5 = AttendenceData.filter((item) => item.Status == 'O').map(
        (data) => Number(data.Day)
      );
      const dataList6 = AttendenceData.filter((item) => item.Status == 'L').map(
        (data) => Number(data.Day)
      );

      setStatusW(dataList);
      setStatusY(dataList1);
      setStatusN(dataList2);
      setStatusX(dataList3);
      setStatusH(dataList4);
      setStatusO(dataList5);
      setStatusL(dataList6);
    }
  }, [AttendenceData]);

  return (
    <>
      {AttendenceData === undefined ? null : (
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 1' }}
          {...(checked ? { timeout: 1500 } : {})}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="multi-locale-days"
          >
            <Calendar
              weekDays={['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']}
              mapDays={({ date }) => {
                month(date.month.number);
                year(date.year);

                if (statusW.includes(date.day))
                  return {
                    style: { background: 'yellow', borderRadius: '6px' }
                  };
                if (statusY.includes(date.day))
                  return {
                    style: { background: '#2abf2a', borderRadius: '6px' }
                  };
                if (statusN.includes(date.day))
                  return {
                    style: { background: '#f33737', borderRadius: '6px' }
                  };
                if (statusX.includes(date.day))
                  return {
                    style: { background: '#b2a4dd', borderRadius: '6px' }
                  };
                if (statusH.includes(date.day))
                  return {
                    style: { background: '#ebbb0b', borderRadius: '6px' }
                  };
                if (statusO.includes(date.day))
                  return {
                    style: { background: '#bdbdbd', borderRadius: '6px' }
                  };
                if (statusL.includes(date.day))
                  return {
                    style: { background: '#00b8d4', borderRadius: '6px' }
                  };
              }}
            ></Calendar>
          </Box>
        </Grow>
      )}
    </>
  );
}
