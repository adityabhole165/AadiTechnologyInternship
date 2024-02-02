import { Card, Typography, Grid, Box, IconButton, TableCell } from '@mui/material'
import React, { useState } from 'react'
import CardCal from './CardCal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
function CardCalenderList({ ItemList, ClickItem, handlePrevMonth, handleNextMonth, formattedDate, DefaultValue, ArrayList }) {
  const yearStyle = {
    fontSize: '40px',
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

  const getDateFromMonth = (formattedDate) => {
    let newDate;
    if (formattedDate.split(" ").length === 2) {
      newDate = new Date("1 " + formattedDate);
    } else {
      newDate = new Date(formattedDate);
    }
    return newDate.getDay() * 1.7;
  }
  
  return (
    <Card component={Box} p={2}>
      <Box sx={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <Box display='flex' justifyContent='space-between'>

          <h1>
            <b>{formattedDate}</b>
          </h1>




          <div>
            <IconButton onClick={() => handlePrevMonth()} sx={{ float: 'left' }}>
              <Card  >
                <ArrowBackIosNewIcon sx={{ mt: 1 }} />
              </Card>
            </IconButton>
            <IconButton onClick={() => handleNextMonth()} sx={{ float: 'right' }}>
              <Card >
                <ArrowForwardIosIcon sx={{ mt: 1 }} />
              </Card>
            </IconButton>
          </div>

        </Box>
        <Grid container columnSpacing={0} rowSpacing={0}>
          {ArrayList.map((item, i) => (

            <Grid item xs={1.7} md={1.7} sx={{ textAlign: "center", pt: 0 }} key={i}>

              <Box sx={{

              }}>
                <Typography sx={{ textTransform: "capitalize", textAlign: "center", fontWeight: "bold" }}>{item.Header}</Typography>
              </Box>
            </Grid>
          ))}
          <Grid item xs={getDateFromMonth(formattedDate)} md={getDateFromMonth(formattedDate)} sx={{ textAlign: "center", pt: 0 }}>-
          </Grid>
          
          {ItemList.map((item, i) => {
            return (
              <Grid item border='0.5px solid #ebebeb' md={1.7} sx={{ textAlign: "center", pt: 0 }} key={i}>

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