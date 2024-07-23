import { Box } from "@mui/material";
import CommonPageHeader from "../CommonPageHeader";

const InvestmentDeclaration = () => {

    return (
        <Box sx={{ px: 2 }} maxWidth="xl">
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Investment Declaration',
                        path: '/extended-sidebar/Teacher/InvestmentDeclaration'
                    },
                    {
                        title: 'Documents',
                        path: '/extended-sidebar/Teacher/InvestmentDetailsDocument'
                    }
                ]}
                rightActions={
                    <>
                    </>
                }
            >

            </CommonPageHeader>
        </Box>
    );
}
export default InvestmentDeclaration;