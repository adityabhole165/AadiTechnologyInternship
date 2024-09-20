import { Avatar, Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Header from './Header';

const Profile: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    const UserName = sessionStorage.getItem('StudentName') || '-';
    const DesignationName = sessionStorage.getItem('DesignationName') || '-';
    const ClassTeacher = sessionStorage.getItem('ClassName') || '-';
    const MobileNumber = sessionStorage.getItem('MobileNumber') || '-';
    const ImgUrl = sessionStorage.getItem('PhotoFilePath');
    const UserLoginDetails1 = localStorage.getItem('UserLoginDetails1');
    const userPhoto =
        ImgUrl && ImgUrl.length !== 0
            ? 'data:image/png;base64,' + ImgUrl
            : '/imges/defualtUser.jpg';


    return (
        <Box sx={{ height:'382px', maxWidth:'50', p: 1, backgroundColor: 'white'}}>
            <Grid container>
                <Grid item xs={12}>
                    <Header Title="Teacher Details" />
                </Grid>
                <Grid item md={12} mt={2} ml={17}>
                    <Avatar src={userPhoto}
                        alt="Profile Picture" sx={{ width: 170, height: 170, }}
                    />
                </Grid>
                <Grid item md={12} sx={{ p: 2}} >
                    <Typography variant="h4" align='center'>{UserName}</Typography>
                    <Typography variant="subtitle1" align='center'>{DesignationName} ({ClassTeacher})</Typography>
                    <Typography variant="body1" align='center'>{MobileNumber}</Typography>
                    <Typography align='center'><br /><b>Last Login:</b> {UserLoginDetails1}</Typography> 
                    </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
