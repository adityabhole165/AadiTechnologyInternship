import { Box, Grid, useTheme } from '@mui/material'
import CheckboxImg from './CheckboxImg'
import { Styles } from 'src/assets/style/student-style';

const ListCard3ColSel = ({ Item, onChange, assignedDate }) => {


    const date = Item.joinDate;
    const Day = new Date(date).getDate();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Year = new Date(date).getFullYear();
    const joinDate = `${Day}-${Month}-${Year}`;

    const theme = useTheme();
    return (
        <>
            <Box  >

            <Grid container bgcolor={!Item.isActive ?
                `${theme.colors.gradients.listColor}` :
                `${theme.colors.gradients.selectedlistColor}`}
                className={(joinDate > assignedDate ? 'red' : "yellow")}>
                <Grid item xs={1} sx={{ mt: "7px", paddingLeft: '5px' }}>
                    <CheckboxImg
                        name={Item.text1}
                        value={0}
                        checked={Item.isActive}
                        onChange={onChange}
                    />
                </Grid> <Grid item xs={2} sx={{ textAlign: "center", mt: "7px", color: "black" }}>
                    {Item.text1}
                </Grid> <Grid item xs={9} sx={{ mt: "7px", color: "black" }} >
                    {Item.text2}
                </Grid> </Grid>

            </Box>
           
        </>
    )
}

export default ListCard3ColSel