import React from 'react'

import { Container, Card, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const Card32 = ({ Id, Name, enableRow, expand }) => {
    
    const ExpandIcon = ({ expanded }) =>
        expanded ? <ExpandLessIcon sx={{ float: "right" }} /> : <ExpandMoreIcon sx={{ float: "right" }} />;
    
        return (
        <Grid container>
            <Grid item xs={10}
                onClick={() => expand(Id)}>
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
                <ExpandIcon expanded={enableRow === Id} />
            </Grid>
        </Grid>
    )
}
export default Card32;