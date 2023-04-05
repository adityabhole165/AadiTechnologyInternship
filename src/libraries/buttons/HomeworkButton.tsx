import { Button } from '@mui/material'
import React from 'react'
import { ListStyle } from '../styled/CardStyle'


const ButtonHomework = ({Item,ClickItem}) => {
  const onClick=()=>{
    Item = {...Item,IsActive:Item.IsActive?Item.IsActive:!Item.IsActive}
    ClickItem(Item)}
  
    return (
    
    <div>
    
        <ListStyle sx={{color:Item.IsActive  ? "red" : "black"}} textAlign={"center"} 
        onClick={onClick}  >
            {Item.Name}
            </ListStyle>
           
            
    </div>
  )
}

export default ButtonHomework