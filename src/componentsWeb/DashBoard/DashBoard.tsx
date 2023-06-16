import React from 'react'
import { Container, Grid } from '@mui/material';
import CardDahContainer from 'src/librariesWeb/CardDashContainer';
import CardDashContainer2 from 'src/librariesWeb/CardDashContanier2';
import CardDashContainer3 from 'src/librariesWeb/CardDashContainer3';




function DashBoard() {
    return (
        <Container maxWidth={'xl'}>
             <Grid container spacing={2} mt={2}>
                <Grid item md={12} lg={6}>
                    <CardDahContainer />
                </Grid>
                <Grid item sm={12} md={6} lg={3}>
                    <CardDashContainer2 />
                </Grid>
                <Grid item sm={12} md={6} lg={3}>
                    <CardDashContainer3 />
                </Grid>
            </Grid>
        </Container>
    )
}

export default DashBoard