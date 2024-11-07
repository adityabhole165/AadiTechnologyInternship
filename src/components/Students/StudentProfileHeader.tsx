import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';

const StudentProfileHeader: React.FC = () => {
    return (
        <Grid container spacing={2} sx={{ padding: '1px' }}>
        {/* Left Side - Student Photo, Name, Class */}
        <Grid item xs={12} sm={8} container alignItems="center">
            <Avatar
                alt="Student Photo"
                src="/path-to-student-photo.jpg" // Replace with actual photo URL
                sx={{ width: 80, height: 80, marginRight: '16px' }}
            />
            <div>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Aadi Tech</Typography>
                <Typography variant="subtitle1">Class: 5th Grade</Typography>
                <Typography variant="subtitle1">Roll Number: 2024</Typography>
                <Typography variant="subtitle1">Registration Number: 12344</Typography>
            </div>
        </Grid>
    
        {/* Right Side - Confirmation and Update Info */}
        <Grid item  xs={6} sm={4} container direction="column" justifyContent="flex-start" alignItems="flex-center">
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
                <b>Confirmed by:</b> Ms. Pallavi A. Shilimkar on 16 Jan 2019 10:30 AM
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'left'}}>
                <b> Confirmed by:</b> Ms. Manisha J. Mohite on 27 May 2024 11:45 AM
            </Typography>   
            <Typography variant="body1" sx={{ textAlign: 'left',}}>
                <b>Admitted In:</b> Nursery
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'left',  }}>
                <b> Residence Type:</b> NA
            </Typography>
           
        </Grid>
    </Grid>
    );
};

export default StudentProfileHeader;
