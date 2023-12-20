
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Container, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolNoticeBoard from 'src/components/SchoolNoticeBoard/SchoolNoticeBoard';

function SubHeader({ toggleDrawer }) {


  return (
    <div>
      <AppBar position="fixed" sx={{ mt: "90px", zIndex: 1201, backgroundColor: "#aae2cd" }}>
        <Toolbar>

          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ ml: "30px" }}>
            <MenuIcon />
          </IconButton>

{/* <SchoolNoticeBoard/> */}

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SubHeader;
