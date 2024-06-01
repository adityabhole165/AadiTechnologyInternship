import CloseTwoTone from "@mui/icons-material/CloseTwoTone";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
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

const MissingAttendanceDialog = ({

    open, setOpen
}: Props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [missingDay, setmissingday] = useState();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
    const asUserId = Number(sessionStorage.getItem('Id'));

    const MissingName = useSelector((state: RootState) => state.MissingAttendanceAleart.MissingattendName);
    console.log(MissingName, "MissingNameeee");

    const MissingDate = useSelector((state: RootState) => state.MissingAttendanceAleart.Missingattenddate);
    console.log(MissingDate, "MissingDateeee");



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
        dispatch(MissingAttenNameAleart(MissingNameBody))
    }, [])


    useEffect(() => {
        dispatch(MissingAttenDateAleart(MissingDayBody))
    }, [])


    const clickMissingDay = (value) => {
        setmissingday(value);
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
                <p onClick={() => clickMissingDay(rowData.Value)}>
                    {rowData.Value}
                </p>
            )

        },

    ];
    // const missingAttendanceRows = [
    //     {
    //         classTeacherName: 'Ms. Afreen A. Shaikh',
    //         class: '7-B',
    //         missingDays: '76'
    //     },
    // ]

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
                        data={MissingName}
                        isLoading={false}
                    />
                </Box>
                <Box mt={2}>
                    <ul>
                        {MissingDate.map((dateItem: string, index: number) => (
                            <li key={index}>{dateItem}</li>
                        ))}
                    </ul>
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