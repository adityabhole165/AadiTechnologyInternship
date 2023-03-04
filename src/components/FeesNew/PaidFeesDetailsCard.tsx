
import { useTheme, Grid } from '@mui/material'
import { BoxDetail, BoxDetail1, BoxDetail2, CardStyle1, ListStyle } from 'src/libraries/styled/CardStyle'
import CheckBox from './CheckBox'

const PaidFeesDetailsCard = ({ item, onChange }) => {
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
                </Grid><Grid item xs={10}>
                        <BoxDetail>
                            <BoxDetail2>{item.Text1}</BoxDetail2>
                            <BoxDetail1>{item.Text2}<b>{item.Text3}</b>
                            </BoxDetail1>
                            <BoxDetail1>{item.Text4}</BoxDetail1>
                        </BoxDetail>
                    </Grid>
                </Grid>
            </CardStyle1>
        </div>
    )
}

export default PaidFeesDetailsCard