import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

const NoticeDetailDialog = ({ open, onClose, link, contentType }) => (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xl" 
        PaperProps={{
            sx: {
                borderRadius: "15px",
                zIndex: 1300,
                overflow: 'auto',
                width: '50%',  
                height: '70vh', 
                maxHeight: '70vh',
            }
        }}
        sx={{
            zIndex: 1300,
        }}
    >
        <DialogTitle sx={{ bgcolor: '#223354', position: 'relative' }}>
            <ClearIcon onClick={onClose}
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
                p: 2,
                alignItems: 'center',
                margintop: '10px',
            }}
        >
            <DialogContent>
                {contentType === 'image' ? (
                    <img src={link} alt="School Notice" style={{ width: '100%', height: 'auto' }} />
                ) : (
                    <Typography variant="body1">{link}</Typography>
                )}
            </DialogContent>
        </DialogContent>
    </Dialog>
);

export default NoticeDetailDialog;
