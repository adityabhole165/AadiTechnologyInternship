import { Checkbox, Grid, Stack } from "@mui/material";
import DotLegendTeacher from "src/libraries/summary/DotLegendTeacher";
import CalendarDays from "./CalendarDays";
import CalendarWeekHeader from "./CalendarWeekHeader";

const CalendarList = ({ ItemList, ClickItem, DefaultValue, EventType, ClickEventType }) => {
    const legendColors = [
        '#ffffff',
        '#ff0000',
        '#751b1b',
        '#008000',
        '#FCCF31',
        '#9e9e9e',
        '#ffffff',
        '#ffffff',
        '#ffffff'
    ];
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const clickCheck = (value) => {
        ClickEventType(EventType.map((Item) => {
            return {
                ...Item,
                IsActive: Item.Value == value ?
                    !Item.IsActive :
                    Item.IsActive
            }
        }))
    }
    const getIsChecked = (value) => {

        let returnVal = false;
        EventType.map((Item) => {
            if (Item.Value == value)
                returnVal = Item.IsActive;
        })
        return returnVal;
    }
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
                    {
                        EventType.map((Item, i) => {
                            return (
                                <Stack direction={'row'} key={i}>
                                    {["2", "3", "4"].includes(Item.Value) &&
                                        <Checkbox {...label} checked={getIsChecked(Item.Value)}
                                            onChange={() => { clickCheck(Item.Value) }} />
                                    }
                                    <DotLegendTeacher color={legendColors[Item.Id]} text={Item.Name} />
                                </Stack>)
                        })
                    }
                </Grid>
            </Grid>
        </Grid >
    )
}

export default CalendarList