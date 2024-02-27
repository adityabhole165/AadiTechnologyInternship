import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, Stack, Typography, alpha } from "@mui/material";
import { getDateDDMMMDash, getMonthYearSpaceFormatted } from '../Common/Util';
import CalendarList from './CalendarList';
import SearchAnnualPlanner from './SearchAnnualPlanner';

const CalendarAnnualPlanner = ({ DaysList, ClickCalendarItem, FilterList,
    ClickFilterItem, SelectedDate, SelectedFilter }) => {
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
        <Box sx={{ backgroundColor: 'white' }} p={2}>

            <Box display="flex" justifyContent="space-between">
                <Typography m={0} variant={'h3'}>
                    <b>{getMonthYearSpaceFormatted(SelectedDate)}</b>
                </Typography>
                <Stack direction={'row'} gap={1}>
                    <SearchAnnualPlanner ItemList={FilterList} ClickItem={ClickFilterItem} DefaultValue={SelectedFilter} />
                    <IconButton color={'primary'} onClick={() => handlePrevNextMonth(1)}
                        sx={{
                            backgroundColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.2)
                        }}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton color={'primary'} onClick={() => handlePrevNextMonth(-1)}
                        sx={{
                            backgroundColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.2)
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Stack>

            </Box>
            <CalendarList ItemList={DaysList} ClickItem={ClickCalendarItem} DefaultValue={SelectedDate} />
        </Box>
    )
}

export default CalendarAnnualPlanner