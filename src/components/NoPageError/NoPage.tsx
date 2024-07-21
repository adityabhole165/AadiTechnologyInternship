import { AppBar, Box, Button, Card } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router";
const NoPage = () => {
    const navigate = useNavigate();
    function takeHome() {
        navigate('./schoolList')
    }


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Typography variant="h1" component="h2" ml={2}>
                        Server Error
                    </Typography>
                </AppBar>
            </Box>
            <Card variant="elevation" >
                <div style={{ margin: '20px' }}>
                    <h1>Error 404..! File or directory not found.</h1>
                    <h2>The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.</h2>
                    <Button variant="contained" onClick={takeHome}>Go Home</Button>
                </div>
            </Card>

        </>


    )
}

export default NoPage;


