import { TableBody, TableRow, TableCell ,Table,Box} from '@mui/material'

import React from 'react'

const Studentdetails = ({USlistStudentsDetails}) => {
  return (
    <Box sx={{ mt: 1, background: 'white' }}>

                         

                          {USlistStudentsDetails.map((subject, index) => (
                            <Table sx={{ border: (theme) => `1px solid ${theme.palette.grey[600]}` }} key={index}>
                              <TableBody>

                                <TableRow sx={{ textAlign: 'center', color: 'primary', border: (theme) => `1px solid ${theme.palette.grey[600]}` }}>
                                  <TableCell colSpan={6} sx={{ textAlign: 'center', fontWeight: 700, color: 'primary', py: 1, fontSize: '18px !important', }}>

                                    {subject.School_Orgn_Name}
                                  </TableCell>
                                </TableRow>


                                <TableRow sx={{ border: (theme) => `1px solid ${theme.palette.grey[600]}` }}>
                                  <TableCell colSpan={6} sx={{ textAlign: 'center', fontWeight: 800, color: 'black', py: 1, fontSize: '26px !important', }}>
                                    {subject.School_Name}
                                  </TableCell>
                                </TableRow>


                                <TableRow sx={{ border: (theme) => `1px solid ${theme.palette.grey[600]}` }}>
                                  <TableCell colSpan={6} sx={{ textAlign: 'center', fontWeight: 700, color: 'black', py: 1, fontSize: '18px !important', }}>

                                    Progress Report
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          ))}


                          <Table>
                            <TableBody>
                              {USlistStudentsDetails.map((item) => {
                                return (
                                  <TableRow sx={{ bgcolor: '#38548A' }}>
                                    <TableCell sx={{ py: 1.5, textAlign: 'center', color: 'white' }}><b>Roll No: </b>{item.Roll_No} </TableCell>
                                    <TableCell sx={{ py: 1.5, textAlign: 'center', color: 'white' }}><b>Name: </b> {item.Student_Name}	</TableCell>
                                    <TableCell sx={{ py: 1.5, textAlign: 'center', color: 'white' }}><b>Class: </b> {item.Standard_Name} - {item.Division_Name}	</TableCell>
                                    <TableCell sx={{ py: 1.5, textAlign: 'center', color: 'white' }}><b>Year: </b> {item.Academic_Year}	</TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                        </Box>
  )
}

export default Studentdetails