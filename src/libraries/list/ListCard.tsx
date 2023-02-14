import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const ListCard = ({itemList, clickItem, selectedItem}) => {
    const [color,setColor] = useState("")
  return (
    <div>
       <Box sx={{height:'95px',overflow:'scroll',}}>
      {
        itemList?.map((item,index)=> ( 
            <Button key={index} sx={{ml:'5px',mt:'5px'}}
             variant={selectedItem==item.Name?'contained':'outlined'} 
             startIcon={item.IsAnswered && <CheckCircleIcon sx={{color:'green'}}/>}
             onClick={()=>{clickItem(item.Name)}}>
                {item.SerialNo}
            </Button>
            )   )
    }
     </Box>   
    </div>
  )
}

export default ListCard