import React from "react";
import { useLocation } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import regulas from "src/assets/img/Shool_Logo/regulas.jpg";
import { ButtonPrimary } from "src/libraries/styled/ButtonStyle";

const Sessionlogout = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const reason = searchParams.get("reason");

    const message =
        reason === "session_expired"
            ? "Your session has expired. Please log in again to continue."
            : "You have successfully logged out.";


            // const TabClose = () => {
            //     window.close();

            // }

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
                <Grid item xs={12} sx={{ px: 2, mt: 10 }}>
                    <Typography variant={"h3"} sx={{ textAlign: "center" }}>
                        {message}
                    </Typography>
                </Grid>

                {/* <Grid sx={{ pt: 1, pb: 3 }}>
                    
                        <ButtonPrimary color="primary" type="submit"
                        onClick={TabClose}
                        >
                            Close
                        </ButtonPrimary>
                    
                </Grid> */}

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
