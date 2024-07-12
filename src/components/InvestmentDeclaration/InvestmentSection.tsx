import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetInvestmentDetailsBody } from "src/interfaces/InvestmentDeclaration/InvestmentDeclaration";
import { GetInvestmentDetails } from "src/requests/InvestmentDeclaration/ReqInvestmentDeclaration";

import { Box } from "@mui/material";
import { RootState } from "src/store";
import DataTable, { Column } from "./Datatable";

const InvestmentSection = () => {
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


    const changeText = (value) => {
        console.log(value, "----aa---");
    }

    const renderDataTables = () => {
        return listInvestmentSectionDetails.map((section) => {
            const filteredData = ListInvestmentDetails.filter((detail) => detail.SectionId === section.Id);

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