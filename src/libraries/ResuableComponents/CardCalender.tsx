import { Card, Typography, Grid, Box, IconButton } from '@mui/material'
import React, { useState } from 'react'
import CardCal from './CardCal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getDateFormattedDash } from 'src/components/Common/Util';
function CardCalender({ ItemList, ClickItem, formattedDate, DefaultValue }) {

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

  const clickPrevNextMonth = (value) => {
    const newDate = new Date(formattedDate);
    newDate.setMonth(newDate.getMonth() + value);

    ClickItem(getDateFormattedDash(newDate));
  };

  return (
    <Card component={Box} p={2}>
      <Box sx={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <IconButton onClick={() => clickPrevNextMonth(-1)} sx={{ float: 'left' }}>
          <Card  >
            <ArrowBackIosNewIcon />
          </Card>
        </IconButton>
        {formattedDate}

        <IconButton onClick={() => clickPrevNextMonth(1)} sx={{ float: 'right' }}>
          <Card >
            <ArrowForwardIosIcon />
          </Card>
        </IconButton>
      </Box>
      <Grid container columnSpacing={1} rowSpacing={1}>
        {ItemList.map((item, i) => {
          return (
            <Grid item xs={2} sx={{ textAlign: "center" }} key={i}>

              <CardCal item={item} clickItem={() => ClickItem(item.Value)} DefaultValue={DefaultValue} />
            </Grid>
          )
        })
        }
      </Grid>
    </Card>
  )
}
export default CardCalender