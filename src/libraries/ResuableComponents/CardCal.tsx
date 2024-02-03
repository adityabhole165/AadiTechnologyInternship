import { Box } from '@mui/material';
import { useState } from 'react';

function CardCal({
  item,
  clickItem,
  DefaultValue,
  options = undefined,
  legendColors
}) {
  const [isHovered, setIsHovered] = useState(false);
  const fourcolour = ['', 'red', 'green', 'blue', 'gray', 'orange'];

  function hexToRGBA(hex: string, opacity: number) {
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const bg = {
    p: hexToRGBA(legendColors.p, 0.2),
    a: hexToRGBA(legendColors.a, 0.2),
    h: hexToRGBA(legendColors.h, 0.2),
    w: hexToRGBA(legendColors.w, 0.2),
    o: hexToRGBA(legendColors.o, 0.1),
    l: hexToRGBA(legendColors.l, 0.2),
    n: hexToRGBA(legendColors.n, 0.2)
  };
  const data = {
    p: 'Present',
    a: 'Absent',
    h: 'Holiday',
    w: 'Weekwend',
    o: 'OutSide',
    l: 'Late',
    n: 'Not Available'
  };
  // const color = {
  //   p: '#008000',
  //   a: '#b73839',
  //   h: '#a52a2a',
  //   w: '#800080',
  //   o: 'rgba(245,88,245,1)',
  //   l: '#303f9f',
  //   n: 'linear-gradient(135deg, #FCCF31 0%, #F55555 100%)'
  // };

  const cardStyle = {
    heihgt: '15vh',

    fontSize: '20px'
  };

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
        py={0}
        my={0}
        sx={{
          backgroundColor: bg[item.Text1.split('')[0].toLowerCase()],
          color: legendColors[item.Text1.split('')[0].toLowerCase()],
          ...cardStyle,
          fontWeight: '700',
          height: '10vh'
        }}
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box dangerouslySetInnerHTML={{ __html: item.Name }}></Box>
      </Box>
    </div>
  );
}

export default CardCal;
