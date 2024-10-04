import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Chip, Divider, Grid, Typography } from '@mui/material';
import {
    differenceInHours, differenceInMinutes, differenceInSeconds
} from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import Actions from './Actions';
import Header from './Header';

function MyLeaveRequisitionAppraisal() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isRefresh, setIsRefresh] = useState(false);
    const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(new Date());
    const [countdown, setCountdown] = useState('');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const hardcodedData = [
        { category: 'My Leave', title: 'Sick Leave', dateRange: 'Oct 1 - Oct 2, 2024', description: 'Sick leave due to illness.', status: 'Approved' },
        { category: 'My Requisition', title: 'Office Supplies Requisition', dateRange: 'Oct 3, 2024', description: 'Requested new office stationery supplies.', status: 'Approved' },
        { category: 'My Leave', title: 'Personal Leave', dateRange: 'Oct 3 - Oct 3, 2024', description: 'Attending a family function.', status: 'Submitted' },
        { category: 'My Leave', title: 'Vacation Leave', dateRange: 'Oct 30 - Oct 30, 2024', description: 'Planned vacation for relaxation.', status: 'Rejected' },
        { category: 'My Requisition', title: 'Hardware Requisition', dateRange: 'Oct 10, 2024', description: 'Requesting a new monitor and keyboard.', status: 'Submitted' },
        { category: 'Appraisal', title: 'Mid-Year Performance Review', dateRange: 'Oct 4, 2024', description: 'Review of performance for the first half of the year.', status: 'Approved' },
        { category: 'My Requisition', title: 'Furniture Requisition', dateRange: 'Oct 15, 2024', description: 'Requested ergonomic chair for office.', status: 'Rejected' },
    ];


    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredData = hardcodedData.filter(data =>
        selectedCategory === '' || data.category === selectedCategory
    );

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
            case 'My Leave': return '#4d79ff';
            case 'My Requisition': return '#ff4d4d';
            case 'Appraisal': return '#33ff77';
            default: return '#F0F0F0';
        }
    };
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'success';
            case 'Submitted': return 'info';
            case 'Rejected': return 'error';
            default: return 'default';
        }
    };
    return (
        <Box sx={{ height: '382px', width: 'auto', backgroundColor: 'white', p: 1 }}>
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
                                    backgroundColor: selectedCategory === category ? '#F0F0F0' : getButtonColor(category),
                                    color: selectedCategory === category ? `${getButtonColor(category)}` : '#F0F0F0',
                                    height: '3rem', width: '100%',
                                }}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <b>{category}</b>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <Box sx={{ height: '195px', mt: 2, overflow: 'auto' }}>
                {filteredData.map((data, index) => (
                    <Grid item xs={12} key={index}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography variant="h4" p={1} sx={{ color: `${getButtonColor(data.category)}` }}>{data.title}</Typography>
                            </Grid>
                            <Grid item xs={4} pt={0.5}>
                                <Typography>{data.dateRange}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            overflow: 'hidden',
                                            whiteSpace: 'normal',
                                            textOverflow: 'ellipsis',
                                            maxHeight: '1.25rem',  // Adjusted to fit on one row
                                            lineHeight: '1.25rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,     // Limit to a single line
                                            WebkitBoxOrient: 'vertical',
                                            flexGrow: 1,            // Allow it to take remaining space
                                            mr: 1,                  // Add margin for space between text and chip
                                        }}
                                    >
                                        {data.description}
                                    </Typography>
                                    <Chip label={data.status} color={getStatusColor(data.status)} size="small" />
                                </Box>
                            </Grid>


                            <Grid item xs={12}>
                                <Divider variant="middle" sx={{ m: '0px' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                ))}

                {/* No data message */}
                {filteredData.length === 0 && (
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                            <b>No record found for the selected category.</b>
                        </Typography>
                    </Grid>
                )}
            </Box>

            <Grid item xs={12} textAlign={'center'} sx={{ mt: 2.5 }}>
                <Typography variant="h4"> <b>Please re-login or refresh the widget to see the updates.</b></Typography>
            </Grid>
        </Box>
    );
}

export default MyLeaveRequisitionAppraisal;
