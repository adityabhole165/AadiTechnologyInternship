import React from 'react';
import { Container, Card, Typography, Grid } from '@mui/material';


function Card31({ Name, Value }) {
    return (
        <div>
            <Grid container>
                <Grid item xs={10} >
                    <Typography variant="h6" sx={{ py: 1, mx: 1 }}>
                        {Name}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    {Value}
                </Grid>
            </Grid>
        </div>
    )
}
export default Card31