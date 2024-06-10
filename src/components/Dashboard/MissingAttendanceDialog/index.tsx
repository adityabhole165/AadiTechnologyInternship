import CloseTwoTone from "@mui/icons-material/CloseTwoTone";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import DataTable from "src/components/DataTable";
import {
    IMissingattendancealeartDateBody,
    IMissingattendancealeartNameBody
} from 'src/interfaces/MissAttendaceAleart/IMissingAttendaceAleart';
import { RootState } from 'src/store';

import {
    MissingAttenDateAleart,
    MissingAttenNameAleart
} from 'src/requests/MissingAttendanceAleart/ReqMissAttendAleart';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MissingAttendanceDialog = ({ open, setOpen }: Props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [missingDay, setMissingDay] = useState(null);
    const [showMissingDates, setShowMissingDates] = useState(false);

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const asUserId = Number(sessionStorage.getItem('Id'));

    const MissingName = useSelector((state: RootState) => state.MissingAttendanceAleart.MissingattendName);
    const MissingDate = useSelector((state: RootState) => state.MissingAttendanceAleart.Missingattenddate);

    const MissingNameBody: IMissingattendancealeartNameBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asUserId: Number(asUserId),
        asStandardDivisionId: null,
        asDate: null
    };

    const MissingDayBody: IMissingattendancealeartDateBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asUserId: Number(asUserId),
        asStandardDivisionId: Number(asStandardDivisionId),
        asDate: null
    };

    useEffect(() => {
        dispatch(MissingAttenNameAleart(MissingNameBody));
    }, []);

    useEffect(() => {
        dispatch(MissingAttenDateAleart(MissingDayBody));
    }, []);

    // useEffect(() => {
    //     if (MissingDate && MissingDate.length < 1) {
    //         setOpen(false);
    //     }
    // }, [MissingDate, setOpen]);

    const clickMissingDay = (value) => {
        setMissingDay(value);
        setShowMissingDates(true);
    };

    const handleCloseMissingDates = () => {
        setShowMissingDates(false);
    };

    const missingAttendanceColumns = [
        {
            id: 'classTeacherName',
            label: 'Class Teacher Name',
            renderCell: (rowData) => rowData.Name
        },
        {
            id: 'class',
            label: 'Class',
            renderCell: (rowData) => rowData.Id
        },

        {
            id: 'missingDays',
            label: 'Missing Days',
            renderCell: (rowData) => (
                <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                        handleCloseMissingDates();
                        clickMissingDay(rowData.Value);
                    }}
                >
                    {rowData.Value}
                </Button>
            )
        },
    ];

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
                    This is the class-wise missing attendance list till Yesterday. Click on the day count link under Missing Days to view missing attendance dates.
                </Alert>
                {showMissingDates && (
                        <Box mt={2}>
                           
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Table aria-label="simple table" sx={{ width: '200px', textAlign: 'center' }}>
                                    <TableHead>
                                        <TableRow
                                            sx={{
                                                background: (theme) => theme.palette.secondary.main,
                                                color: (theme) => theme.palette.common.white,
                                            }}
                                        >
                                            <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                                <b>Missing Attendance Dates </b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {MissingDate.map((dateItem, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                                    {dateItem.Name}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                            <Button variant="text" color="error" onClick={handleCloseMissingDates}>
                                Cancel
                            </Button>
                        </Box>
                    )}
                <Box mt={2}>

                    <DataTable
                        columns={missingAttendanceColumns}
                        data={MissingName}
                        isLoading={false}
                    />
                  
                </Box>

            </DialogContent>
            <DialogActions>
                <Button variant={"text"} color={"error"} onClick={() => setOpen(false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MissingAttendanceDialog;








