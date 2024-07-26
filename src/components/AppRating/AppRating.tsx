import { Button, Dialog, Grid, Stack, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import React from 'react';

// The Following Component is Add if in future one wants to make a reusable component for this rating feature.

const AppRating = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');
    const [value, setValue] = React.useState<number | null>(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Exit App
            </Button>
            <Dialog onClose={handleClose} open={open} >
                <Grid container spacing={2} sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '10px'
                }}>
                    <Grid item xs={12} sx={{
                        textAlign: 'center',
                        backgroundColor: 'background.paper',
                        boxShadow: 3,
                        padding: ' 10px',

                    }}>
                        <Typography variant="h6" component="legend" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                            Rate the App!
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }} size="large"
                        />


                    </Grid>
                    <Stack spacing={4} direction="row">




                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleClose(selectedValue)}

                        >
                            Submit
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleClose(selectedValue)}

                        >
                            Not now.
                        </Button>
                    </Stack>



                </Grid>
            </Dialog>
        </>
    )
}

export default AppRating;
