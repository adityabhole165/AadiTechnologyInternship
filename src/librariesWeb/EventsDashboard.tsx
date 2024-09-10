import {
    Box,
    Grid
} from '@mui/material';
import { useState } from 'react';
import MonthSelector from 'src/libraries/DateSelector/MonthSelector';
import Header from './Header';


const EventsDashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const ClickDate = (value) => {
        setSelectedDate(value)
    }
    return (
        <Box sx={{ backgroundColor: 'white', p: 1 }} >
            <Grid item sx={{ overflow: 'auto', display: 'flex', borderRadius: '10px' }}>
                <Grid item xs={12}>
                    <Header Title="Upcoming Events" />
                </Grid>
            </Grid>
            <Grid container spacing={1} >
                <Grid item md={12}>
                    <MonthSelector
                        DefaultDate={selectedDate}
                        ClickDate={ClickDate} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default EventsDashboard