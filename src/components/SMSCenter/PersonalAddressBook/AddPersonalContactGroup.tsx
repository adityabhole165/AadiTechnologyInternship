import { QuestionMark } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Close';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "src/store";

AddPersonalContactGroup.propTypes = {
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
function AddPersonalContactGroup({ clearForm, isExistsError, formType, tooltipText = 'Add / update contact group details.', Value1, Value2, ValErrorMsgList = [], ValError = '', Open, OnClose, onSubmit, Heading = 'Add or Update Phone Book Contact Group', Label1 = 'Name', Label2 = 'Mobile Number', ItemList2 = [], OnChange1, Defaultvalue2 = '',
    Defaultvalue3 = '', OnChange2, clickRow, ItemList3 = [], Defaultvalue4 = '', OnChange3 = () => { }, ItemList4 = [], Label3 = '' }) {
    const loading = useSelector((state: RootState) => state.WeeklyTimetable.Loading);
    const [ErrorMsg1, setErrorMsg1] = useState(false);
    const [ErrorMsg2, setErrorMsg2] = useState(false);
    const [ErrorMsg3, setErrorMsg3] = useState(false);
    function isAnyActive(addressBookGroupList) {
        return addressBookGroupList.some(item => item.IsActive === true);
    }
    const handleSubmit = () => {
        console.log('🚩', ItemList2);

        const isName = Boolean(Value1);
        const isGroupPhoneListChecked = isAnyActive(ItemList2);

        setErrorMsg1(!isName);
        setErrorMsg2(!isGroupPhoneListChecked);

        if (isName && isGroupPhoneListChecked) {
            onSubmit();
        }
    };
    function handleClose() {
        OnClose();
        setErrorMsg1(false);
        setErrorMsg2(false);
        setErrorMsg3(false);
    }
    function handleClearBtn() {
        setErrorMsg1(false);
        setErrorMsg2(false);
        setErrorMsg3(false);
        clearForm();
    }
    function clickRows(Value: any) {
        let returnValue = ItemList2.map((item: any) => {
            return (
                { ...item, IsActive: item.PersonalAddressBookId === Value ? !item.IsActive : item.IsActive }
            )
        })
        clickRow(returnValue)
    }
    function isAllChecked() {
        let flag = true;
        ItemList2?.map((item, i) => {
            if (!item.IsActive) {
                flag = false
            }
        })
        return flag
    }
    function checkAll() {
        let newlist = ItemList2.map((item) => {
            return (
                { ...item, IsActive: !isAllChecked() }
            )
        })
        clickRow(newlist)
    }
    return (
        <>
            <Dialog
                open={Open}
                onClose={handleClose}
                sx={{ minWidth: '40vw' }}
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
                    <Box mb={2}>
                        {(isExistsError !== '') && <span style={{ color: 'red', fontSize: '12px' }}>{isExistsError}</span>}
                        <Typography variant={"h4"}>{Heading}</Typography>
                        {/* {loading && <SuspenseLoader />} */}
                        <Stack gap={2} mt={2}>
                            <Box sx={{ width: '100%' }}>
                                <TextField
                                    label={<>{Label1}<span style={{ color: 'red' }}> *</span></>}
                                    value={Value1}
                                    sx={{ bgcolor: '#F0F0F0', minWidth: '100%' }}
                                    size="small"
                                    onChange={(e) => { OnChange1(e.target.value) }}
                                    InputProps={{
                                        readOnly: false
                                    }}
                                    inputProps={{ maxLength: 100 }}
                                />
                                {ErrorMsg1 && <span style={{ color: 'red', fontSize: '12px' }}>Name should not be blank.</span>}

                                {ErrorMsg2 && <div style={{ color: 'red', fontSize: '12px' }}>At least one mobile number should be selected for group.</div>}
                            </Box>
                        </Stack>
                    </Box>
                    <TableContainer sx={{ maxHeight: '40vh', overflowY: 'auto' }}>
                        <Table >
                            <TableHead>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main }}>
                                    <TableCell
                                        sx={{
                                            textTransform: 'capitalize',
                                            color: (theme) => theme.palette.common.white,
                                            pt: '5px',
                                            pb: '5px',
                                            top: 0,
                                            zIndex: 1
                                        }}
                                        align="left"
                                    >
                                        <Checkbox checked={isAllChecked()} onClick={checkAll} />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textTransform: 'capitalize',
                                            color: (theme) => theme.palette.common.white,
                                            pt: '5px',
                                            pb: '5px',
                                            top: 0,
                                            zIndex: 1
                                        }}
                                        align="left"
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textTransform: 'capitalize',
                                            color: (theme) => theme.palette.common.white,
                                            pt: '5px',
                                            pb: '5px',
                                            top: 0,
                                            zIndex: 1
                                        }}
                                        align="center"
                                    >
                                        Mobile Number
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ItemList2?.length > 0 && ItemList2?.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell sx={{ pt: '5px', pb: '5px' }}>
                                            <Checkbox
                                                checked={item.IsActive}
                                                onClick={() => clickRows(item.PersonalAddressBookId)}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ pt: '5px', pb: '5px' }}>{item.Name}</TableCell>
                                        <TableCell align="center" sx={{ pt: '5px', pb: '5px' }}>
                                            {item.Mobile_No}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </DialogContent>
                <DialogActions sx={{ py: 2, px: 3 }}>
                    <Button
                        onClick={handleClearBtn}
                        sx={{
                            color: 'red',
                            '&:hover': {
                                color: 'red',
                                backgroundColor: red[100]
                            }
                        }}
                    >
                        Clear
                    </Button>
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

export default AddPersonalContactGroup;
