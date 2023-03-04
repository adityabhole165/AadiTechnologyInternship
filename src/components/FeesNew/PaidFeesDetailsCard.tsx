
import { useTheme, Grid } from '@mui/material'
import { BoxDetail, BoxDetail1, BoxDetail2, CardStyle1, ListStyle } from 'src/libraries/styled/CardStyle'
import CheckBox from './CheckBox'

const PaidFeesDetailsCard = ({ item, onChange,FeesCard }) => {
    const theme = useTheme();
    return (
        <div>
            <CardStyle1
                sx={{
                    background: item.IsActive
                        ? `${theme.colors.gradients.selectedlistColor}`
                        : `${theme.colors.gradients.pink1}`,
                }}
            >
                <Grid container><Grid item xs={2} sx={{ mt: 3 }}>
                    <CheckBox item={item} onChange={onChange} />
                </Grid>
                <FeesCard item={item}/>
                
                </Grid>
            </CardStyle1>
        </div>
    )
}

export default PaidFeesDetailsCard