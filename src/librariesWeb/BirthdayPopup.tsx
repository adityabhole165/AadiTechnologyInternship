import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import {
    Avatar,
    Box,
    Popover,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography
} from '@mui/material';
import { green, orange, red } from '@mui/material/colors';

// BirthdayPopup component receives alignment, view, setAlignment, and setView props
const BirthdayPopup = ({
    open,
    anchorEl,
    handleClose,
    applyFilter,
    handleRefresh,
    alignment,
    setAlignment,
    view,
    setView
}) => {
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            onClose={handleClose}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
                <Typography>Select User</Typography>
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={(e, newAlignment) => {
                        if (newAlignment !== null) setAlignment(newAlignment);
                    }}
                >
                    <ToggleButton value="T">T</ToggleButton>
                    <ToggleButton value="S">S</ToggleButton>
                    <ToggleButton value="A">A</ToggleButton>
                    <ToggleButton value="O">O</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box sx={{ display: 'flex' }} p={1}>
                <Typography>Select View</Typography>
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={(e, newView) => {
                        if (newView !== null) setView(newView);
                    }}
                    sx={{ ml: '25px' }}
                >
                    <ToggleButton value="T">T</ToggleButton>
                    <ToggleButton value="W">W</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Stack direction="row" spacing={2} sx={{ my: 1, px: 5 }}>
                <Tooltip title="Apply Filter">
                    <Avatar sx={{ bgcolor: green[500] }} variant="square">
                        <CheckIcon onClick={applyFilter} />
                    </Avatar>
                </Tooltip>
                <Tooltip title="Clear Filter">
                    <Avatar sx={{ bgcolor: orange[500] }} variant="square">
                        <ReplayIcon onClick={handleRefresh} />
                    </Avatar>
                </Tooltip>
                <Tooltip title="Cancel">
                    <Avatar sx={{ bgcolor: red[500] }} variant="square">
                        <CloseIcon onClick={handleClose} />
                    </Avatar>
                </Tooltip>
            </Stack>
        </Popover>
    );
};

export default BirthdayPopup;
