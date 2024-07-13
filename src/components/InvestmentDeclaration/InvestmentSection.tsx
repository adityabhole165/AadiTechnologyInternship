import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetInvestmentDetailsBody } from "src/interfaces/InvestmentDeclaration/InvestmentDeclaration";
import { GetInvestmentDetails } from "src/requests/InvestmentDeclaration/ReqInvestmentDeclaration";

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { RootState } from "src/store";
import DataTable, { Column } from "./Datatable";

const InvestmentSection = ({ refreshData }) => {
    const dispatch = useDispatch();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));

    const [ListInvestmentDetails, setListInvestmentDetails] = useState([])

    const [ListInvestmentDetails1, setListInvestmentDetails1] = useState([])

    const USListInvestmentDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentDetails
    )


    const USListInvestmentSectionDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISNewGetInvestmentDetails
    )

    console.log(USListInvestmentSectionDetails, "USListInvestmentSectionDetail12345");

    const listInvestmentSectionDetails = USListInvestmentSectionDetails?.listInvestmentSectionDetails || [];

    console.log(listInvestmentSectionDetails, "listInvestmentSectionDetails");




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

    // useEffect(() => {
    //     dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
    // },[])

    useEffect(() => {
        setListInvestmentDetails1(USListInvestmentDetails)
    }, [USListInvestmentDetails])


    const getAmount = (value, Id) => {
        let returnVal = ""
        value.map((Item) => {
            if (Item.Id == Id)
                returnVal = Item.Amount
        })
        return returnVal
    }
    const changeText = (value) => {
        setListInvestmentDetails(
            ListInvestmentDetails.map((Item) => {
                return { ...Item, Amount: getAmount(value, Item.Id) }
            })
        )
        refreshData(ListInvestmentDetails.map((Item) => {
            return { ...Item, Amount: getAmount(value, Item.Id) }
        }))
    }

    const renderDataTables = () => {
        return listInvestmentSectionDetails.map((section) => {
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

            return (
                <Box key={section.Id} sx={{ background: 'white', p: 2, mb: 2 }}>
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        isLoading={false}
                        isPagination={false}
                        changeText={changeText}
                    />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="right">
                                        <Typography variant="h6">Total Amount</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">{totalAmount}</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>
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