import { Grid, Grow } from '@mui/material';
import { useState } from 'react';
import List23 from '../list/List23';
import { ListStyle } from '../styled/CardStyle';
import { ListHeight } from '../styled/CommonStyle';
import Card32 from './Card32';

export const CardTimetable = ({ header }) => {
  const [enableRow, setEnableRow] = useState(-1);
  const [checked, setChecked] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  const handleResize = () => {
    if (window.innerWidth < 600) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  };
  window.addEventListener('resize', handleResize);

  return (
    <Grid container spacing={1}>
      {header.map((Header, index) => (
        <Grow
          key={index}
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <Grid item xs={12} sm={2.4}>
            <ListStyle sx={ListHeight}>
              <Card32
                Id={index}
                Name={Header.Name}
                expand={() => setEnableRow(enableRow === index ? -1 : index)}
                isActive={enableRow === index}
              />
              {Header.Child !== undefined && (
                <>
                  {/* {isMobile ? <><List23 data={Header.Child} /></> : */}
                  <>{enableRow === index && <List23 data={Header.Child} />}</>

                  {/* } */}
                </>
              )}
            </ListStyle>
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
};
export default CardTimetable;
