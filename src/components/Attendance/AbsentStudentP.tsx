import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Dialog, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import grey from '@mui/material/colors/grey';
import { ClearIcon } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IGetAbsentStudentDetailsBody } from 'src/interfaces/AbsentStudentDetails/IAbsentStudentPopup';
import { ISchoolIdBody } from 'src/interfaces/AbsentStudentPopCp/IAbsentStudent';
import { AbsentStudentsandHalfday, ResetgetlistAbsentStudentDetails } from 'src/requests/AbsentStudentDetails/RequestAbsentStudent';
import { GetSchoolSettings } from 'src/requests/AbsentStudentPopCp/ReqAbsentStudent';
import { RootState } from 'src/store';
import { getDateFormatted } from '../Common/Util';

const AbsentStudentP = ({ open, setOpen, ClickCloseDialogbox, Classname, Date, ClassId , saveResponseMessage}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const [date, setDate]: any = useState(getDateFormatted(Date));
    const [classname, setClassname]: any = useState(Classname);

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const UserId = Number(localStorage.getItem('UserId'));

    const ListAbsentStudents = useSelector(
        (state: RootState) => state.AbsentStudentDetail.getlistAbsentStudentDetails
    );

    const UsschoolSettings = useSelector(
        (state: RootState) => state.AbsentStudent.IsGetSchoolSettings
    );



    const AbsentStudentsBody: ISchoolIdBody = {
        asSchoolId: Number(asSchoolId),
    };
    const ListAbsentStudentBody: IGetAbsentStudentDetailsBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asStandardDivId: Number(ClassId),
        asSelectedDate: getDateFormatted(Date),
        asMaxDaysLimit: Number(UsschoolSettings),
    };

    useEffect(() => {
        dispatch(GetSchoolSettings(AbsentStudentsBody));
        dispatch(AbsentStudentsandHalfday(ListAbsentStudentBody));
       

    }, []);



   

    const absentStudentColumns = [
        {
            id: 'studentName',
            label: 'Name',
            renderCell: (rowData) => rowData.Text1
        },
    ];

    // const onSelectSrDate = (value) => {
    //     setStartDate(value);
    // };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth={'sm'}
            PaperProps={{
                sx: {
                    borderRadius: "15px",
                }
            }}
        >
            <DialogTitle
                sx={{
                    backgroundColor: '#324b84',
                    position: 'relative'

                }}
            >
                <Tooltip
                    title={'Displays absent student details.'}
                    placement="bottom-end"
                >
                    <QuestionMark
                        sx={{
                            color: 'white',
                            // background:'white',
                            borderRadius: '10px',
                            position: 'absolute',
                            top: '4px',
                            right: '35px',
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: grey[600] }
                        }}
                    />
                </Tooltip>
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
            <Typography variant="h3" sx={{ pt: 1, pl: 2 }}>
                Absent Student Details
            </Typography>
            <DialogContent >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            sx={{ minWidth: '15vw', bgcolor: '#F0F0F0' }}
                            label={'Class Name'}
                            fullWidth
                            size={"small"}
                            value={classname}
                            InputProps={{
                                readOnly: true,
                            }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            sx={{ minWidth: '15vw', bgcolor: '#F0F0F0' }}
                            label={'Date'}
                            fullWidth
                            size={"small"}
                            value={date}
                            
                            InputProps={{
                                readOnly: true,
                            }} />
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        backgroundColor: (theme) => theme.palette.info.main,
                        color: (theme) => '#0A0A0A',
                        padding: '10px 18px',
                        boxShadow: 'none',
                        fontSize: '14px',
                        mt: 1
                    }}
                >
                    Student(s) is absent for {UsschoolSettings} or more working days.
                </Box>

                {ListAbsentStudents && ListAbsentStudents.length > 0 ? (
                    <Box mt={1} sx={{ justifyContent: 'center' }}>
                        <Typography sx={{ mt: 1, mb: 1 }}>Absent Student(s) :</Typography>
                        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, width: '100%', textAlign: 'center' }}>
                            <TableHead>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                    {absentStudentColumns.map((column, index) => (
                                        <TableCell key={column.id} sx={{py:1, textTransform: 'capitalize', color: 'white', textAlign: 'left', whiteSpace: 'nowrap' }} >
                                            <strong>{column.label}</strong>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ListAbsentStudents.map((rowData) => (
                                    <React.Fragment key={rowData.Id}>
                                        <TableRow>
                                            {absentStudentColumns.map((column) => (
                                                <TableCell key={column.id} sx={{py:1, textAlign: 'left' }}>
                                                    {column.renderCell(rowData)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                ) : (
                    <Box sx={{ backgroundColor: '#D2FDFC' }}>
                        <Typography
                            variant="h6"
                            align="center"
                            sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}
                        >
                            No record found.
                        </Typography>
                    </Box>
                )}

            </DialogContent>

        </Dialog>
    );
};

export default AbsentStudentP;
