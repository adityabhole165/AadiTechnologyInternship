import { Grid } from '@mui/material'
import CheckboxImg from './CheckboxImg'

const ListCard3ColSel = ({ Item, onChange }) => {
    return (<>
        <Grid container bgcolor={Item.isActive ? '#ceabd2' : 'white'}>
            <Grid item xs={2} sx={{mt:"7px"}}>
                <CheckboxImg
                    name={Item.text1}
                    value={0}
                    checked={Item.isActive}
                    onChange={onChange}
                />
            </Grid> <Grid item xs={3} sx={{textAlign:"center",mt:"7px",color:"black"}}>
                {Item.text1}
            </Grid> <Grid item xs={7} sx={{mt:"7px",color:"black"}} >
                {Item.text2}
            </Grid> </Grid>
    </>
    )
}

export default ListCard3ColSel