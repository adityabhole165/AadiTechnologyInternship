import { Grid } from "@mui/material"
import CalendarDays from "./CalendarDays"
import CalendarWeekHeader from "./CalendarWeekHeader"

const CalendarList = ({ ItemList, ClickItem, DefaultValue }) => {
    return (
        <Grid container spacing={0} sx={{ mt: 2 }}>
            <Grid item xs={12} md={12}>
                <CalendarWeekHeader />
            </Grid>

            <Grid item xs={12} md={12}>
                <CalendarDays ItemList={ItemList}
                    ClickItem={ClickItem} DefaultValue={DefaultValue} />
            </Grid>
        </Grid>
    )
}

export default CalendarList