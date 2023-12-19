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

      <Card  component={Box} sx={{
        height: "60px",width:"70px", cursor: 'pointer',
        color: item.Value == DefaultValue ? "yellow" : item.BackgroundColor, backgroundColor:"pink"
      }} onClick={() => onClick(item.Value)} style={{ color: item.ForeColur }} py={1}>

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

export default CardCal