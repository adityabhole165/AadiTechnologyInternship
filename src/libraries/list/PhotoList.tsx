import { Grid } from '@mui/material'
import React from 'react'
import PhotoCard from '../card/PhotoCard'

const PhotoList = ({ PhotoList, clickPhoto }) => {
    return (
        <Grid container>{
            PhotoList.map((item, index) => (
                <Grid item xs={6} md={4} key={index} onClick={()=>{clickPhoto(index)}}>
                    <PhotoCard item={item}></PhotoCard>
                </Grid>
            ))
        }</Grid>
    )
}

export default PhotoList