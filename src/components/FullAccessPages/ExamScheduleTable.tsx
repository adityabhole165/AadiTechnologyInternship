import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const ExamScheduleTable = ({ headerArray, subHeaderArray, markDetailsList, ClickSchedule }) => (
    <Box sx={{ overflowX: 'auto', maxWidth: '100%' }}>
        {/* Wrapper Box to enable horizontal scrolling */}
        <Table
            aria-label="exam schedule table"
            sx={{
                background: (theme) => theme.palette.secondary.main,
                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                overflow: 'hidden',
            }}
        >
            <TableHead>
                {/* First Row: Header titles */}
                <TableRow sx={{ textAlign: 'center', }}>
                    <TableCell rowSpan={2}>
                        <Typography variant={"h4"} textAlign={'left'} color={"black"} ml={5}>
                            Subjects &#9654;
                        </Typography>
                        <Typography variant={"h4"} textAlign={'left'} color={"black"}>
                            &#9660; Standards
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    {/* Render Test headers dynamically */}
                    {headerArray.map((header, index) => (
                        <TableCell
                            key={index}
                            sx={{
                                textAlign: 'center',
                                color: 'white',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            <strong>{header.Name}</strong>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>

            <TableBody sx={{ backgroundColor: 'white', alignItems: 'center' }}>
                {/* Map over subHeaderArray for rows */}
                {subHeaderArray.map((subHeader, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {/* Render the Standards (row headers) */}
                        <TableCell
                            sx={{
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                            }}
                        >
                            {subHeader.Name}
                        </TableCell>

                        {/* Render cells for each Test */}
                        {headerArray.map((header, colIndex) => {
                            // Match Standard and Test IDs to fetch appropriate mark details
                            const markDetail =
                                markDetailsList.find(
                                    (item) =>
                                        item.StandardId === subHeader.Text2 && item.TestId === header.text1
                                ) || { Name: 'N/A', Background: 'grey', IsLink: false };

                            return (
                                <TableCell
                                    key={`${rowIndex}-${colIndex}`}
                                    sx={{
                                        backgroundColor: markDetail.Background,
                                        color: markDetail.textColor || 'black',
                                        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontWeight: markDetail.fontWeight || 'normal',
                                    }}
                                >
                                    {markDetail.IsLink ? (
                                        <Typography
                                            sx={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: markDetail.fontWeight, color: markDetail.textColor || 'black', }}
                                            onClick={() => ClickSchedule(markDetail)}
                                        >
                                            {markDetail.Name}
                                        </Typography>
                                    ) : (
                                        markDetail.Name
                                    )}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Box>
);

export default ExamScheduleTable;
