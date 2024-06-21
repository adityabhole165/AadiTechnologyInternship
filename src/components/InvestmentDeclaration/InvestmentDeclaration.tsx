import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetInvestmentDetailsBody } from "src/interfaces/InvestmentDeclaration/InvestmentDeclaration";
import { GetInvestmentDetails } from "src/requests/InvestmentDeclaration/ReqInvestmentDeclaration";
import { RootState } from "src/store";

const InvestmentDeclaration = () => {
    const dispatch = useDispatch();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));

    // const ViewResult = useSelector(
    //     (state: RootState) => state.FinalResult.ViewResult
    //   );

    const USListInvestmentDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.IslistInvestmentDetails
    )
    console.log(USListInvestmentDetails, "USListInvestmentDetails");

    const USInvestmentEmpDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.IslistInvestmentEmpDetails
    )
    console.log(USInvestmentEmpDetails, "USInvestmentEmpDetails");

    const USInvestmentSectionDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.IslistInvestmentSectionDetails
    )
    console.log(USInvestmentSectionDetails, "USInvestmentSectionDetails");

    const USInvestmentAmountDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.IslistInvestmentAmountDetails
    )
    console.log(USInvestmentAmountDetails, "USInvestmentAmountDetails");


    const GetInvestmentDeclarationBody: IGetInvestmentDetailsBody = {
        asSchoolId: asSchoolId,
        asFinancialYearId: 10,
        asUserId: 4463
    }

    useEffect(() => {
        dispatch(GetInvestmentDetails(GetInvestmentDeclarationBody))
    }, [])



    return (
        <div>
            <h1>Hii</h1>
        </div>
    )
}

export default InvestmentDeclaration;
