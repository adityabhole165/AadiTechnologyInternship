import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Link,
    Typography
} from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { IGetSchoolNoticePopupBody } from "src/interfaces/SchoolNoticePopup/ISchoolNoticePopup";
import { SchoolNoticePopup } from "src/requests/SchoolNoticePopup/RequestSchoolNoticePopup";
import { RootState, useSelector } from 'src/store';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SchoolNoticePopupCom = ({ open, setOpen }: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
        sessionStorage.setItem('hasShownPopup', 'true');
    };

    useEffect(() => {
        const popupShown = sessionStorage.getItem('hasShownPopup');
        if (popupShown) {
            setOpen(true);
        }
    }, [setOpen]);

    const [selectDisplayLocation, setDisplayLocation] = useState('B');

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const RoleId = sessionStorage.getItem('RoleId');

    const SchoolNoticePopupDashBoard = useSelector(
        (state: RootState) => state.SchoolNoticePopup.SchoolNoticePopUP
    );
    const SchoolNoticePopupBody: IGetSchoolNoticePopupBody = {
        asSchoolId: asSchoolId,
        asDisplayLocation: 'C',
        asShowAllNotices: Number(0),
        asSortExpression: '',
        asStartIndex: 0,
        asEndIndex: 40,
        asLoginUserRoleId: Number(RoleId),
    };

    useEffect(() => {
        dispatch(SchoolNoticePopup(SchoolNoticePopupBody));
    }, [dispatch, SchoolNoticePopupBody]);

    let url = localStorage.getItem("SiteURL") + "RITeSchool/downloads/School Notices/"

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
            <DialogTitle sx={{ bgcolor: '#223354', position: 'relative' }}>
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
                School Notices
            </Typography>
            <DialogContent sx={{ maxHeight: '40vh', overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {SchoolNoticePopupDashBoard.map((item, i) => (
                        <Box key={i} sx={{ mb: 2 }}>
                            <Divider sx={{ mb: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                <Typography variant="body1" sx={{ color: 'black' }}>
                                    <Link href={url + item.Text6} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                        {item.Text1}
                                    </Link>
                                </Typography>
                            </Box>
                            <Divider sx={{ mt: 1 }} />
                        </Box>
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default SchoolNoticePopupCom;


