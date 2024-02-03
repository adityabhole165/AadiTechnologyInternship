import { Card, Typography } from '@mui/material';

const CardHeader = ({ Item }) => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {Item.map((item, i) => (
        <Card key={i}>
          <Typography variant="h4" color="red">
            {item.Name}
          </Typography>
        </Card>
      ))}
    </div>
  );
};

export default CardHeader;
