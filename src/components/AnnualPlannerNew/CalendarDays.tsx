import { Box, Grid, alpha } from "@mui/material";
import { grey } from '@mui/material/colors';

const CalendarDays = ({ ItemList, ClickItem, DefaultValue }) => {
    let dayCount = new Date(new Date(DefaultValue).getFullYear(), new Date(DefaultValue).getMonth(), 1).getDay()
    console.log(DefaultValue, "dayCount", ItemList)
    function hexToRGBA(hex: string, opacity: number) {
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    const legendColors = {
        p: '#008000',
        a: '#9e9e9e',
        h: '#751b1b',
        w: '#ff0000',
        o: '#f06292',
        l: '#303f9f',
        n: '#FCCF31'
    };
    const bg = {
        p: hexToRGBA(legendColors.p, 0.2),
        a: hexToRGBA(legendColors.a, 0.2),
        h: hexToRGBA(legendColors.h, 0.2),
        w: hexToRGBA(legendColors.w, 0.2),
        o: hexToRGBA(legendColors.o, 0.1),
        l: hexToRGBA(legendColors.l, 0.2),
        n: hexToRGBA(legendColors.n, 0.2)
    };
    const data = {
        p: 'Present',
        a: 'Absent',
        h: 'Holiday',
        w: 'Weekwend',
        o: 'OutSide',
        l: 'Late',
        n: 'Not Available'
    };
    return (
        <Grid container>
            <Grid item xs={(12 / 7) * dayCount} md={(12 / 7) * dayCount}
                border="0.5px solid #ebebeb" sx={{ textAlign: 'center', pt: 0 }}>
            </Grid>
            {ItemList.map((Item, i) => {
                return (
                    <Grid item xs={12 / 7} md={12 / 7} key={i}
                        sx={{ textAlign: 'center', pt: 0 }} border="0.5px solid #ebebeb">
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
                            {/* <Box
                            py={0}
                            my={0}
                            sx={{
                                backgroundColor: bg[1],
                                color: legendColors[1],
                                // ...cardStyle,
                                fontWeight: '700',
                                height: '10vh'
                            }}
                            textAlign="center"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            onClick={() => {
                                ClickItem(Item.Value);
                            }}
                        > */}
                            {Item.Name}
                        </Box>
                        <Box>{Item.Text1}</Box>
                    </Grid>
                );
            })}
        </Grid >
    )
}

export default CalendarDays