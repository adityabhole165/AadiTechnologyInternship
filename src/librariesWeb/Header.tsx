import { Grid, Typography } from '@mui/material';

const Header = ({ Title }) => {
    return (
        <Grid item xs={12}>
            <Typography variant="h3" sx={{ pl:1, color: '#38548A',pb:-1 }}>
                {Title}
            </Typography>
        </Grid>
    )
}

export default Header