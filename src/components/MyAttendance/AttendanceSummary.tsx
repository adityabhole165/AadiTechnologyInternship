import { Box, Grid, Stack, Typography } from '@mui/material';

const AttendanceSummary = ({ SummaryCountforAttendance, assignedDate }) => {
    return (
        <Grid container spacing={1}>
            {SummaryCountforAttendance.map((item, i) => {
                return (
                    <Grid item xs={12} sm={6} md={3}>
                    <Box
                        sx={{
                            background: (theme) => theme.palette.common.white,
                            p: { xs: 1, sm: 2 }, 
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            variant="h6"
                            color={item.Color}
                            sx={{
                                marginBottom: 0,
                                fontSize: { xs: '16px', sm: '16px', md: '18px' }, // Responsive font size
                                textTransform: 'capitalize',
                            }}
                        >
                            {item.Name}
                        </Typography>
                        <Stack
                            direction="row"
                            gap={2}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid container spacing={1}>
                                {item.Values.map((itemChild, iChild) => (
                                    <Grid
                                        item
                                        xs={4} // Adjust to 6 columns for mobile
                                        sm={4} // Adjust to 4 columns for tablet and above
                                        key={iChild}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }} // Responsive font size
                                        >
                                            {itemChild.Name}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                textAlign="center"
                                                sx={{ fontSize: { xs: '14px', sm: '16px', md: '18px' } }} // Responsive font size
                                            >
                                                {itemChild.Value}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                    </Box>
                </Grid>
                )
            })}
        </Grid>
    )
}

export default AttendanceSummary