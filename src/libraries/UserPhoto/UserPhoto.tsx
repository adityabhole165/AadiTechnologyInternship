
import React from 'react';
import { Avatar } from '@mui/material';


function UserPhoto({ alt, width, height, ImgUrl }) {
  return (
    <div>
      <Avatar  alt="user.name" src={ImgUrl} sx={{ width: { width }, height: { height },border:"2px solid gray",textAlign:"center" }} variant="square" aria-label="add"   >
      </Avatar>
      
    </div>
  );
}

export default UserPhoto;
