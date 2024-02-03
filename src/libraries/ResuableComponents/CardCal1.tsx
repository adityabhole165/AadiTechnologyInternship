import { Box, Typography, alpha } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';

function CardCal1({
  item,
  clickItem,
  DefaultValue,
  options = undefined,
  assignedDate
}) {
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
      <Box
        sx={{
          height: '90px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          cursor: 'pointer',
          // color: item.Value == DefaultValue ? 'yellow' : item.BackgroundColor,
          backgroundColor:
            item.Value === assignedDate
              ? (theme) => alpha(theme.palette.primary.main, 0.2)
              : 'white',
          border: (theme) => `1px solid ${grey[300]}`
        }}
        onClick={() => onClick(item.Value)}
        style={{ color: item.ForeColur }}
      >
        <Typography>{item.Name}</Typography>
        <b>
          <Box dangerouslySetInnerHTML={{ __html: item.Text1 }}></Box>
        </b>
      </Box>
    </div>
  );
}

export default CardCal1;
