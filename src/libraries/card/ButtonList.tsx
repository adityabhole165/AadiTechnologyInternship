import React from 'react';
import { Grid } from '@mui/material';
import SingleSelectButton from './SingleSelectButton';
function ButtonList({itemList,clickItem}) {
    
    const onClick=(value)=>{
        console.log(value,"value")
          itemList = itemList.map((item) =>{
            return item.Id === value.Id? 
            value:
            {...item,IsActive:false}
          }) ;
          clickItem(itemList)}

  return (
    <div>
        <Grid container spacing={2}>
           {itemList.map((item, i)=>(
            <Grid item xs={4}  key={i}>
              <SingleSelectButton item={item} clickItem={onClick} />
            </Grid>
            ))}
        </Grid>
    </div>
  )
}

export default ButtonList
