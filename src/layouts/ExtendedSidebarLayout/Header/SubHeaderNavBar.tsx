
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Container, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


function SubHeaderNavBar() {


    return (
        <div>
            <AppBar position="fixed" sx={{ mt: "60px", zIndex: 1201, backgroundColor: "#16a085" }}>
                <Toolbar>




                    <Typography sx={{ ml: "40px", p: "5px", color: "white" }}>Syllabus</Typography><br></br><br></br>
                    <Typography sx={{ ml: "40px", color: "white" }}>Practice WorkSheet</Typography>
                    <Typography sx={{ ml: "40px", color: "white" }}>PTA</Typography>
                    <Typography sx={{ ml: "40px", color: "white" }}>Trasport</Typography>
                    <Typography sx={{ ml: "40px", color: "white" }}>NavBar</Typography>
                    <Typography sx={{ ml: "40px", color: "white" }}>Attendace</Typography>
                    <Typography sx={{ ml: "40px", color: "white" }}>Homework</Typography>


                </Toolbar>
            </AppBar>

        </div>
    );
}

export default SubHeaderNavBar;
