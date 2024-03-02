import { Grid } from "@mui/material";
import DotLegendTeacher from "src/libraries/summary/DotLegendTeacher";
import CalendarDays from "./CalendarDays";
import CalendarWeekHeader from "./CalendarWeekHeader";

const CalendarList = ({ ItemList, ClickItem, DefaultValue }) => {
    const legendColors = {
        holiday: '#751b1b',
        exam: '#008000',
        events: '#FCCF31',
        weekend: '#ff0000'
    };
    return (
        <Grid container spacing={0} sx={{ mt: 2 }}>
            <Grid item xs={12} md={12}>
                <CalendarWeekHeader />
            </Grid>

            <Grid item xs={12} md={12}>
                <CalendarDays ItemList={ItemList}
                    ClickItem={ClickItem} DefaultValue={DefaultValue} />
            </Grid>

            <Grid container sx={{ mt: 2 }}>
                <Grid item sx={{}} gap={6} display="flex" xs={12} lg={12}>
                    <DotLegendTeacher color={legendColors.holiday} text="Holiday" />
                    <DotLegendTeacher color={legendColors.exam} text="Exam" />
                    <DotLegendTeacher color={legendColors.events} text="Events" />
                    <DotLegendTeacher color={legendColors.weekend} text="Weekends" />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CalendarList