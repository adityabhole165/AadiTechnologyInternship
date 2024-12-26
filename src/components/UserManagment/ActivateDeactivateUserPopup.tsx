import QuestionMark from '@mui/icons-material/QuestionMark';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, TextField, Tooltip, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox';

const ActivateDeactivateUserPopup = ({ open, setOpen, UserName, clickActivateDeactivate }) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [isDeactivated, setIsDeactivated] = useState(false);
    const [deactivateReason, setDeactivateReason] = useState('');
    const [sendSms, setSendSms] = useState(false);
    const [activationSms, setActivationSms] = useState('');
    const [removeReferences, setRemoveReferences] = useState(false);
    const [Reason, setReason] = useState('');
    const [ReasonError, setReasonError] = useState('');
    const handleClose = () => {
        setOpen(false);
    };
    const ClickOk = () => {
        if (Reason === '') {
            setReasonError('Reason for unpublish should not be blank.');
        } else {
            setReasonError('');
            clickActivateDeactivate(false, Reason);
            setOpen(false);
        }
    };

    const handleActivateDeactivate = () => {
        const action = isDeactivated ? 'activate' : 'deactivate';
        const userBody = {
            action,
            deactivateReason,
            sendSms,
            activationSms,
            removeReferences
        };
        handleClose();
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={'md'}
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
                Activate/Deactivate User
            </Typography>
            <DialogContent>
                <Grid container spacing={2} alignItems="center">
                    {/* Username Field */}
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            sx={{ minWidth: '100%', bgcolor: '#F0F0F0' }}
                            label={'Username'}
                            fullWidth
                            size={"small"}
                            value={username}
                            onChange={handleUsernameChange}
                            disabled
                        />
                    </Grid>

                    {/* Checkboxes for Send SMS and Remove All References */}
                    <Grid item xs={12} sm={6} md={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={sendSms}
                                    onChange={(e) => setSendSms(e.target.checked)}
                                />
                            }
                            label="Send SMS"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={removeReferences}
                                    onChange={(e) => setRemoveReferences(e.target.checked)}
                                />
                            }
                            label="Remove All References"
                        />
                    </Grid>

                    {/* Reason for Deactivation */}
                    <Grid item xs={12}>
                        <ResizableTextField
                            sx={{ minWidth: '100%' }}
                            label={'Reason for Deactivation'}
                            fullWidth
                            size={"small"}
                            value={deactivateReason}
                            multiline
                            onChange={(e) => setDeactivateReason(e.target.value)}
                        />
                    </Grid>

                    {/* Activation SMS field (only visible when deactivated) */}
                    {isDeactivated && (
                        <Grid item xs={12}>
                            <ResizableTextField
                                sx={{ minWidth: '100%', bgcolor: '#F0F0F0' }}
                                label={'Activation SMS'}
                                fullWidth
                                size={"small"}
                                multiline
                                value={activationSms}
                                onChange={(e) => setActivationSms(e.target.value)}
                            />
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions sx={{ py: 1, px: 3 }}>
                <Button onClick={() => { ClickOk() }} color={'error'} sx={{
                    '&:hover': {
                        backgroundColor: red[100]
                    }
                }}>
                    Deactivate
                </Button>

            </DialogActions>
        </Dialog>
    );
};

export default ActivateDeactivateUserPopup;
