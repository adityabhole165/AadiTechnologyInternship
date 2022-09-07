import { Grid } from '@mui/material'
import CheckboxImg from './CheckboxImg'

const ListCard3ColSel = ({ Item, onChange }) => {
    return (<>
        <Grid container bgcolor={Item.isActive ? '#87ed87a6' : 'white'}>
            <Grid item xs={2}>
                <CheckboxImg
                    name={Item.text1}
                    value={0}
                    checked={Item.isActive}
                    onChange={onChange}
                />
            </Grid> <Grid item xs={5}>
                {Item.text1}
            </Grid> <Grid item xs={5}>
                {Item.text2}
            </Grid> </Grid>
    </>
    )
}

export default ListCard3ColSel