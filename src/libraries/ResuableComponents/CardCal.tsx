import { Typography, Card, Box } from '@mui/material'
import { clamp } from 'date-fns';
import React, { useState } from 'react'

function CardCal({ item, clickItem, DefaultValue, options = undefined }) {
  
  const [isHovered, setIsHovered] = useState(false);
  const fourcolour = ["", "red", "green", "blue", "gray", "orange"]

    const bg ={
      p : 'rgb(239, 250, 237)',
      a: 'rgb(250, 238, 237)', 
      h : 'rgb(227, 196, 193)',
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
      p : 'rgb(14, 240, 14)',
      a: 'rgb(245, 17, 17)', 
      Holiday : 'success',
       Weekend:'secondary',
      outside :'warning',
      late: 'info',
      n : 'rgb(', 
    }
  
    const cardStyle= {
     
       
     
     fontSize :'40px',
     
     
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


  return (

    <div>

      <Card  component={Box} py={0} my={0} sx={{backgroundColor:bg[item.Text1.split('')[0].toLowerCase()],color:color[item.Text1.split('')[0].toLowerCase()], ...cardStyle, fontWeight:'700'}} textAlign='center' display='flex'  alignItems='center' justifyContent='center'>
           <Box dangerouslySetInnerHTML={{ __html: item.Name}}>
          </Box>
        {/* <Typography sx={{color: color[String(item.Text1).split('')[0].toLowerCase()]}}    >
          <b>

          {item.Text1}
          </b>
        </Typography> */}
      
        <b>
        </b>
    
      </Card>

    </div>


  )
}

export default CardCal