import { Card, Typography, Grid, Box, IconButton } from '@mui/material'
import React, { useState } from 'react'
import TableCell from "@mui/material/TableCell";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getDateFormattedDash } from 'src/components/Common/Util';
import CardCal1 from './CardCal1';
function CardCalender1({ ItemList, ClickItem, formattedDate, DefaultValue, ArrayList=[] }) {
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
    let newDate
    if(formattedDate.split(" ").length==2)
      newDate = new Date("1 " +formattedDate)
    else;
      newDate = new Date(formattedDate);
      newDate.setMonth(newDate.getMonth() + value);
    ClickItem(getDateFormattedDash(newDate));
  };

  return (
    <Box  p={2}>
      <Box sx={{ display:"flex" , alignItems: "center", justifyContent:"space-between"}}>
        <IconButton onClick={() => clickPrevNextMonth(-1)} sx={{ float: 'left' }}>
          <Card  >
            <ArrowBackIosNewIcon />
          </Card>
        </IconButton>
       <Typography sx={{fontWeight:"bold"}}>{formattedDate}</Typography> 

        <IconButton onClick={() => clickPrevNextMonth(1)} sx={{ float: 'right' }}>
          <Card >
            <ArrowForwardIosIcon />
          </Card>
        </IconButton>
        </Box>
        <Grid container>
          {ArrayList.map((item, i) => (
            <>

              <Grid item xs={1.71} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography
                  key={i}
                  sx={{ textTransform: "capitalize" }}

                >
                  {" "}
                  <b>{item.Header}</b>
                </Typography>
              </Grid>

            </>

          ))}

        </Grid>


    
      <br></br>
      <Grid container columnSpacing={1} rowSpacing={1}>
        {ItemList.map((item, i) => {
          return (
            <Grid item xs={2} sx={{ textAlign: "center" }} key={i}>

              <CardCal1 item={item} clickItem={() => ClickItem(item.Value)} DefaultValue={DefaultValue} />
            </Grid>
          )
        })
        }
      </Grid>
    </Box>
  )

}
export default CardCalender1