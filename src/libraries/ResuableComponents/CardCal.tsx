import { Box, Tooltip } from '@mui/material';
import { useState } from 'react';

function CardCal({
  item,
  clickItem,
  DefaultValue,
  options = undefined,
  legendColors,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Convert hex color to RGBA with opacity
  function hexToRGBA(hex: string, opacity: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Define background colors with reduced opacity
  const bg = {
    p: hexToRGBA(legendColors.p, 0.2),
    a: hexToRGBA(legendColors.a, 0.2),
    h: hexToRGBA(legendColors.h, 0.2),
    w: hexToRGBA(legendColors.w, 0.2),
    o: hexToRGBA(legendColors.o, 0.2),
    l: hexToRGBA(legendColors.l, 0.2),
    n: hexToRGBA(legendColors.n, 0.2),
  };

  // Card hover styles
  const cardStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '12px', // Rounded corners for modern appearance
    boxShadow: isHovered
      ? '0px 6px 16px rgba(0, 0, 0, 0.25)' // Enhanced shadow on hover
      : '0px 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Smooth scaling
  };

  // Event handlers
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const onClick = (Value) => {
    if (item.IsClickable) clickItem(Value);
  };

  // Determine the color index based on item.Text1
  const index = item.Text1 ? item.Text1[0].toLowerCase() : 'o';

  return (
    <Box
      sx={{
        backgroundColor: bg[index],
        color: legendColors[index],
        ...cardStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10vh', // Adjustable height for better UX
        width: { xs: '50%', sm: '50%', md: '85%', lg: '92%' }, // Fully responsive width
        margin: 1,
        textAlign: 'center',
        cursor: item.IsClickable ? 'pointer' : 'default',
      }}
      onClick={() => onClick(item.Value)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Tooltip title={item.MouseoverStatus || ''}>
        <Box
          component="span"
          dangerouslySetInnerHTML={{ __html: item.Name }}
          sx={{ fontSize: '16px', fontWeight: '600', whiteSpace: 'nowrap' }}
        />
      </Tooltip>
    </Box>
  );
}

export default CardCal;
