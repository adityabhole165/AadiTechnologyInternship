import { Typography, TableContainer, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import React from 'react'

const XseedRemarks = ({USFillXseedRemarks}) => {
  return (
    <div>


                <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} marginY={2} pl={0}>
                    {USFillXseedRemarks.map((row) => (
                        <Box key={row.YearwiseStudentId} sx={{ display: 'flex', }}>
                            <Box border={1} sx={{ width: '20%', p: 1 }} >  Remark</Box>
                            <Box border={1} sx={{ width: '100%', p: 1 }}> {row.Remark}</Box>
                        </Box>
                    ))}
                </Typography>
    </div>
  )
}

export default XseedRemarks