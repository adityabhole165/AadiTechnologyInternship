import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import SearchableDropdown1 from "src/libraries/ResuableComponents/SearchableDropdown1";

AddLecture.propTypes = {
    Heading: PropTypes.string,
    Open: PropTypes.bool,
    OnClose: PropTypes.func,
    onSubmit: PropTypes.func,
    ItemList1: PropTypes.array,
    ItemList2: PropTypes.array,
    ItemList3: PropTypes.array,
    ItemList4: PropTypes.array,
    Defaultvalue1: PropTypes.string,
    Defaultvalue2: PropTypes.string,
    Defaultvalue3: PropTypes.string,
    Defaultvalue4: PropTypes.string,
    Label1: PropTypes.string,
    OnChange1: PropTypes.func,
    OnChange2: PropTypes.func,
    OnChange3: PropTypes.func,
    ErrorMsg1: PropTypes.bool,
    ErrorMsg2: PropTypes.bool,
    ErrorMsg3: PropTypes.bool
}
function AddLecture({ Open, OnClose, onSubmit, Heading, ItemList1, Defaultvalue1, Label1, ItemList2, OnChange1, Defaultvalue2,
    ErrorMsg1, ErrorMsg2, Defaultvalue3, OnChange2, ItemList3, ErrorMsg3, Defaultvalue4, OnChange3, ItemList4 }) {

    return (
        <>
            <Dialog
                open={Open}
                onClose={OnClose}
                maxWidth={'xs'}
                fullWidth
            >
                <DialogTitle
                    sx={{
                        py: 1,
                        backgroundColor: (theme) => theme.colors.primary.main,
                        color: (theme) => theme.palette.common.white
                    }}
                ></DialogTitle>
                <DialogContent dividers>
                    <Box>
                        <Typography variant={"h4"}>{Heading}</Typography>
                        <Stack gap={2} mt={2}>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown
                                    onChange={() => { }}
                                    ItemList={ItemList1}
                                    defaultValue={Defaultvalue1}
                                    label={Label1}
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                    disabled={true}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown
                                    onChange={OnChange1}
                                    ItemList={ItemList2}
                                    label="Week Day"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                    defaultValue={Defaultvalue2}
                                    mandatory={true}
                                    DisableClearable={true}
                                />
                                {ErrorMsg1 && <span style={{ color: 'red' }}>Weekday should not be empty.</span>}
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown1
                                    onChange={OnChange2}
                                    ItemList={ItemList3}
                                    label="Lecture Number"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                    defaultValue={Defaultvalue3}
                                    mandatory={true}
                                    DisableClearable={true}
                                />
                                {ErrorMsg2 && <span style={{ color: 'red' }}>Lecture number should not be empty.</span>}
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <SearchableDropdown1
                                    onChange={OnChange3}
                                    ItemList={ItemList4}
                                    label="Class Subjects"
                                    sx={{ minWidth: '100%' }}
                                    size={"small"}
                                    defaultValue={Defaultvalue4}
                                    mandatory={true}
                                    DisableClearable={true}
                                />
                                {ErrorMsg3 && <span style={{ color: 'red' }}>Class-Subject name should not be empty.</span>}
                            </Box>
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ py: 2, px: 3 }}>
                    <Button
                        variant={"contained"}
                        onClick={OnClose}
                        color={'error'}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        color={'primary'}
                        variant={'contained'}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddLecture;