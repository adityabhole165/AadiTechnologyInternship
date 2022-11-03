import React from 'react';
import PageHeader from 'src/libraries/heading/PageHeader';
import Card4 from 'src/libraries/mainCard/Card4';
import Card1 from 'src/libraries/mainCard/Card1';
import { Container } from '@mui/material';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import List1 from 'src/libraries/mainCard/List1';
import Card7 from 'src/libraries/mainCard/Card7';

const Notification = () => {
  const notification = [
    {
      header:
        'homework assigned to class 2 homework assigned to class 2 homework assigned to class 2 ',
      text1: '19-Oct-2022',
      text2: '03:30pm'
    },
    {
      header: 'homework assigned to class 4',
      text1: '16-Oct-2022',
      text2: '04:30pm'
    },
    {
      header: 'Fees page change  ',
      text1: '13-Oct-2022',
      text2: '05:30pm'
    }
  ];
  return (
    <>
      <Container>
        <PageHeader heading={'Notification'} subheading={''} />
        {notification.map((items, i) => (
          <Card7
            key={i}
            header={items.header}
            text1={items.text1}
            text2={items.text2}
          />
        ))}
      </Container>
    </>
  );
};

export default Notification;
