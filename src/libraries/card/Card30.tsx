import { useState } from 'react';
import { Container, Card } from '@mui/material';

import Card32 from './Card32';
import List23 from '../list/List23';
import { Styles } from 'src/assets/style/student-style';
export const Card30 = ({ header }) => {
  const [enableRow, setEnableRow] = useState(-1);
  const expand = (index) => {
    if (enableRow === index) setEnableRow(-1);
    else setEnableRow(index);
  };
  const classes = Styles();
  return (
    <>
      <Container>
        {header.map((Header) => (
          <Card key={Header.Id} className={classes.CardStyle}>
            <Card32 Id={Header.Id} Name={Header.Name} expand={expand} />

            {enableRow === Header.Id && <List23 data={Header.Child} />}
          </Card>
        ))}
      </Container>
    </>
  );
};
export default Card30;
