import SettingsIcon from '@mui/icons-material/Settings';
import { alpha, Box, Popover, Stack, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
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
    const [AcademicYearName, setAcademicYearName] = useState('')
    const [academicYear, setAcademicYear] = useState(() => sessionStorage.getItem('AcademicYearId') || '');
    const [anchorEl, setAnchorEl] = useState(null);
    const ScreensAccessPermission = JSON.parse(
        sessionStorage.getItem('ScreensAccessPermission')
    );
    const AcademicYear = useSelector((state: RootState) => state.getSchoolSettings.AllAcademicYears);
    console.log("AcademicYear", AcademicYear)
    const UserDetail: any = useSelector((state: RootState) => state.getSchoolSettings.getUserDetails);
    console.log("UserDetail", UserDetail)
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

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
            setAcademicYearName(selectedYearData.Name);
        }
    }, [academicYear, AcademicYear]);

    const ClickAcademicYear = (value) => {
        setAcademicYear(value);

    };
    const open = Boolean(anchorEl);
    const id = open ? 'settings-menu' : undefined;
    const settingMenuRef = React.useRef<HTMLButtonElement>(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (

        <>
            {UserDetail && UserDetail.IsAcademicYrApplicable === "Y"

                && (


                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                        {/* <Tooltip title={"Choose different academic year"}>
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
                        </Tooltip> */}

                        <Tooltip title={'Choose different academic year'}>

                            <IconButton
                                sx={{
                                    color: 'white',
                                    background: (theme) => alpha(theme.palette.common.white, 0.2)
                                }}
                                ref={settingMenuRef}
                                onClick={handleClick}
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
                            // sx={{
                            //     '& .MuiPaper-root': {
                            //         transition: 'height 0.3s ease',
                            //         minWidth: '200px',
                            //         overflow: 'hidden',
                            //     },
                            // }}
                            sx={{
                                '& .MuiPaper-root': {
                                    transition: 'height 0.3s ease',
                                    maxWidth: '330px', // Adjust the maxWidth as per your requirement
                                    overflow: 'hidden',
                                },
                            }}
                        >
                            <Box p={2} width="50">
                                <Box style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    You are viewing data of old academic year ({AcademicYearName}). Please do not modify any data.
                                </Box>
                                <br></br>
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
                    </Stack>
                )}

        </>

    );

};

export default SettingsDropdown;


