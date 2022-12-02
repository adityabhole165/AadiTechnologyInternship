import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const ListCard = ({itemList, clickItem, selectedItem}) => {
    const [color,setColor] = useState("")
  return (
    <div>{
        itemList?.map((item,index)=> ( 
            <Button key={index}
             variant={selectedItem==item.Name?'contained':'outlined'} 
             startIcon={item.IsAnswered && <CheckCircleIcon sx={{color:'green'}}/>}
             onClick={()=>{clickItem(item.Name)}}>
                {item.Name}
            </Button>
            )   )
    }
    </div>
  )
}

export default ListCard