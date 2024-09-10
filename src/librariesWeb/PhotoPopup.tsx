import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import {
    Avatar,
    Box,
    Popover,
    Stack,
    Tooltip
} from '@mui/material';
import { green, orange, red } from '@mui/material/colors';
import { useSelector } from 'react-redux';
// import { monthArray } from 'src/components/Common/Util';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { RootState } from 'src/store';

const PhotoPopup = ({ id, anchorEl, open, handleClose, handleApplyFilter, handleClearFilter,
    year, month, ClickMonth, ClickYear
}) => {
    const AllAcademicYearsForSchool: any = useSelector((state: RootState) =>
        state.AnnualPlanerBaseScreen.ISGetAllAcademicYearsForSchool);

    const MonthArray = [
        { Id: 1, Name: 'All', Value: '0' },
        { Id: 2, Name: 'January', Value: '1' },
        { Id: 3, Name: 'February', Value: '2' },
        { Id: 4, Name: 'March', Value: '3' },
        { Id: 5, Name: 'April', Value: '4' },
        { Id: 6, Name: 'May', Value: '5' },
        { Id: 7, Name: 'June', Value: '6' },
        { Id: 8, Name: 'July', Value: '7' },
        { Id: 9, Name: 'August', Value: '8' },
        { Id: 10, Name: 'September', Value: '9' },
        { Id: 11, Name: 'October', Value: '10' },
        { Id: 12, Name: 'November', Value: '11' },
        { Id: 13, Name: 'December', Value: '12' },
        { Id: 14, Name: 'Recent 5', Value: '100' },
    ]

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            onClose={handleClose}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
                <Dropdown Array={MonthArray} handleChange={ClickMonth} label={'Select Month'} defaultValue={month} />
                <Dropdown
                    Array={AllAcademicYearsForSchool}
                    handleChange={ClickYear}
                    defaultValue={year}
                    label={'Select Year'}
                />
            </Box>
            <Stack direction="row" spacing={2} sx={{ my: 1, px: 5 }}>
                <Tooltip title="Apply Filter">
                    <Avatar sx={{ bgcolor: green[500] }} variant="square">
                        <CheckIcon onClick={handleApplyFilter} />
                    </Avatar>
                </Tooltip>
                <Tooltip title="Clear Filter">
                    <Avatar sx={{ bgcolor: orange[500] }} variant="square">
                        <ReplayIcon onClick={handleClearFilter} />
                    </Avatar>
                </Tooltip>
                <Tooltip title="Cancel">
                    <Avatar sx={{ bgcolor: red[500] }} variant="square">
                        <CloseIcon onClick={handleClose} />
                    </Avatar>
                </Tooltip>
            </Stack>
        </Popover>

    )
}

export default PhotoPopup