import CloseTwoTone from "@mui/icons-material/CloseTwoTone";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import DataTable from "src/components/DataTable";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MissingAttendanceDialog = ({
    open, setOpen
}: Props) => {
    const missingAttendanceColumns = [
        {
            id: 'classTeacherName',
            label: 'Class Teacher Name',
            renderCell: (rowData) => rowData.classTeacherName
        },
        {
            id: 'class',
            label: 'Class',
            renderCell: (rowData) => rowData.class
        },
        {
            id: 'missingDays',
            label: 'Missing Days',
            renderCell: (rowData) => rowData.missingDays
        }
    ];
    const missingAttendanceRows = [
        {
            classTeacherName: 'Ms. Afreen A. Shaikh',
            class: '7-B',
            missingDays: '76'
        },
    ]

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth={"sm"}
        >
            <DialogTitle sx={{ fontSize: '20px !important', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Missing Attendance Alert(s)
                <IconButton
                    onClick={() => setOpen(false)}
                    color="error"
                >
                    <CloseTwoTone />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Alert variant="filled" color={"info"} icon={<></>} sx={{ boxShadow: 'none' }}>
                    This is the class wise missing attendance list till Yesterday. Click on the day count link under Missing Days to view missing attendance dates.
                </Alert>
                <Box mt={2}>
                    <DataTable
                        columns={missingAttendanceColumns}
                        data={missingAttendanceRows}
                        isLoading={false}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant={"text"} color={"error"}
                    onClick={() => setOpen(false)}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MissingAttendanceDialog