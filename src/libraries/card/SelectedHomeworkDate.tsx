import React from 'react'
import { ListStyle } from '../styled/CardStyle'
import { Typography } from '@mui/material'
function SelectedHomeworkDate({item,clickItem}) {
    const onClick=()=>{
        item = {...item,IsActive:item.IsActive?item.IsActive:!item.IsActive}
        clickItem(item)}
  return (
    <div>
    <ListStyle  color={item.IsActive?'info':null} onClick={onClick}>
     <Typography>{item.Name}</Typography>
      </ListStyle>
    </div>
  )
}

export default SelectedHomeworkDate
