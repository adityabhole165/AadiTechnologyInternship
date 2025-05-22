import { Box, Typography } from "@mui/material";

const Legend = ({ LegendArray }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }, // Stack items on smaller screens
                gap: { xs: '10px', sm: '20px' },
                alignItems: 'left',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    mb: 0,
                    lineHeight: 'normal',
                    alignSelf: 'left',
                    paddingBottom: '2px',
                    fontSize: { xs: '1rem', sm: '1rem' }, // Responsive font size
                    textAlign: { xs: 'left', sm: 'left' }, // Center align on mobile
                }}
            >
                Legend :
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }, // Stack items on smaller screens
                    gap: { xs: '10px', sm: '20px' },
                    alignItems: { xs: 'flex-start', sm: 'center' }, // Adjust alignment
                }}
            >
                {LegendArray.map(item => {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'left',
                            }}
                        >
                            {item.Value}
                            <Typography sx={{
                                color: item.color == undefined ? '#000000' : item.color, // Apply color dynamically from item.color
                                fontWeight: item.fontWeight ? 'bold' : 'normal'
                            }}>{item.Name}</Typography>
                        </Box>
                    )
                })}

            </Box>
        </Box >
    )
}

export default Legend