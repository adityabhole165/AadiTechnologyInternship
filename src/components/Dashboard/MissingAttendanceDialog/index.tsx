import CloseTwoTone from "@mui/icons-material/CloseTwoTone";
import {
    Accordion,
    AccordionDetails,
    Alert,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
    IMissingattendancealeartDateBody,
    IMissingattendancealeartNameBody
} from 'src/interfaces/MissAttendaceAleart/IMissingAttendaceAleart';
import { RootState } from 'src/store';

import {
    MissingAttenDateAleart,
    MissingAttenNameAleart
} from 'src/requests/MissingAttendanceAleart/ReqMissAttendAleart';
import { ClearIcon } from "@mui/x-date-pickers";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MissingAttendanceDialog = ({ open, setOpen }: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
        sessionStorage.setItem('hasShownMissingAttendancePopup', 'true');
    };
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [ItemNewID, SetItemNewID] = useState(null);
    console.log(ItemNewID);


    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const asUserId = Number(sessionStorage.getItem('Id'));

    const MissingName = useSelector((state: RootState) => state.MissingAttendanceAleart.MissingattendName);
    const MissingDate = useSelector((state: RootState) => state.MissingAttendanceAleart.Missingattenddate);




    const MissingNameBody: IMissingattendancealeartNameBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: asUserId,
        asStandardDivisionId: null,
        asDate: null
    };

    const MissingDayBody: IMissingattendancealeartDateBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: asUserId,
        asStandardDivisionId: ItemNewID,
        asDate: null
    };

    useEffect(() => {
        dispatch(MissingAttenNameAleart(MissingNameBody));
    }, []);

    useEffect(() => {
        dispatch(MissingAttenDateAleart(MissingDayBody));
    }, [ItemNewID]);

    const clickMissingDay = (teacher) => {
        if (selectedTeacher && selectedTeacher.Id === teacher.Id) {
            setSelectedTeacher(null);
        } else {
            setSelectedTeacher(teacher);
        }
    };

    const handleCloseMissingDates = () => {
        setSelectedTeacher(null);
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

                <IconButton onClick={() => SetItemNewID((rowData.StandardDivisionId))}>

                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => clickMissingDay(rowData)}
                    >
                        {rowData.Value}
                    </Button>

                </IconButton>

            )
        },
    ];

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                  borderRadius: "15px",
                }
              }}
        > 
            <DialogTitle sx={{  bgcolor: '#223354'}}>
            <ClearIcon onClick={handleClose}
              sx={{
                color: 'white',
                // background:'white',
                borderRadius: '7px',
                position: 'absolute',
                top: '5px',
                right: '8px',
                cursor: 'pointer',
                '&:hover': {
                  color: 'red',
                  //  backgroundColor: red[100]

                }
              }} />

            </DialogTitle>
            <Typography variant="h3" sx={{pt:2,pl:2}}>               
                 Missing Attendance Alert(s)
            </Typography>
            <DialogContent >
                <Alert variant="filled" color="info" icon={<></>} sx={{ boxShadow: 'none' }}>
                    This is the class-wise missing attendance list till Yesterday. Click on the day count link under Missing Days to view missing attendance dates.
                </Alert>
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Table aria-label="simple table" sx={{ width: '100%', textAlign: 'center' }}>
                        <TableHead>
                            <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                {missingAttendanceColumns.map((column, index) => (
                                    <TableCell key={column.id} sx={{ textTransform: 'capitalize' }} >
                                        <b>{column.label}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {MissingName.map((rowData) => (
                                <React.Fragment key={rowData.Id}>
                                    <TableRow>
                                        {missingAttendanceColumns.map((column) => (
                                            <TableCell key={column.id} sx={{ paddingTop: '0.5px', paddingBottom: '0.5px' }}>
                                                {column.renderCell(rowData)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    {selectedTeacher && selectedTeacher.Id === rowData.Id && (
                                        <TableRow>
                                            <TableCell colSpan={missingAttendanceColumns.length}>
                                                <Accordion expanded>
                                                    <AccordionDetails>
                                                        <Table aria-label="inner table" sx={{ width: '45%', textAlign: 'center', margin: '0 auto' }}>
                                                            <TableHead>
                                                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                                                    <TableCell sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                                                        <b>Missing Attendance Dates</b>
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
                                                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                                            <Button variant="text" color="error" onClick={handleCloseMissingDates}>
                                                                Cancel
                                                            </Button>
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default MissingAttendanceDialog;
