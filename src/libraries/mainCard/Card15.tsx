import { Box, Card, Grid } from '@mui/material'
import React from 'react'
import { AttachmentIcon1, CardD, CardDetail, CardDetail1, CardDetail2, CardDetail3, CardDetail5, CardDetail7, CardDetail9, DateWidth, DateWidth1 } from '../styled/CardStyle';


const Card15 = ({ text1, text2 }) => {
    
    return (
        <Box p={1}>
            <CardDetail> <CardDetail3><b>User Name: </b>{text2}</CardDetail3></CardDetail>
            <CardDetail2 ><b>Read Date/Time: </b>{text1} </CardDetail2>
        </Box>
    )
}

export default Card15