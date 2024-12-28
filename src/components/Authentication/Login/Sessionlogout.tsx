import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import regulas from "src/assets/img/Shool_Logo/regulas.jpg";

const Sessionlogout = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const reason = searchParams.get("reason");

    const message = reason === "session_expired"
        ? (
            <>
                Your session has expired. Please{" "}
                <a
                    href="http://web.aaditechnology.com/RITeSchool/Common/ControlPanel.aspx"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#007bff", textDecoration: "none" }}
                >
                    click here
                </a>{" "}
                to reconnect to the portal.
            </>
        )
        : (
            <>
                You have successfully logged out. Please{" "}
                <a
                    href="http://web.aaditechnology.com/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#007bff", textDecoration: "none" }}
                >
                    click here
                </a>{" "}
                to reconnect to the portal.
            </>
        );


    return (
        <Grid>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: "100vh" }}
                columns={{ xs: 12, md: 12 }}
            >
                <Grid item xs={12} sx={{ px: 2, mt: 26, mb: 2 }}>
                    <Typography variant="h3" sx={{ textAlign: "center" }}>
                        {message}
                    </Typography>
                </Grid>

                <Divider sx={{ background: "#5b5258", mx: "30px" }} />
                <Grid container textAlign="center">
                    <Grid item xs={12}>
                        <a
                            href="https://www.regulusit.net"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={regulas} alt="Regulus Logo" />
                        </a>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography fontSize={12} sx={{ pb: "8px" }}>
                            Copyright © {new Date().getFullYear()} RegulusIT.net. All
                            rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Sessionlogout;
