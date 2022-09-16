import { Grid,useTheme } from '@mui/material'
import CheckboxImg from './CheckboxImg'

const ListCard3ColSel = ({ Item, onChange }) => {
    const theme = useTheme();
    return (<>
        <Grid container bgcolor={Item.isActive ? 
        
        `${theme.colors.gradients.listColor}`:
        `${theme.colors.gradients.selectedlistColor}`}>
            <Grid item xs={1} sx={{mt:"7px", paddingLeft:'5px'}}>
                <CheckboxImg
                    name={Item.text1}
                    value={0}
                    checked={Item.isActive}
                    onChange={onChange}
                />
            </Grid> <Grid item xs={2} sx={{textAlign:"center",mt:"7px",color:"black"}}>
                {Item.text1}
            </Grid> <Grid item xs={9} sx={{mt:"7px",color:"black"}} >
                {Item.text2}
            </Grid> </Grid>
    </>
    )
}

export default ListCard3ColSel