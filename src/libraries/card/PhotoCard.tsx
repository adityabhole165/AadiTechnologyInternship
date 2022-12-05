import { Box, Card, CardMedia, Grid } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

const PhotoCard = ({ item }) => {
    return (<>
        <Grid container>
            <Grid item xs={12} justifyContent="center" display="flex" alignItems="center">
                <CardMedia component="img" image={item.Value} sx={{ padding: "1em 1em 1em 1em" }} />
            </Grid>
            
        </Grid>
    </>)
}

export default PhotoCard