import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetInvestmentDetailsBody } from "src/interfaces/InvestmentDeclaration/InvestmentDeclaration";
import { GetInvestmentDetails } from "src/requests/InvestmentDeclaration/ReqInvestmentDeclaration";
import { RootState } from "src/store";

const InvestmentDeclaration = () => {
    const dispatch = useDispatch();

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asUserId = Number(localStorage.getItem('UserId'));

   

    const USListInvestmentDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentDetails
    )
    const USISlistInvestmentAmountDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentAmountDetails
    )
  
    const USISlistInvestmentEmpDetails: any = useSelector(
        (state: RootState) => state.InvestmentDeclaration.ISlistInvestmentEmpDetails
    )
   
    console.log(USListInvestmentDetails, "USListInvestmentDetails");
    console.log(USISlistInvestmentAmountDetails, "USISlistInvestmentAmountDetails");
    console.log(USISlistInvestmentEmpDetails, "USISlistInvestmentEmpDetails");

    
    const GetInvestmentDeclarationBody: IGetInvestmentDetailsBody = {
        asSchoolId: 18,
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
