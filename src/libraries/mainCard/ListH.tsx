import React, { useState } from 'react'
import ErrorMessages from '../ErrorMessages/ErrorMessages'
import CardH from './CardH'
import { Grid , Box  } from '@mui/material'

function ListH({itemList,ClickItem = undefined }) {
 
   
  return (
    <div>
       
       {
       (itemList.length == 0)
       ?
       <ErrorMessages Error={'No records found'} />
       :
       itemList.map((item,i)=>(
        
       <Box key={i}>
      <CardH Header={item.Header} Text1={item.Text1} Text2={item.TextH3} Text3={item.Text2}   Color={item.backgroundColor} ClickItem={()=>ClickItem(item.linkPath)}/>
       </Box>

       ))}   
      
           
          
    
  </div>
  )
}

export default ListH