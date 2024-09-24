import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetInvestmentDetailsBody } from "src/interfaces/InvestmentDeclaration/InvestmentDeclaration";
import { GetInvestmentDetails } from "src/requests/InvestmentDeclaration/ReqInvestmentDeclaration";

import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { RootState } from "src/store";
import DataTable, { Column } from "./Datatable";

const InvestmentSection = ({ refreshData, clickDocumentDetails }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asFinancialYearId = sessionStorage.getItem('FinancialYearId');

    const [ListInvestmentDetails, setListInvestmentDetails] = useState([])

    const [ListInvestmentDetails1, setListInvestmentDetails1] = useState([])


    const [grandTotalAmount, setGrandTotalAmount] = useState(0);


    const USListInvestmentDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentDetails
    )


    const USListInvestmentSectionDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISNewGetInvestmentDetails
    )


    const listInvestmentSectionDetails = USListInvestmentSectionDetails || [];

    // || [];



    const GetInvestmentDeclarationBody: IGetInvestmentDetailsBody = {
        asSchoolId: asSchoolId,
        asFinancialYearId: 1,
        asUserId: asUserId
    }

    useEffect(() => {
        dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
    }, [])
    useEffect(() => {
        setListInvestmentDetails(USListInvestmentDetails)
    }, [USListInvestmentDetails])

    // useEffect(() => {
    //     dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
    // },[])

    useEffect(() => {
        setListInvestmentDetails1(USListInvestmentDetails)
    }, [USListInvestmentDetails])

    // const calculateTotals = () => {
    //     let totalAmounts = listInvestmentSectionDetails.map(section => {
    //         const filteredData = ListInvestmentDetails.filter(detail => detail.SectionId === section.Id);
    //         return filteredData.reduce((acc, item) => acc + (item.Amount || 0), 0);
    //     });
    //     return totalAmounts;
    // };

    // useEffect(() => {
    //     const totals = calculateTotals();
    //     setGrandTotalAmount(totals.reduce((acc, total) => acc + total, 0));
    // }, [ListInvestmentDetails, listInvestmentSectionDetails]);



    const getAmount = (value, Id) => {
        let returnVal = ""
        value.map((Item) => {
            if (Item.Id == Id)
                returnVal = Item.Amount
        })
        return returnVal
    }
    const changeText = (updatedSectionData, sectionId) => {
        setListInvestmentDetails((prevDetails) => {
            return prevDetails.map((item) => {
                if (item.SectionId === sectionId) {
                    const updatedItem = updatedSectionData.find(
                        (updatedItem) => updatedItem.Id === item.Id
                    );
                    if (updatedItem) {
                        return { ...item, Amount: updatedItem.Amount };
                    }
                }
                return item;
            });
        });

        refreshData((prevDetails) => {
            return prevDetails.map((item) => {
                if (item.SectionId === sectionId) {
                    const updatedItem = updatedSectionData.find(
                        (updatedItem) => updatedItem.Id === item.Id
                    );
                    if (updatedItem) {
                        return { ...item, Amount: updatedItem.Amount };
                    }
                }
                return item;
            });
        });
    };

    const renderDataTables = () => {

        const totalAmounts = listInvestmentSectionDetails.map(section => {
            const filteredData = ListInvestmentDetails.filter(detail => detail.SectionId === section.Id);
            return filteredData.reduce((acc, item) => acc + (item.Amount || 0), 0);
        });

        const grandTotalAmount = totalAmounts.reduce((acc, total) => acc + total, 0);

        // let grandTotalRowRendered = false;
        return listInvestmentSectionDetails.map((section) => {
            const filteredData = ListInvestmentDetails.filter((detail) => detail.SectionId === section.Id);

            if (filteredData.length === 0) {
                return null; // Skip rendering this section if there's no data
            }
            const totalAmount = filteredData.reduce((acc, item) => acc + (item.Amount || 0), 0);
            const clickDocument = (value) => {
                // navigate(
                //     '/extended-sidebar/Teacher/InvestmentDetailsDocument')
                // console.log(value, "clickDocument");
                clickDocumentDetails(value)
            }

            const columns: Column[] = [
                {
                    id: 'Name',
                    label: section.Name,
                    renderCell: (rowData) => rowData.Name,
                },
                {
                    id: 'AttachmentCount',
                    label: 'Attachment Count',
                    headerCellProps: { align: 'center' }, // Align the header to center
                    cellProps: { align: 'center' },
                    // renderCell: (rowData) => rowData.DocumentCount,
                    renderCell: (rowData) => (
                        // <IconButton onClick={() => clickDocument((rowData))} sx={{ padding: '3px 8px', margin: '0px 15px' }} >
                        <div onClick={() => clickDocument((rowData))} style={{ cursor: 'pointer' }}> {rowData.DocumentCount}</div>
                        // </IconButton>

                    )
                },
                {
                    id: 'MaximumLimit',
                    label: 'Maximum Limit Rs.',
                    headerCellProps: { align: 'center' }, // Align the header to center
                    cellProps: { align: 'center', sx: { border: (theme) => `1px solid ${theme.palette.divider}` }, },
                    renderCell: (rowData) => section.GroupMaxAmount == 0 ? rowData.MaxAmount : section.GroupMaxAmount,
                }
            ];

            // if (index === listInvestmentSectionDetails.length - 1 && !grandTotalRowRendered) {
            //     grandTotalRowRendered = true;

            return (
                <>
                    <Box key={section.Id} sx={{ background: 'white', pt: 2, pb: 2, }}>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            isLoading={false}
                            isPagination={false}
                            GroupAmount={section.GroupMaxAmount}
                            changeText={(updatedSectionData) => changeText(updatedSectionData, section.Id)}
                        />

                    </Box>


                    {/* <Box key="grand-total" sx={{ background: 'white', p: 2, mb: 2 }}>
                        <Typography variant="h6">Grand Total: {grandTotalAmount}</Typography>
                    </Box> */}
                </>

            );


        });


    };


    return (


        <Box sx={{ width: 1 }}>
            {renderDataTables()}
        </Box>
    );
};


export default InvestmentSection 