// import { Table, TableBody, TableRow, TableCell } from '@mui/material'
// import React from 'react'

// const StudentDetails = ({USFillStudentDetails,presentCount,totalCount}) => {
//   return (

//     <Table>
//     <TableBody>
//         {USFillStudentDetails.map((detail) => (
//             <TableRow sx={{ bgcolor: '#38548A' }}>
//                 <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No :  {detail.RollNo} </b></TableCell>
//                 <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name:  {detail.StudentName} </b></TableCell>
//                 <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class :  {detail.Class} </b></TableCell>
//                 <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year :  {detail.AcademicYear} </b></TableCell>
//                 <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Assessment : {detail.Assessment} </b></TableCell>
//                 <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Attendance :  {presentCount} / {totalCount} </b></TableCell>

//             </TableRow>
//         ))}
//     </TableBody>
// </Table>
//   )
// }

// export default StudentDetails

import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const StudentDetails = ({ USFillStudentDetails, presentCount, totalCount }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: '100%',
        overflowX: 'auto', // Allows horizontal scrolling on small screens
      }}
    >
      <Table>
        <TableBody>
          {USFillStudentDetails.map((detail, index) => (
            <TableRow
              key={index}
              sx={{
                bgcolor: '#38548A',
                display: 'flex',
                flexWrap: 'nowrap', // Ensures all cells stay in a single line
              }}
            >
              <TableCell
                sx={{
                  flex: '0 0 100px', // Fixed width for Roll No
                  minWidth: '100px',
                  textAlign: 'left',
                  whiteSpace: 'nowrap', // Prevent wrapping
                  color: 'white',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                }}
              >
                <b>Roll No: {detail.RollNo}</b>
              </TableCell>
              <TableCell
                sx={{
                  flex: '0 0 300px', // Fixed width for Name
                  minWidth: '300px',
                  textAlign: 'left',
                  whiteSpace: 'nowrap', // Prevent wrapping
                  color: 'white',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                }}
              >
                <b>Name: {detail.StudentName}</b>
              </TableCell>
              <TableCell
                sx={{
                  flex: '1 1 auto', // Flexible width for Class
                  minWidth: '100px',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  color: 'white',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                }}
              >
                <b>Class: {detail.Class}</b>
              </TableCell>
              <TableCell
                sx={{
                  flex: '1 1 auto', // Flexible width for Year
                  minWidth: '100px',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  color: 'white',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                }}
              >
                <b>Year: {detail.AcademicYear}</b>
              </TableCell>
              <TableCell
                sx={{
                  flex: '1 1 auto', // Flexible width for Assessment
                  minWidth: '200px',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  color: 'white',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                }}
              >
                <b>Assessment: {detail.Assessment}</b>
              </TableCell>
              <TableCell
                sx={{
                  flex: '1 1 auto', // Flexible width for Attendance
                  minWidth: '200px',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  color: 'white',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                }}
              >
                <b>Attendance: {presentCount} / {totalCount}</b>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentDetails;
