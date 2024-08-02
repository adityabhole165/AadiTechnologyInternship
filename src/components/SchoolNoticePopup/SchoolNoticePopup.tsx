import CloseTwoTone from "@mui/icons-material/CloseTwoTone";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from "@mui/material";
import React from "react";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SchoolNoticePopup = ({ open, setOpen }: Props) => {
    const handleClose = () => {
        setOpen(false);
    };

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
                <IconButton onClick={handleClose}
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
                    }}
                >
                    <CloseTwoTone />
                </IconButton>
            </DialogTitle>
            <Typography variant="h3" sx={{ pt: 2, pl: 2 }}>
                School Notices
            </Typography>
            <DialogContent >
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body1">
                        This is the content of the dialog.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default SchoolNoticePopup;
