import React from 'react'

import { Container, Card, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const Card32 = ({ Id, Name,  expand }) => {
    const [expanded, setExpanded] = useState(false)
    const ExpandIcon = () =>
        expanded ? <ExpandLessIcon sx={{ float: "right" }} /> : <ExpandMoreIcon sx={{ float: "right" }} />;
        const expandFunc= () => {
            console.log(expanded)
            setExpanded(!expanded)
            expand(Id)
        }
        return (
        <Grid container onClick={expandFunc}>
            <Grid item xs={10}>
                <Typography
                    variant="h4"
                    sx={{ py: 1, mx: 1 }}>
                    {Name}
                </Typography>
            </Grid>
            <Grid item xs={2}
                alignItems="center"
                justifyContent="center"
            >
                <ExpandIcon/>
            </Grid>
        </Grid>
    )
}
export default Card32;