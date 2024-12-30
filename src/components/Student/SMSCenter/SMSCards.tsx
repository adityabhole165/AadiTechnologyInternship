import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import SmsIcon from "@mui/icons-material/Sms";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const SMSCards = ({ ActiveTab, handleTabClick }) => {
    const cards = [
        { icon: <AddCircleIcon />, text: "Compose", ActiveTab: "Compose SMS" },
        { icon: <MarkunreadMailboxIcon />, text: "Received SMS", ActiveTab: "Received SMS" },
        { icon: <SmsIcon />, text: "Sent Item", ActiveTab: "Send Item" },
        { icon: <AccessAlarmIcon />, text: "Scheduled SMS", ActiveTab: "Scheduled SMS" },
        // { icon: <AllInboxIcon />, text: "All Sent Item", ActiveTab: "AllSendItem" },
    ];

    return (
        <Grid
            container
            flexDirection={{ xs: "row", sm: "column" }} // Stack cards on smaller screens
            // direction="row"
            spacing={2} // Vertical spacing between cards
            sx={{ height: "100%", justifyContent: "flex-start" }} // Adjust positioning
        >
            {cards.map((card, index) => (
                <Grid
                    item
                    key={index}
                    sx={{ display: "flex", justifyContent: "center" }} // Center cards horizontally
                >
                    <Card
                        sx={{
                            width: "100%", // Full width within the grid item
                            maxWidth: "150px", // Optional: Limit max width for cards
                            height: "85px",
                            borderRadius: "10px",
                            // display: "flex",
                            // flexDirection: "column",
                            // justifyContent: "center",
                            // alignItems: "center",
                            backgroundColor: ActiveTab === card.ActiveTab ? blue[100] : "white",
                            cursor: "pointer",
                        }}
                        onClick={() => handleTabClick(card.ActiveTab)}
                    >
                        <CardContent sx={{ textAlign: "center", p: 1 }}>
                            <Box sx={{ fontSize: "30px", mb: 1 }}>{card.icon}</Box>
                            <Typography variant="body1" sx={{ wordWrap: "break-word", fontSize: "14px" }}>
                                {card.text}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default SMSCards;
