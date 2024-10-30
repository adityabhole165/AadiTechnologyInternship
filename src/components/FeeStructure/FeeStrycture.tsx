import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import React from "react";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FeeStructurePopUp = ({ open, setOpen }: Props) => {
    const handleClose = () => {
        setOpen(false);
        sessionStorage.setItem('hasShownFeeStructurePopup', 'true');
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            PaperProps={{
                sx: {
                    width: '900px', // Set custom width
                    maxWidth: '100vw',
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
                Fee Structure Notice of AY 2024-25
            </Typography>

            <DialogContent
                sx={{
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                <Box>
                    <img
                        src="http://ppsnweb.aaditechnology.com/riteschool/images/Fee%20Structure%202024-2025.png"
                        alt="Fee Structure 2024-2025"
                        style={{
                            transform: 'scale(1.09)',  // Slightly zoomed in
                            maxWidth: '100%',
                        }}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default FeeStructurePopUp;
