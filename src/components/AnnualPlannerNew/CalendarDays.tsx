import { Box, Grid, alpha } from "@mui/material";
import { grey } from '@mui/material/colors';

const CalendarDays = ({ ItemList, ClickItem, DefaultValue }) => {
    let dayCount = new Date(new Date(DefaultValue).getFullYear(), new Date(DefaultValue).getMonth(), 1).getDay()
    console.log(DefaultValue, "dayCount", ItemList)
    return (
        <Grid container>
            <Grid item xs={(12 / 7) * dayCount} md={(12 / 7) * dayCount} >
            </Grid>
            {ItemList.map((Item, i) => {
                return (
                    <Grid item xs={12 / 7} md={12 / 7} sx={{ textAlign: 'center' }} key={i}>
                        <Box
                            sx={{
                                height: '90px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                backgroundColor:
                                    Item.Value === DefaultValue
                                        ? (theme) => alpha(theme.palette.primary.main, 0.2)
                                        : 'white',
                                border: (theme) => `1px solid ${grey[300]}`
                            }}
                            onClick={() => ClickItem(Item.Value)}
                        >
                            {Item.Name}
                        </Box>
                        <Box>{Item.Text1}</Box>
                    </Grid>
                );
            })}
        </Grid>
    )
}

export default CalendarDays