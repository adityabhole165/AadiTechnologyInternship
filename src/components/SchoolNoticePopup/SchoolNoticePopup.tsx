import { Clear as ClearIcon } from "@mui/icons-material";
import {
    Dialog,
    DialogContent,
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
    // const [contentType, setContentType] = useState('');  // New state for content type
    const [selectedContent, setSelectedContent] = useState(''); // Stores either URL or text content
    const [contentType, setContentType] = useState('');  // Tracks if it's 'text' or 'image'

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
        //console.log(Value, "value");
        (Value)
        setOpenDetailDialog(true);
        handleLinkClick1(Value);
    }

    const handleLinkClick1 = (item: any) => {
        const link = item.FileName ? url + item.FileName : item.Content;

        if (link) {

            setSelectedLink(link);
            const isImage = /\.(pdf|jpg|jpeg|png|gif|bmp)$/i.test(link);
            setContentType(isImage ? 'image' : 'text');
            setOpenDetailDialog(true);
        }
    };
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
                {/* <ActiveSchoolNotice clickOpen={clickOpen} /> */}
                <DialogContent
                    sx={{
                        maxHeight: SchoolNoticePopupDashBoard.length > 5 ? '36vh' : 'auto',
                        overflowY: SchoolNoticePopupDashBoard.length > 5 ? 'auto' : 'hidden'
                    }}
                >
                    <ActiveSchoolNotice clickOpen={clickOpen} />
                </DialogContent>
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

