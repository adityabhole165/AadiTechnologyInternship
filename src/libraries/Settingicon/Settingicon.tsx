import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Popover, Tooltip } from '@mui/material';
import { yellow } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetAllAcademicYearForSchoolBody, IGetUserDetailsBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import { getAllAcademicYears, getUserDetailss } from 'src/requests/SchoolSetting/schoolSetting';
import { RootState } from 'src/store';
import SearchableDropdown from '../ResuableComponents/SearchableDropdown';
const SettingsDropdown = () => {
    const dispatch = useDispatch();
    const asSchoolId = localStorage.getItem('localSchoolId');
    const RoleId = sessionStorage.getItem('RoleId');
    const userId = sessionStorage.getItem('Id');
    const AcademicYearId = sessionStorage.getItem('AcademicYearId');
    const StartDate = sessionStorage.getItem('StartDate');
    const localSchoolId = localStorage.getItem('localSchoolId');
    const SchoolName = sessionStorage.getItem('SchoolName');
    const EndDate = sessionStorage.getItem('EndDate');

    const [academicYear, setAcademicYear] = useState(() => sessionStorage.getItem('AcademicYearId') || '');
    const [anchorEl, setAnchorEl] = useState(null);
    const ScreensAccessPermission = JSON.parse(
        sessionStorage.getItem('ScreensAccessPermission')
    );
    const AcademicYear = useSelector((state: RootState) => state.getSchoolSettings.AllAcademicYears);
    console.log("AcademicYear", AcademicYear)
    const UserDetail: any = useSelector((state: RootState) => state.getSchoolSettings.getUserDetails);
    console.log("UserDetail", UserDetail)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const AcademicYearBody: IGetAllAcademicYearForSchoolBody = {
            asSchoolId: Number(asSchoolId),
            asUserId: Number(userId),
            asUserRoleId: Number(RoleId)
        };
        dispatch(getAllAcademicYears(AcademicYearBody));
    }, [userId, RoleId]);
    useEffect(() => {
        const UserDetailBody: IGetUserDetailsBody = {
            asSchoolId: asSchoolId,
            asUserId: userId,
            asRoleId: RoleId
        };
        dispatch(getUserDetailss(UserDetailBody));
    }, [userId, RoleId]);

    useEffect(() => {
        const selectedYearData = AcademicYear.find(year => year.Value === academicYear);
        if (selectedYearData) {
            sessionStorage.setItem('AcademicYearId', selectedYearData.Value);
            sessionStorage.setItem('StartDate', selectedYearData.Text2);
            sessionStorage.setItem('EndDate', selectedYearData.Text3);
            localStorage.setItem('SchoolId', selectedYearData.Text1);
            sessionStorage.setItem('SchoolName', selectedYearData.Text4);
        }
    }, [academicYear, AcademicYear]);

    const ClickAcademicYear = (value) => {
        setAcademicYear(value);

    };
    const open = Boolean(anchorEl);
    const id = open ? 'settings-menu' : undefined;

    return (
        <>
            {UserDetail && UserDetail.IsAcademicYrApplicable === "Y"

                && (
                    <Box style={{ display: 'inline-flex', alignItems: 'center', borderRadius: '30%', overflow: 'hidden', marginTop: "8px", marginBottom: "0px", marginLeft: "18px" }}>
                        <Tooltip title={"Choose different academic year"}>
                            <IconButton
                                onClick={handleClick}
                                aria-describedby={id}
                                sx={{
                                    color: 'white',
                                    backgroundColor: yellow[600],
                                    '&:hover': {
                                        backgroundColor: yellow[800]
                                    }
                                }}
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{
                                '& .MuiPaper-root': {
                                    transition: 'height 0.3s ease',
                                    minWidth: '200px',
                                    overflow: 'hidden',
                                },
                            }}
                        >
                            <Box p={2}>
                                <SearchableDropdown
                                    sx={{ minWidth: '100%' }}
                                    ItemList={AcademicYear}
                                    onChange={ClickAcademicYear}
                                    label={'Academic Year'}
                                    defaultValue={academicYear}
                                    //mandatory
                                    size={"small"}
                                />
                            </Box>
                        </Popover>
                    </Box>
                )}
        </>
    );

};

export default SettingsDropdown;


