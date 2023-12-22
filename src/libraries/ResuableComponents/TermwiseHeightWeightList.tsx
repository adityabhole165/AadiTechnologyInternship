import React from 'react';
import { Grid, Paper, TextField, Typography } from '@mui/material';
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TermwiseHeightWeightList = ({ ItemList, onTextChange, onTextChange2, HeaderArray }) => {

  const changeText1 = (value) => {
    // console.log(value)
    ItemList = ItemList.map((item) => {
      return item.Id === value.Id ?
        { ...item, Text3: value.Value } :
        item
    });
    onTextChange2(ItemList)
  }
  const changeText2 = (value) => {
    // console.log(value)
    ItemList = ItemList.map((item) => {
      return item.Id === value.Id ?
        { ...item, Text4: value.Value } :
        item
    });
    onTextChange2(ItemList)
  }


  return (
    <>
    <div >
      <TableHead>
              <TableRow sx={{ backgroundColor: "#74d15a" }}>
                {HeaderArray.map((item, i) => (
                  <TableCell
                    key={i}
                    sx={{ textTransform: "capitalize" }}
                    align="center"
                  >
                    <b>{item.Header}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            </div>
            <div>


      {ItemList.map((item) => (
        <Paper elevation={1} style={{margin: 5, padding: 2, marginBottom: 5}} key={item.Text1}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="subtitle1">{item.Text1}</Typography>
            </Grid>
            <Grid item xs={3}>

              <Typography  variant="subtitle1"  style={{ color: item.Text5 ==="1" ? 'red' : 'inherit' }}>{item.Text2}</Typography>
            </Grid>
            <Grid item xs={3}>
            <TextField id="outlined-basic" value={item.Text3} variant="outlined" 
            onChange={(e)=>{changeText1({Value:e.target.value,Id: item.Text1})}} />  

            </Grid>
            <Grid item xs={3}>
            <TextField id="outlined-basic" value={item.Text4} variant="outlined" 
                        onChange={(e)=>{changeText2({Value:e.target.value,Id: item.Text1})}} />  

            </Grid>
          </Grid>
        </Paper>
      ))}
      </div>
      </>
  );
};

export default TermwiseHeightWeightList;