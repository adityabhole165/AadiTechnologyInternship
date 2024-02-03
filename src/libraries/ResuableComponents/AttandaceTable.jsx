import { Container } from '@mui/material';
import TableAttendace from './TableAttendace';
function AttandaceTable() {
  const HeaderArray = [
    { Id: 1, Header: '' },
    { Id: 2, Header: 'Boys' },
    { Id: 3, Header: 'Girls' },
    { Id: 4, Header: 'Total' }
  ];

  const ItemList = [
    { Id: '', Text1: 'Presnt Student ', Text2: '35', Text3: '17', Text4: '17' },
    {
      Id: '',
      Text1: 'Absent  Student ',
      Text2: '35',
      Text3: '17',
      Text4: '17'
    },
    { Id: '', Text1: 'Total Student ', Text2: '35', Text3: '17', Text4: '17' },
    {
      Id: '',
      Text1: 'presnt month summary',
      Text2: '35',
      Text3: '17',
      Text4: '17'
    }
  ];
  return (
    <Container>
      <TableAttendace ItemList={ItemList} HeaderArray={HeaderArray} />
    </Container>
  );
}

export default AttandaceTable;
