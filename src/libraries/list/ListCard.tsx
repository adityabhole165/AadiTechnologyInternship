import { Avatar, Box, Button, Checkbox, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import FileSelectall from 'src/components/OnlineExam/FileSelectall';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import { BadgeStyle } from '../styled/DashboardStyled';

const ListCard = ({ itemList, clickItem, selectedItem }) => {
  return (
    <div>
      <Grid container>
       <Grid xs={12}>
      <Box 
      sx={{ display: 'flex', flexDirection: 'row', mb: '10px' }}
      >
        {
          itemList?.map((item, index) => (
            <>
              {selectedItem == item.Name ?
                <Avatar sx={{
                  bgcolor: selectedItem == item.Name ? item.IsAnswered ? 'green' : 'blue' : '',
                  width: 24, height: 24, fontSize: '10px', mr: '2px'
                }}
                  onClick={() => { clickItem(item.Name) }}>{item.SerialNo}</Avatar>
                :
                item.IsAnswered ?
                  <Avatar sx={{
                    bgcolor: item.IsAnswered ? 'green' : 'white', border: '3px solid grey',
                    borderRadius: '20px', width: 24, height: 24, fontSize: '10px', mr: '2px'
                  }}
                    onClick={() => { clickItem(item.Name) }} >{item.SerialNo}</Avatar>
                  :
                  <Avatar sx={{
                    bgcolor: 'white', color: 'black', border: '3px solid grey',
                    borderRadius: '20px', width: 24, height: 24, fontSize: '10px', mr: '2px'
                  }}
                    onClick={() => { clickItem(item.Name) }} >{item.SerialNo}</Avatar>
              }
            </>
          ))
        }
      </Box>
      </Grid>
      </Grid>
    </div>
  )
}

export default ListCard