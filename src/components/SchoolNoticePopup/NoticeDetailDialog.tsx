import ClearIcon from '@mui/icons-material/Clear';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import MinimizeIcon from '@mui/icons-material/Minimize'; // Import the Minimize icon
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const NoticeDetailDialog = ({ open, onClose, link, contentType, onMinimize }) => {
    const [isMaximized, setIsMaximized] = useState(false);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };
    useEffect(() => {
        if (!open) {
            setIsMaximized(false);
        }
    }, [open]);
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            PaperProps={{
                sx: {
                    borderRadius: "15px",
                    zIndex: 1300,
                    overflow: 'auto',
                    width: isMaximized ? '80%' : '50%',
                    height: isMaximized ? '100vh' : '75vh',
                    maxHeight: isMaximized ? '90vh' : '90vh',
                }
            }}
            sx={{
                zIndex: 1300,
            }}
        >
            <DialogTitle sx={{ bgcolor: '#223354', position: 'relative' }}>
                <IconButton
                    onClick={onMinimize}  // This will trigger the minimize action
                    sx={{
                        color: 'white',
                        borderRadius: '7px',
                        position: 'absolute',
                        top: '-6px',
                        right: '65px',  // Position the MinimizeIcon
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'grey',
                        }
                    }}
                >
                    <MinimizeIcon />
                </IconButton>
                <IconButton
                    onClick={toggleMaximize}
                    sx={{
                        color: 'white',
                        borderRadius: '7px',
                        position: 'absolute',
                        top: '0.1px',
                        right: '35px',
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'grey',
                        }
                    }}
                >
                    {isMaximized ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>
                <ClearIcon
                    onClick={onClose}
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
            <DialogContent
                sx={{
                    maxWidth: '100%',
                    height: '100%',
                    alignItems: 'center',
                }}
            >
                <DialogContent>
                    {contentType === 'image' ? (
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
                            <img src={link} alt="School Notice" style={{ maxWidth: '100%', height: 'fixed' }} />
                        </Box>
                    ) : (
                        <Typography dangerouslySetInnerHTML={{ __html: link }}></Typography>
                    )}
                </DialogContent>
            </DialogContent>
        </Dialog>
    );
};

export default NoticeDetailDialog;
