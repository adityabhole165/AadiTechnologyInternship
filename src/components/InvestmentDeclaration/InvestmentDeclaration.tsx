import { Check, QuestionMark, Save } from "@mui/icons-material";
import { Box, Container, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IGetInvestmentDetailsBody, IGetRegimeDetailsDropdownBody, SaveInvestmentDetailsBody, SubmitInvestmentDetailsBody } from "src/interfaces/InvestmentDeclaration/InvestmentDeclaration";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import { CDAGetInvestmentDetails, CDAGetRegimeDropdown, CDAGetSaveInvestment, CDAGetSubmitInvestment, GetInvestmentDetails } from "src/requests/InvestmentDeclaration/ReqInvestmentDeclaration";
import { RootState } from "src/store";
import CommonPageHeader from "../CommonPageHeader";
import InvestmentSection from "./InvestmentSection";
import IsSubmit from './IsSubmit';
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
    const isSubmittedArray = USISlistInvestmentEmpDetails.map(item => item.IsSubmitted);

    const USListInvestmentSectionDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISNewGetInvestmentDetails
    )


    const listInvestmentSectionDetails = USListInvestmentSectionDetails?.listInvestmentSectionDetails || [];


    const USGetRegimeDropdown: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISGetRegimeDropdown
    )

    const USSaveInvestmentDeclaration: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISSaveInvestment
    )

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
    const [ListInvestmentDetails, setListInvestmentDetails] = useState([])

    const clickSave = () => {

        const SaveInvestmentDeclaration: SaveInvestmentDetailsBody = {
            asSchoolId: asSchoolId,
            asFinancialYearId: 10,
            asUpdatedById: asUserId,
            asUserId: asUserId,
            asDeclarationXML: getXML(),
            asRegimeId: regimeId
        }
        dispatch(CDAGetSaveInvestment(SaveInvestmentDeclaration))
    }

    useEffect(() => {
        if (USSaveInvestmentDeclaration != "") {
            toast.success("Investment details saved successfully.")
        }
    }, [USSaveInvestmentDeclaration])



    const clickSubmit = () => {
        if (window.confirm("After submission you will not be able to update any details. Do you want to continue?"))
            toast.success("Investment details submitted successfully.")
        const SubmitInvestmentDeclaration: SubmitInvestmentDetailsBody = {
            asSchoolId: asSchoolId,
            asFinancialYearId: 10,
            asUserId: asUserId,
            asUpdatedById: asUserId
        }
        dispatch(CDAGetSubmitInvestment(SubmitInvestmentDeclaration))
    }

    function getXML() {
        let asSaveInvestmentXML = "\r\n<ArrayOfInvestmentDeclaration xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\r\n >";
        ListInvestmentDetails.map((Item) => {
            if (Item.Amount != "") {
                asSaveInvestmentXML += "<InvestmentDeclaration>" +
                    "<Id>0</Id>" +
                    "<InvestmentMethodId>" + Item.Id + "</InvestmentMethodId>" +
                    "<UserId>0</UserId>" +
                    "<Amount>" + Item.Amount + "</Amount>" +
                    "<IsDocSubmitted>false</IsDocSubmitted>" +
                    "<SectionId>0</SectionId>" +
                    "<SortOrder>0</SortOrder>" +
                    "<DocumentCount>0</DocumentCount>" +
                    "<RegimId>0</RegimId>" +
                    "</InvestmentDeclaration>"
            }
        });
        asSaveInvestmentXML += "\r\n</ArrayOfInvestmentDeclaration>";
        return asSaveInvestmentXML
    }



    const totalAmounts = listInvestmentSectionDetails.map(section => {
        const filteredData = ListInvestmentDetails.filter(detail => detail.SectionId === section.Id);
        return filteredData.reduce((acc, item) => acc + (item.Amount || 0), 0);
    });

    const grandTotalAmount = totalAmounts.reduce((acc, total) => acc + total, 0);





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



    useEffect(() => {
        if (USListInvestmentDetails.length > 0)
            setListInvestmentDetails(USListInvestmentDetails)
    }, [USListInvestmentDetails])

    const clickRegimeDropDown = (value) => {
        setRegimeId(value)
    }
    const refreshData = (value) => {
        setListInvestmentDetails(value)
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

                    rightActions={<>

                        <Box>
                            <Tooltip title={"Submit investment details for income tax calculation"}>
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
                        < Box >
                            <Tooltip title={'Save'}>
                                <span>
                                    <IconButton
                                        disabled={USISlistInvestmentEmpDetails[0]?.IsSubmitted}
                                        sx={{
                                            backgroundColor: green[500],
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                        onClick={clickSave}
                                    >
                                        <Save />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'Submit'}>
                                <span>
                                    <IconButton
                                        disabled={USISlistInvestmentEmpDetails[0]?.IsSaved && USISlistInvestmentEmpDetails[0]?.IsSubmitted}
                                        sx={{
                                            backgroundColor: green[500],
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                        onClick={clickSubmit}
                                    >
                                        <Check />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>


                    </>}
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
                                    {/* <SearchableDropdown
                                        sx={{ minWidth: '20vw' }}
                                        ItemList={USGetRegimeDropdown}
                                        onChange={clickRegimeDropDown}
                                        label={'Regime'}
                                        defaultValue={regimeId}
                                        size={"small"}

                                    /> */}
                                </Grid>

                            ))}
                            <SearchableDropdown
                                sx={{ minWidth: '20vw' }}
                                ItemList={USGetRegimeDropdown}
                                onChange={clickRegimeDropDown}
                                label={'Regime'}
                                defaultValue={regimeId}
                                size={"small"}

                            />
                        </Grid>
                        {USListInvestmentDetails.length > 0 &&
                            <Grid container>
                                <IsSubmit.Provider value={isSubmittedArray}>
                                    <InvestmentSection
                                        refreshData={refreshData}></InvestmentSection>

                                </IsSubmit.Provider>

                            </Grid>}

                    </Container>

                    <Box sx={{ background: 'white', p: 2, mb: 2, textAlign: 'right', pr: 6 }}>
                        <Typography variant="h6">Grand Total: {grandTotalAmount}</Typography>
                    </Box>




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
                        {/* <Grid container justifyContent="center" spacing={2} style={{ marginTop: '20px' }}>

                            <Grid item>
                                <Button variant="contained" color="success"
                                    onClick={clickSave}
                                    disabled={USISlistInvestmentEmpDetails[0]?.IsSubmitted}
                                >
                                    {/* // disabled={USISlistInvestmentEmpDetails[0].IsSubmitted}> */}
                        SAVE
                        {/* </Button>
                            </Grid> */} */

                        {/* <Grid item>
                                <Button variant="contained" color="success"
                                    onClick={clickSubmit}
                                    disabled={USISlistInvestmentEmpDetails[0]?.IsSaved && USISlistInvestmentEmpDetails[0]?.IsSubmitted}
                                >
                                    SUBMIT
                                </Button>
                            </Grid>
                        </Grid> */}
                    </Container>
                </Box>
            </Box>
        </>
    );

};

export default InvestmentDeclaration; 