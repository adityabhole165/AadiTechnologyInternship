import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetInvestmentDetailsBody } from "src/interfaces/InvestmentDeclaration/InvestmentDeclaration";
import { GetInvestmentDetails } from "src/requests/InvestmentDeclaration/ReqInvestmentDeclaration";
import { RootState } from "src/store";

const InvestmentDeclaration = () => {
    const dispatch = useDispatch();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));



    const USListInvestmentDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentDetails
    )
    const USISlistInvestmentAmountDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentAmountDetails
    )

    const USISlistInvestmentEmpDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentEmpDetails
    )

    const USListInvestmentSectionDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentSectionDetails
    )

    console.log(USListInvestmentDetails, "USListInvestmentDetails");
    console.log(USISlistInvestmentAmountDetails, "USISlistInvestmentAmountDetails");
    console.log(USISlistInvestmentEmpDetails, "USISlistInvestmentEmpDetails");
    console.log(USListInvestmentSectionDetails, "USListInvestmentSectionDetails");


    const GetInvestmentDeclarationBody: IGetInvestmentDetailsBody = {
        asSchoolId: asSchoolId,
        asFinancialYearId: 10,
        asUserId: asUserId
    }

    useEffect(() => {
        dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
    }, [])



    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Employee Investment Details
            </Typography>
            <Grid container spacing={3}>
                {USISlistInvestmentEmpDetails.map((detail) => (
                    <Grid item xs={12} key={detail.UserId}>
                        <Box display="flex" justifyContent="space-between" marginBottom={2}>
                            <Box>
                                <Typography variant="h6">
                                    <Box
                                        display="inline-block"
                                        border={1}
                                        borderRadius={40}
                                        px={8}
                                        py={1}
                                        mr={1}
                                        component="span"
                                    >
                                        Name
                                    </Box>
                                    : {detail.UserName}
                                </Typography>
                                <Typography variant="body1">
                                    <Box
                                        display="inline-block"
                                        border={1}
                                        borderRadius={4}
                                        px={5.4}
                                        py={1}
                                        mr={1}
                                        component="span"
                                    >
                                        Employee No
                                    </Box>
                                    : {detail.EmployeeNo}
                                </Typography>
                                <Typography variant="body1">
                                    <Box
                                        display="inline-block"
                                        border={1}
                                        borderRadius={4}
                                        px={7.1}
                                        py={1}
                                        mr={1}
                                        component="span"
                                    >
                                        Address
                                    </Box>
                                    : {detail.Address}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">
                                    <Box
                                        display="inline-block"
                                        border={1}
                                        borderRadius={4}
                                        px={5.8}
                                        py={1}
                                        mr={1}
                                        component="span"
                                    >
                                        Designation
                                    </Box>
                                    : {detail.Designation}
                                </Typography>
                                <Typography variant="body1">
                                    <Box
                                        display="inline-block"
                                        border={1}
                                        borderRadius={4}
                                        px={7.2}
                                        py={1}
                                        mr={1}
                                        component="span"
                                    >
                                        PAN No
                                    </Box>
                                    : {detail.PanNo}
                                </Typography>
                                <Typography variant="body1">
                                    <Box
                                        display="inline-block"
                                        border={1}
                                        borderRadius={4}
                                        px={7.4}
                                        py={1}
                                        mr={1}
                                        component="span"
                                    >
                                        Gender
                                    </Box>
                                    : {detail.Gender}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );

}

export default InvestmentDeclaration;
