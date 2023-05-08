import React, { useState } from 'react'
import ErrorMessages from '../ErrorMessages/ErrorMessages'
import CardH from './CardH'
import { Grid , Box , Typography } from '@mui/material'

function ListH({itemList}) {
 
   
  return (
    <div>
       
       {
       (itemList.length == 0)
       ?
       <ErrorMessages Error={'No records found'} />
       :
       itemList.map((item,i)=>(
        
       <Box key={i}>
      <CardH header={item.header} text1={item.text1} text2={item.TextH3} text3={item.text2}   Color={item.backgroundColor}/>
       </Box>

       ))}   
      
           
          
    
  </div>
  )
}

export default ListH