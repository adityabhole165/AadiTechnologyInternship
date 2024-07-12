import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetInvestmentDetailsBody, IGetRegimeDetailsDropdownBody } from "src/interfaces/InvestmentDeclaration/InvestmentDeclaration";
import { CDAGetInvestmentDetails, CDAGetRegimeDropdown, GetInvestmentDetails } from "src/requests/InvestmentDeclaration/ReqInvestmentDeclaration";
import { RootState } from "src/store";

import DataTable, { Column } from "./Datatable";
const InvestmentDeclaration = () => {
    const dispatch = useDispatch();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));

    const [newFilter, setnewFilter] = useState('');
    const [ListInvestmentDetails, setListInvestmentDetails] = useState([])

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
        (state: RootState) => state.InvestmentDeclaration.ISNewGetInvestmentDetails
    )
    
   

    const listInvestmentSectionDetails = USListInvestmentSectionDetails?.listInvestmentSectionDetails || [];
   

    const USGetRegimeDropdown: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISGetRegimeDropdown
    )
    
   
   

    const [InvestmentColumns, setInvestmentColumns] = React.useState<Column[]>([
        {
            id: 'Section80C',
            label: 'Section 80C',
            renderCell: (rowData) => rowData.Name,
        },
        {
            id: 'AttachmentCount',
            label: 'Attachment Count',
            renderCell: (rowData) => rowData.DocumentCount,
        },
        {
            id: 'MaximumLimit',
            label: 'Maximum Limit Rs.',
            renderCell: (rowData) => rowData.MaxAmount,
        }
    ])


    const [InvestmentColumns1, setInvestmentColumns1] = React.useState<Column[]>([
        {
            id: 'Section 80CCF',
            label: 'Section 80CCF',
            renderCell: (rowData) => rowData.Name,
        },
        {
            id: 'AttachmentCount',
            label: 'Attachment Count',
            renderCell: (rowData) => rowData.SectionGroupId,
        },
        {
            id: 'MaximumLimit',
            label: 'Maximum Limit Rs.',
            renderCell: (rowData) => rowData.GroupMaxAmount,
        }
    ])

   
     

    const GetInvestmentDeclarationBody: IGetInvestmentDetailsBody = {
        asSchoolId: asSchoolId,
        asFinancialYearId: 10,
        asUserId: asUserId
    }

    useEffect(() => {
        dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
    }, [])

    useEffect(() => {
        setListInvestmentDetails(USListInvestmentDetails)
    }, [USListInvestmentDetails])

    const changeText = (value) => {
        console.log(value, "----aa---");
    }

    const changeText1 = (value) => {
        console.log(value, "----aa---");
    }


   

    const GetInvestmentDeclarationBodyNew: IGetInvestmentDetailsBody = {
        asSchoolId: asSchoolId,
        asFinancialYearId: 10,
        asUserId: asUserId
    }

    const GetRegimeDropdown: IGetRegimeDetailsDropdownBody = {
        asSchoolId: asSchoolId
    }

    const filteredSectionDetails = listInvestmentSectionDetails.map(section => {
        const matchingDetails = USListInvestmentDetails.filter(detail => detail.sectionId === section.Id);
        return {
            ...section,
            matchingDetails
        };
    });
     

    useEffect(() => {
        dispatch(CDAGetRegimeDropdown(GetRegimeDropdown))
    }, [])

    useEffect(() => {
        dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
    }, [])

    useEffect(() => {
        dispatch(CDAGetInvestmentDetails(GetInvestmentDeclarationBodyNew))
    }, [])

    // const filteredSectionDetails = listInvestmentSectionDetails.filter((section: any) => section.UserId === asUserId);
    const userName = USISlistInvestmentEmpDetails[0]?.UserName || 'Employee';

    // const filteredSectionDetails = listInvestmentSectionDetails.map((section) => section.Id);
    // console.log(filteredSectionDetails, "filteredSectionDetails");


    

    const matchingDetailsData = filteredSectionDetails.flatMap(section => section.matchingDetails);

 
  
    

    return (
        <>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Employee Investment Details
                </Typography>
                {USListInvestmentDetails.length > 0 &&
                    <Grid container>
                        <DataTable
                            columns={InvestmentColumns}
                            data={ListInvestmentDetails}
                            isLoading={false}
                            isPagination={false}
                            changeText={changeText}
                        />

                        <DataTable
                            columns={InvestmentColumns1}
                            data={filteredSectionDetails}
                            isLoading={false}
                            isPagination={false}
                            changeText={changeText1}
                        />

                    </Grid>}
                <br></br>
                <br></br>
                <Grid container spacing={3}>
                    {USISlistInvestmentEmpDetails.map((detail) => (
                        <Grid item xs={12} key={detail.UserId}>
                            <Box textAlign="center" marginBottom={2}>
                                <Typography variant="h6" gutterBottom>
                                    <Box
                                        display="inline-block"
                                        border={1}
                                        borderRadius={40}
                                        px={8}
                                        py={1}
                                        mr={1}
                                        component="span"
                                    >
                                        {detail.SchoolName}
                                    </Box>
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    <Box
                                        display="inline-block"
                                        border={1}
                                        borderRadius={40}
                                        px={8}
                                        py={1}
                                        mr={1}
                                        component="span"
                                    >
                                        {detail.SchoolAddress}
                                    </Box>
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    <Box
                                        display="inline-block"
                                        border={1}
                                        borderRadius={40}
                                        px={8}
                                        py={1}
                                        mr={1}
                                        component="span"
                                    >
                                        INVESTMENT DECLARATION FORM FOR FINANCIAL YEAR {detail.FinancialYear}
                                    </Box>
                                </Typography>
                            </Box>
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

            <Container>
                <Typography variant="h4" gutterBottom>
                    Section Details
                </Typography>
                <Grid container spacing={3}>
                    {listInvestmentSectionDetails.map((section) => (

                        <Grid item xs={12} key={section.Id}>
                            {/* <Paper elevation={3} style={{ padding: '20px' }}> */}
                            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" gutterBottom>
                                    {section.Name}

                                </Typography>
                                <br></br>
                                {matchingDetailsData.map((detail, index) => (
                                    <Typography variant="body2" key={index}>
                                        {detail.Name}
                                    </Typography>
                                ))}
                                <Typography variant="body1">
                                    <strong>Maximum Limit Rs.</strong> {section.GroupMaxAmount}
                                </Typography>
                            </Box>
                            <Box height={20} />

                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container>
                <Box marginTop={4}>
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
                        <Button variant="contained" color="success">
                            SAVE
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="success">
                            SUBMIT
                        </Button>
                    </Grid>
                </Grid>
            </Container>

        </>
    );

};

export default InvestmentDeclaration;
