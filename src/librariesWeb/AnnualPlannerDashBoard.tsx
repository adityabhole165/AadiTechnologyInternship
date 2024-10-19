import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Chip, Divider, Grid, Typography } from '@mui/material';
import { differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApprovalProcessBody } from 'src/interfaces/Student/dashboard';
import { GetLeaveRequisitionAppraisalDetails } from 'src/requests/Dashboard/Dashboard';
import { RootState } from 'src/store';
import Actions from './Actions';
import Header from './Header';

function MyLeaveRequisitionAppraisal() {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isRefresh, setIsRefresh] = useState(false);
    const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(new Date());
    const [countdown, setCountdown] = useState('');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    // Retrieve details from the state
    const MyLeaveDetails = useSelector((state: RootState) => state.Dashboard.IsMyLeaveList);
    const RequisitionDetails = useSelector((state: RootState) => state.Dashboard.IsMyRequisitionList);
    const AppraisalDetails = useSelector((state: RootState) => state.Dashboard.IsMyAppraisal);

    const ApprovalProcessDashBody: IApprovalProcessBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: asUserId,
    };

    useEffect(() => {
        dispatch(GetLeaveRequisitionAppraisalDetails(ApprovalProcessDashBody));
    }, []);


    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredData = () => {
        switch (selectedCategory) {
            case 'My Leave':
                return MyLeaveDetails;
            case 'My Requisition':
                return RequisitionDetails;
            case 'Appraisal':
                return AppraisalDetails;
            default:
                return [...MyLeaveDetails, ...RequisitionDetails, ...AppraisalDetails];
        }
    };

    const getTimeDifference = () => {
        if (!lastRefreshTime) return 'no';
        const now = new Date();
        const seconds = differenceInSeconds(now, lastRefreshTime);
        if (seconds < 60) return `${seconds} second(s)`;
        const minutes = differenceInMinutes(now, lastRefreshTime);
        if (minutes < 60) return `${minutes} minute(s)`;
        const hours = differenceInHours(now, lastRefreshTime);
        return `${hours} hour(s)`;
    };

    const updateCountdown = () => {
        setCountdown(getTimeDifference());
    };

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(updateCountdown, 1000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [lastRefreshTime]);

    const handleRefresh = () => {
        setSelectedCategory('');
        setLastRefreshTime(new Date());
    };

    const handleMouseEnter = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handleMouseLeave = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(updateCountdown, 1000);
    };

    const getButtonColor = (category: string) => {
        switch (category) {
            case 'My Leave': return '#223354';
            case 'My Requisition': return '#223354';
            case 'My Appraisal': return '#223354';
            default: return '#223354';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'success';
            case 'Pending': return 'info';
            case 'Rejected': return 'error';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ height: 'auto', width: 'auto', backgroundColor: 'white', p: 1 }}>
            <Grid container>
                <Grid item xs={6}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Header Title="Approval Process" />
                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', pr: 3.5 }}>
                    <Actions
                        Icon={RefreshIcon}
                        ClickIcon={handleRefresh}
                        title={`You are viewing ${countdown} old data, click here to see the latest data.`}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                    />
                </Grid>

                <Grid container spacing={1} sx={{ mt: 1 }}>
                    {['My Leave', 'My Requisition', 'Appraisal'].map((category) => (
                        <Grid item xs={4} key={category}>
                            <Button
                                sx={{
                                    backgroundColor: selectedCategory === category ? 'white' : '#38548A',
                                    color: selectedCategory === category ? '#38548A' : 'white',
                                    height: '3rem',
                                    width: '100%',
                                    border: '1px solid #223354',
                                    '&:hover': {
                                        backgroundColor: selectedCategory === category ? '#38548A' : 'white',
                                        color: selectedCategory === category ? 'white' : '#38548A',
                                    }
                                }}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <b>{category}</b>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <Box sx={{ height: '198px', mt: 2, overflow: 'auto' }}>
                {filteredData().map((data: any, index: number) => (
                    <Grid item xs={12} key={index}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography variant="h4" p={1} sx={{ color: `${getButtonColor(selectedCategory)}` }}>
                                    {data.Description || data.RequisitionName || 'No Title'}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} pt={0.5}>
                                {/* <Typography>
                                    {data.StartDate?.length > 4
                                        ? data.StartDate.slice(0, -5)
                                        : data.StartDate || data.Created_Date}
                                    {data.StartDate !== data.EndDate && data.EndDate && (
                                        ` to ${data.EndDate.length > 4 ? data.EndDate.slice(0, -5) : data.EndDate}`
                                    )}
                                </Typography> */}
                                <Typography>
                                    {data.StartDate?.length > 4
                                        ? data.StartDate.slice(0, -5)
                                        : data.StartDate || data.Created_Date}
                                    {data.StartDate !== data.EndDate && (
                                        ` to ${data.EndDate
                                            ? data.EndDate.length > 4
                                                ? data.EndDate.slice(0, -5)
                                                : data.EndDate
                                            : data.ExpiryDate
                                                ? data.ExpiryDate.length > 4
                                                    ? data.ExpiryDate.slice(0, -2)
                                                    : data.ExpiryDate
                                                : ''
                                        }`
                                    )}
                                </Typography>

                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            overflow: 'hidden',
                                            whiteSpace: 'normal',
                                            textOverflow: 'ellipsis',
                                            maxHeight: '1.25rem',
                                            lineHeight: '1.25rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            flexGrow: 1,
                                            mr: 1,
                                        }}
                                    >
                                        {data.LeaveFullName || data.RequisitionDescription || 'No Description'}
                                    </Typography>
                                    <Chip label={data.Status || data.StatusName} color={getStatusColor(data.Status || data.StatusName)} size="small" />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" sx={{ m: '0px' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                ))}

                {filteredData().length === 0 && (
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                            <b>No record found for the selected category.</b>
                        </Typography>
                    </Grid>
                )}
            </Box>

            <Grid item xs={12} textAlign={'center'} sx={{ mt: 2.5 }}>
                <Typography variant="h4"><b>Please re-login or refresh the widget to see the updates.</b></Typography>
            </Grid>
        </Box>
    );
}

export default MyLeaveRequisitionAppraisal;
