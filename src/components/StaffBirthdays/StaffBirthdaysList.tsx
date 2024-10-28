// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// import { isFutureDateTime, isPastDateTime } from 'src/components/Common/Util';

// function StaffBirthdaysList({
//     BirthdayList,
//     HeaderArray,
// }) {

//     function formatDate(date) {
//         const day = date.getDate().toString().padStart(2, '0');
//         const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//         const month = monthNames[date.getMonth()];
//         const year = date.getFullYear();
//         return `${day}-${month}-${year}`;
//     }

//     const currentDate = new Date();
//     const formattedDate = formatDate(currentDate);

//     return (
//         <div>
//             {BirthdayList.length === 0 ? (
//                 <Box sx={{ backgroundColor: '#D2FDFC' }}>
//                     <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
//                         No birthdays to display.
//                     </Typography>
//                 </Box>
//             ) : (
//                 <TableContainer component={Box}>
//                     <Table aria-label="staff birthdays table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
//                         <TableHead>
//                             <TableRow sx={{ background: (theme) => theme.palette.secondary.main }}>
//                                 {HeaderArray.map((header, i) => (
//                                     <TableCell
//                                         key={i}
//                                         sx={{
//                                             color: (theme) => theme.palette.common.white,
//                                             textAlign: i === 0 ? 'left' : 'center'
//                                         }}
//                                     >
//                                         <b>{header.Header}</b>
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {BirthdayList.map((staff, index) => {
//                                 const birthDate = new Date(staff.BirthDate);
//                                 const formattedBirthDate = formatDate(birthDate);
//                                 const isUpcomingBirthday = isFutureDateTime(birthDate) && !isPastDateTime(birthDate);
//                                 const isToday = formattedBirthDate === formattedDate;

//                                 const backgroundColor = isToday ? '#EFDCC9' : isUpcomingBirthday ? '#F0F8FF' : 'white';
//                                 const rowOpacity = !isUpcomingBirthday && !isToday ? 0.5 : 1;

//                                 return (
//                                     <TableRow key={staff.Id} sx={{ backgroundColor, opacity: rowOpacity }}>
//                                         <TableCell sx={{ textTransform: 'capitalize' }} align="left">
//                                             {staff.Name}
//                                         </TableCell>
//                                         <TableCell align="center">
//                                             {formattedBirthDate}
//                                         </TableCell>
//                                         <TableCell sx={{ textTransform: 'capitalize' }} align="center">
//                                             {staff.Designation}
//                                         </TableCell>
//                                         <TableCell align="center">
//                                             {staff.Email}
//                                         </TableCell>
//                                         <TableCell align="center">
//                                             {staff.Mobile}
//                                         </TableCell>
//                                     </TableRow>
//                                 );
//                             })}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//         </div>
//     );
// }

// export default StaffBirthdaysList;

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { isFutureDateTime, isPastDateTime } from 'src/components/Common/Util';

function StaffBirthdaysList({
    BirthdayList,
    HeaderArray,
}) {

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    return (
        <div>
            {BirthdayList.length === 0 ? (
                <Box sx={{ backgroundColor: '#D2FDFC' }}>
                    <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
                        No birthdays to display.
                    </Typography>
                </Box>
            ) : (
                <TableContainer component={Box}>
                    <Table aria-label="staff birthdays table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
                        <TableHead>
                            <TableRow sx={{ background: (theme) => theme.palette.secondary.main }}>
                                {HeaderArray.map((header, i) => (
                                    <TableCell
                                        key={i}
                                        sx={{
                                            color: (theme) => theme.palette.common.white,
                                            textAlign: i === 0 ? 'left' : 'center',
                                            padding: '10px 10px'  // Reduced padding for header cells
                                        }}
                                    >
                                        <b>{header.Header}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {BirthdayList.map((staff, index) => {
                                const birthDate = new Date(staff.BirthDate);
                                const formattedBirthDate = formatDate(birthDate);
                                const isUpcomingBirthday = isFutureDateTime(birthDate) && !isPastDateTime(birthDate);
                                const isToday = formattedBirthDate === formattedDate;

                                const backgroundColor = isToday ? '#EFDCC9' : isUpcomingBirthday ? '#F0F8FF' : 'white';
                                const rowOpacity = !isUpcomingBirthday && !isToday ? 0.5 : 1;

                                return (
                                    <TableRow
                                        key={staff.Id}
                                        sx={{
                                            backgroundColor,
                                            opacity: rowOpacity,
                                            height: '32px'  // Reduced row height
                                        }}
                                    >
                                        <TableCell sx={{ textTransform: 'capitalize', padding: '8px 8px' }} align="left">
                                            {staff.Name}
                                        </TableCell>
                                        <TableCell sx={{ padding: '8px 8px' }} align="center">
                                            {formattedBirthDate}
                                        </TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', padding: '8px 8px' }} align="center">
                                            {staff.Designation}
                                        </TableCell>
                                        <TableCell sx={{ padding: '8px 8px' }} align="center">
                                            {staff.Email}
                                        </TableCell>
                                        <TableCell sx={{ padding: '8px 8px' }} align="center">
                                            {staff.Mobile}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

export default StaffBirthdaysList;
