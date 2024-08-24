import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import SuspenseLoader from "src/layouts/components/SuspenseLoader";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import SearchableDropdown1 from "src/libraries/ResuableComponents/SearchableDropdown1";
import { RootState } from "src/store";

AddLecture.propTypes = {
    ValError: PropTypes.string,
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
    ErrorMsg3: PropTypes.bool,
    ValErrorMsgList: PropTypes.array
}
function AddLecture({ ValErrorMsgList = [], ValError, Open, OnClose, onSubmit, Heading, ItemList1, Defaultvalue1, Label1, ItemList2, OnChange1, Defaultvalue2,
    ErrorMsg1, ErrorMsg2, Defaultvalue3, OnChange2, ItemList3, ErrorMsg3, Defaultvalue4, OnChange3, ItemList4 }) {
    const loading = useSelector((state: RootState) => state.WeeklyTimetable.Loading);

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
                        {ValError?.length > 0 && <span dangerouslySetInnerHTML={{ __html: `Error : ${ValError}` }} style={{ color: 'red', fontWeight: 'bolder' }} />}
                        {ValErrorMsgList !== undefined && ValErrorMsgList?.length > 0 &&
                            <Stack sx={{ width: '100%' }} spacing={.5}>
                                {ValErrorMsgList.map((errorObj, index) => (
                                    Object.keys(errorObj).map((key) => {
                                        const message = errorObj[key].trim();
                                        if (message !== "") {
                                            return <span dangerouslySetInnerHTML={{ __html: message }} style={{ color: 'red', fontWeight: 'bolder', fontSize: '12px' }} />;
                                        }
                                        return null;
                                    })
                                ))}
                            </Stack>
                        }
                        <Typography variant={"h4"}>{Heading}</Typography>
                        {loading && <SuspenseLoader />}
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
                                {ErrorMsg1 && <span style={{ color: 'red', fontSize: '12px' }}>Weekday should not be empty.</span>}
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
                                {ErrorMsg2 && <span style={{ color: 'red', fontSize: '12px' }}>Lecture number should not be empty.</span>}
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
                                {ErrorMsg3 && <span style={{ color: 'red', fontSize: '12px' }}>Class-Subject name should not be empty.</span>}
                            </Box>
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ py: 2, px: 3 }}>
                    <Button
                        onClick={OnClose}
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
                        onClick={onSubmit}
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
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddLecture;