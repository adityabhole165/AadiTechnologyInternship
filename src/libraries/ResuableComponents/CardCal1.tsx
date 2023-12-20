import { Typography, Card, Box } from '@mui/material'
import React, { useState } from 'react'

function CardCal1({ item, clickItem, DefaultValue, options = undefined }) {
  
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
        height: "90px", alignItems: "center", justifyContent: "center", cursor: 'pointer',  boxShadow: "1px 4px 5px 2px rgba(0, 0, 0, 0.4)",
        color: item.Value == DefaultValue ? "yellow" : item.BackgroundColor, width:"90px"
      }} onClick={() => onClick(item.Value)} style={{ color: item.ForeColur}}>

        <Typography >
          {item.Name}
        </Typography>
        <b>
        <Box dangerouslySetInnerHTML={{ __html: item.Text1}}>
          
          </Box>
        </b>
    
      </Card>

    </div>


  )
}

export default CardCal1