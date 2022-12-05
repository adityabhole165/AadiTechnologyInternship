import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import PhotoCard from '../card/PhotoCard'
import PrevNextNav from '../card/PrevNextNav'

const PhotoCarausel = ({ item, maxLength, index, clickClose, clickPhotoIndex }) => {
    let screenWidth = window.innerHeight;

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <PrevNextNav maxLength={maxLength} index={index} clickClose={clickClose}
                        clickPhotoIndex={clickPhotoIndex}></PrevNextNav>
                </Grid><Grid item xs={12}>
                    <Box justifyContent="center" display="flex" alignItems="center"
                        sx={{ bgcolor: 'black', maxHeight: screenWidth * 0.7, minHeight: screenWidth * 0.7 }} >
                        <PhotoCard item={item}></PhotoCard>
                    </Box>
                </Grid>
                <Grid item xs={12} justifyContent="center" display="flex" alignItems="center">
                    {item.Name}
                </Grid>
            </Grid>
        </>
    )
}

export default PhotoCarausel