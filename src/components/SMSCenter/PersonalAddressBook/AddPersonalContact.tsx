import { QuestionMark } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "src/store";

AddPersonalContact.propTypes = {
    Value1: PropTypes.string,
    ValError: PropTypes.string,
    Heading: PropTypes.string,
    Open: PropTypes.bool,
    OnClose: PropTypes.func,
    onSubmit: PropTypes.func,
    ItemList2: PropTypes.array,
    ItemList3: PropTypes.array,
    ItemList4: PropTypes.array,
    Defaultvalue2: PropTypes.string,
    Defaultvalue3: PropTypes.string,
    Defaultvalue4: PropTypes.string,
    Label1: PropTypes.string,
    OnChange1: PropTypes.func,
    OnChange2: PropTypes.func,
    OnChange3: PropTypes.func,
    Label3: PropTypes.string,
    ValErrorMsgList: PropTypes.array,
    tooltipText: PropTypes.string,
    Label2: PropTypes.string,
    Value2: PropTypes.string,
    formType: PropTypes.string,
    isExistsError: PropTypes.string
}
function AddPersonalContact({ isExistsError, formType, tooltipText = 'Add / update contact details.', Value1, Value2, ValErrorMsgList = [], ValError = '', Open, OnClose, onSubmit, Heading = 'Add or update phone book contact', Label1 = 'Name', Label2 = 'Mobile Number', ItemList2 = [], OnChange1, Defaultvalue2 = '',
    Defaultvalue3 = '', OnChange2, ItemList3 = [], Defaultvalue4 = '', OnChange3 = () => { }, ItemList4 = [], Label3 = '' }) {
    const loading = useSelector((state: RootState) => state.WeeklyTimetable.Loading);
    const [ErrorMsg1, setErrorMsg1] = useState(false);
    const [ErrorMsg2, setErrorMsg2] = useState(false);
    const [ErrorMsg3, setErrorMsg3] = useState(false);
    const handleSubmit = () => {
        const isName = Boolean(Value1);
        const isPhoneValid = Value2.length === 10;

        setErrorMsg1(!isName);
        setErrorMsg2(!Value2);
        setErrorMsg3(Boolean(Value2) && !isPhoneValid);

        if (isName && isPhoneValid) {
            onSubmit();
        }
    };
    function handleClose() {
        OnClose();
        setErrorMsg1(false);
        setErrorMsg2(false);
        setErrorMsg3(false);
    }
    return (
        <>
            <Dialog
                open={Open}
                onClose={handleClose}
                maxWidth={'xs'}
                fullWidth
            >
                <DialogTitle
                    sx={{
                        py: 1.8,
                        backgroundColor: (theme) => theme.colors.primary.main,
                        color: (theme) => theme.palette.common.white
                    }}
                >
                    <Tooltip title={tooltipText}>
                        <QuestionMark
                            sx={{
                                color: 'white',
                                // background:'white',
                                borderRadius: '7px',
                                position: 'absolute',
                                top: '4px',
                                right: '35px',
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: grey[600] }
                            }} />
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
                <DialogContent dividers>
                    <Box>
                        {(isExistsError !== '') && <span style={{ color: 'red', fontSize: '12px' }}>{isExistsError}</span>}
                        <Typography variant={"h4"}>{Heading}</Typography>
                        {/* {loading && <SuspenseLoader />} */}
                        <Stack gap={2} mt={2}>
                            <Box sx={{ width: '100%' }}>
                                <TextField
                                    label={Label1}
                                    value={Value1}
                                    sx={{ bgcolor: '#F0F0F0', minWidth: '100%' }}
                                    size="small"
                                    required
                                    onChange={(e) => { OnChange1(e.target.value) }}
                                    InputProps={{
                                        readOnly: false
                                    }}
                                />
                                {ErrorMsg1 && <span style={{ color: 'red', fontSize: '12px' }}>Name should not be blank.</span>}
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <TextField
                                    label={Label2}
                                    value={Value2}
                                    required
                                    sx={{ bgcolor: '#F0F0F0', minWidth: '100%' }}
                                    size="small"
                                    onChange={(e) => { OnChange2(e.target.value) }}
                                    InputProps={{
                                        readOnly: false
                                    }}
                                />
                                {ErrorMsg2 && <span style={{ color: 'red', fontSize: '12px' }}>Mobile number should not be blank.</span>}
                                {ErrorMsg3 && <span style={{ color: 'red', fontSize: '12px' }}>Mobile number should be a 10 digit number.</span>}
                            </Box>



                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ py: 2, px: 3 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: 'red',
                            '&:hover': {
                                color: 'red',
                                backgroundColor: red[100]
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        sx={{
                            color: 'green',
                            '&:hover': {
                                color: 'green',
                                backgroundColor: green[100]
                            }
                        }}
                    >
                        {formType === 'Add' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddPersonalContact;
