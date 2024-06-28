import React, { useEffect, useState } from "react";
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
    const USListInvestmentDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentDetails
    )

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
    return (
        <Box sx={{ px: 2 }}>
            <Box sx={{ background: 'white', p: 2 }}>
                <DataTable
                    columns={InvestmentColumns}
                    data={ListInvestmentDetails}
                    isLoading={false}
                    isPagination={false}
                    changeText={changeText}
                />

            </Box>
        </Box>
    )
}

export default InvestmentSection