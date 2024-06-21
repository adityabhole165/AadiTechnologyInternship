import { IGetInvestmentDetailsBody, IGetInvestmentDetailsResult } from 'src/interfaces/InvestmentDeclaration/InvestmentDeclaration';
import http from '../../requests/SchoolService/schoolServices';

const GetInvestmentDetails = (data: IGetInvestmentDetailsBody) => {
    return http.post<IGetInvestmentDetailsResult>('Teacher/GetInvestmentDetails', data);
};


const InvestmentDeclarationApi = {
    GetInvestmentDetails

}

export default InvestmentDeclarationApi;