import { Box, Grid, useTheme } from '@mui/material'
import CheckboxImg from './CheckboxImg'
import { Styles } from 'src/assets/style/student-style';

const ListCard3ColSel = ({ Item, onChange, assignedDate }) => {
 
    const userJoinDate = new Date(Item.joinDate);
    const selectedDate = new Date(assignedDate);
    const color= userJoinDate > selectedDate ?'#787876':''
    const theme = useTheme();

    return (
        <>
            <Box>

            <Grid container bgcolor={!Item.isActive ?
                `${theme.colors.gradients.listColor}` :
                `${theme.colors.gradients.selectedlistColor}`}
                sx={{backgroundColor:color}}
                >
                <Grid item xs={1} sx={{ mt: "7px", paddingLeft: '5px' }}>
                    {
                       (userJoinDate > selectedDate) ? 
                        null:
                        <CheckboxImg
                            name={Item.text1}
                            value={0}
                            checked={Item.isActive}
                            onChange={onChange}
                        />
                    }
                    
                </Grid> 
                <Grid item xs={2}  sx={{ textAlign: "center", mt: "7px", mb:'7px', color: "black", }}>
                    {Item.text1}
                </Grid> 
                <Grid item xs={9} sx={{ mt: "7px", color: "black" }} >
                    {Item.text2} 
                </Grid> 
            </Grid>
            </Box>
           
        </>
    )
}

export default ListCard3ColSel