import { Box } from '@mui/material';
import { useState } from 'react';
import AttendanceCard from '../mainCard/AttendanceCard';
import { ListStyle } from '../styled/CardStyle';
import Card36 from './Card36';
export const Card35 = ({ header, IsStudent }) => {
  const [enableRow, setEnableRow] = useState(-1);

  const expand = (index) => {
    setEnableRow(enableRow === index ? -1 : index);
  };

  return (
    <>
      {header.Header != undefined &&
        header.Header.map((Header, index) => (
          <ListStyle key={index}>
            <Card36
              Id={index}
              Rank={Header.Rank}
              Name={Header.Name}
              Rollno={Header.Rollno}
              Presentdays={Header.PresentDays}
              Percentage={Header.Percentage}
              expand={expand}
              isActive={enableRow === index}
              IsStudent={IsStudent}
            />
            <Box sx={{ mt: '10px' }}>
              {enableRow === index &&
                Header.Child.map((Item, index) => (
                  <AttendanceCard Item={Item} key={index} />
                ))}
            </Box>
          </ListStyle>
        ))}
    </>
  );
};
export default Card35;
