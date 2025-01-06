import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, Stack, Typography, alpha } from "@mui/material";
import { getDateDDMMMDash, getMonthYearSpaceFormatted } from '../Common/Util';
import CalendarList from './CalendarList';
import SearchAnnualPlanner from './SearchAnnualPlanner';

const CalendarAnnualPlanner = ({ DaysList, ClickDate, ClickCalendarItem, FilterList,
    ClickFilterItem, SelectedDate, SelectedFilter, EventType, ClickEventType, AnnualPlannerViewAccess }) => {

    // Helper function to check if a date is in the past or in the future 
    const allowCalendarNavigator = (selectedYear, selectedMonth, isForward) => {
        let initialYear = FilterList.YearList[0]?.Value;
        let endYear = FilterList.YearList[FilterList.YearList.length - 1]?.Value;
        let initialMonth = Number(FilterList.MonthList[0]?.Value);
        let endMonth = Number(FilterList.MonthList[FilterList.MonthList.length - 1]?.Value);
        if (!isForward) { // Check for backward arrow
            // Disable backward arrow if it's the first year and January
            if (selectedYear.toString() === initialYear && selectedMonth + 1 === initialMonth) {
                return true;
            }
        } else { // Check for forward arrow
            // Disable forward arrow if it's the last year and December
            if (selectedYear.toString() === endYear && selectedMonth + 1 === endMonth) {
                return true;
            }
        }
        return false;
    };

    const handlePrevNextMonth = (PrevNext) => {
        const newDate = new Date(SelectedDate);
        newDate.setDate(1)
        newDate.setMonth(newDate.getMonth() - PrevNext);
        if (newDate.getMonth() === 11) {
            newDate.setFullYear(newDate.getFullYear());
        }
        ClickCalendarItem(getDateDDMMMDash(newDate))
    }
    return (
        <>
            <Box sx={{ backgroundColor: 'white' }} p={2}>
                <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
                    <SearchAnnualPlanner ItemList={FilterList} ClickItem={ClickFilterItem} DefaultValue={SelectedFilter} />
                </Stack>
            </Box>
            <Box sx={{ backgroundColor: 'white' }} p={2}>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color={'primary'} onClick={() => handlePrevNextMonth(1)}
                            sx={{
                                backgroundColor: (theme) =>
                                    alpha(theme.palette.primary.main, 0.2),
                                marginRight: '20px', // Adjusted margin to separate the icons
                                paddingRight: '12px' // Adjusted padding for spacing
                            }}
                            disabled={allowCalendarNavigator(new Date(SelectedDate).getFullYear(), new Date(SelectedDate).getMonth(), false)}
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <Typography m={0} variant={'h3'} sx={{ marginX: '-8px' }}>
                            <b>{getMonthYearSpaceFormatted(SelectedDate)}</b>
                        </Typography>
                        <IconButton color={'primary'} onClick={() => handlePrevNextMonth(-1)}
                            sx={{
                                backgroundColor: (theme) =>
                                    alpha(theme.palette.primary.main, 0.2),
                                marginLeft: '20px', // Adjusted margin to separate the icons
                                paddingLeft: '12px' // Adjusted padding for spacing
                            }}
                            disabled={allowCalendarNavigator(new Date(SelectedDate).getFullYear(), new Date(SelectedDate).getMonth(), true)}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>

                </Box>
                <CalendarList ItemList={DaysList} ClickItem={ClickDate}
                    DefaultValue={SelectedDate} EventType={EventType}
                    ClickEventType={ClickEventType} AnnualPlannerViewAccess={AnnualPlannerViewAccess} />
            </Box>
        </>
    )
}

export default CalendarAnnualPlanner