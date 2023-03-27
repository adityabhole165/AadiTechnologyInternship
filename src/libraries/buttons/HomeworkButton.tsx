import { Button } from '@mui/material'
import React from 'react'


const ButtonHomework = ({Item,ClickItem}) => {
    
  return (
    
    <div>
    
        <Button  sx={{color:Item.IsActive === false ? "black" : "red"}} 
        onClick={() => ClickItem(Item.Value)} >
            {Item.Name}
            </Button>
           
            
    </div>
  )
}

export default ButtonHomework