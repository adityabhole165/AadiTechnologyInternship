import QuestionMark from "@mui/icons-material/QuestionMark";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import CommonPageHeader from "src/components/CommonPageHeader";
import ButtonGroupComponent from "src/libraries/ResuableComponents/ButtonGroupComponent";
import StaffBirthdaysList from "./StaffBirthdaysList";


type Props = {}

const StaffBirthdays = (props: Props) => {
    // Hardcoded data for demonstration purposes
    const staffData = [
        { Id: 1, Name: "John Doe", DOB: "2024-10-29", Designation: "Teacher", Email: "john@example.com", Mobile: "1234567890" },
        { Id: 2, Name: "Jane Smith", DOB: "2024-10-26", Designation: "Assistant Teacher", Email: "jane@example.com", Mobile: "9876543210" },
        { Id: 3, Name: "Alex Johnson", DOB: "2024-10-22", Designation: "Coordinator", Email: "alex@example.com", Mobile: "5556667777" },
        // Add more records as needed for pagination testing
    ];


    const HeaderPublish = [
        { Id: 1, Header: 'Name' },
        { Id: 2, Header: ' DOB	' },
        { Id: 3, Header: 'Designation' },
        { Id: 4, Header: ' Email' },
        { Id: 5, Header: ' Phone No.' },
    ];
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const rowsPerPageOptions = [10, 20, 50];
    const [page, setPage] = useState(1);
    const totalStaffCount = staffData.length;

    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, totalStaffCount);
    const pagecount = Math.ceil(totalStaffCount / rowsPerPage);

    // Pagination handlers
    const PageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset to the first page when changing rows per page
    };

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Staff Birthdays',
                        path: ''
                    }
                ]}
                rightActions={
                    <Box>
                        <Tooltip title={"View upcoming birthdays of staff members"}>
                            <IconButton sx={{
                                bgcolor: 'grey.500',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'grey.600'
                                }
                            }}>
                                <QuestionMark />
                            </IconButton>
                        </Tooltip>
                    </Box>
                }
            />

            <Box sx={{ background: 'white', pt: 1 }}>
                {totalStaffCount > 0 ? (
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                            <Box component="span" fontWeight="fontWeightBold">
                                {startRecord} to {endRecord}
                            </Box>
                            {' '}out of{' '}
                            <Box component="span" fontWeight="fontWeightBold">
                                {totalStaffCount}
                            </Box>{' '}
                            {totalStaffCount === 1 ? 'record' : 'records'}
                        </Typography>
                    </div>
                ) : (
                    <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                        No upcoming birthdays found.
                    </Typography>
                )}

                <Box px={2} pb={2}>
                    <StaffBirthdaysList
                        HeaderArray={HeaderPublish}
                        BirthdayList={staffData}
                    />

                    {totalStaffCount > rowsPerPage && (
                        <ButtonGroupComponent
                            rowsPerPage={rowsPerPage}
                            ChangeRowsPerPage={ChangeRowsPerPage}
                            rowsPerPageOptions={rowsPerPageOptions}
                            PageChange={PageChange}
                            pagecount={pagecount}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default StaffBirthdays;
