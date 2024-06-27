import { IGetInvestmentDetailsBody, IGetInvestmentDetailsResult, IGetRegimeDetailsDropdownBody, IGetRegimeDetailsDropdownResult } from 'src/interfaces/InvestmentDeclaration/InvestmentDeclaration';
import http from '../../requests/SchoolService/schoolServices';

const GetInvestmentDetails = (data: IGetInvestmentDetailsBody) => {
    return http.post<IGetInvestmentDetailsResult>('Teacher/GetInvestmentDetails', data);
};

const GetRegimeDropdown = (data: IGetRegimeDetailsDropdownBody) => {
    return http.post<IGetRegimeDetailsDropdownResult[]>('Teacher/GetRegimeDetails')
}

const InvestmentDeclarationApi = {
    GetInvestmentDetails,
    GetRegimeDropdown

}

export default InvestmentDeclarationApi;