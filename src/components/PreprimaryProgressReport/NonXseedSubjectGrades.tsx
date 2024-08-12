import { Typography, TableContainer, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import React from 'react'

const NonXseedSubjectGrades = ({USFillNonXseedSubjectGrades}) => {
  return (
    <div>
        <Typography variant={"h4"} textAlign={'left'} color={"#38548a"} marginY={2} pl={1}>
                    Co-CurricularSubjects
                </Typography>
                <TableContainer component={Box} >
                    <Table aria-label="simple table" sx={{ border: '1px solid lightgrey' }}>
                        <TableHead>
                            <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                <TableCell sx={{
                                    textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                    py: 1
                                }}>Subject</TableCell>
                                <TableCell sx={{
                                    textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                    py: 1
                                }}>Grade</TableCell>
                                <TableCell sx={{
                                    textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                                    py: 1
                                }}>Facilitator's Observation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {USFillNonXseedSubjectGrades.map((row) => (
                                <TableRow key={row.YearwiseStudentId}>
                                    <TableCell>{row.SubjectName}</TableCell>
                                    <TableCell>{row.ShortName}</TableCell>
                                    <TableCell>{row.Observation}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
    </div>
  )
}

export default NonXseedSubjectGrades