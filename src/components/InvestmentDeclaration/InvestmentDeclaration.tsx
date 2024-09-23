import { Check, QuestionMark, Save } from "@mui/icons-material";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AlertContext } from "src/contexts/AlertContext";
import { IGetInvestmentDetailsBody, IGetRegimeDetailsDropdownBody, SaveInvestmentDetailsBody, SubmitInvestmentDetailsBody } from "src/interfaces/InvestmentDeclaration/InvestmentDeclaration";
import SearchableDropdown from "src/libraries/ResuableComponents/SearchableDropdown";
import { CDAGetInvestmentDetails, CDAGetRegimeDropdown, CDAGetSaveInvestment, CDAGetSubmitInvestment, GetInvestmentDetails, resetSaveInvestment } from "src/requests/InvestmentDeclaration/ReqInvestmentDeclaration";
import { resetMessage } from "src/requests/Library/Library";
import { RootState } from "src/store";
import CommonPageHeader from "../CommonPageHeader";
import InvestmentDeatailsDocument from "./InvestmentDetailsDocument";
import InvestmentSection from "./InvestmentSection";
import IsSubmit from './IsSubmit';

const InvestmentDeclaration = () => {
    const dispatch = useDispatch();
    const { showAlert, closeAlert } = useContext(AlertContext);
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asFinancialYearId = sessionStorage.getItem('FinancialYearId');

    const [exampleSaveInvestment, setexampleSaveInvestment] = useState([])

    // const [dropdown, setDropdown] = useState('0');

    const [newFilter, setnewFilter] = useState('');


    const USListInvestmentDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentDetails
    )
    const USISlistInvestmentAmountDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentAmountDetails
    )
    const USSubmitInvestmentDeclaration: any = useSelector((state: RootState) => state.InvestmentDeclaration.ISSubmitInvestmentDeclaration)

    const USISlistInvestmentEmpDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentEmpDetails
    )
    const isSubmittedArray = USISlistInvestmentEmpDetails.map(item => item.IsSubmitted);
    console.log(isSubmittedArray, "isSubmittedArray");

    const [regimeId, setRegimeId] = useState("0");


    const USListInvestmentSectionDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISNewGetInvestmentDetails
    )


    const listInvestmentSectionDetails = USListInvestmentSectionDetails || [];


    const USGetRegimeDropdown: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISGetRegimeDropdown
    )

    const USSaveInvestmentDeclaration: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISSaveInvestment
    )


    const GetInvestmentDeclarationBody: IGetInvestmentDetailsBody = {
        asSchoolId: asSchoolId,
        asFinancialYearId: 1,
        asUserId: asUserId
    }

    const GetInvestmentDeclarationBodyNew: IGetInvestmentDetailsBody = {
        asSchoolId: asSchoolId,
        asFinancialYearId: 1,
        asUserId: asUserId
    }

    const GetRegimeDropdown: IGetRegimeDetailsDropdownBody = {
        asSchoolId: asSchoolId
    }
    const [ListInvestmentDetails, setListInvestmentDetails] = useState([])

    const clickSave = () => {

        const SaveInvestmentDeclaration: SaveInvestmentDetailsBody = {
            asSchoolId: asSchoolId,
            asFinancialYearId: 1,
            asUpdatedById: asUserId,
            asUserId: asUserId,
            asDeclarationXML: getXML(),
            asRegimeId: Number(regimeId)
        }
        dispatch(CDAGetSaveInvestment(SaveInvestmentDeclaration))
        dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
    }

    useEffect(() => {
        if (USSaveInvestmentDeclaration != "") {
            toast.success(USSaveInvestmentDeclaration)
            dispatch(resetSaveInvestment());
            dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
        }
    }, [USSaveInvestmentDeclaration])



    // const clickSubmit = () => {
    //     if (window.confirm("After submission you will not be able to update any details. Do you want to continue?"))
    //         toast.success("Investment details submitted successfully.")
    //     const SubmitInvestmentDeclaration: SubmitInvestmentDetailsBody = {
    //         asSchoolId: asSchoolId,
    //         asFinancialYearId: 1,
    //         asUserId: asUserId,
    //         asUpdatedById: asUserId
    //     }
    //     dispatch(CDAGetSubmitInvestment(SubmitInvestmentDeclaration))
    //     dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))

    // }

    const clickSubmit = () => {
        // if (window.confirm("After submission you will not be able to update any details. Do you want to continue?"))
        //     toast.success("Investment details submitted successfully.")
        const SubmitInvestmentDeclaration: SubmitInvestmentDetailsBody = {
            asSchoolId: asSchoolId,
            asFinancialYearId: 1,
            asUserId: asUserId,
            asUpdatedById: asUserId
        };
        showAlert({
            title: 'Please Confirm',
            message:
                'After submission you will not be able to update any details. Do you want to continue? ',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onConfirm: () => {
                closeAlert();
                dispatch(CDAGetSubmitInvestment(SubmitInvestmentDeclaration))
            },
            onCancel: closeAlert
        });
    }
    useEffect(() => {
        if (USSubmitInvestmentDeclaration != '') {
            toast.success(USSubmitInvestmentDeclaration)
            dispatch(resetMessage());
            dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
        }
    }, [USSubmitInvestmentDeclaration])

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
        if (USGetRegimeDropdown.length > 0 && USISlistInvestmentEmpDetails.length > 0) {
            if (USISlistInvestmentEmpDetails[0].RegimeId !== "0")
                setRegimeId(USISlistInvestmentEmpDetails[0].RegimeId);
            else
                setRegimeId(USGetRegimeDropdown[0].Value);
        }
    }, [USGetRegimeDropdown, USISlistInvestmentEmpDetails])

    useEffect(() => {
        dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
    }, [])

    useEffect(() => {
        dispatch(CDAGetInvestmentDetails(GetInvestmentDeclarationBodyNew))
    }, [])


    // const userName = USISlistInvestmentEmpDetails[0]?.UserName || 'Employee';
    const userName = sessionStorage.getItem('StudentName')



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
    const [open, setOpen] = useState(false)
    const [investmentData, setinvestmentData] = useState(null)
    const [Documentname, setDocumentName] = useState('')
    const ClickAppropriate = (value) => {
        console.log(value, "ClickAppropriate");

        setinvestmentData(value.Id)
        setDocumentName(value.Name)
        setOpen(true)
    }

    const RefreshList = () => {
        dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
    }
    const handleClose = (value) => {
        setOpen(false)
    }
    // const ClickUpload = (value) => {
    //     if (!fileName || fileName === '') {
    //         setFileNameError('Please select file to upload.');
    //         isError = true; // Set isError to true for this condition
    //     } else {
    //         setFileNameError('');
    //     }
    // }
    // const getUserName = () => {
    //     let UserName = '';
    //     USISlistInvestmentEmpDetails.map((item) => {
    //         UserName = item.UserName;
    //     });
    //     return UserName;
    // };
    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[
                        {
                            title: 'Investment Declaration',
                            path: '/extended-sidebar/Teacher/InvestmentDeclaration'
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

                                        sx={{
                                            backgroundColor: green[500],
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: green[600]
                                            }
                                        }}
                                        onClick={clickSave}
                                        disabled={USISlistInvestmentEmpDetails[0]?.IsSubmitted == "True"}
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
                                        disabled={!(USISlistInvestmentEmpDetails[0]?.IsSaved == "True" && USISlistInvestmentEmpDetails[0]?.IsSubmitted == "False")}
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

                {/* <Dialog
                    open={open}
                    maxWidth={'md'}
                    fullWidth
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            borderRadius: "15px",
                        }
                    }}
                >
                    <DialogTitle sx={{ bgcolor: '#223354' }}>
                        <ClearIcon onClick={handleClose}
                            sx={{
                                color: 'white',
                                // background:'white',
                                borderRadius: '7px',
                                position: 'absolute',
                                top: '5px',
                                right: '8px',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'red',
                                    //  backgroundColor: red[100]

                                }
                            }} />

                    </DialogTitle>

                    <DialogContent  >
                        <Box> */}


                <InvestmentDeatailsDocument Id={investmentData}
                    UserName={USISlistInvestmentEmpDetails.length > 0 ?
                        USISlistInvestmentEmpDetails[0].UserName : userName}
                    DocumentName={Documentname}
                    open={open} handleClose={handleClose}
                    RefreshList={RefreshList} />

                {/* </Box>
                    </DialogContent>
                    <DialogActions sx={{ py: 2, px: 3 }}>
                        <Button
                            onClick={ClickUpload}
                            // color={'success'}
                            // variant={'contained'}
                            sx={{
                                color: 'green',
                                //  backgroundColor: grey[500],
                                '&:hover': {
                                    color: 'green',
                                    backgroundColor: green[100]
                                }
                            }}
                        >
                            Upload
                        </Button>


                        <Button
                            color={'error'}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>

                    </DialogActions>
                </Dialog> */}

                <Box border={1} sx={{ p: 2, background: 'white' }}>


                    <Grid container spacing={3}>
                        {USISlistInvestmentEmpDetails.map((detail) => (
                            <Grid item xs={12} key={detail.UserId}>
                                <Box sx={{
                                    backgroundColor: '#F0F0F0',
                                    textAlign: 'center', marginBottom: 2,

                                }}>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={1}>

                                        {detail.SchoolName}

                                    </Typography>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={1} >

                                        {detail.SchoolAddress}

                                    </Typography>
                                    <hr />
                                    <Typography variant={"h4"} textAlign={'center'} color={"#38548a"} mb={1}>

                                        INVESTMENT DECLARATION FORM FOR FINANCIAL YEAR {detail.FinancialYear}

                                    </Typography>
                                    <hr />
                                </Box>
                                <Box sx={{ backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', marginBottom: 2, pr: 14 }}>
                                    <Box>
                                        <Typography variant="h6">
                                            <Box
                                                display="inline-block"
                                                border={1}
                                                borderRadius={40}
                                                pl={1}
                                                pr={7.4}
                                                mr={1}
                                                mt={0}
                                                component="span"
                                            >
                                                Name
                                            </Box>
                                            <Typography variant="h5" component="span">
                                                {detail.UserName}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="body1">
                                            <Box
                                                display="inline-block"
                                                border={1}
                                                borderRadius={4}
                                                pl={1}
                                                pr={2}
                                                mr={1}
                                                component="span"
                                                mt={0.5}
                                            >
                                                Employee No
                                            </Box>
                                            <Typography variant="h5" component="span">
                                                {detail.EmployeeNo}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="body1">
                                            <Box
                                                display="inline-block"
                                                border={1}
                                                borderRadius={4}
                                                pl={1}
                                                pr={5.5}
                                                mr={1}
                                                mt={0.5}
                                                component="span"
                                            >
                                                Address
                                            </Box>
                                            <Typography variant="h5" component="span">
                                                {detail.Address}
                                            </Typography>
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body1">
                                            <Box
                                                display="inline-block"
                                                border={1}
                                                borderRadius={4}
                                                pl={1}
                                                pr={2}
                                                mr={1}
                                                mt={0}
                                                component="span"
                                            >
                                                Designation
                                            </Box>
                                            <Typography variant="h5" component="span">
                                                {detail.Designation}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="body1">
                                            <Box
                                                display="inline-block"
                                                border={1}
                                                borderRadius={4}
                                                pl={1}
                                                pr={5}
                                                mr={1}
                                                mt={0.5}
                                                component="span"
                                            >
                                                PAN No
                                            </Box>
                                            <Typography variant="h5" component="span">
                                                {detail.PanNo}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="body1">
                                            <Box
                                                display="inline-block"
                                                border={1}
                                                borderRadius={4}
                                                pl={1}
                                                pr={5.4}
                                                mr={1}
                                                mt={0.5}
                                                component="span"
                                            >
                                                Gender
                                            </Box>
                                            <Typography variant="h5" component="span">
                                                {detail.Gender}
                                            </Typography>
                                        </Typography>


                                    </Box>

                                </Box>
                                <Box >
                                    <SearchableDropdown
                                        sx={{ maxWidth: '35vh' }}
                                        ItemList={USGetRegimeDropdown}
                                        onChange={clickRegimeDropDown}
                                        label={'Regime'}
                                        defaultValue={regimeId}
                                        size={"small"} />
                                </Box>

                                <Box>
                                    {USListInvestmentDetails.length > 0 &&
                                        <Grid container sx={{ maxWidth: '100%' }} >
                                            <IsSubmit.Provider value={isSubmittedArray.length > 0 ? isSubmittedArray[0] : ""}>
                                                <InvestmentSection clickDocumentDetails={ClickAppropriate}
                                                    refreshData={refreshData}></InvestmentSection>

                                            </IsSubmit.Provider>

                                        </Grid>}
                                </Box>
                            </Grid>

                        ))}

                    </Grid>
                    <Box sx={{ pl: 2, Pr: 2 }} >
                        <Box sx={{
                            mt: 0,
                            // textAlign: 'center',
                            pl: 122,
                            display: 'flex'
                        }}>
                            <Typography variant="h6"
                                sx={{ color: 'white', backgroundColor: "#38548a", p: 1, mr: 1.5, textAlign: 'center' }}>
                                Grand Total
                            </Typography>
                            <Typography sx={{ backgroundColor: "#38548a", color: 'white', p: 1, ml: 2, textAlign: 'center' }}> {grandTotalAmount}</Typography>
                        </Box>

                        <Grid container spacing={3}>
                            {USISlistInvestmentEmpDetails.map((detail) => (
                                <Grid item xs={12} key={detail.UserId}>
                                    <Box sx={{ backgroundColor: '#ffffff', marginTop: 2 }}>
                                        <Typography variant="body1" paragraph>
                                            I further undertake to provide all documentary proofs of payment made by me before 25th January, {detail.FinancialYearEnd}, and if I fail to do so, the school can make full deduction of income tax dues from February / March 2012 salary.
                                        </Typography>
                                        <Typography variant="body1" paragraph>
                                            I hereby declare that the information as stated above is true and correct. I also authorize the School to recover tax (TDS) from my salary based on the declaration/documents submitted by me. I am personally liable to Income Tax proceedings for any misstatements in the declaration or proofs submitted herewith if they are inconsistent with the requirement of Income Tax Act, 1961.
                                        </Typography>
                                        <Typography variant="body1">
                                            I <b>{detail.UserName}</b> solemnly declare that to the best of my knowledge and belief, the information given above is correct and complete.
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                    </Box >

                    {/* <Grid container justifyContent="center" spacing={2} style={{ marginTop: '20px' }}>

                            <Grid item>
                                <Button variant="contained" color="success"
                                    onClick={clickSave}
                                    disabled={USISlistInvestmentEmpDetails[0]?.IsSubmitted}
                                >
                                    {/* // disabled={USISlistInvestmentEmpDetails[0].IsSubmitted}> */}
                    {/* SAVE */}
                    {/* </Button>
                            </Grid> */}

                    {/* <Grid item>
                                <Button variant="contained" color="success"
                                    onClick={clickSubmit}
                                    disabled={USISlistInvestmentEmpDetails[0]?.IsSaved && USISlistInvestmentEmpDetails[0]?.IsSubmitted}
                                >
                                    SUBMIT
                                </Button>
                            </Grid>
                        </Grid> */}

                </Box>
            </Box >
        </>
    );

};

export default InvestmentDeclaration; 