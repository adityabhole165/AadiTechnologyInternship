
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Container, Box, Tabs, Tab, Tooltip, ButtonGroup, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SubHeader from './SubHeader';
import NavBarItem from './NavbarItem';

function SubHeaderNavBar( {toggleDrawer}) {
    const [value, setValue] = React.useState('0');
    
    const activeStyle={
       backgroundColor:'white'
   
    }
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };


    return (
        <div>
            <AppBar position="fixed" sx={{ml:'100px', mt: "60px", zIndex: 1201, backgroundColor: "rgb(40, 160, 235)" }}>
                <Toolbar sx={{ml:1}}>





                    {/* <SubHeaderNavBar/> */}




                    <Typography sx={{   p: "5px", color: "white" }}>
                      <Tooltip title='Sidebar'>

                    <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ ml: 0 }}>
                    <MenuIcon />
                    </IconButton>
                      </Tooltip>
                    </Typography>



                   

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor='primary'
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="primary example"
                      >

                        <Tab value='0' label={
                            
                            <Typography sx={{   p: "5px", color: "white" }}>Syllabus</Typography>
                        }>
                        </Tab>
                        <Tab value='1' label={
                            
                            <Typography sx={{   color: "white" }}>Practice WorkSheet</Typography>
                        }>

                        </Tab>
                      
                    <Tab value='3' label={
                        <Typography sx={{  color: "white" }}>Transport</Typography>}></Tab>
                        <Tab value='4' label={
                            <Typography sx={{   color: "white" }}>NavBar</Typography>}></Tab>
                            <Tab value='5' label={
                                <Typography sx={{   color: "white" }}>Attendance</Typography>}></Tab>
                                <Tab value='6' label={
                    <Typography sx={{   color: "white" }}>Homework</Typography>}>

                    </Tab>
                     
                    </Tabs>

                </Toolbar>
            </AppBar>

        </div>
    );
}

export default SubHeaderNavBar;
