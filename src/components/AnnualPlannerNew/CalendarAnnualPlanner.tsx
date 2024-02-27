import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, Stack, Typography, alpha } from "@mui/material";
import CalendarList from './CalendarList';
import SearchAnnualPlanner from './SearchAnnualPlanner';

const CalendarAnnualPlanner = ({ DaysList, ClickCalendarItem, FilterList,
    ClickFilterItem, SelectedDate, SelectedFilter }) => {
    const handlePrevMonth = () => {

    }
    const handleNextMonth = () => {

    }
    return (
        <Box sx={{ backgroundColor: 'white' }} p={2}>

            <Box display="flex" justifyContent="space-between">
                <Typography m={0} variant={'h3'}>
                    <b>{SelectedDate}</b>
                </Typography>
                <Stack direction={'row'} gap={1}>
                    <SearchAnnualPlanner ItemList={FilterList} ClickItem={ClickFilterItem} DefaultValue={SelectedFilter} />
                    <IconButton color={'primary'} onClick={() => handlePrevMonth()}
                        sx={{
                            backgroundColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.2)
                        }}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton color={'primary'} onClick={() => handleNextMonth()}
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