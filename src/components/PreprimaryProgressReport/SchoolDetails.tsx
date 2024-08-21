import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const SchoolDetails = ({ USFillSchoolDetails }) => {
    return (
        <Box  sx={{pt:2, background: 'white' }}>
            <Grid container spacing={3}>
                {USFillSchoolDetails.map((detail) => (
                    <Grid item xs={12} key={detail.UserId}>
                        <Box sx={{
                            backgroundColor: '#F0F0F0',
                            textAlign: 'center',  
                             borderLeft: '1px solid lightgrey', 
                             borderRight: '1px solid lightgrey'   
                        }} >
                            <hr />
                            <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={0}>

                                {detail.OrganizationName}

                            </Typography>
                            <hr />
                            <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={0} >

                                {detail.School_Name}

                            </Typography>
                            <hr />
                            <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={0}>

                                Progress Report

                            </Typography>
                            <hr />


                        </Box>


                    </Grid>
                ))}
            </Grid>
        </Box>


    )
}

export default SchoolDetails