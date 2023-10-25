import { Typography, Card, Box } from '@mui/material'
import React, { useState } from 'react'

function CardCal({ item, clickItem, options = undefined }) {
  const arrBackgroundColor = ["", "red", "green", "blue","gray","orange"]
  const arrWeekend = ["sat", "sun"]
  const selectColor = "yellow"
  const isMouseOver = true
  const [isHovered, setIsHovered] = useState(false);
  const onClick = (IsActive) => {
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
        height: "60px", alignItems: "center", justifyContent: "center", cursor: 'pointer',
        backgroundColor: item.IsActive ? "yellow" : arrBackgroundColor[item.category]
      }} onClick={()=>onClick(item.IsActive)}>

        <Typography sx={{}} >
          {item.Name}
        </Typography>
        <Typography>
          {item.categoryName}
        </Typography>
      </Card>


    </div>
  )
}

export default CardCal