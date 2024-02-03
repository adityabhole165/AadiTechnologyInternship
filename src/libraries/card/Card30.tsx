import { Grow } from '@mui/material';
import { useState } from 'react';
import List23 from '../list/List23';
import { ListStyle } from '../styled/CardStyle';
import Card32 from './Card32';

export const Card30 = ({ header }) => {
  const [enableRow, setEnableRow] = useState(-1);
  const [checked, setChecked] = useState(true);

  return (
    <>
      {header.map((Header, index) => (
        <Grow
          key={index}
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <ListStyle>
            <Card32
              Id={index}
              Name={Header.Name}
              expand={() => setEnableRow(enableRow === index ? -1 : index)}
              isActive={enableRow === index}
            />
            {Header.Child !== undefined && (
              <>
                {' '}
                {
                  enableRow === index && <List23 data={Header.Child} />
                  // <List23 data={Header.Child.filter((item)=>{return getDateMonthYearFormatted(item.AssignedDate) === AssignedDate})} />
                }
              </>
            )}
          </ListStyle>
        </Grow>
      ))}
    </>
  );
};
export default Card30;
