import { Card, Typography, Grid, Box, IconButton, TableCell } from '@mui/material'
import React, { useState } from 'react'
import CardCal from './CardCal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
function CardCalenderList({ ItemList, ClickItem, handlePrevMonth, handleNextMonth, formattedDate, DefaultValue,ArrayList }) {

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
        <IconButton onClick={() => handlePrevMonth()} sx={{ float: 'left' }}>
          <Card  >
            <ArrowBackIosNewIcon />
          </Card>
        </IconButton>
        <b>{formattedDate}</b>
    

        <IconButton onClick={() => handleNextMonth()} sx={{ float: 'right' }}>
          <Card >
            <ArrowForwardIosIcon />
          </Card>
        </IconButton>
        
        <Grid container columnSpacing={1} rowSpacing={1}>
          {ArrayList.map((item, i) => (
            <>

              <Grid item xs={1.5} md={1.71} sx={{ display: "flex" , alignItems:"center"  }}>
                <TableCell
                  key={i}
                  sx={{ textTransform: "capitalize" }}>
                 
                  <b>{item.Header}</b>
                </TableCell>
              </Grid>
              

            </>

          ))}
          {ItemList.map((item, i) => {
          return (
            <Grid item md={1.71} sx={{ textAlign: "center" }} key={i}>

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