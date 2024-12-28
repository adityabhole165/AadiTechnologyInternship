import QuestionMark from '@mui/icons-material/QuestionMark';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useState } from 'react';

const ChangePasswordPopup = ({ open, setOpen, UserName, clickSavePassword }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleSavePassword = () => {
        if (newPassword === '') {
            setPasswordError('New password is required.');
        } else if (confirmPassword === '') {
            setConfirmPasswordError('Confirm password is required.');
        } else if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setPasswordError('');
            setConfirmPasswordError('');
            clickSavePassword(newPassword);
            setOpen(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={'sm'}
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
                {/* Removed Tooltip for PriorityHighIcon */}
                <Tooltip
                    title={
                        'Change password for selected user.'
                    }
                    placement="bottom-end"
                >
                    <QuestionMark
                        sx={{
                            color: 'white',
                            borderRadius: '10px',
                            position: 'absolute',
                            top: '4px',
                            right: '35px',
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: grey[600] }
                        }}
                    />
                </Tooltip>

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
                Change Password
            </Typography>

            <DialogContent>
                <Grid container spacing={2} alignItems="center">
                    {/* Username Field */}
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            sx={{ minWidth: '100%', bgcolor: '#F0F0F0' }}
                            label={'Username'}
                            fullWidth
                            size={"small"}
                            value={UserName}
                            disabled
                        />
                    </Grid>

                    {/* New Password Field */}
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            sx={{ minWidth: '100%' }}
                            label={
                                <span>
                                    New Password <span style={{ color: 'red' }}>*</span>
                                </span>
                            }
                            type="password"
                            fullWidth
                            size={"small"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                        />
                    </Grid>

                    {/* Confirm Password Field */}
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            sx={{ minWidth: '100%' }}
                            label={
                                <span>
                                    Confirm Password <span style={{ color: 'red' }}>*</span>
                                </span>
                            }
                            type="password"
                            fullWidth
                            size={"small"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!!confirmPasswordError}
                            helperText={confirmPasswordError}
                        />
                    </Grid>
                </Grid>

                {/* Password Requirements Text (Former Tooltip Message) */}
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Capitalization matters! Min 6 characters, Max 15 characters. The password should be a combination of at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ py: 1, px: 3 }}>
                {/* Save Button */}
                <Button
                    onClick={handleClose}
                    color={'error'}
                    sx={{
                        '&:hover': {
                            backgroundColor: red[100],
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSavePassword}
                    color={'primary'}
                    sx={{
                        color: 'green',
                        '&:hover': {
                            color: 'green',
                            backgroundColor: green[100]
                        }
                    }}
                >
                    Save
                </Button>

                {/* Cancel Button */}

            </DialogActions>
        </Dialog>
    );
};

export default ChangePasswordPopup;
