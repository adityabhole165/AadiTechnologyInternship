import { Card, Typography, Grid, Box, IconButton, TableCell } from '@mui/material'
import React, { useState } from 'react'
import CardCal from './CardCal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
function CardCalenderList({ ItemList, ClickItem, handlePrevMonth, handleNextMonth, formattedDate, DefaultValue,ArrayList }) {
   const yearStyle ={
    fontSize :'40px',
   }
  const clickCard = (Value) => {
    const checkStatus = (obj) => {
      return ((obj.Status == undefined ? obj.Text3 : obj.Status) == "Y")
    }
    let returnVal = ItemList.map((obj) =>

      obj.Value === Value ?
        {
          ...obj,
          Status: checkStatus(obj) ? "N" : "Y",
          BackgroundColor: checkStatus(obj) ? "tomato" : "mediumturquoise",
          Text1: checkStatus(obj) ? "Absent" : "Present",

        } :
        obj
    )

    ClickItem(returnVal)
  }


  return (
    <Card component={Box} p={2}>
      <Box sx={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <Box display='flex' justifyContent='space-between'>

        <IconButton onClick={() => handlePrevMonth()} sx={{ float: 'left' }}>
          <Card  >
            <ArrowBackIosNewIcon sx={{mt:1}} />
          </Card>
        </IconButton>
       <h2>
       <b>{formattedDate}</b>
       </h2>
      
    

        <IconButton onClick={() => handleNextMonth()} sx={{ float: 'right' }}>
          <Card >
            <ArrowForwardIosIcon sx={{mt:1}}/>
          </Card>
        </IconButton>
        
        </Box>
        <Grid container columnSpacing={0} rowSpacing={0}>
          {ArrayList.map((item, i) => (
            
         <Grid item xs={1.7} md={1.7} sx={{ textAlign: "center", pt:0 }} key={i}>
              
          <Box  sx={{
       
      }}>      
        <Typography  sx={{ textTransform: "capitalize" , textAlign: "center" , fontWeight:"bold"}}>{item.Header}</Typography>
        </Box> 
         </Grid>
          ))}
          {ItemList.map((item, i) => {
          return (
            <Grid item border='1px solid black' md={1.7} sx={{ textAlign: "center" , pt:0}} key={i}>

              <CardCal item={item} clickItem={clickCard} DefaultValue={DefaultValue} />
            </Grid>
          )
        })
        }
        </Grid>
      </Box>
    </Card>
  )
}
export default CardCalenderList