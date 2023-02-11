import React from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import {IconButton, Typography,Grid} from "@mui/material";
import { ListStyle } from '../styled/CardStyle';
const SingleSelectButton=({item, clickItem})=> {
  
    const onClick=()=>{
    item = {...item,IsActive:!item.IsActive}
    clickItem(item)}
return (
    <div>
  
      <ListStyle color={item.IsActive?'info':null} onClick={onClick}>
      <Typography>{item.Name}</Typography>
      </ListStyle>
   
     
   </div>
  )
}
export default SingleSelectButton;
