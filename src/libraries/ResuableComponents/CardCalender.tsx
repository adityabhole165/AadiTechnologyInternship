import { Card, Typography, Grid ,Box} from '@mui/material'
import React, { useState } from 'react'
import CardCal from '../ResuableComponents/CardCal';

function CardCalender({ItemList ,ClickItemList}) {

    const click1=(value)=>{
        console.log(value ,"value")
        ItemList = ItemList.map((item) => {
            return item.id === value.id ?
            value :
              { ...item, IsActive: false }
          });
          ClickItemList(ItemList) 
    }
    
    return (
        <Card component={Box} p={2}>
           <Grid container columnSpacing={1} rowSpacing={1}>
        {ItemList.map((item, i) => (
          <Grid item xs={2} sx={{ textAlign: "center" }} key={i}>
            <CardCal item={item} clickItem={click1} />
          </Grid>
        ))}
      </Grid>





        </Card>
    )
}

export default CardCalender