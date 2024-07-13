import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetInvestmentDetailsBody, IGetRegimeDetailsDropdownBody } from "src/interfaces/InvestmentDeclaration/InvestmentDeclaration";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import { CDAGetInvestmentDetails, CDAGetRegimeDropdown, GetInvestmentDetails } from "src/requests/InvestmentDeclaration/ReqInvestmentDeclaration";
import { RootState } from "src/store";
import CommonPageHeader from "../CommonPageHeader";
import InvestmentSection from "./InvestmentSection";

const InvestmentDeclaration = () => {
    const dispatch = useDispatch();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));

    const [exampleSaveInvestment, setexampleSaveInvestment] = useState([])

    // const [dropdown, setDropdown] = useState('0');

    const [newFilter, setnewFilter] = useState('');

    const [regimeId, setRegimeId] = useState();

    const USListInvestmentDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentDetails
    )
    const USISlistInvestmentAmountDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentAmountDetails
    )

    const USISlistInvestmentEmpDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentEmpDetails
    )
    console.log(USISlistInvestmentEmpDetails, "USISlistInvestmentEmpDetails");


    const USListInvestmentSectionDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISNewGetInvestmentDetails
    )

    console.log(USListInvestmentSectionDetails, "USListInvestmentSectionDetail12345");

    const listInvestmentSectionDetails = USListInvestmentSectionDetails?.listInvestmentSectionDetails || [];

    console.log(listInvestmentSectionDetails, "listInvestmentSectionDetails");

    const USGetRegimeDropdown: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISGetRegimeDropdown
    )
    console.log(USGetRegimeDropdown, "USGetRegimeDropdown")

    // console.log(listInvestmentSectionDetails, "listInvestmentSectionDetails");

    const GetInvestmentDeclarationBody: IGetInvestmentDetailsBody = {
        asSchoolId: asSchoolId,
        asFinancialYearId: 10,
        asUserId: asUserId
    }

    const GetInvestmentDeclarationBodyNew: IGetInvestmentDetailsBody = {
        asSchoolId: asSchoolId,
        asFinancialYearId: 10,
        asUserId: asUserId
    }

    const GetRegimeDropdown: IGetRegimeDetailsDropdownBody = {
        asSchoolId: 18
    }

    // const SaveInvestmentDeclaration: SaveInvestmentDetailsBody = {
    //     asSchoolId: asSchoolId,
    //     asFinancialYearId: 10,
    //     asUpdatedById: asUserId,
    //     asUserId: asUserId,
    //     asDeclarationXML: getXML(),
    //     asRegimeId: regimeId
    // }

    function getXML() {
        let asSaveInvestmentXML = "\r\n<ArrayOfInvestmentDeclaration xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n >";

    }





    useEffect(() => {
        dispatch(CDAGetRegimeDropdown(GetRegimeDropdown))
    }, [])

    useEffect(() => {
        if (USGetRegimeDropdown.length > 0) {
            setRegimeId(USGetRegimeDropdown[0].Value);
        }
    }, [USGetRegimeDropdown])

    useEffect(() => {
        dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
    }, [])

    useEffect(() => {
        dispatch(CDAGetInvestmentDetails(GetInvestmentDeclarationBodyNew))
    }, [])


    const userName = USISlistInvestmentEmpDetails[0]?.UserName || 'Employee';


    console.log(USListInvestmentDetails, "matchingDetailsData1");

    const [ListInvestmentDetails, setListInvestmentDetails] = useState([])
    useEffect(() => {
        if (USListInvestmentDetails.length > 0)
            setListInvestmentDetails(USListInvestmentDetails)
    }, [USListInvestmentDetails])

    const clickRegimeDropDown = (value) => {
        setRegimeId(value)
    }



    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'Investment Declaration',
                            path: '/extended-sidebar/common/InvestmentDeclaration'
                        }
                    ]}
                />

                <Box sx={{ p: 2, background: 'white' }}>

                    <Container>
                        <Grid container spacing={3}>
                            {USISlistInvestmentEmpDetails.map((detail) => (
                                <Grid item xs={12} key={detail.UserId}>
                                    <Box sx={{ backgroundColor: '#ffffff', textAlign: 'center', marginBottom: 2, padding: 2 }}>
                                        <hr />
                                        <Typography variant={"h4"} textAlign={'center'} color={"primary"} mb={1}>

                                            {detail.SchoolName}

                                        </Typography>
                                        <hr />
                                        <Typography variant={"h4"} textAlign={'center'} color={"primary"} mb={1}>

                                            {detail.SchoolAddress}

                                        </Typography>
                                        <hr />
                                        <Typography variant={"h4"} textAlign={'center'} color={"primary"} mb={1}>

                                            INVESTMENT DECLARATION FORM FOR FINANCIAL YEAR {detail.FinancialYear}

                                        </Typography>
                                        <hr />
                                    </Box>
                                    <Box sx={{ backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', marginBottom: 2, padding: 2 }}>
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
                                    <SearchableDropdown
                                        sx={{
                                            minWidth: '300px'

                                        }}
                                        ItemList={USGetRegimeDropdown}
                                        onChange={clickRegimeDropDown}
                                        label={'Regime Dropdown'}
                                        defaultValue={regimeId}
                                        mandatory
                                        size={"small"}

                                    />
                                </Grid>

                            ))}
                        </Grid>
                        {USListInvestmentDetails.length > 0 &&
                            <Grid container>
                                <InvestmentSection></InvestmentSection>
                            </Grid>}

                    </Container>




                    <Container>
                        <Box sx={{ backgroundColor: '#ffffff', marginTop: 4 }}>
                            <Typography variant="body1" paragraph>
                                I further undertake to provide all documentary proofs of payment made by me before 25th January, 2012 and if I fail to do so, the school can make full deduction of income tax dues from February / March 2012 salary.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                I hereby declare that Information as stated above is true and correct. I also authorize the School to recover tax (TDS) from my salary based on the declaration/documents submitted by me. I am personally liable to Income Tax proceedings for any misstatements in the declaration or proofs submitted herewith if they are inconsistent with the requirement of Income Tax Act, 1961.
                            </Typography>
                            <Typography variant="body1">
                                I {userName} solemnly declare that to the best of my knowledge and belief the information given above is correct and complete.
                            </Typography>
                        </Box>
                    </Container>
                    <Container>
                        <Grid container justifyContent="center" spacing={2} style={{ marginTop: '20px' }}>

                            <Grid item>
                                <Button variant="contained" color="success"
                                    disabled={USISlistInvestmentEmpDetails[0]?.IsSubmitted}
                                >
                                    {/* // disabled={USISlistInvestmentEmpDetails[0].IsSubmitted}> */}
                                    SAVE
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button variant="contained" color="success"
                                    disabled={USISlistInvestmentEmpDetails[0]?.IsSubmitted}
                                >
                                    SUBMIT
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </>
    );

};

export default InvestmentDeclaration;