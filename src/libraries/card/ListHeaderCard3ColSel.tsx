import { Grid } from '@mui/material'
import HeaderCheckbox from './HeaderCheckbox'

const ListHeaderCard3ColSel = ({ Item, onChange }) => {
    return (<>
        <Grid container><Grid item xs={2}>
                <HeaderCheckbox
                    checked={Item.isActive}
                    onChange={onChange} />
            </Grid><Grid item xs={5}>
                {Item.text1}
            </Grid><Grid item xs={5}>
                {Item.text2}
            </Grid></Grid>
    </>
    )
}

export default ListHeaderCard3ColSel