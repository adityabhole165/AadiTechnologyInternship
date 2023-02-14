import React from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import {IconButton, Typography,Grid, Avatar,Box} from "@mui/material";
import { ListStyle, NewStyle } from '../styled/CardStyle';
const SingleSelectButton=({item, clickItem})=> {
  
    const onClick=()=>{
    item = {...item,IsActive:!item.IsActive}
    clickItem(item)}
return (
    <div>
     <NewStyle color={item.IsActive?'info':null} onClick={onClick} >
      <IconButton>
      <Avatar src={item.ImgUrl}  />
      </IconButton>
      <Typography >{item.Name}</Typography>
      </NewStyle>
   </div>
  )
}
export default SingleSelectButton;
