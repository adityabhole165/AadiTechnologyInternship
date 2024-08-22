import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React, { useEffect } from "react";

import { ClearIcon } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { IGetAbsentStudentBody, ISchoolIdBody } from "src/interfaces/AbsentStudentPopCp/IAbsentStudent";
import { AbsentStudents, GetSchoolSettings } from "src/requests/AbsentStudentPopCp/ReqAbsentStudent";
import { RootState, useSelector } from "src/store";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AbsentStudentDialog = ({ open, setOpen }: Props) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
        sessionStorage.setItem('hasShownAbsentStudentPopup', 'true');
    };

    const asSchoolId = Number(localStorage.getItem('SchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const UserId = Number(localStorage.getItem('UserId'));

    const ListAbsentStudent = useSelector(
        (state: RootState) => state.AbsentStudent.getlistAbsentStudentDetails
    );

    const UsschoolSettings = useSelector(
        (state: RootState) => state.AbsentStudent.IsGetSchoolSettings
    );

    const ListAbsentStudentBody: IGetAbsentStudentBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asUserId: Number(UserId),
    };
    const AbsentStudentsBody: ISchoolIdBody = {
        asSchoolId: Number(asSchoolId),
    };
    useEffect(() => {
        dispatch(AbsentStudents(ListAbsentStudentBody));
        dispatch(GetSchoolSettings(AbsentStudentsBody));
    }, []);

    const absentStudentColumns = [
        {
            id: 'enrollmentNo',
            label: 'Enrollment No.',
            renderCell: (rowData) => rowData.Text1
        },
        {
            id: 'class',
            label: 'Class',
            renderCell: (rowData) => rowData.Text3
        },

        {
            id: 'rollNo',
            label: 'Roll No.',
            renderCell: (rowData) => rowData.Text2
        },

        {
            id: 'studentName',
            label: 'Student name',
            renderCell: (rowData) => rowData.Text4
        },
    ];

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            //fullWidth
            maxWidth="md"
            PaperProps={{
                sx: {
                    borderRadius: "15px",
                }
            }}
        >
            <DialogTitle sx={{ bgcolor: '#223354' }}>
                <ClearIcon onClick={handleClose}
                    sx={{
                        color: 'white',
                        borderRadius: '7px',
                        position: 'absolute',
                        top: '5px',
                        right: '8px',
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'red',
                        }
                    }} />

            </DialogTitle>
            <Typography variant="h3" sx={{ pt: 2, pl: 2 }}>
                Absent Student Details
            </Typography>
            <DialogContent >
                <Box
                    sx={{
                        backgroundColor: (theme) => theme.palette.info.main,
                        color: (theme) => theme.palette.common.black,
                        padding: '10px 18px',
                        boxShadow: 'none',
                         fontSize: '14px'
                    }}
                >
                    This is the absent students list who is absent from last {UsschoolSettings} working days.
                </Box>

                <Box mt={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, width: '100%', textAlign: 'center' }}>
                        <TableHead>
                            <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                {absentStudentColumns.map((column, index) => (
                                    <TableCell key={column.id} sx={{ textTransform: 'capitalize', color: 'white', textAlign: 'left', whiteSpace: 'nowrap' }} >
                                        <b>{column.label}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ListAbsentStudent.map((rowData) => (
                                <React.Fragment key={rowData.Id}>
                                    <TableRow>
                                        {absentStudentColumns.map((column) => (
                                            <TableCell key={column.id} sx={{ paddingTop: '10px', paddingBottom: '10px', textAlign: column.id === 'rollNo' ? 'center' : 'left', whiteSpace: 'nowrap' }}>
                                                {column.renderCell(rowData)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default AbsentStudentDialog;
