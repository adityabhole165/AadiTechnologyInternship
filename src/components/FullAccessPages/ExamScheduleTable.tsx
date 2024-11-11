import { Box, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
const ExamScheduleTable = ({ headerArray, subHeaderArray, markDetailsList }) => (
    
    <Box sx={{ overflowX: 'auto', maxWidth: '100%',  }}>
        {/* Wrapper Box to enable horizontal scrolling */}
        <Table aria-label="simple table" sx={{ background: (theme) => theme.palette.secondary.main, border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
            <TableHead>
                {/* First Row: Exam and Subject Headings */}
                <TableRow sx={{  textAlign: 'center',  }}>
                    <TableCell rowSpan={2}>
                        <Typography variant={"h4"} textAlign={'left'} color={"black"} ml={5}>
                            Subjects &#9654;
                         </Typography>
                        <Typography variant={"h4"} textAlign={'left'} color={"black"}>
                            &#9660; Standards
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow >
                    {/* Display Headers from headerArray */}
                    {headerArray.map((header, index) => (
                        <TableCell key={index} sx={{ textAlign: 'center', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {header.Name} {/* Displaying the header name dynamically */}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>

            <TableBody sx={{ backgroundColor: 'White', alignItems: 'center', minWidth: 'auto' }}>
                {/* Map over SubHeaderArray to render rows */}
                {subHeaderArray.map((subHeader, rowIndex) => (
                    <TableRow key={rowIndex}>
                        <TableCell sx={{  textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                            {subHeader.Name} {/* Displaying the subheader (e.g. Nursery, Grade 1, etc.) */}
                        </TableCell>

                        {/* Map over MarkDetailsList to render corresponding values */}
                        {markDetailsList.map((markDetail, colIndex) => (
                            <TableCell key={`${rowIndex}-${colIndex}`} sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                             <a href='/extended-sidebar/Teacher/StandardwiseExamSchedule'> {markDetail.Name}</a> {/* Displaying the mark details dynamically */}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Box>
);

export default ExamScheduleTable;
