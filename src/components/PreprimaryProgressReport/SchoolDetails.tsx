import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const SchoolDetails = ({ USFillSchoolDetails }) => {
    return (
        <Box  sx={{pt:2, background: 'white' }}>
            
            {USFillSchoolDetails.map((subject, index) => (
                            <Table sx={{ border: (theme) => `1px solid ${theme.palette.grey[600]}` }} key={index}>
                              <TableBody>

                                <TableRow sx={{ textAlign: 'center', color: 'primary', border: (theme) => `1px solid ${theme.palette.grey[600]}` }}>
                                  <TableCell colSpan={6} sx={{ textAlign: 'center', fontWeight: 700, color: 'primary', py: 1, fontSize: '18px !important', }}>

                                    {subject.OrganizationName}
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

        </Box>


    )
}

export default SchoolDetails