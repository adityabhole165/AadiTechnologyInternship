import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetInvestmentDetailsBody } from "src/interfaces/InvestmentDeclaration/InvestmentDeclaration";
import { GetInvestmentDetails } from "src/requests/InvestmentDeclaration/ReqInvestmentDeclaration";

import { Box } from "@mui/material";
import { RootState } from "src/store";
import DataTable, { Column } from "./Datatable";

const InvestmentSection = ({ refreshData }) => {
    const dispatch = useDispatch();

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


    let listInvestmentSectionDetails = []
    useEffect(() => {
        if (
            USListInvestmentSectionDetails?.listInvestmentSectionDetails !== undefined
        ) {
            console.log(USListInvestmentSectionDetails?.listInvestmentSectionDetails
                // .sort((a, b) => a.SortOrder > b.SortOrder ? 1 : -1)
                .sort((a, b) => a.SortOrder - b.SortOrder)
                , "ajit");
            // listInvestmentSectionDetails = USListInvestmentSectionDetails?.listInvestmentSectionDetails
            //     .sort((a, b) => Number(a.SortOrder) - Number(b.SortOrder))

        }
    }, [USListInvestmentSectionDetails])

    // || [];

    console.log(listInvestmentSectionDetails, "listInvestmentSectionDetails");




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
        return listInvestmentSectionDetails
            // .sort((a, b) => Number(a.SortOrder) - Number(b.SortOrder))
            // .sort((a, b) => a.SortOrder > b.SortOrder ? 1 : -1)
            .map((section) => {
                const filteredData = ListInvestmentDetails.filter((detail) => detail.SectionId === section.Id);

                if (filteredData.length === 0) {
                    return null; // Skip rendering this section if there's no data
                }

                const totalAmount = filteredData.reduce((acc, item) => acc + (item.Amount || 0), 0);


                const columns: Column[] = [
                    {
                        id: 'Name',
                        label: section.Name,
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
                ];

                // if (index === listInvestmentSectionDetails.length - 1 && !grandTotalRowRendered) {
                //     grandTotalRowRendered = true;

                return (
                    <>
                        <Box key={section.Id} sx={{ background: 'white', p: 2, mb: 2 }}>
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                isLoading={false}
                                isPagination={false}
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


        <Box sx={{ px: 2 }}>
            {renderDataTables()}
        </Box>
    );
};


export default InvestmentSection 