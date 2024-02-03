import { Grid, Grow, Typography } from '@mui/material';
import { useState } from 'react';
import List23 from '../list/List23';
import { ListStyle } from '../styled/CardStyle';
import Card32 from './Card32';
export const CardTimetable2 = ({ header }) => {
  const [enableRow, setEnableRow] = useState(-1);
  const [checked, setChecked] = useState(true);

  return (
    <>
      <Grid container spacing={1}>
        {header.map((Header, index) => (
          <Grow
            key={index}
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <Grid item xs={6}>
              <ListStyle>
                <Card32
                  Id={index}
                  Name={Header.Name}
                  expand={() => setEnableRow(enableRow === index ? -1 : index)}
                  isActive={enableRow === index}
                />

                {enableRow === index && <List23 data={Header.Child} />}
              </ListStyle>
            </Grid>
          </Grow>
        ))}
        <Grid item xs={6}>
          <ListStyle>
            <Typography variant="h5" p={0.4}>
              Lecture Count
            </Typography>
          </ListStyle>
        </Grid>
      </Grid>
    </>
  );
};
export default CardTimetable2;
