import { Grid, Typography, useTheme } from '@mui/material'
import CheckboxImg from './CheckboxImg'
import { Styles } from 'src/assets/style/student-style';
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';

const ListCard4ColSel = ({ Item, onChange }) => {
    const theme = useTheme();

    const classes = Styles();
    return (<>
        <Grid container bgcolor={!Item.isActive ?
            `${theme.colors.gradients.listColor}` :
            `${theme.colors.gradients.selectedlistColor}`} sx={{mt:'10px',borderRadius:'10px',height:'60px'}}>

            <Grid item xs={2} md={1} sx={{ m:'15px 0 0 10px ' }}>

                <CheckboxImg
                    name={Item.Id}
                    value={Item.Id}
                    checked={Item.isActive}
                    onChange={onChange}
                />
            </Grid>

            <Grid item xs={9} sx={{mt:'10px'}}>
                <RouterLink
                    key={Item.Id}
                    to={
                        `/${location.pathname.split('/')[1]
                        }/MessageCenter/viewMSg/` + Item.NavPath//Item.DetailsId + FromRoute
                    }
                    color="primary"
                    style={{ textDecoration: 'none' }}
                >
                    <Grid item xs={12}>
                        <Typography
                            className={classes.Listfont1}
                            sx={{
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden'
                            }}
                        >
                            {Item.text1}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} container>

                    <Grid item xs={6}>
                        <Typography
                            sx={{
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden'
                            }}
                        >
                            {Item.text2}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography
                            className={classes.Listfont2}
                            sx={{ display: 'flex', flexDirection: 'row-reverse' }}
                        >
                            {Item.text3}
                        </Typography>
                    </Grid>
                    </Grid>
                </RouterLink>
            </Grid>
        </Grid>
    </>
    )
}

export default ListCard4ColSel