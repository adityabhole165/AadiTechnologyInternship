import {
    Divider,
    Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import regulas from 'src/assets/img/Shool_Logo/regulas.jpg';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';

function Sessionlogout() {
    // Test

    return (
        <Grid>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                // justifyContent="center"
                style={{ minHeight: '100vh' }}
                columns={{ xs: 12, md: 12 }}
            >

                <br />
                <br />
                <br />
                <br />
                
                <Grid item xs={12} sx={{ px: 2 }}>
                    <Typography variant={'h4'} sx={{ textAlign: 'center' }}>
                        Your session has timed out. Please Login again.
                    </Typography>
                </Grid>
               

                <Grid sx={{ pt: 1, pb: 3 }}>
                    <a
                        href="http://web.aaditechnology.com/Login.aspx"
                        target="_self"
                        rel="noreferrer"

                    >


                        <ButtonPrimary
                            color="primary"
                            type="submit"

                        >
                            Close
                        </ButtonPrimary>

                    </a>


                </Grid>


                <br />

                

                <Divider sx={{ background: '#5b5258', mx: '30px' }} />
                <Grid container textAlign="center">
                    <Grid item xs={12}>
                        <a
                            href="https://www.regulusit.net"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={regulas} />
                        </a>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography fontSize={12} sx={{ pb: '8px' }}>
                            Copyright © {new Date().getFullYear()} RegulusIT.net. All rights
                            reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Sessionlogout;
