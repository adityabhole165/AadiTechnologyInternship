import { Box, Typography, alpha } from '@mui/material';
import { useState } from 'react';

function CardCal1({
  item,
  clickItem,
  DefaultValue,
  options = undefined,
  assignedDate,
  color
}) {
  const [isHovered, setIsHovered] = useState(false);
  const fourcolour = ['', 'red', 'green', 'blue', 'gray', 'orange'];

  // let color =
  //   stripHtml(item?.Text1) === 'Done'
  //     ? '#00FF0020'
  //     : stripHtml(item?.Text1) === 'Not Done'
  //       ? '#9e9e9e20'
  //       : stripHtml(item?.Text1) === 'Weekend'
  //         ? '#FF000020'
  //         : stripHtml(item?.Text1) === 'Holiday'
  //           ? '#751b1b20'
  //           : stripHtml(item?.Text1) === 'Outside Academic Year'
  //             ? '#f0629220'
  //             : '#f0629220'

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
          //  color: item.Value == DefaultValue ? 'yellow' : item.BackgroundColor,
          backgroundColor:
            item.Value?.replaceAll('-', ' ') === assignedDate
              ? (theme) => alpha(theme.palette.primary.main, 0.2)
              : color,
        }}
        onClick={() => onClick(item.Value)}
        style={{ color: item.ForeColur }}
      >
        <Typography>{item.Name}</Typography>
        <b>
          <Box dangerouslySetInnerHTML={{ __html: item.Text1 }} sx={{ fontSize: { xs: '9px', sm: '14px', md: '16px' } }}></Box>
        </b>
      </Box>
    </div>
  );
}

export default CardCal1;
