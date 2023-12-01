import { Typography, Card, Box } from '@mui/material'
import React, { useState } from 'react'

function CardCal({ item, clickItem, DefaultValue, options = undefined }) {
  
  const [isHovered, setIsHovered] = useState(false);
  const fourcolour = ["", "red", "green", "blue", "gray", "orange"]


  const [color, setColor] = useState([]);


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const onClick = (Value) => {
    if (item.IsClickable)
      clickItem(Value)
  }


  return (

    <div>

      <Card sx={{
        height: "60px", alignItems: "center", justifyContent: "center", cursor: 'pointer',
        backgroundColor: item.Value == DefaultValue ? "yellow" : item.BackgroundColor,
      }} onClick={() => onClick(item.Value)} style={{ color: item.ForeColur }}>

        <Typography sx={{ color: item.ForeColur }}>
          {item.Name}
        </Typography>
        <Typography sx={{color:item.ForeColur}}  dangerouslySetInnerHTML={{ __html: item.Text1}}>
          
        </Typography>
      </Card>

    </div>


  )
}

export default CardCal