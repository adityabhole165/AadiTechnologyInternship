import { Typography, Card } from '@mui/material'
import React, { useState } from 'react'

function CardCal({ item, clickItem, options=undefined }) {
  const arrBackgroundColor = ["","red","green","blue"]
  const arrWeekend = ["sat", "sun"] 
  const selectColor = "yellow"
  const isMouseOver = true
  const [isHovered, setIsHovered] = useState(false);
  const onClick = () => {
    item = { ...item, IsActive: item.IsActive ? item.IsActive : !item.IsActive }
    clickItem(item)
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
    <div>
      <Card sx={{
        backgroundColor: arrBackgroundColor[item.category], height: "40px",width:"40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer', ':hover': {
          backgroundColor: isHovered ? 'pink' : null,
        },
      }} onClick={onClick} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} >
        <Typography sx={{ backgroundColor: item.IsActive ? "yellow" : "", padding: item.IsActive ? "40px" : null }}>
          {item.Name}
        </Typography>

      </Card>


    </div>
  )
}

export default CardCal