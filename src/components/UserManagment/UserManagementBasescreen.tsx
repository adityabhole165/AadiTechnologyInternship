import { Check } from '@mui/icons-material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, IconButton, Tooltip } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CommonPageHeader from '../CommonPageHeader';

const UserManagementBasescreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const RoleId = sessionStorage.getItem('RoleId');
    const asUserId = Number(localStorage.getItem('UserId'));


    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'User Management',
                            path: ''
                        }
                    ]}
                    rightActions={
                        <>
                            <Box>
                                <Tooltip title={'Please write us your queries/ problem. We will try our level best to assist you'}>
                                    <span>
                                        <IconButton
                                            sx={{
                                                color: 'white',
                                                backgroundColor: grey[500],
                                                height: '36px !important',
                                                ':hover': { backgroundColor: grey[600] }
                                            }}
                                        >
                                            <QuestionMarkIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title={'Submit'}>
                                    <span>
                                        <IconButton
                                            sx={{
                                                color: 'white',
                                                backgroundColor: green[500],
                                                height: '36px !important',
                                                ':hover': { backgroundColor: green[600] }
                                            }}
                                            onClick={undefined}
                                        >
                                            <Check />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                        </>
                    }
                />

            </Box>

        </>
    );
};

export default UserManagementBasescreen;
