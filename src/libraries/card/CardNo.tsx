import { Card, Typography } from '@mui/material';
function CardNo({ item, clickItem }) {
  console.log(item, 'Calender');
  const onClick = () => {
    item = {
      ...item,
      IsActive: item.IsActive ? item.IsActive : !item.IsActive
    };
    clickItem(item);
  };

  console.log(item.Name);
  return (
    <div>
      <Card>
        <Typography>{item.Name}</Typography>
      </Card>
    </div>
  );
}

export default CardNo;
