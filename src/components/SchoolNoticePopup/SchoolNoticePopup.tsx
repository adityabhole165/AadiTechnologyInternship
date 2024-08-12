import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Link,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { IGetSchoolNoticePopupBody } from "src/interfaces/SchoolNoticePopup/ISchoolNoticePopup";
import { SchoolNoticePopup } from "src/requests/SchoolNoticePopup/RequestSchoolNoticePopup";
import { RootState, useSelector } from 'src/store';
import { ClearIcon } from "@mui/x-date-pickers";

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
    }, []);

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
            <DialogTitle sx={{ bgcolor: '#223354' }}>
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
            <Typography variant="h3" sx={{ pt: 2, pl: 2 }}>
                School Notices
            </Typography>
            <DialogContent>
                {SchoolNoticePopupDashBoard.map((item, i) => (
                    <Box key={i} mt={2} sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ color: 'black' }}>
                            <Link href={url + item.Text6} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                {item.Text1}
                            </Link>
                            {/* {item.Text7 && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {item.Text7}
                                </Typography>
                            )} */}
                        </Typography>
                    </Box>
                ))}
            </DialogContent>
        </Dialog>
    );
}

export default SchoolNoticePopupCom;
