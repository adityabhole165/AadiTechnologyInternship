import { Box, Card, Grid } from '@mui/material'
import React from 'react'
import { AttachmentIcon1, CardD, CardDetail, CardDetail1, CardDetail2, CardDetail3, CardDetail5, CardDetail7, CardDetail9, DateWidth, DateWidth1 } from '../styled/CardStyle';


const Card15 = ({ text1, text2 }) => {
    const asUserRoleId = sessionStorage.getItem('RoleId');
    const RoleId = asUserRoleId === '3' ? 'Student' :  asUserRoleId === '6' ? 'Admin' : asUserRoleId === '2' ? 'Teacher' : 'Software Coordinator'
    
    return (
        <Box p={2}>
            <CardDetail>
            <CardDetail3><b>User Role: </b>{RoleId}</CardDetail3>
            </CardDetail>
            <CardDetail> <CardDetail3><b>User Name: </b>{text2}</CardDetail3></CardDetail>
           {asUserRoleId !== '3'? null :   <CardDetail> <CardDetail2> <b>Class: </b></CardDetail2></CardDetail>}
            <CardDetail2 ><b>Read Date/Time: </b>{text1} </CardDetail2>
        </Box>
    )
}

export default Card15