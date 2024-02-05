import { Box, Card, Typography } from '@mui/material';
import { useState } from 'react';

const CardCalAP = ({ item, clickItem, DefaultValue, options = undefined }) => {
  const [isHovered, setIsHovered] = useState(false);
  const fourcolour = ['', 'red', 'green', 'blue', 'gray', 'orange'];

  const [color, setColor] = useState([]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const onClick = (Value) => {
    if (item.IsClickable) clickItem(Value);
  };
  return (
    <div>
      <Card
        component={Box}
        py={1}
        sx={{
          height: '100px',
          width: '120px',
          cursor: 'pointer',
          color: item.Value == DefaultValue ? 'yellow' : item.BackgroundColor,
          backgroundColor: '#BEDAE3'
        }}
        onClick={() => onClick(item.Value)}
        style={{ color: item.ForeColur }}
      >
        <Typography>{item.Name}</Typography>
        <b>
          <Box dangerouslySetInnerHTML={{ __html: item.Text1 }}></Box>
        </b>
      </Card>
    </div>
  );
};

export default CardCalAP;
