import { Typography, Card, Box } from '@mui/material'
import { clamp } from 'date-fns';
import React, { useState } from 'react'

function CardCal({ item, clickItem, DefaultValue, options = undefined }) {
  
  const [isHovered, setIsHovered] = useState(false);
  const fourcolour = ["", "red", "green", "blue", "gray", "orange"]

    const bg ={
      p : 'rgb(239, 250, 237)',
      a: 'rgb(250, 238, 237)', 
      h : 'rgba(249, 219, 218, 1)',
      w:'rgb(246, 247, 230)',
      o :'rgb(247, 230, 245)',
      l: 'rgb(234, 230, 247)',
      n : 'rgb(246, 247, 230) ', 
    }
    const data ={
      p : 'Present',
      a: 'Absent', 
      h : 'Holiday',
      w:'Weekwend',
     o: 'OutSide',
     l :'Late',
     n: 'Not Available'
    }
    const color ={
      p : '#008000',
      a: '#FF0001', 
      h : '#a52a2a',
      w :'#800080',
      o :'rgba(245,88,245,1)',
      l: '#303f9f',
      n : 'linear-gradient(135deg, #FCCF31 0%, #F55555 100%)', 
    }
  
    const cardStyle= {
       heihgt :'15vh',
     
     fontSize :'20px',
     
     
    }

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

  
let bgColor = bg[item.Text1.split('').length>0?item.Text1.split('')[0].toLowerCase():'']
let Color = color[item.Text1.split('').length>0?item.Text1.split('')[0].toLowerCase():'']

  return (

    <div>

      <Card  component={Box} py={0} my={0} 
      sx={{backgroundColor:bgColor, color:Color, 
      ...cardStyle, fontWeight:'700', height:'10vh'}} textAlign='center' display='flex'  alignItems='center' justifyContent='center'>
           <Box dangerouslySetInnerHTML={{ __html: item.Name}}>
          </Box>
        
    
      </Card>

    </div>


  )
}

export default CardCal