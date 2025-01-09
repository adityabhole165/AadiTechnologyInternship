import { QuestionMark } from '@mui/icons-material';
import { Box, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import SearchableDropdown1 from 'src/libraries/ResuableComponents/SearchableDropdown1';
import CommonPageHeader from '../CommonPageHeader';
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { grey } from '@mui/material/colors';

const FeeDemo = () => {
    const actions = [
        {
            title: "Pay Fee by Challan",
            icon: <AssignmentTurnedInIcon fontSize="large" style={{ color: "green" }} />,
        },
        {
            title: "Pending Fees SMS/Message Reminder",
            icon: <ChatBubbleOutlineIcon fontSize="large" style={{ color: "black" }} />,
        },
        {
            title: "Add Bank Name",
            icon: <AccountBalanceIcon fontSize="large" style={{ color: "blue" }} />,
        },
        {
            title: "Reset Receipt Number",
            icon: <ReceiptIcon fontSize="large" style={{ color: "black" }} />,
        },
    ];

    const cards = [
        {
            title: "TODAYS COLLECTION",
            value: "Rs. 0",
            color: "#9C27B0", // Purple
            iconColor: "#9C27B0",
        },
        {
            title: "TOTAL RECEIVABLE FEE",
            value: "Rs. 0",
            color: "#FF9800", // Orange
            iconColor: "#FF9800",
        },
        {
            title: "TOTAL RECEIVED FEE",
            value: "Rs. 0",
            color: "#4CAF50", // Green
            iconColor: "#4CAF50",
        },
        {
            title: "TOTAL CONCESSION TILL DATE",
            value: "Rs. 1201245512542",
            color: "#03A9F4", // Blue
            iconColor: "#03A9F4",
        },
    ];
    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Fee',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <SearchableDropdown1 size={"small"} ItemList={[]}
                            sx={{ minWidth: '12vw' }}
                            defaultValue={undefined} label={'Class'}
                            onChange={(value: any) => { undefined }} />

                        <Box>
                            <Tooltip title={`Student's list from your class. Click on "Edit" button to change details of individual student.`}>
                                <IconButton sx={{
                                    bgcolor: 'grey.500',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'grey.600'
                                    }
                                }}>
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>
                }
            />
            <Box sx={{ backgroundColor: 'white', pt: 2 }}>
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ p: 2 }}
                >
                    {actions.map((action, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 2,
                                    textAlign: "center",
                                    borderRadius: "10px",
                                    transition: "transform 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                {action.icon}
                                <Typography variant="h4" sx={{ mt: 2 }}>
                                    {action.title}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ p: 2 }}
                >
                    {cards.map((card, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 2,
                                    borderRadius: "10px",
                                    position: "relative",
                                    height: "22vh",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                {/* Icon Section */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "3vw",
                                            height: "3vw",
                                            backgroundColor: card.iconColor,
                                            borderRadius: "50%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <HourglassEmptyIcon
                                            sx={{ color: "white", fontSize: "30px" }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="h4"
                                        sx={{ ml: "auto", color: grey[500], fontWeight: 800 }}
                                    >
                                        {card.value}
                                    </Typography>
                                </Box>

                                {/* Footer Section */}
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        backgroundColor: card.color,
                                        color: "white",
                                        padding: 1,
                                        borderRadius: "0 0 10px 10px",
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {card.title}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default FeeDemo;
