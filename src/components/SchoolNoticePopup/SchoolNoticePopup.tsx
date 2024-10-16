import { Clear as ClearIcon } from "@mui/icons-material";
import {
    Dialog,
    DialogTitle,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { IGetSchoolNoticePopupBody } from "src/interfaces/SchoolNoticePopup/ISchoolNoticePopup";
import { SchoolNoticePopup } from "src/requests/SchoolNoticePopup/RequestSchoolNoticePopup";
import { RootState, useSelector } from 'src/store';
import ActiveSchoolNotice from "./ActiveSchoolNotice";
import NoticeDetailDialog from "./NoticeDetailDialog";

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

    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [selectedLink, setSelectedLink] = useState('');
    const [contentType, setContentType] = useState('');  // New state for content type

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const RoleId = sessionStorage.getItem('RoleId');

    const SchoolNoticePopupDashBoard = useSelector(
        (state: RootState) => state.SchoolNoticePopup.SchoolNoticePopUP
    );

    const SchoolNoticePopupBody: IGetSchoolNoticePopupBody = {
        asSchoolId: asSchoolId,
        asDisplayLocation: 'B,C',
        asShowAllNotices: Number(0),
        asSortExpression: '',
        asStartIndex: 0,
        asEndIndex: 40,
        asLoginUserRoleId: Number(RoleId),
    };

    useEffect(() => {
        dispatch(SchoolNoticePopup(SchoolNoticePopupBody));
    }, []);

    let url = localStorage.getItem("SiteURL") + "RITeSchool/DOWNLOADS/School Notices/";
    const getWithoutHTML = (value) => {
        var div = document.createElement('div');
        div.innerHTML = value;
        var text = div.textContent || div.innerText || '';
        return text;
    };
    const clickOpen = (Value) => {
        console.log(Value, "value");
        (Value)
        setOpenDetailDialog(true);
    }
    const handleLinkClick = (item: any) => {
        const link = item.Text6 ? url + item.Text6 : item.Text7;

        if (link) {

            setSelectedLink(link);
            const isImage = /\.(pdf|jpg|jpeg|png|gif|bmp)$/i.test(link);
            setContentType(isImage ? 'image' : 'text');
            setOpenDetailDialog(true);
        }
    };

    return (
        <>
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
                <Typography variant="h3" sx={{ pt: 1, pl: 2 }}>
                    School Notices
                </Typography>
                {/* <DialogContent sx={{ maxHeight: '30vh', overflowY: 'auto' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {SchoolNoticePopupDashBoard.map((item, i) => (
                            <Box key={i}>
                                <Divider sx={{ mb: 0 }} />
                                <Box sx={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', p: 1 }}>
                                    <Link
                                        href="#"
                                        onClick={() => handleLinkClick(item)}
                                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                    >
                                        {item.Text1}
                                    </Link>
                                </Box>
                            </Box>
                        ))}
                        <Divider />
                    </Box>
                </DialogContent> */}
                <ActiveSchoolNotice clickOpen={clickOpen} />
            </Dialog>

            <NoticeDetailDialog
                open={openDetailDialog}
                onClose={() => setOpenDetailDialog(false)}
                onMinimize={() => setOpenDetailDialog(false)}
                link={selectedLink}
                contentType={contentType}
            />
        </>
    );
}

export default SchoolNoticePopupCom;

