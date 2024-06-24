import Add from '@mui/icons-material/Add';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, IconButton, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import CommonPageHeader from '../CommonPageHeader';

const LeaveDetailsBaseScreen = () => {
    const AddLeave = () => {
        console.log('Add new holiday');
    };

    return (
        <Box sx={{ px: 2 }} maxWidth="xl">
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Leave Details',
                        path: '/extended-sidebar/Teacher/LeaveDetailsBaseScreen'
                    }
                ]}
                rightActions={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Use this page to manage your leave.">
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': {
                                        backgroundColor: grey[600]
                                    }
                                }}
                            >
                                <QuestionMarkIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add New Leave">
                            <IconButton
                                sx={{
                                    bgcolor: 'grey.500',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'grey.600'
                                    }
                                }}
                                onClick={AddLeave}
                            >
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </Box>
                }
            />
        </Box>
    );
};

export default LeaveDetailsBaseScreen;
