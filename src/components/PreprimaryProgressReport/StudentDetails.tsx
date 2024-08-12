import { Table, TableBody, TableRow, TableCell } from '@mui/material'
import React from 'react'

const StudentDetails = ({USFillStudentDetails,presentCount,totalCount}) => {
  return (
  
    <Table>
    <TableBody>
        {USFillStudentDetails.map((detail) => (
            <TableRow sx={{ bgcolor: '#38548A' }}>
                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No :  {detail.RollNo} </b></TableCell>
                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name:  {detail.StudentName} </b></TableCell>
                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class :  {detail.Class} </b></TableCell>
                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year :  {detail.AcademicYear} </b></TableCell>
                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Assessment : {detail.Assessment} </b></TableCell>
                <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Attendance :  {presentCount} / {totalCount} </b></TableCell>

            </TableRow>
        ))}
    </TableBody>
</Table>
  )
}

export default StudentDetails