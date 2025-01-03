import { Grid } from '@mui/material';
import { ListStyle } from '../styled/CardStyle';
import { TabListHeight } from '../styled/CommonStyle';

const VerticalButtons = ({ ItemList, DefaultValue, clickItem }) => {
    console.log(ItemList, "ItemList")
    return (
        <Grid container item spacing={{ xs: 1, sm: 0 }} direction={{ xs: 'row', sm: 'column' }}>
            {ItemList.map((Item) => {
                return (<Grid item xs={3} sx={{ textAlign: 'center', color: '#38548A' }}>
                    <ListStyle sx={TabListHeight}
                        color={Item.Value == DefaultValue ? 'secondary' : 'primary'}
                        onClick={() => { clickItem(Item.Value); }}>
                        {ItemList.Badge}
                        {Item.Icon}<br />
                        {Item.Name}
                    </ListStyle>
                </Grid>)
            })}
        </Grid >
    )
}

export default VerticalButtons