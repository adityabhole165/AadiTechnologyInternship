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
        <Box sx={{ height:'250px', p: 1, backgroundColor: 'white'}}>
            <Grid container>
                <Grid item xs={12}>
                    <Header Title="Teacher Details" />
                </Grid>
                <Grid item md={4} mt={2} >
                    <Avatar src={userPhoto}
                        alt="Profile Picture" sx={{ width: 150, height: 150, }}
                    />
                </Grid>
                <Grid item md={8} sx={{ p: 3 }}>
                    <Typography variant="h4">{UserName}</Typography>
                    <Typography variant="subtitle1">{DesignationName} ({ClassTeacher})</Typography>
                    <Typography variant="body1">{MobileNumber}</Typography>
                    <br /><b>Last Login:</b> {UserLoginDetails1}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
