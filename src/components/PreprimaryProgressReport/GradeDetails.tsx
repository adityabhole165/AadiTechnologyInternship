import { Typography, TableContainer, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import React from 'react'

const GradeDetails = ({GradeDetailsfilteredAndSortedData}) => {
  return (
    <>
    <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} mt={2}>

    Key to Curricular and Co-Curricular

</Typography>
<TableContainer component={Box} >
    <Table aria-label="simple table" sx={{ border: '1px solid lightgrey' }}>
        <TableHead>
            <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                <TableCell sx={{
                    textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                    py: 1
                }}>Grade Name</TableCell>
                <TableCell sx={{
                    textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                    py: 1
                }}>Description</TableCell>
              
            </TableRow>
        </TableHead>
        <TableBody>
            {GradeDetailsfilteredAndSortedData.map((row) => (
                <TableRow key={row.GradeId}>
                    <TableCell sx={{py:1}}>{row.GradeName}</TableCell>
                    <TableCell sx={{py:1}}>{row.Description}</TableCell>  
                </TableRow>
            ))}
        </TableBody> 
    </Table>
</TableContainer>
<Box mt={1}>
<Table aria-label="simple table" sx={{ border: '1px solid lightgrey' }}>
    <TableBody>
<TableRow sx={{ bgcolor: '#F0F0F0', border: '1px solid lightgrey' }}>
<TableCell sx={{ textAlign: 'left', py:1, color:'black', p:1}}><b>Note :&nbsp; </b> Ab - Absent &nbsp; &nbsp; &nbsp;  Ex - Exempted </TableCell>
</TableRow>
</TableBody>
</Table>
</Box>
</>
  )
}

export default GradeDetails