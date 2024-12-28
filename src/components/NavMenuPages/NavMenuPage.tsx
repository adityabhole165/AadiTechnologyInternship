import { Box } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CommonPageHeader from "../CommonPageHeader";

const NavMenuPage = () => {
    const location = useLocation();
    const { item } = location.state || {};
    useEffect(() => {
        //console.log(`====>>>`, item)
    }, [item])

    return (

        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader navLinks={[
                    {
                        title: 'No NavMenu Page Name available.',
                        path: ''
                    }
                ]}
                    rightActions={
                        <>

                        </>
                    }
                />
            </Box>

        </>
    )
}

export default NavMenuPage;