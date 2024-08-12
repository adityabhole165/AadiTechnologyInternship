import { Typography, TableContainer, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import React from 'react'

const GradeDetails = ({GradeDetailsfilteredAndSortedData}) => {
  return (
    <>
    <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} my={2} pl={1}>

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
                    <TableCell>{row.GradeName}</TableCell>
                    <TableCell>{row.Description}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
</>
  )
}

export default GradeDetails