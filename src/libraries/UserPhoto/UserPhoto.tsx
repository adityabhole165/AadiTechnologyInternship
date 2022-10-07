
import React from 'react';
import { Avatar } from '@mui/material';


function UserPhoto({ alt, width, height, ImgUrl }) {
  return (
    <div>
      <Avatar sx={{ width: { width }, height: { height } }}>
        <img src={`data:image/png;base64,${ImgUrl}`} alt={alt} object-fit="cover" 
   />
      </Avatar>
    </div>
  );
}

export default UserPhoto;
